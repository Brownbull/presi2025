const fs = require('fs');
const path = require('path');

module.exports = function() {
  const matrizFile = path.join(__dirname, '../../04_evaluacion_agentes/matriz_evaluacion.md');

  if (!fs.existsSync(matrizFile)) {
    console.log('Warning: matriz_evaluacion.md not found');
    return { candidatos: [], evaluaciones: [], promedios: {}, rankings: [] };
  }

  const contenido = fs.readFileSync(matrizFile, 'utf-8');

  // Extract candidate order from header (now includes "Promedio" at the end)
  const headerMatch = contenido.match(/\| Persona \| ([^|]+(?:\|[^|]+)*?) \| Promedio \|/);
  if (!headerMatch) {
    console.log('Warning: Could not parse header');
    return { candidatos: [], evaluaciones: [], promedios: {}, rankings: [] };
  }

  const candidatos = headerMatch[1].split('|').map(c => c.trim()).filter(c => c);

  // Extract evaluations
  const evaluaciones = [];
  const lines = contenido.split('\n');

  lines.forEach(line => {
    // Match persona rows: | 01. Nombre | X.XX | X.XX | ... | X.XX |
    // Skip lines with dashes or PROMEDIO
    if (line.includes('---') || line.includes('PROMEDIO') || line.includes('Persona |')) return;

    // Must start with pipe, then number dot, then name, then at least one more pipe
    if (!line.trim().startsWith('|') || !line.match(/^\|\s*\d+\./)) return;

    // Split by pipe and clean up
    const parts = line.split('|').map(p => p.trim()).filter(p => p);

    if (parts.length < 2) return;

    // First part is "01. Name"
    const firstPart = parts[0];
    const personaMatch = firstPart.match(/^(\d+)\.\s+(.+)$/);

    if (!personaMatch) return;

    const numero = personaMatch[1];
    const nombre = personaMatch[2].trim();

    // Remaining parts are ratings and final promedio
    const values = parts.slice(1).map(v => {
      const val = v.trim();
      return val === 'N/A' || val === '' ? null : parseFloat(val);
    });

    // Last value is the promedio, rest are candidate ratings
    const ratings = values.slice(0, -1);
    const promedio = values[values.length - 1];

    if (ratings.length === candidatos.length) {
      const personaEvals = {};
      candidatos.forEach((candidato, idx) => {
        personaEvals[candidato] = ratings[idx];
      });

      evaluaciones.push({
        numero: numero,
        nombre: nombre,
        evaluaciones: personaEvals,
        promedio: promedio || 0
      });
    }
  });

  // Extract candidate averages
  const promedios = {};
  const promedioMatch = contenido.match(/\|\s*\*\*PROMEDIO\*\*\s*\|(.+)\|$/m);
  if (promedioMatch) {
    const avgValuesAndTotal = promedioMatch[1].split('|').map(v => {
      const val = v.trim().replace(/\*\*/g, '');
      return val === 'N/A' || val === '' ? null : parseFloat(val);
    });

    // Exclude the last value (total average)
    const avgValues = avgValuesAndTotal.slice(0, -1);

    candidatos.forEach((candidato, idx) => {
      if (idx < avgValues.length) {
        promedios[candidato] = avgValues[idx];
      }
    });
  }

  // Extract rankings - build from promedios
  const rankings = [];
  const candidatosWithPromedios = Object.entries(promedios).map(([candidato, promedio]) => ({
    candidato,
    promedio
  })).sort((a, b) => b.promedio - a.promedio);

  candidatosWithPromedios.forEach((item, index) => {
    rankings.push({
      posicion: index + 1,
      candidato: item.candidato,
      promedio: item.promedio
    });
  });

  console.log(`Loaded matriz: ${candidatos.length} candidates, ${evaluaciones.length} personas, ${rankings.length} rankings`);

  return {
    candidatos: candidatos,
    evaluaciones: evaluaciones,
    promedios: promedios,
    rankings: rankings
  };
};
