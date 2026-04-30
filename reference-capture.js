const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const targets = [
  {name:'nicksaraev', url:'https://nicksaraev.com/'},
  {name:'calebralston', url:'https://calebralston.com/home'},
  {name:'aliabdaal', url:'https://aliabdaal.com/'},
  {name:'mattgray', url:'https://www.mattgray.com/'},
  {name:'danieldalen', url:'https://www.danieldalen.com/'},
  {name:'justinwelsh', url:'https://www.justinwelsh.me/'},
  {name:'dankoe', url:'https://thedankoe.com/'}
];

(async () => {
  const out = path.join(process.cwd(), 'research');
  fs.mkdirSync(out, { recursive: true });
  const browser = await chromium.launch({headless:true});
  const context = await browser.newContext({viewport:{width:1440,height:1200}});
  for (const t of targets) {
    const page = await context.newPage();
    try {
      await page.goto(t.url, {waitUntil:'domcontentloaded', timeout:60000});
      await page.waitForTimeout(2500);
      await page.screenshot({path:path.join(out, `${t.name}.png`), fullPage:false});
      console.log('saved', t.name);
    } catch(e) {
      console.log('failed', t.name, e.message);
    }
    await page.close();
  }
  await context.close();
  await browser.close();
})();
