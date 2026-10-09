import { getIconHtml } from '../icons.js';

export class AboutModal {
    constructor() {
        this.activeTab = 'about'; // 'about', 'privacy', 'terms', 'support'
        this.element = null;
        this.init();
    }

    init() {
        this.element = document.getElementById('about-modal');
        if (!this.element) {
            this.element = document.createElement('div');
            this.element.id = 'about-modal';
            this.element.className = 'auth-overlay';
            this.element.style.display = 'none';
            document.body.appendChild(this.element);
        }
        this.render();
    }

    setTab(tab) {
        this.activeTab = tab;
        this.render();
    }

    render() {
        this.element.innerHTML = `
            <div class="auth-card about-card">
                <div class="about-card-header">
                    <div class="brand-title">
                        ${getIconHtml('message-square', 28, 'brand-logo')}
                        <span>Whispr</span>
                        <span class="version-tag">v1.0.0</span>
                    </div>
                    <button type="button" class="close-modal-btn" id="close-about-btn" title="Close">${getIconHtml('x', 20)}</button>
                </div>

                <div class="about-tabs" role="tablist">
                    <button class="about-tab-btn ${this.activeTab === 'about' ? 'active' : ''}" data-tab="about" type="button">About</button>
                    <button class="about-tab-btn ${this.activeTab === 'privacy' ? 'active' : ''}" data-tab="privacy" type="button">Privacy</button>
                    <button class="about-tab-btn ${this.activeTab === 'terms' ? 'active' : ''}" data-tab="terms" type="button">Terms</button>
                    <button class="about-tab-btn ${this.activeTab === 'support' ? 'active' : ''}" data-tab="support" type="button">Support</button>
                </div>

                <div class="about-content-body">
                    ${this.renderTabContent()}
                </div>
            </div>
        `;

        this.bindEvents();
    }

    renderTabContent() {
        if (this.activeTab === 'about') {
            return `
                <div class="info-section">
                    <h3>About Whispr</h3>
                    <p>Whispr is a modern, high-performance real-time web messenger built for fast, secure, and seamless communication. Designed with a minimal agency-grade dark aesthetic and client-side optimization.</p>
                    
                    <div class="feature-list-grid">
                        <div class="feature-item">
                            <span class="feature-icon">${getIconHtml('check', 16)}</span>
                            <div><strong>Real-Time Sync:</strong> Sub-second message delivery powered by Firebase WebSockets.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${getIconHtml('check', 16)}</span>
                            <div><strong>Smart Compression:</strong> Client-side Canvas image optimization reducing payload sizes by 90%.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${getIconHtml('check', 16)}</span>
                            <div><strong>Document Sharing:</strong> Native support for PDFs, DOCX, TXT, and ZIP archives up to 25MB.</div>
                        </div>
                        <div class="feature-item">
                            <span class="feature-icon">${getIconHtml('check', 16)}</span>
                            <div><strong>Single Sign-On:</strong> One-click Google OAuth and passwordless authentication.</div>
                        </div>
                    </div>
                </div>
            `;
        } else if (this.activeTab === 'privacy') {
            return `
                <div class="info-section">
                    <h3>Privacy Policy</h3>
                    <p>Your privacy is fundamental to Whispr. We operate under strict data minimization and protection standards.</p>
                    
                    <div class="legal-block">
                        <h4>1. Data Collection</h4>
                        <p>We collect only essential account information (display name, email, avatar URL) and message payload metadata required to deliver real-time chat sessions.</p>
                        
                        <h4>2. Media & Storage Security</h4>
                        <p>Uploaded photos are compressed locally on your device prior to transmission. All document and photo attachments are stored securely in isolated Firebase Storage buckets.</p>
                        
                        <h4>3. User Data Control</h4>
                        <p>You retain full ownership of your data. You can delete individual messages or clear full conversation history at any time with permanent server deletion.</p>
                    </div>
                </div>
            `;
        } else if (this.activeTab === 'terms') {
            return `
                <div class="info-section">
                    <h3>Terms of Service</h3>
                    <p>By using Whispr, you agree to the following terms and community standards.</p>
                    
                    <div class="legal-block">
                        <h4>1. Acceptable Use</h4>
                        <p>Whispr must be used solely for lawful communication. Spamming, automated bot harassment, or transmitting illegal content is strictly prohibited.</p>
                        
                        <h4>2. Account Responsibility</h4>
                        <p>You are responsible for maintaining the security of your account credentials and all activities occurring under your authenticated session.</p>
                        
                        <h4>3. Service Availability</h4>
                        <p>Whispr is provided "as is" with high-availability cloud infrastructure. We continuously monitor uptime and system health.</p>
                    </div>
                </div>
            `;
        } else {
            return `
                <div class="info-section">
                    <h3>Help & Support</h3>
                    <p>Need assistance or have feedback? We're here to help.</p>
                    
                    <div class="support-card-grid">
                        <div class="support-card">
                            <span class="support-icon">${getIconHtml('message-square', 20)}</span>
                            <div>
                                <strong>Community & Issues</strong>
                                <p>Report bugs or request features on our official repository.</p>
                            </div>
                        </div>
                        <div class="support-card">
                            <span class="support-icon">${getIconHtml('file-text', 20)}</span>
                            <div>
                                <strong>Documentation</strong>
                                <p>Learn about Whispr architecture and deployment guides.</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    bindEvents() {
        const tabBtns = this.element.querySelectorAll('.about-tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setTab(btn.getAttribute('data-tab'));
            });
        });

        const closeBtn = this.element.querySelector('#close-about-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hide());
        }

        this.element.addEventListener('click', (e) => {
            if (e.target === this.element) {
                this.hide();
            }
        });
    }

    show(tab) {
        if (tab) {
            this.setTab(tab);
        }
        this.element.style.display = 'flex';
    }

    hide() {
        this.element.style.display = 'none';
    }
}
