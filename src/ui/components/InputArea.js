import { sanitizeText } from '../../utils/sanitizer.js';
import { getIconHtml } from '../icons.js';

export class InputArea {
    constructor({ inputAreaEl, onSendMessage, onSendMedia, onTypingChange }) {
        this.inputAreaEl = inputAreaEl;
        this.onSendMessage = onSendMessage;
        this.onSendMedia = onSendMedia;
        this.onTypingChange = onTypingChange;

        this.replyMessage = null;
        this.selectedFile = null;
        this.typingTimeout = null;

        this.init();
    }

    init() {
        if (!this.inputAreaEl) return;
        this.render();
    }

    setReplyMessage(msg) {
        this.replyMessage = msg;
        this.renderReplyPreview();
    }

    clearReply() {
        this.replyMessage = null;
        this.renderReplyPreview();
    }

    setSelectedFile(file) {
        this.selectedFile = file;
        this.renderFilePreview();
    }

    clearFile() {
        this.selectedFile = null;
        const fileInput = this.inputAreaEl.querySelector('#media-file-input');
        if (fileInput) fileInput.value = '';
        this.renderFilePreview();
    }

    render() {
        this.inputAreaEl.innerHTML = `
            <div id="reply-banner" class="reply-banner" style="display: none;"></div>
            <div id="file-banner" class="file-banner" style="display: none;"></div>
            <div class="composer-row">
                <input type="file" id="media-file-input" style="display: none;" accept="image/*, application/pdf, .pdf, .doc, .docx, .txt, .zip, .csv, .xlsx">
                <button id="attachment-button" type="button" class="composer-icon-btn" aria-label="Attach file or photo" title="Attach file (up to 25 MB)">
                    ${getIconHtml('paperclip', 18)}
                </button>
                <div class="emoji-picker-container" style="position: relative;">
                    <button id="emoji-picker-btn" type="button" class="composer-icon-btn" aria-label="Insert emoji" title="Emoji">
                        ${getIconHtml('smile', 18)}
                    </button>
                    <div id="quick-emoji-popover" class="quick-emoji-popover" style="display: none;" role="dialog" aria-label="Quick emoji">
                        <button type="button" class="emoji-chip" data-emoji="👍" title="Thumbs up">👍</button>
                        <button type="button" class="emoji-chip" data-emoji="❤️" title="Heart">❤️</button>
                        <button type="button" class="emoji-chip" data-emoji="🔥" title="Fire">🔥</button>
                        <button type="button" class="emoji-chip" data-emoji="😊" title="Smile">😊</button>
                        <button type="button" class="emoji-chip" data-emoji="🙌" title="Raise hands">🙌</button>
                        <button type="button" class="emoji-chip" data-emoji="✨" title="Sparkles">✨</button>
                        <button type="button" class="emoji-chip" data-emoji="🎉" title="Party">🎉</button>
                        <button type="button" class="emoji-chip" data-emoji="🚀" title="Rocket">🚀</button>
                    </div>
                </div>
                <textarea
                    id="message-input"
                    class="message-input"
                    placeholder="Write a message…"
                    rows="1"
                    aria-label="Type a message"
                    autocomplete="off"
                    spellcheck="true"
                ></textarea>
                <button id="send-button" type="button" class="send-btn" aria-label="Send message" title="Send (Enter)">
                    ${getIconHtml('send', 16)}
                </button>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const textInput = this.inputAreaEl.querySelector('#message-input');
        const sendBtn   = this.inputAreaEl.querySelector('#send-button');
        const attachBtn = this.inputAreaEl.querySelector('#attachment-button');
        const fileInput = this.inputAreaEl.querySelector('#media-file-input');

        // Auto-resize + typing indicator
        textInput.addEventListener('input', () => {
            textInput.style.height = 'auto';
            textInput.style.height = Math.min(textInput.scrollHeight, 120) + 'px';

            this.onTypingChange(true);
            if (this.typingTimeout) clearTimeout(this.typingTimeout);
            this.typingTimeout = setTimeout(() => this.onTypingChange(false), 2000);
        });

        // Enter to send (Shift+Enter = newline)
        textInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        sendBtn.addEventListener('click', () => this.handleSend());

        // Emoji popover
        const emojiBtn     = this.inputAreaEl.querySelector('#emoji-picker-btn');
        const emojiPopover = this.inputAreaEl.querySelector('#quick-emoji-popover');
        if (emojiBtn && emojiPopover) {
            emojiBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = emojiPopover.style.display === 'flex';
                emojiPopover.style.display = isOpen ? 'none' : 'flex';
            });

            this.inputAreaEl.querySelectorAll('.emoji-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    const char = chip.getAttribute('data-emoji');
                    textInput.value += char;
                    textInput.focus();
                    textInput.style.height = 'auto';
                    textInput.style.height = Math.min(textInput.scrollHeight, 120) + 'px';
                    emojiPopover.style.display = 'none';
                });
            });

            document.addEventListener('click', (e) => {
                if (!emojiPopover.contains(e.target) && e.target !== emojiBtn) {
                    emojiPopover.style.display = 'none';
                }
            }, { passive: true });
        }

        // File attachment
        attachBtn.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) this.setSelectedFile(file);
        });
    }

    renderReplyPreview() {
        const banner = this.inputAreaEl.querySelector('#reply-banner');
        if (!banner) return;
        if (this.replyMessage) {
            banner.style.display = 'flex';
            banner.innerHTML = `
                <div class="banner-content">
                    <span class="banner-label">Replying to ${sanitizeText(this.replyMessage.senderName || 'User')}</span>
                    <span class="banner-text">${sanitizeText(this.replyMessage.message || '[Attachment]')}</span>
                </div>
                <button type="button" class="cancel-banner-btn" aria-label="Cancel reply">${getIconHtml('x', 14)}</button>
            `;
            banner.querySelector('.cancel-banner-btn').addEventListener('click', () => this.clearReply());
        } else {
            banner.style.display = 'none';
        }
    }

    renderFilePreview() {
        const banner = this.inputAreaEl.querySelector('#file-banner');
        if (!banner) return;
        if (this.selectedFile) {
            banner.style.display = 'flex';
            const isImage = this.selectedFile.type.startsWith('image/');
            const sizeStr = this.selectedFile.size > 1024 * 1024
                ? `${(this.selectedFile.size / (1024 * 1024)).toFixed(2)} MB`
                : `${(this.selectedFile.size / 1024).toFixed(1)} KB`;

            banner.innerHTML = `
                <div class="banner-content">
                    <span class="banner-label">${isImage ? 'Photo' : 'Document'} ready to send</span>
                    <span class="banner-text">${sanitizeText(this.selectedFile.name)} · ${sizeStr}</span>
                </div>
                <button type="button" class="cancel-banner-btn" aria-label="Remove attachment">${getIconHtml('x', 14)}</button>
            `;
            banner.querySelector('.cancel-banner-btn').addEventListener('click', () => this.clearFile());
        } else {
            banner.style.display = 'none';
        }
    }

    async handleSend() {
        const textInput = this.inputAreaEl.querySelector('#message-input');
        const text = textInput ? textInput.value.trim() : '';

        if (this.selectedFile) {
            const fileToSend = this.selectedFile;
            this.clearFile();
            await this.onSendMedia(fileToSend);
        }

        if (text) {
            const replyObj = this.replyMessage;
            textInput.value = '';
            textInput.style.height = 'auto';
            this.clearReply();

            if (this.typingTimeout) clearTimeout(this.typingTimeout);
            this.onTypingChange(false);

            await this.onSendMessage(text, replyObj);
        }
    }

    show() {
        this.inputAreaEl.style.display = 'flex';
    }

    hide() {
        this.inputAreaEl.style.display = 'none';
    }
}
