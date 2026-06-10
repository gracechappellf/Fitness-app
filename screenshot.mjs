import { chromium } from 'playwright';
import fs from 'fs';

const BASE = 'http://localhost:5178';
const OUT = '/tmp/screenshots2';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page = await ctx.newPage();

await page.goto(BASE);
await page.waitForSelector('.hero-card', { timeout: 15000 });
await page.screenshot({ path: `${OUT}/01-train-hero.png` });

await page.evaluate(() => document.querySelector('.scroll').scrollTop = 420);
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/02-train-exercises.png` });

// Fuel tab
await page.evaluate(() => document.querySelector('.scroll').scrollTop = 0);
await page.locator('.nav-btn').nth(1).click();
await page.waitForSelector('.fuel-header', { timeout: 5000 });
await page.screenshot({ path: `${OUT}/03-fuel-top.png` });

await page.evaluate(() => document.querySelector('.scroll').scrollTop = 260);
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/04-fuel-meals.png` });

// Recipe sheet
await page.evaluate(() => document.querySelector('.scroll').scrollTop = 0);
await page.locator('.meal-card').first().click();
await page.waitForSelector('.sheet-bg', { timeout: 5000 });
await page.screenshot({ path: `${OUT}/05-recipe-sheet.png` });
await page.locator('.sheet-bg').click({ position: { x: 195, y: 40 } });
await page.waitForTimeout(300);

// Shop tab
await page.locator('.nav-btn').nth(2).click();
await page.waitForSelector('.seg-control', { timeout: 5000 });
await page.screenshot({ path: `${OUT}/06-shop.png` });

// Diary tab
await page.locator('.nav-btn').nth(3).click();
await page.waitForSelector('.diary-rating-row', { timeout: 5000 });
await page.screenshot({ path: `${OUT}/07-diary.png` });

// Me tab
await page.locator('.nav-btn').nth(4).click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${OUT}/08-me.png` });

await browser.close();
console.log('Done', OUT);
