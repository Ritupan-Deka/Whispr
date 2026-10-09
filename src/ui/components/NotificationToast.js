import { sanitizeText } from '../../utils/sanitizer.js';
import { getIconHtml } from '../icons.js';

export class NotificationToast {
    constructor() {
        this.container = null;
        this.networkBanner = null;
        this.init();
    }

    init() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }

        this.networkBanner = document.getElementById('network-banner');
        if (!this.networkBanner) {
            this.networkBanner = document.createElement('div');
            this.networkBanner.id = 'network-banner';
            this.networkBanner.className = 'network-banner offline';
            this.networkBanner.style.display = 'none';
            document.body.appendChild(this.networkBanner);
        }

        window.addEventListener('online', () => this.handleNetworkChange(true));
        window.addEventListener('offline', () => this.handleNetworkChange(false));
    }

    handleNetworkChange(isOnline) {
        if (isOnline) {
            this.networkBanner.textContent = 'Connection restored.';
            this.networkBanner.className = 'network-banner online';
            this.networkBanner.style.display = 'block';
            setTimeout(() => {
                this.networkBanner.style.display = 'none';
            }, 3000);
        } else {
            this.networkBanner.textContent = 'You are currently offline. Attempting to reconnect...';
            this.networkBanner.className = 'network-banner offline';
            this.networkBanner.style.display = 'block';
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toast = document.createElement('div');
        toast.className = `toast-item toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">${sanitizeText(message)}</div>
            <button class="toast-close" aria-label="Dismiss toast">${getIconHtml('x', 14)}</button>
        `;

        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });

        this.container.appendChild(toast);

        setTimeout(() => {
            if (toast.parentElement) {
                toast.classList.add('fade-out');
                setTimeout(() => toast.remove(), 300);
            }
        }, duration);
    }
}
