import { formatLastSeen } from '../../utils/dateFormatter.js';
import { sanitizeText, getAvatarUrl, DEFAULT_AVATAR } from '../../utils/sanitizer.js';
import { getIconHtml } from '../icons.js';

export class ChatHeader {
    constructor({ headerEl, onBack, onDeleteHistory }) {
        this.headerEl = headerEl;
        this.onBack = onBack;
        this.onDeleteHistory = onDeleteHistory;
        this.contact = null;
        this.isTyping = false;
    }

    setContact(contact) {
        this.contact = contact;
        this.render();
    }

    setTyping(isTyping) {
        this.isTyping = isTyping;
        this.renderStatus();
    }

    render() {
        if (!this.headerEl) return;
        if (!this.contact) {
            this.headerEl.style.display = 'none';
            return;
        }

        this.headerEl.style.display = 'flex';
        const isOnline = this.contact.status === 'Online';
        const avatarSrc = getAvatarUrl(this.contact.avatarUrl, this.contact.name);

        this.headerEl.innerHTML = `
            <div class="header-left">
                <button class="back-button" type="button" aria-label="Back to contacts" title="Back">
                    ${getIconHtml('arrow-left', 18)}
                </button>
                <div class="header-contact-avatar">
                    <img src="${avatarSrc}" alt="" class="avatar-img">
                    <span class="status-indicator ${isOnline ? 'online' : 'offline'}"></span>
                </div>
                <div class="header-contact-meta">
                    <div class="header-contact-name">${sanitizeText(this.contact.name)}</div>
                    <div class="header-contact-status ${isOnline ? 'online' : ''}" id="header-status-text">
                    </div>
                </div>
            </div>
            <div class="header-actions">
                <button class="icon-nav-btn" type="button" aria-label="Voice call" title="Voice call (coming soon)" disabled style="opacity:0.4;cursor:default;">
                    ${getIconHtml('phone', 16)}
                </button>
                <button class="icon-nav-btn" type="button" aria-label="Video call" title="Video call (coming soon)" disabled style="opacity:0.4;cursor:default;">
                    ${getIconHtml('video', 16)}
                </button>
                <button class="icon-nav-btn delete-chat-btn" type="button" aria-label="Delete chat history" title="Delete History">
                    ${getIconHtml('trash', 16)}
                </button>
            </div>
        `;

        const img = this.headerEl.querySelector('.avatar-img');
        if (img) {
            img.addEventListener('error', () => { img.src = DEFAULT_AVATAR; }, { once: true });
        }

        const backBtn = this.headerEl.querySelector('.back-button');
        if (backBtn) backBtn.addEventListener('click', () => this.onBack());

        const deleteBtn = this.headerEl.querySelector('.delete-chat-btn');
        if (deleteBtn) deleteBtn.addEventListener('click', () => this.onDeleteHistory());

        this.renderStatus();
    }

    renderStatus() {
        const statusEl = this.headerEl.querySelector('#header-status-text');
        if (!statusEl || !this.contact) return;

        if (this.isTyping) {
            statusEl.className = 'header-contact-status typing';
            statusEl.innerHTML = `
                <div class="typing-indicator" aria-label="Typing">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
                <span class="typing-label">typing</span>
            `;
        } else {
            const isOnline = this.contact.status === 'Online';
            statusEl.className = `header-contact-status${isOnline ? ' online' : ''}`;

            if (isOnline) {
                statusEl.innerHTML = `<span class="status-pulse-dot"></span> Online`;
            } else {
                statusEl.textContent = formatLastSeen(this.contact.lastSeen);
            }
        }
    }
}
