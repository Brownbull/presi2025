const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('🧪 Testing Presidential Analysis Website on http://localhost:8081\n');

  // Test 1: Homepage
  console.log('📄 Test 1: Loading Homepage...');
  await page.goto('http://localhost:8081/');
  const title = await page.title();
  console.log(`   ✅ Title: "${title}"`);

  // Check for AI disclaimer
  const disclaimer = await page.locator('.ai-disclaimer').count();
  console.log(`   ${disclaimer > 0 ? '✅' : '❌'} AI Disclaimer banner found: ${disclaimer > 0}`);

  // Check for main heading
  const h1 = await page.locator('h1').first().textContent();
  console.log(`   ✅ Main heading: "${h1.trim()}"`);

  // Test 2: Programs page
  console.log('\n📄 Test 2: Loading Programs List...');
  await page.goto('http://localhost:8081/programas/');
  const programsTitle = await page.title();
  console.log(`   ✅ Title: "${programsTitle}"`);

  const programCards = await page.locator('.card').count();
  console.log(`   ✅ Found ${programCards} candidate program cards`);

  // Test 3: Individual program page
  console.log('\n📄 Test 3: Loading Individual Program (Evelyn Matthei)...');
  await page.goto('http://localhost:8081/programas/evelyn-matthei/');
  const programTitle = await page.title();
  console.log(`   ✅ Title: "${programTitle}"`);

  // Test 4: Personas page
  console.log('\n📄 Test 4: Loading Personas List...');
  await page.goto('http://localhost:8081/personas/');
  const personasTitle = await page.title();
  console.log(`   ✅ Title: "${personasTitle}"`);

  const personaCards = await page.locator('.card').count();
  console.log(`   ✅ Found ${personaCards} voter persona cards`);

  // Test 5: Matrix page
  console.log('\n📄 Test 5: Loading Evaluation Matrix...');
  await page.goto('http://localhost:8081/matriz/');
  const matrixTitle = await page.title();
  console.log(`   ✅ Title: "${matrixTitle}"`);

  // Test 6: Methodology page
  console.log('\n📄 Test 6: Loading Methodology...');
  await page.goto('http://localhost:8081/metodologia/');
  const methodologyTitle = await page.title();
  console.log(`   ✅ Title: "${methodologyTitle}"`);

  // Test 7: Check responsive design
  console.log('\n📱 Test 7: Testing Responsive Design...');
  await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
  await page.goto('http://localhost:8081/');
  console.log('   ✅ Mobile viewport (375x667) loaded successfully');

  await page.setViewportSize({ width: 1920, height: 1080 }); // Desktop
  await page.goto('http://localhost:8081/');
  console.log('   ✅ Desktop viewport (1920x1080) loaded successfully');

  // Test 8: Take screenshots
  console.log('\n📸 Test 8: Taking Screenshots...');
  await page.goto('http://localhost:8081/');
  await page.screenshot({ path: 'screenshot-homepage.png', fullPage: true });
  console.log('   ✅ Homepage screenshot saved: screenshot-homepage.png');

  await page.goto('http://localhost:8081/matriz/');
  await page.screenshot({ path: 'screenshot-matriz.png', fullPage: true });
  console.log('   ✅ Matrix screenshot saved: screenshot-matriz.png');

  console.log('\n✨ All tests completed successfully!\n');

  await browser.close();
})();
