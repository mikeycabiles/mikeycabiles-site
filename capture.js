const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');

const root = process.cwd();
const outDir = path.join(root, 'mockups');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  'index.html',
  'about.html',
  'blog.html',
  'blog-post.html',
  'resources.html',
  'memos.html',
  'links.html',
  'components.html',
  'contact-trigger.html',
  'contact-open.html',
  'mobile-nav-open.html'
];

const variants = [
  {
    name: 'desktop',
    viewport: { width: 1440, height: 1800 },
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
    const context = await browser.newContext({
      viewport: variant.viewport,
      ...variant.options
    });

    for (const pageFile of pages) {
      const page = await context.newPage();
      const fileUrl = `file:///${path.join(root, pageFile).replace(/\\/g, '/')}`;
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(600);
      const name = pageFile.replace('.html', '');
      const outPath = path.join(outDir, `${name}-${variant.name}.png`);
      await page.screenshot({ path: outPath, fullPage: true });
      await page.close();
      console.log(`Saved ${outPath}`);
    }

    await context.close();
  }

  await browser.close();
})();
