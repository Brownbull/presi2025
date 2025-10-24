const fs = require('fs');
const path = require('path');

module.exports = function() {
  const matrizFile = path.join(__dirname, '../../04_evaluacion_agentes/matriz_evaluacion.md');

  if (!fs.existsSync(matrizFile)) {
    return { evaluaciones: [], promedios: {}, rankings: [] };
  }

  const contenido = fs.readFileSync(matrizFile, 'utf-8');

  // Extract candidate order from header
  const headerMatch = contenido.match(/\| Persona \| (.+?) \|/);
  const candidatos = headerMatch ? headerMatch[1].split(' | ').map(c => c.trim()) : [];

  // Extract evaluations
  const evaluaciones = [];
  const lines = contenido.split('\n');

  lines.forEach(line => {
    // Match persona rows: | 01. Nombre | X.XX | X.XX | ...
    const match = line.match(/\| (\d+)\.\s+(.+?)\s+\|(.+)\|/);
    if (match) {
      const numero = match[1];
      const nombre = match[2];
      const ratings = match[3].split('|').map(r => {
        const val = r.trim();
        return val === 'N/A' ? null : parseFloat(val);
      });

      if (ratings.length === candidatos.length) {
        const personaEvals = {};
        candidatos.forEach((candidato, idx) => {
          personaEvals[candidato] = ratings[idx];
        });

        evaluaciones.push({
          numero: numero,
          nombre: nombre,
          evaluaciones: personaEvals,
          promedio: ratings.filter(r => r !== null).reduce((a, b) => a + b, 0) / ratings.filter(r => r !== null).length
        });
      }
    }
  });

  // Extract candidate averages
  const promedios = {};
  const promedioMatch = contenido.match(/\| \*\*PROMEDIO\*\* \|(.+)\|/);
  if (promedioMatch) {
    const avgValues = promedioMatch[1].split('|').map(v => {
      const val = v.trim().replace(/\*\*/g, '');
      return val === 'N/A' ? null : parseFloat(val);
    });

    candidatos.forEach((candidato, idx) => {
      promedios[candidato] = avgValues[idx];
    });
  }

  // Extract rankings
  const rankings = [];
  const rankingSection = contenido.match(/## Rankings[\s\S]*?###\s*Por Candidato[\s\S]*?```([\s\S]*?)```/);
  if (rankingSection) {
    const rankingLines = rankingSection[1].split('\n').filter(l => l.trim());
    rankingLines.forEach(line => {
      const match = line.match(/(\d+)\.\s+(.+?):\s+([\d.]+)\/10/);
      if (match) {
        rankings.push({
          posicion: parseInt(match[1]),
          candidato: match[2],
          promedio: parseFloat(match[3])
        });
      }
    });
  }

  return {
    candidatos: candidatos,
    evaluaciones: evaluaciones,
    promedios: promedios,
    rankings: rankings
  };
};
