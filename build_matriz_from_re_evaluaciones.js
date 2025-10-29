const fs = require('fs');
const path = require('path');

// Candidate order (same as original)
const candidatos = [
  'Jeannette Jara',
  'José Antonio Kast',
  'Evelyn Matthei',
  'Johannes Kaiser',
  'Marco Enríquez-Ominami',
  'Eduardo Artés',
  'Franco Parisi',
  'Harold Mayne-Nicholls'
];

// Read all persona evaluations
const reEvaluacionesDir = path.join(__dirname, '05_mejora_evaluaciones', 're_evaluaciones');
const personas = [];

// Get all persona folders
const personaFolders = fs.readdirSync(reEvaluacionesDir)
  .filter(f => f.startsWith('persona_') && fs.statSync(path.join(reEvaluacionesDir, f)).isDirectory())
  .sort();

console.log(`Found ${personaFolders.length} persona folders`);

personaFolders.forEach(folder => {
  // Extract persona number and name from folder name
  // Format: persona_01_Maria_Jose_Contreras
  const match = folder.match(/persona_(\d+)_(.+)/);
  if (!match) return;

  const numero = match[1];
  const nombreSlug = match[2];

  // Convert slug to proper name (replace _ with space and title case)
  const nombre = nombreSlug.split('_').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');

  // Read evaluation files for this persona
  const personaDir = path.join(reEvaluacionesDir, folder);
  const evaluaciones = {};

  // Map candidate names to their short filenames
  const candidateFileMap = {
    'Jeannette Jara': 'Jara',
    'José Antonio Kast': 'Kast',
    'Evelyn Matthei': 'Matthei',
    'Johannes Kaiser': 'Kaiser',
    'Marco Enríquez-Ominami': 'MEO',
    'Eduardo Artés': 'Artes',
    'Franco Parisi': 'Parisi',
    'Harold Mayne-Nicholls': 'Mayne'
  };

  candidatos.forEach(candidato => {
    const shortName = candidateFileMap[candidato];
    const files = fs.readdirSync(personaDir);

    // Try multiple filename patterns:
    // Pattern 1: XX_evaluacion_ShortName.md (e.g., 01_evaluacion_MEO.md)
    // Pattern 2: X_evaluacion_Full_Name.md (e.g., 1_evaluacion_Marco_Enriquez_Ominami.md)
    // Pattern 3: evaluacion_Full_Name.md (e.g., evaluacion_Marco_Enriquez_Ominami.md)

    const candidatoForFile = candidato.normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, '_');

    let evalFile = files.find(f =>
      f.match(/^\d+_evaluacion_/) && f.includes(shortName) && f.endsWith('.md')
    );

    if (!evalFile) {
      evalFile = files.find(f =>
        f.match(/^\d+_evaluacion_/) && f.includes(candidatoForFile) && f.endsWith('.md')
      );
    }

    if (!evalFile) {
      evalFile = files.find(f =>
        f.startsWith('evaluacion_') && f.includes(candidatoForFile) && f.endsWith('.md')
      );
    }

    if (evalFile) {
      const evalPath = path.join(personaDir, evalFile);
      const content = fs.readFileSync(evalPath, 'utf-8');

      // Extract rating from multiple formats:
      // Format 1: **Calificación:** X/10
      // Format 2: ## CALIFICACIÓN: X/10
      // Format 3: **Calificación:** X.XX/10
      // Use simple pattern that works across encodings
      const ratingMatch = content.match(/Calificaci.n.*?(\d+(?:\.\d+)?)\s*\/\s*10/i);

      if (ratingMatch) {
        evaluaciones[candidato] = parseFloat(ratingMatch[1]);
      } else {
        console.warn(`Warning: No rating found for ${nombre} - ${candidato} in ${evalFile}`);
        evaluaciones[candidato] = null;
      }
    } else {
      console.warn(`Warning: Missing evaluation file for ${nombre} - ${candidato}`);
      evaluaciones[candidato] = null;
    }
  });

  // Calculate average
  const ratings = Object.values(evaluaciones).filter(r => r !== null);
  const promedio = ratings.length > 0
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  personas.push({
    numero,
    nombre,
    evaluaciones,
    promedio
  });
});

console.log(`Processed ${personas.length} personas`);

// Build matriz markdown
let matriz = `# Matriz de Evaluación - Versión Mejorada
## Generada desde re_evaluaciones
**Fecha:** ${new Date().toLocaleDateString('es-CL')}
**Total:** ${personas.length} personas × ${candidatos.length} candidatos = ${personas.length * candidatos.length} evaluaciones

---

`;

// Build header row
matriz += `| Persona | ${candidatos.join(' | ')} | Promedio |\n`;
matriz += `|---------|${candidatos.map(() => '--------').join('|')}|----------|\n`;

// Build persona rows
personas.forEach(persona => {
  const ratings = candidatos.map(c => {
    const rating = persona.evaluaciones[c];
    return rating !== null ? rating.toFixed(2) : 'N/A';
  });

  matriz += `| ${persona.numero}. ${persona.nombre} | ${ratings.join(' | ')} | ${persona.promedio.toFixed(2)} |\n`;
});

// Calculate candidate averages
const promedios = candidatos.map(candidato => {
  const ratings = personas
    .map(p => p.evaluaciones[candidato])
    .filter(r => r !== null);

  return ratings.length > 0
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;
});

// Calculate overall average
const overallAverage = promedios.reduce((a, b) => a + b, 0) / promedios.length;

// Add average row
matriz += `| **PROMEDIO** | ${promedios.map(p => `**${p.toFixed(2)}**`).join(' | ')} | **${overallAverage.toFixed(2)}** |\n`;

// Add summary statistics
matriz += `\n---\n\n`;
matriz += `## Estadísticas Resumidas\n\n`;
matriz += `- **Total evaluaciones:** ${personas.length * candidatos.length}\n`;
matriz += `- **Personas:** ${personas.length}\n`;
matriz += `- **Candidatos:** ${candidatos.length}\n`;
matriz += `- **Promedio general:** ${overallAverage.toFixed(2)}/10\n\n`;

// Ranking de candidatos
const ranking = candidatos
  .map((candidato, idx) => ({ candidato, promedio: promedios[idx] }))
  .sort((a, b) => b.promedio - a.promedio);

matriz += `### Ranking por Promedio\n\n`;
ranking.forEach((item, idx) => {
  matriz += `${idx + 1}. **${item.candidato}**: ${item.promedio.toFixed(2)}/10\n`;
});

// Write to file
const outputPath = path.join(__dirname, '04_evaluacion_agentes', 'matriz_evaluacion.md');
fs.writeFileSync(outputPath, matriz, 'utf-8');

console.log(`\n✅ Matriz generada exitosamente en: ${outputPath}`);
console.log(`   Total: ${personas.length} personas × ${candidatos.length} candidatos = ${personas.length * candidatos.length} evaluaciones`);
console.log(`   Promedio general: ${overallAverage.toFixed(2)}/10`);
