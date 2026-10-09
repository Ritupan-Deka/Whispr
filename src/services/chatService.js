import { 
    ref, 
    push, 
    set, 
    update, 
    remove, 
    onValue, 
    off, 
    get, 
    serverTimestamp, 
    query, 
    limitToLast 
} from 'firebase/database';
import { db } from '../config/firebase.js';

export const ChatService = {
    activeListeners: {
        contactsRef: null,
        messagesRef: null,
        typingRef: null,
        statusRef: null
    },

    /**
     * Compute a deterministic private channel ID for any two users based on sorted UIDs.
     */
    getChatChannelId(uidA, uidB) {
        if (!uidA || !uidB) return null;
        return [uidA, uidB].sort().join('_');
    },

    /**
     * Subscribe to all registered users / contacts directory in real-time.
     */
    subscribeToContacts(currentUid, onContactsUpdate, onError) {
        const usersRef = ref(db, 'users');
        if (this.activeListeners.contactsRef) {
            off(this.activeListeners.contactsRef);
        }
        this.activeListeners.contactsRef = usersRef;

        onValue(usersRef, async (snapshot) => {
            if (!snapshot.exists()) {
                onContactsUpdate([]);
                return;
            }

            const usersMap = snapshot.val();
            const contactsList = [];

            for (const uid in usersMap) {
                if (uid === currentUid) continue;
                const user = usersMap[uid];
                if (!user || !user.name) continue;

                // Fetch last message snippet & unread count for contact list
                const chatId = this.getChatChannelId(currentUid, uid);
                const lastMsgData = await this.fetchLastMessageSummary(chatId, currentUid);

                contactsList.push({
                    uid: uid,
                    name: user.name,
                    status: user.status || 'Offline',
                    lastSeen: user.lastSeen,
                    avatarUrl: user.avatarUrl,
                    lastMessage: lastMsgData.text,
                    lastMessageTime: lastMsgData.timestamp,
                    unreadCount: lastMsgData.unreadCount
                });
            }

            // Sort contacts by latest message timestamp or online status
            contactsList.sort((a, b) => {
                const timeA = a.lastMessageTime || 0;
                const timeB = b.lastMessageTime || 0;
                if (timeA !== timeB) return timeB - timeA;
                return (a.status === 'Online' ? -1 : 1);
            });

            onContactsUpdate(contactsList);
        }, (err) => {
            console.error('Error fetching contacts:', err);
            if (onError) onError(err);
        });
    },

    /**
     * Fetch last message summary and unread count for a given channel.
     */
    async fetchLastMessageSummary(chatId, currentUid) {
        if (!chatId) return { text: '', timestamp: 0, unreadCount: 0 };
        try {
            const messagesRef = query(ref(db, `chats/${chatId}/messages`), limitToLast(20));
            const snap = await get(messagesRef);
            if (!snap.exists()) return { text: '', timestamp: 0, unreadCount: 0 };

            const messages = snap.val();
            const keys = Object.keys(messages);
            let lastMsg = null;
            let unread = 0;

            keys.forEach(k => {
                const msg = messages[k];
                if (msg.senderUid !== currentUid && msg.status !== 'read') {
                    unread++;
                }
                lastMsg = msg;
            });

            const textSnippet = lastMsg ? (lastMsg.mediaType === 'image' ? '📷 Photo' : lastMsg.message) : '';
            return {
                text: textSnippet,
                timestamp: lastMsg ? lastMsg.timestamp : 0,
                unreadCount: unread
            };
        } catch (err) {
            return { text: '', timestamp: 0, unreadCount: 0 };
        }
    },

    /**
     * Subscribe to real-time message stream for an active chat channel.
     */
    subscribeToMessages(chatId, currentUid, onMessagesUpdated) {
        if (this.activeListeners.messagesRef) {
            off(this.activeListeners.messagesRef);
            this.activeListeners.messagesRef = null;
        }

        if (!chatId) return;

        const messagesRef = ref(db, `chats/${chatId}/messages`);
        this.activeListeners.messagesRef = messagesRef;

        onValue(messagesRef, (snapshot) => {
            if (!snapshot.exists()) {
                onMessagesUpdated([]);
                return;
            }

            const rawData = snapshot.val();
            const messageList = [];

            for (const id in rawData) {
                const msg = rawData[id];
                msg.id = id;
                messageList.push(msg);

                // Auto-mark incoming messages as read
                if (msg.senderUid !== currentUid && msg.status !== 'read') {
                    update(ref(db, `chats/${chatId}/messages/${id}`), { status: 'read' });
                }
            }

            messageList.sort((a, b) => (a.timestamp || 0) - (b.timestamp || 0));
            onMessagesUpdated(messageList);
        });
    },

    /**
     * Broadcast typing status for current user in the active channel.
     */
    setTypingStatus(chatId, uid, isTyping) {
        if (!chatId || !uid) return;
        const typingUserRef = ref(db, `chats/${chatId}/typing/${uid}`);
        if (isTyping) {
            set(typingUserRef, { timestamp: serverTimestamp() });
        } else {
            remove(typingUserRef);
        }
    },

    /**
     * Subscribe to typing indicators in the active channel.
     */
    subscribeToTyping(chatId, currentUid, onTypingUpdate) {
        if (this.activeListeners.typingRef) {
            off(this.activeListeners.typingRef);
            this.activeListeners.typingRef = null;
        }

        if (!chatId) return;

        const typingRef = ref(db, `chats/${chatId}/typing`);
        this.activeListeners.typingRef = typingRef;

        onValue(typingRef, (snapshot) => {
            if (!snapshot.exists()) {
                onTypingUpdate(false);
                return;
            }
            const typingData = snapshot.val();
            let isOtherTyping = false;
            for (const uid in typingData) {
                if (uid !== currentUid) {
                    isOtherTyping = true;
                    break;
                }
            }
            onTypingUpdate(isOtherTyping);
        });
    },

    /**
     * Send text message to the active channel.
     */
    async sendMessage(chatId, senderUid, senderName, messageText, replyTo = null) {
        if (!chatId || !messageText.trim()) return;
        const messagesRef = ref(db, `chats/${chatId}/messages`);
        const newMsgRef = push(messagesRef);

        const payload = {
            id: newMsgRef.key,
            senderUid: senderUid,
            senderName: senderName,
            message: messageText.trim(),
            timestamp: serverTimestamp(),
            status: 'sent'
        };

        if (replyTo) {
            payload.replyTo = {
                id: replyTo.id,
                message: replyTo.message || '[Media]',
                senderName: replyTo.senderName
            };
        }

        return set(newMsgRef, payload);
    },

    /**
     * Send media/document attachment message (Image, PDF, Document) to active channel.
     */
    async sendFileAttachment(chatId, senderUid, senderName, fileData) {
        if (!chatId || !fileData) return;
        const messagesRef = ref(db, `chats/${chatId}/messages`);
        const newMsgRef = push(messagesRef);

        const isImage = fileData.isImage;
        const payload = {
            id: newMsgRef.key,
            senderUid: senderUid,
            senderName: senderName,
            message: isImage ? '[Image]' : fileData.fileName,
            mediaType: isImage ? 'image' : 'document',
            mediaUrl: fileData.url,
            fileName: fileData.fileName,
            fileSize: fileData.fileSize,
            fileType: fileData.fileType,
            timestamp: serverTimestamp(),
            status: 'sent'
        };

        return set(newMsgRef, payload);
    },

    async sendMediaMessage(chatId, senderUid, senderName, mediaUrl) {
        return this.sendFileAttachment(chatId, senderUid, senderName, {
            isImage: true,
            url: mediaUrl,
            fileName: 'image.jpg',
            fileSize: 0,
            fileType: 'image/jpeg'
        });
    },

    /**
     * Add/toggle emoji reaction on a message.
     */
    async toggleReaction(chatId, messageId, uid, emoji) {
        if (!chatId || !messageId || !uid) return;
        const reactionRef = ref(db, `chats/${chatId}/messages/${messageId}/reactions/${uid}`);
        const snap = await get(reactionRef);
        if (snap.exists() && snap.val() === emoji) {
            return remove(reactionRef);
        } else {
            return set(reactionRef, emoji);
        }
    },

    /**
     * Delete an individual message from channel.
     */
    async deleteMessage(chatId, messageId) {
        if (!chatId || !messageId) return;
        return remove(ref(db, `chats/${chatId}/messages/${messageId}`));
    },

    /**
     * Delete full chat history for a channel.
     */
    async deleteChatHistory(chatId) {
        if (!chatId) return;
        return remove(ref(db, `chats/${chatId}`));
    },

    /**
     * Clean up all active listeners.
     */
    clearAllListeners() {
        for (const key in this.activeListeners) {
            if (this.activeListeners[key]) {
                off(this.activeListeners[key]);
                this.activeListeners[key] = null;
            }
        }
    }
};
