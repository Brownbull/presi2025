const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8080';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  console.log('🔍 CHECKING MARKDOWN RENDERING ISSUES\n');

  // ========================================
  // Check Program Page
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📄 PROGRAM PAGE - Evelyn Matthei');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await page.goto(`${TARGET_URL}/programas/evelyn-matthei/`);

  // Check for markdown artifacts
  const bodyText = await page.textContent('body');
  const hasMarkdownStars = bodyText.includes('**');
  const hasMarkdownHashes = bodyText.includes('###');
  const hasMarkdownBullets = bodyText.includes('- ');

  console.log(`Has ** (bold markers): ${hasMarkdownStars}`);
  console.log(`Has ### (headers): ${hasMarkdownHashes}`);
  console.log(`Has markdown bullets: ${hasMarkdownBullets}`);

  // Get sample text
  const mainContent = await page.locator('main').textContent();
  const sample = mainContent.substring(0, 500);
  console.log(`\nSample text:\n${sample}\n`);

  await page.screenshot({ path: 'screenshot-program-markdown.png', fullPage: true });

  // ========================================
  // Check Persona Evaluation Details
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 PERSONA EVALUATION DETAILS');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await page.goto(`${TARGET_URL}/personas/01-maria-jose-contreras/`);

  // Open first evaluation details
  const detailsExists = await page.locator('details').first().count() > 0;
  if (detailsExists) {
    await page.locator('details').first().click();
    await page.waitForTimeout(500);

    const evalContent = await page.locator('.evaluacion-contenido').first().textContent();
    const hasEvalMarkdown = evalContent.includes('**');

    console.log(`Evaluation has markdown: ${hasEvalMarkdown}`);
    console.log(`\nSample evaluation text:\n${evalContent.substring(0, 500)}\n`);
  }

  await page.screenshot({ path: 'screenshot-persona-evaluation-markdown.png', fullPage: true });

  console.log('✅ Screenshots saved for review\n');

  await browser.close();
})();
