const path = require('path');
const { chromium } = require('playwright');

const root = process.cwd();
const targets = ['contact-open.html', 'mobile-nav-open.html'];
const variants = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 1024 },
    options: { deviceScaleFactor: 1 }
  },
  {
    name: 'mobile',
    viewport: { width: 375, height: 812 },
    options: {
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    }
  }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const variant of variants) {
    const context = await browser.newContext({ viewport: variant.viewport, ...variant.options });
    for (const file of targets) {
      const page = await context.newPage();
      const fileUrl = `file:///${path.join(root, file).replace(/\\/g, '/')}`;
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const output = path.join(root, 'mockups', `${file.replace('.html', '')}-${variant.name}.png`);
      await page.screenshot({ path: output, fullPage: false });
      await page.close();
      console.log('Re-saved', output);
    }
    await context.close();
  }
  await browser.close();
})();
