// ============================================================================
// 1. Configuration & Firebase Initialization
// ============================================================================
const CONFIG = {
    FIREBASE: {
        apiKey: "AIzaSyApwujErcMv2TN0SDOBPf0DeZM3uVwEZDI",
        authDomain: "messenger-fbbf9.firebaseapp.com",
        projectId: "messenger-fbbf9",
        databaseURL: "https://messenger-fbbf9-default-rtdb.asia-southeast1.firebasedatabase.app",
        storageBucket: "messenger-fbbf9.firebasestorage.app",
        messagingSenderId: "964023347209",
        appId: "1:964023347209:web:d50f81c15d1dd2a981b0d8",
        measurementId: "G-VSR1VWE445"
    },
    MAX_IMAGE_SIZE_BYTES: 2 * 1024 * 1024, // 2MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
};

if (!firebase.apps.length) {
    firebase.initializeApp(CONFIG.FIREBASE);
}
const db = firebase.database();
const auth = firebase.auth();

// ============================================================================
// 2. Application State Management
// ============================================================================
const State = {
    currentUsername: null,
    currentChat: null,
    currentChatId: null,
    listeners: {
        usersRef: null,
        usersRefHandle: null,
        activeMessageRef: null,
        activeMessageRefHandle: null,
        activeChatStatusRef: null,
        activeChatStatusRefHandle: null,
        isConnectedListenerAttached: false
    },

    setChat(contactName) {
        this.currentChat = contactName;
        if (this.currentUsername && contactName) {
            this.currentChatId = FirebaseService.getChatChannelId(this.currentUsername, contactName);
        } else {
            this.currentChatId = null;
        }
    },

    clearChatState() {
        this.currentChat = null;
        this.currentChatId = null;
        if (this.listeners.activeMessageRef && this.listeners.activeMessageRefHandle) {
            this.listeners.activeMessageRef.off('child_added', this.listeners.activeMessageRefHandle);
            this.listeners.activeMessageRefHandle = null;
            this.listeners.activeMessageRef = null;
        }
        if (this.listeners.activeChatStatusRef && this.listeners.activeChatStatusRefHandle) {
            this.listeners.activeChatStatusRef.off('value', this.listeners.activeChatStatusRefHandle);
            this.listeners.activeChatStatusRefHandle = null;
            this.listeners.activeChatStatusRef = null;
        }
    },

    clearAllListeners() {
        this.clearChatState();
        if (this.listeners.usersRef && this.listeners.usersRefHandle) {
            this.listeners.usersRef.off('value', this.listeners.usersRefHandle);
            this.listeners.usersRefHandle = null;
        }
    }
};

