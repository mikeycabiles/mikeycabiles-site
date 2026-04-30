const path = require('path');
const { chromium } = require('playwright');

const root = process.cwd();
const target = 'links.html';
const variants = [
  { name: 'desktop', viewport: { width: 1440, height: 1800 }, options: { deviceScaleFactor: 1 }, fullPage: true },
  {
    name: 'mobile',
    viewport: { width: 375, height: 812 },
    options: {
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
    },
    fullPage: true
  }
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  for (const variant of variants) {
    const context = await browser.newContext({ viewport: variant.viewport, ...variant.options });
    const page = await context.newPage();
    const fileUrl = `file:///${path.join(root, target).replace(/\\/g, '/')}`;
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(600);
    const out = path.join(root, 'mockups', `links-${variant.name}.png`);
    await page.screenshot({ path: out, fullPage: variant.fullPage });
    await page.close();
    await context.close();
    console.log('Re-saved', out);
  }
  await browser.close();
})();
