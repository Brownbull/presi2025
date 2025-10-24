const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8080';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  console.log('🔍 DEBUGGING MATRIZ PAGE\n');

  // Test Matriz Page
  await page.goto(`${TARGET_URL}/matriz/`);
  console.log('✅ Matriz page loaded\n');

  // Take full page screenshot
  await page.screenshot({ path: 'screenshot-matriz-debug.png', fullPage: true });
  console.log('📸 Full page screenshot saved\n');

  // Check for table
  const tableExists = await page.locator('table').count() > 0;
  console.log('Table exists:', tableExists);

  if (tableExists) {
    // Get table HTML for inspection
    const tableHTML = await page.locator('table').first().innerHTML();
    console.log('\n📋 TABLE STRUCTURE:');
    console.log('Table HTML length:', tableHTML.length);

    // Count rows
    const rowCount = await page.locator('table tr').count();
    console.log('Total rows:', rowCount);

    // Count header cells
    const headerCells = await page.locator('table thead th').count();
    console.log('Header cells:', headerCells);

    // Get header text
    const headers = await page.locator('table thead th').allTextContents();
    console.log('Headers:', headers);

    // Count body rows
    const bodyRows = await page.locator('table tbody tr').count();
    console.log('Body rows:', bodyRows);

    // Get first row content if exists
    if (bodyRows > 0) {
      const firstRowCells = await page.locator('table tbody tr').first().locator('td').count();
      console.log('First row cells:', firstRowCells);

      const firstRowText = await page.locator('table tbody tr').first().textContent();
      console.log('First row text:', firstRowText);
    }
  }

  // Check Rankings section
  console.log('\n📊 RANKINGS SECTION:');
  const rankingsSection = await page.locator('.rankings-section').count();
  console.log('Rankings section exists:', rankingsSection > 0);

  if (rankingsSection > 0) {
    const rankingItems = await page.locator('.ranking-item').count();
    console.log('Ranking items:', rankingItems);

    const rankingsText = await page.locator('.rankings-section').textContent();
    console.log('Rankings section text:', rankingsText.substring(0, 200));
  }

  // Check for data in page
  const bodyText = await page.textContent('body');
  console.log('\n📄 PAGE CONTENT CHECK:');
  console.log('Body text length:', bodyText.length);
  console.log('Contains "PROMEDIO":', bodyText.includes('PROMEDIO'));
  console.log('Contains candidate names:', bodyText.includes('Matthei') || bodyText.includes('Kast'));

  console.log('\n✅ Debug complete - check screenshot-matriz-debug.png\n');

  await browser.close();
})();
