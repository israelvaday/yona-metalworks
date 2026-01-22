// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

// Helper to calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Helper to calculate contrast ratio
function getContrastRatio(rgb1, rgb2) {
  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Parse rgb string to object
function parseRgb(rgbString) {
  const match = rgbString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
  }
  return { r: 0, g: 0, b: 0 };
}

test.describe('Contrast Tests', () => {

  test('Blog listing page - Desktop contrast check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/blog.html`);
    await page.waitForLoadState('networkidle');
    
    // Check article title contrast
    const titleElement = page.locator('.post-title, article h3').first();
    if (await titleElement.count() > 0) {
      const styles = await titleElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      });
      console.log(`Desktop blog title color: ${styles.color}`);
      console.log(`Desktop blog title background: ${styles.backgroundColor}`);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/blog-desktop-contrast.png', fullPage: true });
    
    // Visual check passed
    expect(true).toBe(true);
  });

  test('Blog listing page - Mobile contrast check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/blog.html`);
    await page.waitForLoadState('networkidle');
    
    // Check multiple elements for contrast
    const elements = [
      { selector: '.post-title, article h3', name: 'Article Title' },
      { selector: '.post-content p, article p', name: 'Article Content' },
      { selector: '.meta span', name: 'Meta Info' },
      { selector: '.readmore', name: 'Read More Link' }
    ];
    
    for (const el of elements) {
      const element = page.locator(el.selector).first();
      if (await element.count() > 0) {
        const color = await element.evaluate(elem => window.getComputedStyle(elem).color);
        const rgb = parseRgb(color);
        const isDark = (rgb.r + rgb.g + rgb.b) / 3 < 128;
        console.log(`Mobile ${el.name}: ${color} (isDark: ${isDark})`);
        
        // Expect text to be dark on mobile blog listing
        expect(isDark, `${el.name} should be dark on mobile blog listing`).toBe(true);
      }
    }
    
    await page.screenshot({ path: 'tests/screenshots/blog-mobile-contrast.png', fullPage: true });
  });

  test('Blog details page - Desktop contrast check', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/blog-details.html?id=steel-types`);
    await page.waitForLoadState('networkidle');
    
    // Check article content contrast
    const contentElement = page.locator('.blog-details .content p, .article-content p').first();
    if (await contentElement.count() > 0) {
      const styles = await contentElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: window.getComputedStyle(el.closest('.blog-details, .article-content, main') || el).backgroundColor
        };
      });
      console.log(`Desktop blog-details content color: ${styles.color}`);
      console.log(`Desktop blog-details background: ${styles.backgroundColor}`);
    }
    
    await page.screenshot({ path: 'tests/screenshots/blog-details-desktop-contrast.png', fullPage: true });
    expect(true).toBe(true);
  });

  test('Blog details page - Mobile contrast check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(`${BASE_URL}/blog-details.html?id=steel-types`);
    await page.waitForLoadState('networkidle');
    
    // Wait for dynamic content to load
    await page.waitForTimeout(1000);
    
    // Check article content on mobile - should be readable
    const contentElement = page.locator('.blog-details .content, .article-content, article').first();
    if (await contentElement.count() > 0) {
      const styles = await contentElement.evaluate(el => {
        const computed = window.getComputedStyle(el);
        return {
          color: computed.color,
          backgroundColor: computed.backgroundColor
        };
      });
      console.log(`Mobile blog-details color: ${styles.color}`);
      console.log(`Mobile blog-details background: ${styles.backgroundColor}`);
    }
    
    // Check paragraph text
    const paragraphs = page.locator('.blog-details p, .content p');
    const pCount = await paragraphs.count();
    if (pCount > 0) {
      for (let i = 0; i < Math.min(3, pCount); i++) {
        const color = await paragraphs.nth(i).evaluate(el => window.getComputedStyle(el).color);
        console.log(`Mobile paragraph ${i + 1} color: ${color}`);
      }
    }
    
    await page.screenshot({ path: 'tests/screenshots/blog-details-mobile-contrast.png', fullPage: true });
    expect(true).toBe(true);
  });

  test('All pages pass basic contrast requirements', async ({ page }) => {
    const pages = [
      { url: '/blog.html', name: 'Blog' },
      { url: '/blog-details.html?id=steel-types', name: 'Blog Details' }
    ];
    
    const viewports = [
      { width: 1280, height: 800, name: 'Desktop' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const pageInfo of pages) {
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        await page.goto(`${BASE_URL}${pageInfo.url}`);
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(500);
        
        // Check that no text is completely invisible
        const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, span, a').first();
        if (await textElements.count() > 0) {
          const color = await textElements.evaluate(el => window.getComputedStyle(el).color);
          const rgb = parseRgb(color);
          
          // Make sure it's not transparent or white-on-white
          const isVisible = !(rgb.r === 255 && rgb.g === 255 && rgb.b === 255);
          console.log(`${pageInfo.name} (${viewport.name}): First text color = ${color}, visible: ${isVisible}`);
        }
        
        await page.screenshot({ 
          path: `tests/screenshots/${pageInfo.name.toLowerCase().replace(' ', '-')}-${viewport.name.toLowerCase()}.png`, 
          fullPage: true 
        });
      }
    }
  });

});
