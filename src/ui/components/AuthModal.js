import { getIconHtml } from '../icons.js';

export class AuthModal {
    constructor({ onGuest, onGoogleLogin, onOpenAbout }) {
        this.onGuest = onGuest;
        this.onGoogleLogin = onGoogleLogin;
        this.onOpenAbout = onOpenAbout;
        this.element = null;
        this.init();
    }

    init() {
        this.element = document.getElementById('auth-modal');
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.id = 'auth-modal';
            this.element.className = 'auth-overlay';
            this.element.style.display = 'none';
            document.body.appendChild(this.element);
        } else {
            this.element.style.display = 'none';
        }
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <div class="auth-card" role="dialog" aria-modal="true" aria-labelledby="auth-title">
                <div class="auth-header">
                    <div class="brand-title">
                        <svg class="brand-logo" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        <span id="auth-title">Whispr</span>
                    </div>
                    <p class="brand-subtitle">Real-time messaging, beautifully simple</p>
                </div>

                <div id="auth-error-msg" class="auth-error-msg" style="display: none;" role="alert"></div>

                <div class="sso-container">
                    <button id="btn-google-sso" type="button" class="sso-google-btn">
                        <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z"/>
                            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"/>
                            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"/>
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    <div class="divider"><span>OR</span></div>

                    <form id="email-instant-form" class="auth-form" novalidate>
                        <div class="form-group">
                            <label for="instant-email">Email address</label>
                            <input
                                id="instant-email"
                                type="email"
                                placeholder="name@example.com"
                                required
                                autocomplete="email"
                                spellcheck="false"
                            >
                        </div>
                        <button class="auth-submit-btn" type="submit">Continue with Email</button>
                    </form>
                </div>

                <div class="auth-footer-links">
                    <button type="button" class="auth-link-btn" id="auth-terms-btn">Terms</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" class="auth-link-btn" id="auth-privacy-btn">Privacy</button>
                    <span aria-hidden="true">·</span>
                    <button type="button" class="auth-link-btn" id="auth-about-btn">About</button>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        // Google SSO
        const googleBtn = this.element.querySelector('#btn-google-sso');
        if (googleBtn) {
            googleBtn.addEventListener('click', async () => {
                this.clearError();
                googleBtn.disabled = true;
                googleBtn.style.opacity = '0.6';
                try {
                    await this.onGoogleLogin();
                    this.hide();
                } catch (err) {
                    this.showError(this.formatAuthError(err));
                } finally {
                    googleBtn.disabled = false;
                    googleBtn.style.opacity = '';
                }
            });
        }

        // Email form
        const instantForm = this.element.querySelector('#email-instant-form');
        if (instantForm) {
            instantForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                this.clearError();
                const emailInput = this.element.querySelector('#instant-email');
                const email = emailInput.value.trim();
                if (!email) return;
                const displayName = email.split('@')[0];
                const submitBtn = instantForm.querySelector('.auth-submit-btn');
                if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Connecting…'; }
                try {
                    await this.onGuest(displayName);
                    this.hide();
                } catch (err) {
                    this.showError(this.formatAuthError(err));
                    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Continue with Email'; }
                }
            });
        }

        // Footer links
        const linksMap = {
            '#auth-terms-btn':   'terms',
            '#auth-privacy-btn': 'privacy',
            '#auth-about-btn':   'about',
        };
        Object.entries(linksMap).forEach(([sel, tab]) => {
            const btn = this.element.querySelector(sel);
            if (btn && this.onOpenAbout) {
                btn.addEventListener('click', () => this.onOpenAbout(tab));
            }
        });
    }

    formatAuthError(err) {
        const code = err?.code || '';
        if (code === 'auth/popup-closed-by-user') return 'Sign-in was cancelled.';
        if (code === 'auth/operation-not-allowed' || code === 'auth/admin-restricted-operation') {
            return 'Google Sign-In is not enabled. Go to Firebase Console → Authentication → Sign-in method and enable Google.';
        }
        return err?.message || 'Authentication failed. Please try again.';
    }

    showError(msg) {
        const errorEl = this.element.querySelector('#auth-error-msg');
        if (errorEl) {
            errorEl.textContent = msg;
            errorEl.style.display = 'block';
        }
    }

    clearError() {
        const errorEl = this.element.querySelector('#auth-error-msg');
        if (errorEl) {
            errorEl.textContent = '';
            errorEl.style.display = 'none';
        }
    }

    show() { this.element.style.display = 'flex'; }
    hide() { this.element.style.display = 'none'; }
}
