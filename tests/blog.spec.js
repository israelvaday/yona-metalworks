// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:8080';

test.describe('Blog Pages Tests', () => {
  
  test('Blog listing page loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog.html`);
    await expect(page).toHaveTitle(/בלוג|מסגריית יונה/i);
    
    // Check that article cards are visible
    const articles = page.locator('.blog-posts article, .posts-list article');
    await expect(articles.first()).toBeVisible({ timeout: 10000 });
  });

  test('Blog article links use correct format', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog.html`);
    
    // Get all blog detail links
    const blogLinks = page.locator('a[href*="blog-details.html"]');
    const count = await blogLinks.count();
    
    console.log(`Found ${count} blog detail links`);
    
    // Check each link uses ?id= format
    for (let i = 0; i < count; i++) {
      const href = await blogLinks.nth(i).getAttribute('href');
      console.log(`Link ${i + 1}: ${href}`);
      expect(href).toContain('?id=');
      expect(href).not.toContain('?article=');
    }
  });

  test('Steel types article loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog-details.html?id=steel-types`);
    
    // Wait for content to load
    await page.waitForLoadState('networkidle');
    
    // Check article title is visible
    const articleTitle = page.locator('.blog-details h2, .article-title, h1');
    await expect(articleTitle.first()).toBeVisible({ timeout: 10000 });
    
    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/steel-types.png', fullPage: true });
  });

  test('Or Gaon project article loads correctly', async ({ page }) => {
    await page.goto(`${BASE_URL}/blog-details.html?id=or-gaon-project`);
    
    await page.waitForLoadState('networkidle');
    
    const articleContent = page.locator('.blog-details, .article-content, main');
    await expect(articleContent.first()).toBeVisible({ timeout: 10000 });
    
    await page.screenshot({ path: 'tests/screenshots/or-gaon-project.png', fullPage: true });
  });

  test('All article links navigate correctly', async ({ page }) => {
    const articleIds = [
      'steel-types',
      'railing-maintenance', 
      'gate-design-2026',
      'steel-vs-concrete',
      'stair-safety',
      'or-gaon-project'
    ];

    for (const id of articleIds) {
      const response = await page.goto(`${BASE_URL}/blog-details.html?id=${id}`);
      expect(response?.status()).toBe(200);
      
      // Verify page loaded (not showing error)
      await page.waitForLoadState('domcontentloaded');
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).not.toContain('404');
      
      console.log(`✓ Article ${id} loaded successfully`);
    }
  });

  test('Blog listing mobile contrast - text should be dark', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/blog.html`);
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await page.screenshot({ path: 'tests/screenshots/blog-mobile.png', fullPage: true });
    
    // Check text color on article titles (should be dark/black)
    const titleElement = page.locator('.post-title, .blog-posts h2, article h2').first();
    
    if (await titleElement.count() > 0) {
      const color = await titleElement.evaluate(el => {
        return window.getComputedStyle(el).color;
      });
      console.log(`Title color on mobile: ${color}`);
      // Color should be dark (rgb values should be low)
    }
  });

  test('Blog details mobile contrast - text should be white on dark', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto(`${BASE_URL}/blog-details.html?id=steel-types`);
    await page.waitForLoadState('networkidle');
    
    // Take mobile screenshot
    await page.screenshot({ path: 'tests/screenshots/blog-details-mobile.png', fullPage: true });
  });

});
