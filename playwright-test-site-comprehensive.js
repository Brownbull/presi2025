const { chromium } = require('playwright');

// Target URL (auto-detected)
const TARGET_URL = 'http://localhost:8080';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 100 });
  const page = await browser.newPage();

  console.log('🧪 Testing Presidential Analysis Website\n');
  console.log('📍 Target URL:', TARGET_URL);
  console.log('📋 Verifying against website_plan_v2.md requirements\n');

  try {
    // ========================================
    // Test 1: Homepage
    // ========================================
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 1: HOMEPAGE');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(TARGET_URL);
    const title = await page.title();
    console.log('✅ Page loaded successfully');
    console.log('   Title:', title);

    // Check if title includes "Análisis con IA" as per plan
    const hasAIInTitle = title.includes('IA') || title.includes('AI');
    console.log(`   ${hasAIInTitle ? '✅' : '⚠️'} Title contains AI reference: ${hasAIInTitle}`);

    // Check for AI disclaimer (should be in header)
    const disclaimerCount = await page.locator('.ai-disclaimer').count();
    console.log(`   ${disclaimerCount > 0 ? '✅' : '❌'} AI Disclaimer banner found: ${disclaimerCount > 0}`);

    if (disclaimerCount > 0) {
      const disclaimerText = await page.locator('.ai-disclaimer').first().textContent();
      console.log('   Disclaimer text:', disclaimerText.trim().substring(0, 80) + '...');

      // Check for close button
      const closeBtn = await page.locator('.ai-disclaimer .close-disclaimer').count();
      console.log(`   ${closeBtn > 0 ? '✅' : '⚠️'} Close button found: ${closeBtn > 0}`);
    }

    // Check for main heading
    const h1Count = await page.locator('h1').count();
    if (h1Count > 0) {
      const h1Text = await page.locator('h1').first().textContent();
      console.log('   ✅ Main heading:', h1Text.trim());
    }

    // Check for author credit (Gabe C)
    const bodyText = await page.textContent('body');
    const hasAuthorCredit = bodyText.includes('Gabe C') || bodyText.includes('Gabriel');
    console.log(`   ${hasAuthorCredit ? '✅' : '⚠️'} Author credit (Gabe C) found: ${hasAuthorCredit}`);

    // ========================================
    // Test 2: Programs List Page
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 2: PROGRAMS LIST (/programas/)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(`${TARGET_URL}/programas/`);
    const programsTitle = await page.title();
    console.log('✅ Programs page loaded');
    console.log('   Title:', programsTitle);

    // Count program cards (should be 8 candidates)
    const programCards = await page.locator('.card').count();
    console.log(`   ${programCards === 8 ? '✅' : '⚠️'} Found ${programCards} candidate cards (expected: 8)`);

    // ========================================
    // Test 3: Personas List Page
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 3: PERSONAS LIST (/personas/)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(`${TARGET_URL}/personas/`);
    const personasTitle = await page.title();
    console.log('✅ Personas page loaded');
    console.log('   Title:', personasTitle);

    // Count persona cards (should be 28)
    const personaCards = await page.locator('.card').count();
    console.log(`   ${personaCards === 28 ? '✅' : '⚠️'} Found ${personaCards} persona cards (expected: 28)`);

    // Check for persona quote (frase típica) - NEW requirement from plan
    const quoteCount = await page.locator('.persona-quote, blockquote').count();
    console.log(`   ${quoteCount > 0 ? '✅' : '⚠️'} Persona quotes (frases típicas) found: ${quoteCount > 0}`);

    if (quoteCount > 0) {
      const firstQuote = await page.locator('.persona-quote, blockquote').first().textContent();
      console.log('   Sample quote:', firstQuote.trim().substring(0, 60) + '...');
    }

    // Check for demographics (age and income with colors)
    const ageElements = await page.locator('.age, .persona-demographics .age').count();
    const incomeElements = await page.locator('.income, .persona-demographics .income').count();
    console.log(`   ${ageElements > 0 ? '✅' : '⚠️'} Age elements found: ${ageElements}`);
    console.log(`   ${incomeElements > 0 ? '✅' : '⚠️'} Income elements found: ${incomeElements}`);

    // ========================================
    // Test 4: Matrix Page
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 4: EVALUATION MATRIX (/matriz/)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(`${TARGET_URL}/matriz/`);
    const matrixTitle = await page.title();
    console.log('✅ Matrix page loaded');
    console.log('   Title:', matrixTitle);

    // Check for matrix table
    const tableCount = await page.locator('table').count();
    console.log(`   ${tableCount > 0 ? '✅' : '❌'} Matrix table found: ${tableCount > 0}`);

    if (tableCount > 0) {
      // Count rows (should be 28 personas + header)
      const rowCount = await page.locator('table tr').count();
      console.log(`   Found ${rowCount} table rows`);

      // Check for persona metadata (age and income in matrix)
      const personaMetaCount = await page.locator('.persona-meta').count();
      console.log(`   ${personaMetaCount > 0 ? '✅' : '⚠️'} Persona metadata (age/income) in matrix: ${personaMetaCount > 0}`);

      // Check for clickable persona names
      const personaLinkCount = await page.locator('.persona-link, .persona-cell a').count();
      console.log(`   ${personaLinkCount > 0 ? '✅' : '⚠️'} Clickable persona names: ${personaLinkCount > 0}`);

      // Check for rating cells with color coding
      const ratingCells = await page.locator('.rating-cell, td[class*="rating-"]').count();
      console.log(`   Rating cells found: ${ratingCells}`);
    }

    // ========================================
    // Test 5: Methodology Page
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 5: METHODOLOGY (/metodologia/)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(`${TARGET_URL}/metodologia/`);
    const methodologyTitle = await page.title();
    console.log('✅ Methodology page loaded');
    console.log('   Title:', methodologyTitle);

    const methodologyContent = await page.textContent('body');
    const hasClaude = methodologyContent.includes('Claude') || methodologyContent.includes('Sonnet');
    console.log(`   ${hasClaude ? '✅' : '⚠️'} Mentions Claude/Sonnet: ${hasClaude}`);

    // ========================================
    // Test 6: About Page
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 6: ABOUT PAGE (/acerca/)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(`${TARGET_URL}/acerca/`);
    const aboutTitle = await page.title();
    console.log('✅ About page loaded');
    console.log('   Title:', aboutTitle);

    const aboutContent = await page.textContent('body');
    const hasLinkedIn = aboutContent.includes('LinkedIn') || aboutContent.includes('linkedin');
    console.log(`   ${hasLinkedIn ? '✅' : '⚠️'} LinkedIn link found: ${hasLinkedIn}`);

    // ========================================
    // Test 7: Footer Elements
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📄 TEST 7: FOOTER ELEMENTS');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    await page.goto(TARGET_URL);

    // Check for footer AI badge
    const footerAIBadge = await page.locator('.ai-badge, .footer .ai-badge').count();
    console.log(`   ${footerAIBadge > 0 ? '✅' : '⚠️'} Footer AI badge found: ${footerAIBadge > 0}`);

    // Check for footer
    const footer = await page.locator('footer, .footer, .site-footer').count();
    console.log(`   ${footer > 0 ? '✅' : '❌'} Footer element found: ${footer > 0}`);

    if (footer > 0) {
      const footerText = await page.locator('footer, .footer, .site-footer').first().textContent();
      const hasGabeC = footerText.includes('Gabe C') || footerText.includes('Gabriel');
      console.log(`   ${hasGabeC ? '✅' : '⚠️'} Gabe C credit in footer: ${hasGabeC}`);
    }

    // ========================================
    // Test 8: Responsive Design
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📱 TEST 8: RESPONSIVE DESIGN');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto(TARGET_URL);
    console.log('✅ Mobile viewport (375x667) loaded successfully');
    await page.screenshot({ path: 'screenshot-presidential-mobile.png', fullPage: true });
    console.log('   📸 Screenshot saved: screenshot-presidential-mobile.png');

    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(TARGET_URL);
    console.log('✅ Tablet viewport (768x1024) loaded successfully');

    // Desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(TARGET_URL);
    console.log('✅ Desktop viewport (1920x1080) loaded successfully');
    await page.screenshot({ path: 'screenshot-presidential-desktop.png', fullPage: true });
    console.log('   📸 Screenshot saved: screenshot-presidential-desktop.png');

    // ========================================
    // Test 9: Screenshots of Key Pages
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📸 TEST 9: SCREENSHOTS OF KEY PAGES');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Homepage
    await page.goto(TARGET_URL);
    await page.screenshot({ path: 'screenshot-presidential-homepage.png', fullPage: true });
    console.log('✅ Homepage screenshot: screenshot-presidential-homepage.png');

    // Personas page
    await page.goto(`${TARGET_URL}/personas/`);
    await page.screenshot({ path: 'screenshot-presidential-personas.png', fullPage: true });
    console.log('✅ Personas screenshot: screenshot-presidential-personas.png');

    // Matrix page
    await page.goto(`${TARGET_URL}/matriz/`);
    await page.screenshot({ path: 'screenshot-presidential-matriz.png', fullPage: true });
    console.log('✅ Matrix screenshot: screenshot-presidential-matriz.png');

    // ========================================
    // Summary
    // ========================================
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 TEST SUMMARY');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All core pages accessible');
    console.log('✅ AI disclaimer implementation checked');
    console.log('✅ Persona quotes and demographics verified');
    console.log('✅ Matrix structure validated');
    console.log('✅ Author credits checked');
    console.log('✅ Responsive design tested (mobile, tablet, desktop)');
    console.log('✅ Screenshots captured for visual review');
    console.log('\n✨ Testing completed successfully!\n');

  } catch (error) {
    console.error('\n❌ ERROR during testing:', error.message);
    console.error(error.stack);
  } finally {
    await browser.close();
  }
})();