// ============================================================================
// 3. Firebase Database & Authentication Service
// ============================================================================
const FirebaseService = {
    /**
     * Compute a deterministic private channel ID for any two users.
     */
    getChatChannelId(userA, userB) {
        return [userA, userB].sort().join('_');
    },

    /**
     * Authenticate user session and bind real-time presence with onDisconnect() hooks.
     */
    authenticateAndSetPresence(username) {
        return auth.signInAnonymously().then((userCredential) => {
            const userRef = db.ref('users/' + username);
            
            // Set up native Firebase presence tracking
            if (!State.listeners.isConnectedListenerAttached) {
                db.ref('.info/connected').on('value', (snap) => {
                    if (snap.val() === true) {
                        // When connection drops or tab closes, automatically set user Offline
                        userRef.onDisconnect().update({
                            status: 'Offline',
                            lastSeen: firebase.database.ServerValue.TIMESTAMP
                        });

                        // Set online state while connected
                        userRef.update({
                            name: username,
                            status: 'Online',
                            lastSeen: firebase.database.ServerValue.TIMESTAMP
                        });
                    }
                });
                State.listeners.isConnectedListenerAttached = true;
            } else {
                userRef.update({
                    name: username,
                    status: 'Online',
                    lastSeen: firebase.database.ServerValue.TIMESTAMP
                });
            }

            return userCredential.user;
        });
    },

    updateUserStatus(username, status) {
        if (!username) return Promise.resolve();
        return db.ref('users/' + username).update({
            status: status,
            lastSeen: firebase.database.ServerValue.TIMESTAMP
        });
    },

    subscribeToContacts(onContactsUpdate, onError) {
        const usersRef = db.ref('users');
        if (State.listeners.usersRefHandle && State.listeners.usersRef) {
            State.listeners.usersRef.off('value', State.listeners.usersRefHandle);
        }
        State.listeners.usersRef = usersRef;
        State.listeners.usersRefHandle = usersRef.on('value', onContactsUpdate, onError);
    },

    subscribeToContactStatus(contactName, onStatusUpdate) {
        const ref = db.ref('users/' + contactName);
        State.listeners.activeChatStatusRef = ref;
        State.listeners.activeChatStatusRefHandle = ref.on('value', (snapshot) => {
            const userData = snapshot.val();
            if (userData && State.currentChat === contactName) {
                onStatusUpdate(userData.name, userData.status);
            }
        });
    },

    /**
     * Listen strictly to the active private chat channel (`chats/{chatId}/messages`).
     * Prevents global message eavesdropping and unnecessary bandwidth consumption.
     */
    subscribeToMessages(chatId, onNewMessage) {
        if (!chatId) return;
        const messagesRef = db.ref('chats/' + chatId + '/messages');
        State.listeners.activeMessageRef = messagesRef;
        State.listeners.activeMessageRefHandle = messagesRef.on('child_added', (snapshot) => {
            const message = snapshot.val();
            if (message) onNewMessage(message);
        });
    },

    sendMessage(chatId, messageText) {
        if (!chatId) return Promise.reject(new Error("No active chat session."));
        return db.ref('chats/' + chatId + '/messages').push().set({
            username: State.currentUsername,
            message: messageText,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            status: 'sent',
            to: State.currentChat
        });
    },

    sendMediaMessage(chatId, mediaUrl) {
        if (!chatId) return Promise.reject(new Error("No active chat session."));
        return db.ref('chats/' + chatId + '/messages').push().set({
            username: State.currentUsername,
            message: '[Image]',
            mediaType: 'image',
            mediaUrl: mediaUrl,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            status: 'sent',
            to: State.currentChat
        });
    },

    deleteChatHistory(chatId) {
        if (!chatId) return Promise.reject(new Error("No active chat session."));
        return db.ref('chats/' + chatId + '/messages').remove();
    },

    cleanupInvalidUsers() {
        db.ref('users').once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                if (!user || !user.name || user.name === 'undefined') {
                    childSnapshot.ref.remove();
                }
            });
        });
    },

    isValidMediaUrl(url) {
        if (!url || typeof url !== 'string') return false;
        const lower = url.trim().toLowerCase();
        return lower.startsWith('data:image/') || lower.startsWith('http://') || lower.startsWith('https://');
    }
};

