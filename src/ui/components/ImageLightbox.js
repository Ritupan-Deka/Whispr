import { getIconHtml } from '../icons.js';

export class ImageLightbox {
    constructor() {
        this.element = null;
        this.init();
    }

    init() {
        this.element = document.getElementById('image-lightbox');
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.id = 'image-lightbox';
            this.element.className = 'lightbox-overlay';
            this.element.style.display = 'none';
            document.body.appendChild(this.element);
        }

        this.element.addEventListener('click', (e) => {
            if (e.target === this.element || e.target.closest('.lightbox-close')) {
                this.hide();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.element.style.display === 'flex') {
                this.hide();
            }
        });
    }

    show(imageUrl) {
        if (!imageUrl) return;
        this.element.innerHTML = `
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close image viewer">${getIconHtml('x', 24)}</button>
                <img src="${imageUrl}" alt="Full preview" class="lightbox-img">
            </div>
        `;
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
        this.element.innerHTML = '';
    }
}
