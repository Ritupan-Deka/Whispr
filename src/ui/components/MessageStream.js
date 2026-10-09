import { formatTimestamp } from '../../utils/dateFormatter.js';
import { sanitizeText, isValidUrl } from '../../utils/sanitizer.js';
import { getIconHtml } from '../icons.js';

export class MessageStream {
    constructor({ outputEl, currentUid, onReply, onDeleteMessage, onToggleReaction, onImageClick }) {
        this.outputEl = outputEl;
        this.currentUid = currentUid;
        this.onReply = onReply;
        this.onDeleteMessage = onDeleteMessage;
        this.onToggleReaction = onToggleReaction;
        this.onImageClick = onImageClick;
        this.messages = [];
    }

    setCurrentUid(uid) {
        this.currentUid = uid;
    }

    setMessages(messagesList) {
        this.messages = messagesList;
        this.render();
    }

    render() {
        if (!this.outputEl) return;
        this.outputEl.innerHTML = '';

        if (this.messages.length === 0) {
            this.renderEmptyState();
            return;
        }

        let currentDateStr = '';

        this.messages.forEach((msg, index) => {
            const dateObj = new Date(msg.timestamp || Date.now());
            const dateStr = dateObj.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });

            if (dateStr !== currentDateStr) {
                currentDateStr = dateStr;
                const dateDivider = document.createElement('div');
                dateDivider.className = 'date-divider';
                dateDivider.innerHTML = `<span>${dateStr}</span>`;
                this.outputEl.appendChild(dateDivider);
            }

            const isSent = msg.senderUid === this.currentUid;

            // Determine bubble grouping position
            const prevMsg = this.messages[index - 1];
            const nextMsg = this.messages[index + 1];
            const sameSenderAsPrev = prevMsg && prevMsg.senderUid === msg.senderUid;
            const sameSenderAsNext = nextMsg && nextMsg.senderUid === msg.senderUid;

            // Position in group: first, middle, last, or solo
            let bubblePos = 'solo';
            if (sameSenderAsPrev && sameSenderAsNext) bubblePos = 'middle';
            else if (sameSenderAsPrev) bubblePos = 'last';
            else if (sameSenderAsNext) bubblePos = 'first';

            const msgCard = document.createElement('div');
            // group-start adds top margin for new sender
            msgCard.className = `message-group ${isSent ? 'sent' : 'received'}${!sameSenderAsPrev ? ' group-start' : ''}`;
            msgCard.setAttribute('data-msg-id', msg.id);

            let innerHtml = '';

            // Quoted Reply Header
            if (msg.replyTo) {
                innerHtml += `
                    <div class="reply-quote-preview">
                        <span class="reply-sender">${sanitizeText(msg.replyTo.senderName || 'User')}</span>
                        <span class="reply-text">${sanitizeText(msg.replyTo.message)}</span>
                    </div>
                `;
            }

            // Attachment: Image
            if (msg.mediaType === 'image' && isValidUrl(msg.mediaUrl)) {
                innerHtml += `
                    <div class="media-bubble">
                        <img src="${msg.mediaUrl}" alt="Shared image" class="chat-image-attachment" loading="lazy">
                    </div>
                `;
            // Attachment: Document
            } else if (msg.mediaType === 'document' && isValidUrl(msg.mediaUrl)) {
                const sizeText = msg.fileSize
                    ? (msg.fileSize > 1024 * 1024
                        ? `${(msg.fileSize / (1024 * 1024)).toFixed(1)} MB`
                        : `${(msg.fileSize / 1024).toFixed(0)} KB`)
                    : '';
                innerHtml += `
                    <div class="document-card">
                        <div class="doc-icon">${getIconHtml('file-text', 20)}</div>
                        <div class="doc-info">
                            <span class="doc-title">${sanitizeText(msg.fileName || msg.message || 'Document')}</span>
                            ${sizeText ? `<span class="doc-size">${sizeText}</span>` : ''}
                        </div>
                        <a href="${msg.mediaUrl}" target="_blank" rel="noopener noreferrer" class="doc-download-btn" title="Download" download="${sanitizeText(msg.fileName || 'Document')}">
                            ${getIconHtml('download', 16)}
                        </a>
                    </div>
                `;
            // Text message
            } else {
                innerHtml += `<div class="message-text">${sanitizeText(msg.message || '')}</div>`;
            }

            // Reactions
            let reactionsHtml = '';
            if (msg.reactions) {
                const reactionCounts = {};
                for (const u in msg.reactions) {
                    const emo = msg.reactions[u];
                    reactionCounts[emo] = (reactionCounts[emo] || 0) + 1;
                }
                const pills = Object.entries(reactionCounts).map(([iconType, count]) => `
                    <span class="reaction-pill" data-emoji="${iconType}" role="button" title="React">
                        ${getIconHtml(iconType, 12)} ${count > 1 ? count : ''}
                    </span>
                `).join('');
                if (pills) {
                    reactionsHtml = `<div class="reactions-bar">${pills}</div>`;
                }
            }

            // Status ticks (sent/read)
            let statusIconHtml = '';
            if (isSent) {
                const isRead = msg.status === 'read';
                statusIconHtml = `
                    <span class="status-check ${isRead ? 'read' : 'sent'}" title="${isRead ? 'Read' : 'Sent'}">
                        ${isRead ? getIconHtml('check-check', 12) : getIconHtml('check', 12)}
                    </span>
                `;
            }

            // Bubble class variation for grouping
            const bubbleExtraClass = (bubblePos === 'first' || bubblePos === 'middle') ? ' is-' + bubblePos : '';

            msgCard.innerHTML = `
                <div class="bubble ${isSent ? 'sent' : 'received'}${bubbleExtraClass}">
                    ${innerHtml}
                    ${reactionsHtml}
                    <div class="message-meta">
                        <span class="time">${formatTimestamp(msg.timestamp)}</span>
                        ${statusIconHtml}
                    </div>
                </div>
                <div class="message-hover-actions" role="toolbar" aria-label="Message actions">
                    <button class="action-btn react-btn" title="React" type="button">${getIconHtml('smile', 14)}</button>
                    <button class="action-btn reply-btn" title="Reply" type="button">${getIconHtml('reply', 14)}</button>
                    <button class="action-btn copy-btn" title="Copy text" type="button">${getIconHtml('copy', 14)}</button>
                    ${isSent ? `<button class="action-btn delete-btn" title="Delete" type="button">${getIconHtml('trash', 14)}</button>` : ''}
                </div>
                <div class="emoji-picker-popover" style="display: none;" role="dialog" aria-label="Choose reaction">
                    <button type="button" class="reaction-opt" data-emoji="thumbs-up" title="Like">${getIconHtml('thumbs-up', 16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="heart" title="Love">${getIconHtml('heart', 16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="smile" title="Smile">${getIconHtml('smile', 16)}</button>
                    <button type="button" class="reaction-opt" data-emoji="flame" title="Fire">${getIconHtml('flame', 16)}</button>
                </div>
            `;

            this.bindMessageEvents(msgCard, msg);
            this.outputEl.appendChild(msgCard);
        });

        this.scrollToBottom();
    }

    bindMessageEvents(cardEl, msg) {
        // Image → lightbox
        const img = cardEl.querySelector('.chat-image-attachment');
        if (img) {
            img.addEventListener('click', () => this.onImageClick(msg.mediaUrl));
        }

        // Reaction popover
        const reactBtn = cardEl.querySelector('.react-btn');
        const popover = cardEl.querySelector('.emoji-picker-popover');
        if (reactBtn && popover) {
            reactBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = popover.style.display === 'flex';
                popover.style.display = isOpen ? 'none' : 'flex';
            });
            cardEl.querySelectorAll('.reaction-opt').forEach(opt => {
                opt.addEventListener('click', () => {
                    const emo = opt.getAttribute('data-emoji');
                    this.onToggleReaction(msg.id, emo);
                    popover.style.display = 'none';
                });
            });
            document.addEventListener('click', (e) => {
                if (!cardEl.contains(e.target)) {
                    popover.style.display = 'none';
                }
            }, { passive: true });
        }

        // Reaction pill clicks
        cardEl.querySelectorAll('.reaction-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                const emo = pill.getAttribute('data-emoji');
                this.onToggleReaction(msg.id, emo);
            });
        });

        // Reply
        const replyBtn = cardEl.querySelector('.reply-btn');
        if (replyBtn) {
            replyBtn.addEventListener('click', () => this.onReply(msg));
        }

        // Copy
        const copyBtn = cardEl.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                if (msg.message) {
                    navigator.clipboard.writeText(msg.message).catch(() => {});
                }
            });
        }

        // Delete
        const deleteBtn = cardEl.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => this.onDeleteMessage(msg.id));
        }
    }

    renderEmptyState() {
        this.outputEl.innerHTML = `
            <div class="welcome-placeholder" aria-label="No messages yet">
                <div class="welcome-content">
                    <div class="welcome-left">
                        <div class="welcome-logo-wrap">
                            ${getIconHtml('message-square', 34)}
                        </div>
                        <h2>Start a conversation</h2>
                        <p>Select a contact and say hello. Messages are synced in real-time across all your devices.</p>
                    </div>
                    <div class="welcome-right">
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${getIconHtml('zap', 16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Real-time sync</strong>
                                <span>Messages delivered instantly via WebSockets</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${getIconHtml('image', 16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Media sharing</strong>
                                <span>Photos and documents up to 25 MB</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${getIconHtml('shield', 16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Secure by default</strong>
                                <span>Authenticated sessions with Firebase</span>
                            </div>
                        </div>
                        <div class="welcome-feature">
                            <div class="welcome-feature-icon">${getIconHtml('smile', 16)}</div>
                            <div class="welcome-feature-text">
                                <strong>Reactions & replies</strong>
                                <span>Express yourself with emoji reactions</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    scrollToBottom() {
        if (!this.outputEl) return;
        const parent = this.outputEl.parentElement;
        if (parent) {
            parent.scrollTop = parent.scrollHeight;
        }
    }
}
