/**
 * Utility functions for input sanitization, XSS prevention, and avatar generation.
 */

function createSvgDataUrl(svgString) {
    try {
        const base64 = btoa(unescape(encodeURIComponent(svgString)));
        return `data:image/svg+xml;base64,${base64}`;
    } catch (e) {
        return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    }
}

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><rect width="100" height="100" rx="50" fill="#2b2d37"/><path d="M50 48a16 16 0 1 0 0-32 16 16 0 0 0 0 32zm0 8c-18.7 0-34 11.5-34 26v2h68v-2c0-14.5-15.3-26-34-26z" fill="#5865f2"/></svg>`;

export const DEFAULT_AVATAR = createSvgDataUrl(DEFAULT_SVG);

export function sanitizeText(text) {
    if (!text || typeof text !== 'string') return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
}

export function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    const trimmed = url.trim().toLowerCase();
    return trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/');
}

export function getAvatarUrl(url, name) {
    if (url && isValidUrl(url)) {
        return url;
    }
    const safeName = (name && typeof name === 'string' && name.trim()) ? name.trim() : 'User';
    const initial = safeName.charAt(0).toUpperCase();
    
    // Deterministic color palette generator based on string hash
    let hash = 0;
    for (let i = 0; i < safeName.length; i++) {
        hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 40) % 360;
    
    const initialSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="hsl(${hue1}, 75%, 55%)"/><stop offset="100%" stop-color="hsl(${hue2}, 85%, 45%)"/></linearGradient></defs><rect width="100" height="100" rx="50" fill="url(#g)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="#ffffff" font-family="-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', sans-serif" font-size="44" font-weight="700">${initial}</text></svg>`;
    return createSvgDataUrl(initialSvg);
}

export function generateUserAvatar(name) {
    return getAvatarUrl(null, name);
}

