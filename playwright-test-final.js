const { chromium } = require('playwright');

const TARGET_URL = 'http://localhost:8080';

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  console.log('🧪 FINAL TESTING - Both Issues\n');

  // ========================================
  // ISSUE 1: MATRIZ PAGE
  // ========================================
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📊 ISSUE 1: MATRIZ PAGE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await page.goto(`${TARGET_URL}/matriz/`);

  // Check table data
  const tableRows = await page.locator('table tbody tr').count();
  console.log(`✅ Table rows (should be 29): ${tableRows}`);

  const headers = await page.locator('table thead th').allTextContents();
  console.log(`✅ Candidates in header: ${headers.length - 2}`); // Minus Persona and Prom
  console.log(`   ${headers.slice(1, -1).join(', ')}`);

  // Check first persona row
  const firstPersona = await page.locator('table tbody tr').first().textContent();
  console.log(`✅ First persona data loaded: ${firstPersona.includes('Maria Jose Contreras')}`);

  // Check rankings section
  const rankingItems = await page.locator('.ranking-item').count();
  console.log(`✅ Ranking items (should be 8): ${rankingItems}`);

  if (rankingItems > 0) {
    const firstRanking = await page.locator('.ranking-item').first().textContent();
    console.log(`   First: ${firstRanking.trim().substring(0, 50)}...`);
  }

  // Take screenshot
  await page.screenshot({ path: 'screenshot-matriz-final.png', fullPage: true });
  console.log('📸 Screenshot: screenshot-matriz-final.png');

  // ========================================
  // ISSUE 2: PERSONA DETAIL PAGE
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('👤 ISSUE 2: PERSONA DETAIL PAGE');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  await page.goto(`${TARGET_URL}/personas/01-maria-jose-contreras/`);

  // Check vote intention section
  const voteIntentionExists = await page.locator('.vote-intention-section').count() > 0;
  console.log(`✅ Vote intention section exists: ${voteIntentionExists}`);

  if (voteIntentionExists) {
    const voteCards = await page.locator('.vote-card').count();
    console.log(`   Vote cards (top 3 candidates): ${voteCards}`);

    for (let i = 0; i < Math.min(3, voteCards); i++) {
      const card = page.locator('.vote-card').nth(i);
      const candidato = await card.locator('.candidato-name').textContent();
      const rating = await card.locator('.rating-large').textContent();
      console.log(`   #${i+1}: ${candidato.trim()} - ${rating.trim()}`);
    }
  }

  // Check evaluaciones section
  const evaluacionesExist = await page.locator('.evaluaciones-list').count() > 0;
  console.log(`\n✅ Evaluaciones section exists: ${evaluacionesExist}`);

  if (evaluacionesExist) {
    const evalCards = await page.locator('.evaluacion-card').count();
    console.log(`   Evaluation cards (should be 8): ${evalCards}`);

    // Check first evaluation
    const firstEval = page.locator('.evaluacion-card').first();
    const candidato = await firstEval.locator('h3').textContent();
    const rating = await firstEval.locator('.rating-badge').textContent();
    const hasResumen = await firstEval.locator('.evaluacion-resumen').count() > 0;
    const hasDetails = await firstEval.locator('.evaluacion-detalles').count() > 0;

    console.log(`\n   First evaluation:`);
    console.log(`     Candidato: ${candidato.trim()}`);
    console.log(`     Rating: ${rating.trim()}`);
    console.log(`     Has summary: ${hasResumen}`);
    console.log(`     Has details dropdown: ${hasDetails}`);
  }

  // Take screenshot
  await page.screenshot({ path: 'screenshot-persona-final.png', fullPage: true });
  console.log('\n📸 Screenshot: screenshot-persona-final.png');

  // ========================================
  // SUMMARY
  // ========================================
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ TEST SUMMARY');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  const matrizOk = tableRows === 29 && rankingItems === 8;
  const personaOk = voteIntentionExists && evaluacionesExist;

  console.log(`\n${matrizOk ? '✅' : '❌'} Issue 1 (Matriz): ${matrizOk ? 'FIXED' : 'NEEDS WORK'}`);
  console.log(`   - All 28 personas showing: ${tableRows - 1 === 28}`);
  console.log(`   - Rankings displaying: ${rankingItems === 8}`);

  console.log(`\n${personaOk ? '✅' : '❌'} Issue 2 (Persona detail): ${personaOk ? 'FIXED' : 'NEEDS WORK'}`);
  console.log(`   - Vote intention (top 3): ${voteIntentionExists}`);
  console.log(`   - All evaluations showing: ${evaluacionesExist}`);

  console.log('\n✨ Testing completed!\n');

  await browser.close();
})();
