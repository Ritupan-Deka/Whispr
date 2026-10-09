import { AuthService } from './services/authService.js';
import { ChatService } from './services/chatService.js';
import { StorageService } from './services/storageService.js';

import { AuthModal } from './ui/components/AuthModal.js';
import { AboutModal } from './ui/components/AboutModal.js';
import { ContactList } from './ui/components/ContactList.js';
import { ChatHeader } from './ui/components/ChatHeader.js';
import { MessageStream } from './ui/components/MessageStream.js';
import { InputArea } from './ui/components/InputArea.js';
import { ImageLightbox } from './ui/components/ImageLightbox.js';
import { NotificationToast } from './ui/components/NotificationToast.js';

class WhisprApp {
    constructor() {
        this.currentUser = null;
        this.userProfile = null;
        this.activeContact = null;
        this.activeChatId = null;

        this.toast = new NotificationToast();
        this.lightbox = new ImageLightbox();
        this.isInitialAuthResolved = false;

        this.init();
    }

    async init() {
        this.cacheDOM();
        this.initComponents();
        this.bindGlobalEvents();

        // Listen for Firebase auth state — fires once Firebase resolves the persisted session
        AuthService.onAuthStateChanged((user, profile) => {
            if (user && profile) {
                this.currentUser = user;
                this.userProfile = profile;
            } else {
                this.currentUser = null;
                this.userProfile = null;
            }

            // Only act on the FIRST auth resolution (page load / refresh)
            if (!this.isInitialAuthResolved) {
                this.isInitialAuthResolved = true;
                // Fade out the loader, then show the correct screen after animation completes
                this.hideAppLoader(() => {
                    if (this.currentUser && this.userProfile) {
                        this.onUserLoggedIn();
                    } else {
                        this.onUserLoggedOut();
                    }
                });
            } else {
                // Subsequent auth state changes (login/logout while app is running)
                if (this.currentUser && this.userProfile) {
                    this.onUserLoggedIn();
                } else {
                    this.onUserLoggedOut();
                }
            }
        });

        // Safety fallback — only fires if Firebase never calls back (e.g. offline/error)
        setTimeout(() => {
            if (!this.isInitialAuthResolved) {
                this.isInitialAuthResolved = true;
                this.hideAppLoader(() => this.onUserLoggedOut());
            }
        }, 8000);
    }

    cacheDOM() {
        this.dom = {
            appLoader: document.getElementById('app-loader'),
            appContainer: document.getElementById('app-container'),
            contactsSection: document.querySelector('.contacts-section'),
            chatSection: document.querySelector('.chat-section'),
            userProfileNav: document.getElementById('user-profile'),
            searchBar: document.getElementById('search-bar'),
            newChatBtn: document.getElementById('new-chat-btn'),
            contactsContainer: document.getElementById('contacts'),
            chatHeaderContainer: document.getElementById('chat-header'),
            chatOutputContainer: document.getElementById('output'),
            inputAreaContainer: document.getElementById('input-area'),
            confirmDialogModal: document.getElementById('custom-alert'),
            confirmDialogBtn: document.getElementById('confirm-delete-chat'),
            cancelDialogBtn: document.getElementById('cancel-delete-chat')
        };
    }

    initComponents() {
        this.aboutModal = new AboutModal();

        // Auth Modal Component — do NOT show eagerly; wait for Firebase to confirm session
        this.authModal = new AuthModal({
            onGuest: (name) => AuthService.loginAsGuest(name),
            onGoogleLogin: () => AuthService.loginWithGoogle(),
            onOpenAbout: (tab) => this.aboutModal.show(tab)
        });
        // authModal.show() is called only inside onUserLoggedOut(), never here

        // Contact List Component
        this.contactList = new ContactList({
            containerEl: this.dom.contactsContainer,
            profileEl: this.dom.userProfileNav,
            onSelectContact: (contact) => this.selectContact(contact),
            onLogout: () => this.handleLogout(),
            onOpenAbout: () => this.aboutModal.show()
        });

        // Chat Header Component
        this.chatHeader = new ChatHeader({
            headerEl: this.dom.chatHeaderContainer,
            onBack: () => this.toggleMobileDrawer(true),
            onDeleteHistory: () => this.showDeleteChatConfirmation()
        });

        // Message Stream Component
        this.messageStream = new MessageStream({
            outputEl: this.dom.chatOutputContainer,
            currentUid: null,
            onReply: (msg) => this.inputArea.setReplyMessage(msg),
            onDeleteMessage: (msgId) => this.handleDeleteMessage(msgId),
            onToggleReaction: (msgId, emoji) => this.handleToggleReaction(msgId, emoji),
            onImageClick: (url) => this.lightbox.show(url)
        });

        // Input Area Component
        this.inputArea = new InputArea({
            inputAreaEl: this.dom.inputAreaContainer,
            onSendMessage: (text, replyTo) => this.handleSendMessage(text, replyTo),
            onSendMedia: (file) => this.handleSendMedia(file),
            onTypingChange: (isTyping) => this.handleTypingChange(isTyping)
        });
    }

