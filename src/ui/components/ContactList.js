import { formatShortTime } from '../../utils/dateFormatter.js';
import { sanitizeText, getAvatarUrl, DEFAULT_AVATAR } from '../../utils/sanitizer.js';
import { getIconHtml } from '../icons.js';

export class ContactList {
    constructor({ containerEl, profileEl, onSelectContact, onLogout, onOpenAbout }) {
        this.containerEl = containerEl;
        this.profileEl = profileEl;
        this.onSelectContact = onSelectContact;
        this.onLogout = onLogout;
        this.onOpenAbout = onOpenAbout;
        this.contacts = [];
        this.filterQuery = '';
        this.tabFilter = 'all';
        this.activeUid = null;
    }

    setProfile(userProfile) {
        if (!this.profileEl || !userProfile) return;
        const avatarSrc = getAvatarUrl(userProfile.avatarUrl, userProfile.name);

        this.profileEl.innerHTML = `
            <div class="user-avatar-wrap">
                <img src="${avatarSrc}" alt="" class="avatar-img">
                <span class="status-indicator online"></span>
            </div>
            <div class="user-meta">
                <div class="name">${sanitizeText(userProfile.name)}</div>
                <div class="user-status-text">${userProfile.isGuest ? 'Guest session' : 'Active now'}</div>
            </div>
            <div class="user-profile-actions">
                <button id="about-button" class="icon-nav-btn" type="button" aria-label="About Whispr" title="About & Legal">
                    ${getIconHtml('file-text', 16)}
                </button>
                <button id="logout-button" class="logout-button" type="button" aria-label="Logout" title="Sign out">
                    ${getIconHtml('logout', 16)}
                </button>
            </div>
        `;

        const userImg = this.profileEl.querySelector('.avatar-img');
        if (userImg) {
            userImg.addEventListener('error', () => { userImg.src = DEFAULT_AVATAR; }, { once: true });
        }

        const aboutBtn = this.profileEl.querySelector('#about-button');
        if (aboutBtn && this.onOpenAbout) {
            aboutBtn.addEventListener('click', () => this.onOpenAbout());
        }

        const logoutBtn = this.profileEl.querySelector('#logout-button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.onLogout());
        }
    }

    setContacts(contactsList) {
        this.contacts = contactsList;
        this.render();
    }

    setFilter(query) {
        this.filterQuery = (query || '').toLowerCase().trim();
        this.render();
    }

    setTabFilter(tab) {
        this.tabFilter = tab || 'all';
        this.render();
    }

    setActiveContact(uid) {
        this.activeUid = uid;
        this.render();
    }

    render() {
        if (!this.containerEl) return;
        this.containerEl.innerHTML = '';

        const filtered = this.contacts.filter(c => {
            const matchesName = c.name.toLowerCase().includes(this.filterQuery);
            if (!matchesName) return false;
            if (this.tabFilter === 'unread') return (c.unreadCount || 0) > 0;
            if (this.tabFilter === 'online') return c.status === 'Online';
            return true;
        });

        if (filtered.length === 0 && this.contacts.length === 0) {
            // Show skeleton loaders while loading
            for (let i = 0; i < 5; i++) {
                const skeleton = document.createElement('div');
                skeleton.className = 'contact-skeleton';
                skeleton.setAttribute('aria-hidden', 'true');
                skeleton.innerHTML = `
                    <div class="skeleton-avatar"></div>
                    <div class="skeleton-text">
                        <div class="skeleton-line w-${i % 2 === 0 ? '80' : '60'}"></div>
                        <div class="skeleton-line w-${i % 2 === 0 ? '60' : '40'}"></div>
                    </div>
                `;
                this.containerEl.appendChild(skeleton);
            }
            return;
        }

        if (filtered.length === 0) {
            const emptyEl = document.createElement('div');
            emptyEl.className = 'contacts-empty';
            emptyEl.textContent = this.filterQuery ? 'No matching conversations' : 'No contacts yet';
            this.containerEl.appendChild(emptyEl);
            return;
        }

        filtered.forEach(contact => {
            const isActive = contact.uid === this.activeUid;
            const isOnline = contact.status === 'Online';
            const contactItem = document.createElement('div');
            contactItem.className = `contact-card${isActive ? ' active' : ''}`;
            contactItem.setAttribute('role', 'listitem');
            contactItem.setAttribute('tabindex', '0');
            contactItem.setAttribute('aria-label', `Chat with ${contact.name}${isOnline ? ', online' : ''}`);

            const timeFormatted = contact.lastMessageTime ? formatShortTime(contact.lastMessageTime) : '';
            const avatarSrc = getAvatarUrl(contact.avatarUrl, contact.name);

            contactItem.innerHTML = `
                <div class="contact-avatar-wrap${isOnline ? ' online' : ''}">
                    <img src="${avatarSrc}" alt="" class="avatar-img">
                    <span class="status-indicator ${isOnline ? 'online' : 'offline'}"></span>
                </div>
                <div class="contact-info">
                    <div class="contact-top">
                        <span class="contact-name">${sanitizeText(contact.name)}</span>
                        ${timeFormatted ? `<span class="contact-time">${timeFormatted}</span>` : ''}
                    </div>
                    <div class="contact-bottom">
                        <span class="contact-snippet">${sanitizeText(contact.lastMessage || (isOnline ? 'Online now' : 'Offline'))}</span>
                        ${contact.unreadCount > 0 ? `<span class="unread-badge">${contact.unreadCount}</span>` : ''}
                    </div>
                </div>
            `;

            const img = contactItem.querySelector('.avatar-img');
            if (img) {
                img.addEventListener('error', () => { img.src = DEFAULT_AVATAR; }, { once: true });
            }

            const triggerSelect = () => {
                this.setActiveContact(contact.uid);
                this.onSelectContact(contact);
            };

            contactItem.addEventListener('click', triggerSelect);
            contactItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    triggerSelect();
                }
            });

            this.containerEl.appendChild(contactItem);
        });
    }
}
