import pkg from './node_modules/playwright/index.js';
const { chromium } = pkg;

(async () => {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
        await page.screenshot({ path: '/home/ritupandeka/.gemini/antigravity/brain/6b7d9d45-7fc4-44c1-8f2d-cfbf2bcec47b/preview.png' });
        console.log('Screenshot saved successfully!');
        await browser.close();
    } catch (err) {
        console.error('Screenshot error:', err);
    }
})();