    bindGlobalEvents() {
        // Search Contacts Handler
        if (this.dom.searchBar) {
            this.dom.searchBar.addEventListener('input', (e) => {
                this.contactList.setFilter(e.target.value);
            });
        }

        // Filter Tabs Handler (All / Unread / Online)
        const filterTabBtns = document.querySelectorAll('.filter-tab');
        filterTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterType = btn.getAttribute('data-filter') || 'all';
                this.contactList.setTabFilter(filterType);
            });
        });

        // Window Resize Handler for Mobile Drawer
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                this.dom.contactsSection.classList.remove('hidden-mobile');
                this.dom.chatSection.classList.remove('hidden-mobile');
            } else if (!this.activeContact) {
                this.dom.contactsSection.classList.remove('hidden-mobile');
                this.dom.chatSection.classList.add('hidden-mobile');
            }
        });

        // Delete Chat Confirmation Dialog buttons
        if (this.dom.confirmDialogBtn) {
            this.dom.confirmDialogBtn.addEventListener('click', () => this.handleConfirmDeleteChat());
        }
        if (this.dom.cancelDialogBtn) {
            this.dom.cancelDialogBtn.addEventListener('click', () => {
                if (this.dom.confirmDialogModal?.close) this.dom.confirmDialogModal.close();
            });
        }

        // New Chat (+) Button Handler
        if (this.dom.newChatBtn) {
            this.dom.newChatBtn.addEventListener('click', () => {
                if (this.dom.searchBar) {
                    this.dom.searchBar.focus();
                    this.dom.searchBar.select();
                }
            });
        }

        // Global Keyboard Shortcuts (⌘K / ⌘N search focus, Esc search reset)
        window.addEventListener('keydown', (e) => {
            const key = e.key.toLowerCase();
            if ((e.metaKey || e.ctrlKey) && (key === 'k' || key === 'n')) {
                e.preventDefault();
                if (this.dom.searchBar) {
                    this.dom.searchBar.focus();
                    this.dom.searchBar.select();
                }
            } else if (e.key === 'Escape') {
                if (document.activeElement === this.dom.searchBar) {
                    this.dom.searchBar.value = '';
                    this.contactList.setFilter('');
                    this.dom.searchBar.blur();
                }
            }
        });
    }

    hideAppLoader(onComplete) {
        if (!this.dom.appLoader) {
            if (onComplete) onComplete();
            return;
        }
        this.dom.appLoader.classList.add('fade-out');
        // Show next screen after the CSS transition finishes (0.35s)
        setTimeout(() => {
            if (this.dom.appLoader) {
                this.dom.appLoader.style.display = 'none';
            }
            if (onComplete) onComplete();
        }, 380);
    }

    onUserLoggedIn() {
        this.authModal.hide();
        this.dom.appContainer.style.display = 'flex';
        this.contactList.setProfile(this.userProfile);
        this.messageStream.setCurrentUid(this.currentUser.uid);

        // Subscribe to real-time contacts
        ChatService.subscribeToContacts(
            this.currentUser.uid,
            (contacts) => this.contactList.setContacts(contacts),
            (err) => this.toast.show('Error updating contacts directory', 'error')
        );

        this.showWelcomeView();
    }

    onUserLoggedOut() {
        ChatService.clearAllListeners();
        this.activeContact = null;
        this.activeChatId = null;
        this.dom.appContainer.style.display = 'none';
        this.authModal.show();
    }

    async handleLogout() {
        try {
            await AuthService.logout();
            this.toast.show('Logged out successfully.', 'info');
        } catch (err) {
            this.toast.show('Logout error: ' + err.message, 'error');
        }
    }

    selectContact(contact) {
        if (!contact || !this.currentUser) return;
        this.activeContact = contact;
        this.activeChatId = ChatService.getChatChannelId(this.currentUser.uid, contact.uid);

        this.chatHeader.setContact(contact);
        this.inputArea.show();
        this.inputArea.clearReply();

        // Subscribe to messages in active channel
        ChatService.subscribeToMessages(this.activeChatId, this.currentUser.uid, (messages) => {
            this.messageStream.setMessages(messages);
        });

        // Subscribe to typing indicator
        ChatService.subscribeToTyping(this.activeChatId, this.currentUser.uid, (isTyping) => {
            this.chatHeader.setTyping(isTyping);
        });

        // Mobile viewport sliding drawer
        if (window.innerWidth < 768) {
            this.toggleMobileDrawer(false);
        }
    }

    toggleMobileDrawer(showSidebar) {
        if (showSidebar) {
            this.dom.contactsSection.classList.remove('hidden-mobile');
            this.dom.chatSection.classList.add('hidden-mobile');
        } else {
            this.dom.contactsSection.classList.add('hidden-mobile');
            this.dom.chatSection.classList.remove('hidden-mobile');
        }
    }

    showWelcomeView() {
        this.activeContact = null;
        this.activeChatId = null;
        this.chatHeader.setContact(null);
        this.inputArea.hide();
        this.messageStream.setMessages([]);
        if (window.innerWidth < 768) {
            this.toggleMobileDrawer(true);
        }
    }

    async handleSendMessage(text, replyTo) {
        if (!this.activeChatId || !this.currentUser) return;
        try {
            await ChatService.sendMessage(
                this.activeChatId,
                this.currentUser.uid,
                this.userProfile.name,
                text,
                replyTo
            );
        } catch (err) {
            this.toast.show('Failed to send message.', 'error');
        }
    }

    async handleSendMedia(file) {
        if (!this.activeChatId || !this.currentUser || !file) return;
        try {
            const isImage = file.type.startsWith('image/');
            this.toast.show(isImage ? 'Compressing and uploading photo...' : 'Uploading document...', 'info');

            const fileData = await StorageService.uploadAttachment(file, this.currentUser.uid);
            await ChatService.sendFileAttachment(
                this.activeChatId,
                this.currentUser.uid,
                this.userProfile.name,
                fileData
            );
            this.toast.show(isImage ? 'Photo sent!' : 'Document sent!', 'success');
        } catch (err) {
            this.toast.show('File upload failed: ' + err.message, 'error');
        }
    }

    handleTypingChange(isTyping) {
        if (this.activeChatId && this.currentUser) {
            ChatService.setTypingStatus(this.activeChatId, this.currentUser.uid, isTyping);
        }
    }

    async handleToggleReaction(messageId, emoji) {
        if (!this.activeChatId || !this.currentUser) return;
        try {
            await ChatService.toggleReaction(this.activeChatId, messageId, this.currentUser.uid, emoji);
        } catch (err) {
            console.error(err);
        }
    }

    async handleDeleteMessage(messageId) {
        if (!this.activeChatId) return;
        try {
            await ChatService.deleteMessage(this.activeChatId, messageId);
            this.toast.show('Message deleted.', 'info');
        } catch (err) {
            this.toast.show('Could not delete message.', 'error');
        }
    }

    showDeleteChatConfirmation() {
        if (this.dom.confirmDialogModal?.showModal) {
            this.dom.confirmDialogModal.showModal();
        } else if (this.dom.confirmDialogModal) {
            this.dom.confirmDialogModal.style.display = 'flex';
        }
    }

    async handleConfirmDeleteChat() {
        if (this.dom.confirmDialogModal?.close) this.dom.confirmDialogModal.close();
        if (!this.activeChatId) return;
        try {
            await ChatService.deleteChatHistory(this.activeChatId);
            this.toast.show('Chat history deleted.', 'info');
            this.showWelcomeView();
        } catch (err) {
            this.toast.show('Failed to delete chat history.', 'error');
        }
    }
}

// Instantiate and start application on DOM load
window.addEventListener('DOMContentLoaded', () => {
    window.whisprApp = new WhisprApp();
});