// ============================================================================
// 4. UI Component & Rendering Layer
// ============================================================================
const UI = {
    elements: {},

    cacheDOM() {
        this.elements = {
            loginContainer: document.getElementById('login-container'),
            appContainer: document.getElementById('app-container'),
            usernameInput: document.getElementById('username'),
            loginButton: document.getElementById('login'),
            userProfileName: document.querySelector('#user-profile .name'),
            logoutButton: document.getElementById('logout-button'),
            searchBar: document.getElementById('search-bar'),
            contactsContainer: document.getElementById('contacts'),
            chatHeader: document.getElementById('chat-header'),
            chatWindow: document.getElementById('chat-window'),
            output: document.getElementById('output'),
            inputArea: document.getElementById('input-area'),
            messageInput: document.getElementById('message'),
            sendButton: document.getElementById('send-button'),
            attachmentButton: document.getElementById('attachment-button'),
            mediaInput: document.getElementById('media'),
            customAlertModal: document.getElementById('custom-alert'),
            confirmDeleteBtn: document.getElementById('confirm-delete-chat'),
            cancelDeleteBtn: document.getElementById('cancel-delete-chat'),
            logoutAlertModal: document.getElementById('logout-alert'),
            confirmLogoutBtn: document.getElementById('confirm-logout'),
            cancelLogoutBtn: document.getElementById('cancel-logout'),
            alertModal: document.getElementById('alert-modal'),
            alertMessage: document.getElementById('alert-message'),
            alertOkButton: document.getElementById('alert-ok-button'),
            contactsSection: document.querySelector('.contacts-section'),
            chatSection: document.querySelector('.chat-section')
        };
    },

    showAppView(username) {
        this.elements.loginContainer.style.display = 'none';
        this.elements.appContainer.style.display = 'flex';
        this.elements.userProfileName.textContent = username;
    },

    showLoginView() {
        this.elements.loginContainer.style.display = 'flex';
        this.elements.appContainer.style.display = 'none';
        this.elements.usernameInput.value = '';
    },

    renderContactItem(user, onSelect) {
        const contactEl = document.createElement('div');
        contactEl.classList.add('contact');
        contactEl.setAttribute('role', 'listitem');
        contactEl.setAttribute('tabindex', '0');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('contact-info');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = user.name;

        const statusDiv = document.createElement('div');
        statusDiv.classList.add('status-indicator');
        if (user.status !== 'Online') {
            statusDiv.classList.add('offline');
        }

        infoDiv.appendChild(nameDiv);
        infoDiv.appendChild(statusDiv);
        contactEl.appendChild(infoDiv);

        contactEl.addEventListener('click', onSelect);
        contactEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect();
            }
        });

        this.elements.contactsContainer.appendChild(contactEl);
    },

    updateChatHeader(contactName, status, onBack, onDelete) {
        this.elements.chatHeader.innerHTML = '';

        const headerLeft = document.createElement('div');
        headerLeft.classList.add('header-left');

        const backBtn = document.createElement('button');
        backBtn.className = 'back-button';
        backBtn.type = 'button';
        backBtn.setAttribute('aria-label', 'Back to contacts');
        backBtn.onclick = onBack;
        backBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`;

        const contactInfo = document.createElement('div');
        contactInfo.classList.add('contact-info');

        const nameSpan = document.createElement('span');
        nameSpan.id = 'contact-name';
        nameSpan.textContent = contactName;

        const statusSpan = document.createElement('span');
        statusSpan.className = `contact-status ${status === 'Online' ? 'online' : 'offline'}`;
        statusSpan.textContent = status || 'Offline';

        contactInfo.appendChild(nameSpan);
        contactInfo.appendChild(statusSpan);

        headerLeft.appendChild(backBtn);
        headerLeft.appendChild(contactInfo);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-button';
        deleteBtn.type = 'button';
        deleteBtn.setAttribute('aria-label', 'Delete conversation history');
        deleteBtn.onclick = onDelete;

        const deleteImg = document.createElement('img');
        deleteImg.src = 'images/deleteW.png';
        deleteImg.alt = '';
        deleteImg.width = 24;
        deleteImg.height = 24;
        deleteBtn.appendChild(deleteImg);

        this.elements.chatHeader.appendChild(headerLeft);
        this.elements.chatHeader.appendChild(deleteBtn);
    },

    showChatInterface() {
        this.elements.inputArea.style.display = 'flex';
        this.elements.chatHeader.style.display = 'flex';
    },

    showWelcomeMessage() {
        this.elements.output.innerHTML = '';

        const welcomeDiv = document.createElement('div');
        welcomeDiv.id = 'welcome-message';

        const h2 = document.createElement('h2');
        h2.textContent = 'Welcome to Whispr';
        const p = document.createElement('p');
        p.textContent = 'Select a contact to start chatting.';

        welcomeDiv.appendChild(h2);
        welcomeDiv.appendChild(p);
        this.elements.output.appendChild(welcomeDiv);

        this.elements.inputArea.style.display = 'none';
        this.elements.chatHeader.style.display = 'none';

        if (window.innerWidth < 768) {
            this.elements.contactsSection.classList.remove('hidden-mobile');
            this.elements.chatSection.classList.add('hidden-mobile');
        }
    },

    renderMessage(message, currentUser) {
        const isSent = message.username === currentUser;
        const messageClass = isSent ? 'sent' : 'received';

        const messageContainer = document.createElement('div');
        messageContainer.classList.add('message-container', messageClass);

        const messageBubble = document.createElement('div');
        messageBubble.classList.add('message', messageClass);

        // Security check: validate media URL scheme before binding src attribute
        if (message.mediaType === 'image' && FirebaseService.isValidMediaUrl(message.mediaUrl)) {
            const img = document.createElement('img');
            img.src = message.mediaUrl;
            img.alt = 'Shared image';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '300px';
            img.style.borderRadius = '8px';
            img.loading = 'lazy';
            messageBubble.appendChild(img);
        } else {
            const textDiv = document.createElement('div');
            textDiv.textContent = message.message || '';
            messageBubble.appendChild(textDiv);
        }

        const tsStatus = document.createElement('div');
        tsStatus.classList.add('timestamp-status');

        const tsSpan = document.createElement('span');
        tsSpan.classList.add('timestamp');
        tsSpan.textContent = UI.formatTimestamp(message.timestamp);
        tsStatus.appendChild(tsSpan);

        if (isSent) {
            const statusSpan = document.createElement('span');
            statusSpan.classList.add('status');
            statusSpan.textContent = message.status || 'sent';
            tsStatus.appendChild(statusSpan);
        }

        messageContainer.appendChild(messageBubble);
        messageContainer.appendChild(tsStatus);

        this.elements.output.appendChild(messageContainer);
        this.scrollToBottom();
    },

    filterContacts(searchTerm) {
        const contacts = this.elements.contactsContainer.querySelectorAll('.contact');
        const term = searchTerm.toLowerCase();

        contacts.forEach(contact => {
            const nameEl = contact.querySelector('.name');
            const name = nameEl ? nameEl.textContent.toLowerCase() : '';
            contact.style.display = name.includes(term) ? 'flex' : 'none';
        });
    },

    formatTimestamp(timestamp) {
        if (!timestamp) return '';
        const date = new Date(timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date.toDateString() === today.toDateString()) {
            return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else if (date.toDateString() === yesterday.toDateString()) {
            return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        } else {
            return date.toLocaleDateString([], {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
            }) + ' ' + date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    },

    scrollToBottom() {
        this.elements.chatWindow.scrollTop = this.elements.chatWindow.scrollHeight;
    },

    toggleMobileContacts() {
        if (this.elements.contactsSection.classList.contains('hidden-mobile')) {
            this.elements.contactsSection.classList.remove('hidden-mobile');
            this.elements.chatSection.classList.add('hidden-mobile');
        } else {
            this.elements.contactsSection.classList.add('hidden-mobile');
            this.elements.chatSection.classList.remove('hidden-mobile');
        }
    },

    handleResize() {
        if (window.innerWidth >= 768) {
            this.elements.contactsSection.classList.remove('hidden-mobile');
            this.elements.chatSection.classList.remove('hidden-mobile');
        } else if (!State.currentChat) {
            this.elements.contactsSection.classList.remove('hidden-mobile');
            this.elements.chatSection.classList.add('hidden-mobile');
        }
    },

    // Dialog Modal Helpers
    showModal(modalEl) {
        if (modalEl.showModal) {
            if (!modalEl.open) modalEl.showModal();
        } else {
            modalEl.style.display = 'flex';
        }
    },

    closeModal(modalEl) {
        if (modalEl.close) {
            if (modalEl.open) modalEl.close();
        } else {
            modalEl.style.display = 'none';
        }
    },

    showAlert(message) {
        this.elements.alertMessage.textContent = message;
        this.showModal(this.elements.alertModal);
    }
};

// ============================================================================
// 5. Application Bootstrap & Event Controller
// ============================================================================
const App = {
    init() {
        UI.cacheDOM();
        this.bindEvents();

        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            State.currentUsername = storedUsername;
            FirebaseService.authenticateAndSetPresence(storedUsername).then(() => {
                UI.showAppView(storedUsername);
                FirebaseService.cleanupInvalidUsers();
                this.loadContactsList();
                UI.showWelcomeMessage();
            }).catch((err) => {
                console.error('Authentication error:', err);
                UI.showLoginView();
            });
        } else {
            UI.showLoginView();
        }
    },

    bindEvents() {
        // Login Handler
        UI.elements.loginButton.addEventListener('click', () => this.handleLogin());
        UI.elements.usernameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleLogin();
            }
        });

        // Search Contacts Handler
        UI.elements.searchBar.addEventListener('input', (e) => {
            UI.filterContacts(e.target.value);
        });

        // Message Input Handlers
        UI.elements.sendButton.addEventListener('click', () => this.handleSendMessage());
        UI.elements.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.handleSendMessage();
            }
        });

        // Attachment Button & Media Handler
        UI.elements.attachmentButton.addEventListener('click', () => {
            UI.elements.mediaInput.click();
        });
        UI.elements.mediaInput.addEventListener('change', () => this.handleSendMedia());

        // Logout Confirmation Handlers
        UI.elements.logoutButton.addEventListener('click', () => UI.showModal(UI.elements.logoutAlertModal));
        UI.elements.confirmLogoutBtn.addEventListener('click', () => this.handleLogout());
        UI.elements.cancelLogoutBtn.addEventListener('click', () => UI.closeModal(UI.elements.logoutAlertModal));

        // Delete Chat Handlers
        UI.elements.confirmDeleteBtn.addEventListener('click', () => this.handleDeleteChatHistory());
        UI.elements.cancelDeleteBtn.addEventListener('click', () => UI.closeModal(UI.elements.customAlertModal));

        // Alert Modal OK Handler
        UI.elements.alertOkButton.addEventListener('click', () => UI.closeModal(UI.elements.alertModal));

        // Lifecycle & State Event Handlers
        window.addEventListener('resize', () => UI.handleResize());
        window.addEventListener('online', () => this.handleAppStateChange());
        window.addEventListener('focus', () => this.handleAppStateChange());
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible') {
                this.handleAppStateChange();
            }
        });
        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                this.handleAppStateChange();
            }
        });
    },

    handleLogin() {
        const username = UI.elements.usernameInput.value.trim();
        if (!username) {
            UI.showAlert('Please enter your name');
            return;
        }

        FirebaseService.authenticateAndSetPresence(username).then(() => {
            State.currentUsername = username;
            localStorage.setItem('username', username);
            UI.showAppView(username);
            this.loadContactsList();
            UI.showWelcomeMessage();
        }).catch((error) => {
            UI.showAlert('Connection error: ' + error.message);
        });
    },

    handleLogout() {
        UI.closeModal(UI.elements.logoutAlertModal);
        if (State.currentUsername) {
            FirebaseService.updateUserStatus(State.currentUsername, 'Offline').catch((err) => console.error(err));
        }

        localStorage.removeItem('username');
        State.currentUsername = null;
        State.clearAllListeners();
        UI.showLoginView();
    },

    loadContactsList() {
        UI.elements.contactsContainer.innerHTML = '';
        FirebaseService.subscribeToContacts((snapshot) => {
            UI.elements.contactsContainer.innerHTML = '';
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                if (user && user.name && user.name !== State.currentUsername && user.name !== 'undefined') {
                    UI.renderContactItem(user, () => this.initializeChatSession(user));
                }
            });
        }, (error) => {
            console.error('Error loading contacts:', error);
            UI.showAlert('Error loading contacts. Please check your connection.');
        });
    },

    initializeChatSession(user) {
        State.clearChatState();
        State.setChat(user.name);

        UI.updateChatHeader(user.name, user.status, () => UI.toggleMobileContacts(), () => UI.showModal(UI.elements.customAlertModal));
        UI.showChatInterface();
        this.loadChatHistory();

        FirebaseService.subscribeToContactStatus(user.name, (name, status) => {
            UI.updateChatHeader(name, status, () => UI.toggleMobileContacts(), () => UI.showModal(UI.elements.customAlertModal));
        });

        if (window.innerWidth < 768) {
            UI.elements.contactsSection.classList.add('hidden-mobile');
            UI.elements.chatSection.classList.remove('hidden-mobile');
        }
    },

    loadChatHistory() {
        UI.elements.output.innerHTML = '';
        if (!State.currentChatId) return;

        FirebaseService.subscribeToMessages(State.currentChatId, (message) => {
            UI.renderMessage(message, State.currentUsername);
        });
    },

    handleSendMessage() {
        if (!State.currentChat || !State.currentChatId) {
            UI.showAlert('Please select a contact to chat with.');
            return;
        }

        const messageText = UI.elements.messageInput.value.trim();
        if (!messageText) return;

        FirebaseService.sendMessage(State.currentChatId, messageText).then(() => {
            UI.elements.messageInput.value = '';
        }).catch((err) => {
            console.error('Send message error:', err);
            UI.showAlert('Failed to send message.');
        });
    },

    handleSendMedia() {
        if (!State.currentChat || !State.currentChatId) {
            UI.showAlert('Please select a contact to chat with.');
            return;
        }

        const file = UI.elements.mediaInput.files[0];
        if (!file) return;

        if (!CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
            UI.showAlert('Only image files (JPEG, PNG, WebP, GIF) are allowed.');
            UI.elements.mediaInput.value = '';
            return;
        }

        if (file.size > CONFIG.MAX_IMAGE_SIZE_BYTES) {
            UI.showAlert('Image size exceeds 2MB limit.');
            UI.elements.mediaInput.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            FirebaseService.sendMediaMessage(State.currentChatId, e.target.result).then(() => {
                UI.elements.mediaInput.value = '';
            }).catch((err) => {
                console.error('Send media error:', err);
                UI.showAlert('Failed to send image.');
            });
        };
        reader.readAsDataURL(file);
    },

    handleDeleteChatHistory() {
        UI.closeModal(UI.elements.customAlertModal);
        if (!State.currentChat || !State.currentChatId) return;

        FirebaseService.deleteChatHistory(State.currentChatId).then(() => {
            UI.showWelcomeMessage();
            UI.showAlert('Chat history deleted.');
        }).catch((err) => {
            console.error('Delete chat error:', err);
            UI.showAlert('Failed to delete chat history.');
        });
    },

    handleAppStateChange() {
        if (State.currentUsername) {
            FirebaseService.updateUserStatus(State.currentUsername, 'Online');
        }
    }
};

// Bootstrap application on DOM load
window.addEventListener('DOMContentLoaded', () => App.init());
