const fs = require('fs');
const path = require('path');

module.exports = function() {
  // Use improved master tables from 05_mejora_evaluaciones/analisis
  const programasDir = path.join(__dirname, '../../05_mejora_evaluaciones/analisis');
  const programas = [];

  const candidatos = [
    {
      slug: 'eduardo-artes',
      nombre: 'Eduardo Artés',
      archivo: 'tabla_maestra_Eduardo_Artes.md',
      partido: 'Partido Comunista (Acción Proletaria)',
      color: '#C62828',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/EDUARDO-ANTONIO-ARTES-BRICHETTI.pdf'
    },
    {
      slug: 'evelyn-matthei',
      nombre: 'Evelyn Matthei',
      archivo: 'tabla_maestra_Evelyn_Matthei.md',
      partido: 'Unión Demócrata Independiente (UDI)',
      color: '#1565C0',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/EVELYN-MATTHEI-FORNET.pdf'
    },
    {
      slug: 'franco-parisi',
      nombre: 'Franco Parisi',
      archivo: 'tabla_maestra_Franco_Parisi.md',
      partido: 'Partido de la Gente (PDG)',
      color: '#F57C00',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/FRANCO-PARISI-FERNANDEZ.pdf'
    },
    {
      slug: 'harold-mayne-nicholls',
      nombre: 'Harold Mayne-Nicholls',
      archivo: 'tabla_maestra_Harold_Mayne_Nicholls.md',
      partido: 'Partido Social Cristiano',
      color: '#7B1FA2',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/HAROLD-MAYNE-NICHOLLS-SECUL.pdf'
    },
    {
      slug: 'jeannette-jara',
      nombre: 'Jeannette Jara',
      archivo: 'tabla_maestra_Jeannette_Jara.md',
      partido: 'Partido Comunista de Chile (PCCh)',
      color: '#C62828',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JEANNETTE-JARA-ROMAN.pdf'
    },
    {
      slug: 'johannes-kaiser',
      nombre: 'Johannes Kaiser',
      archivo: 'tabla_maestra_Johannes_Kaiser.md',
      partido: 'Partido Republicano',
      color: '#1B5E20',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JOHANNES-KAISER-BARENTS-VON-HOHENHAGEN.pdf'
    },
    {
      slug: 'jose-antonio-kast',
      nombre: 'José Antonio Kast',
      archivo: 'tabla_maestra_Jose_Antonio_Kast.md',
      partido: 'Partido Republicano',
      color: '#1B5E20',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JOSE-ANTONIO-KAST-RIST.pdf'
    },
    {
      slug: 'marco-enriquez-ominami',
      nombre: 'Marco Enríquez-Ominami',
      archivo: 'tabla_maestra_Marco_Enriquez_Ominami.md',
      partido: 'Partido Progresista',
      color: '#00897B',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/MARCO-ANTONIO-ENRIQUEZ-OMINAMI-GUMUCIO.pdf'
    }
  ];

  candidatos.forEach(candidato => {
    const filePath = path.join(programasDir, candidato.archivo);

    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');

      // Extract total measures from master table header
      // Format: **Total de medidas:** 179
      const medidasMatch = contenido.match(/\*\*Total de medidas:\*\*\s*(\d+)/i);
      const numMedidas = medidasMatch ? parseInt(medidasMatch[1]) : 0;

      // Extract sections from ÍNDICE POR TEMA
      // Format: 2. [ECONOMÍA Y EMPLEO](#economía-y-empleo) - Medidas 1-56 (56 medidas)
      const secciones = [];
      const seccionRegex = /^\d+\.\s+\[([^\]]+)\]/gm;
      let match;
      while ((match = seccionRegex.exec(contenido)) !== null) {
        if (!match[1].includes('VISIÓN Y PRINCIPIOS')) {
          secciones.push(match[1]);
        }
      }

      programas.push({
        slug: candidato.slug,
        nombre: candidato.nombre,
        partido: candidato.partido,
        color: candidato.color,
        archivo: candidato.archivo,
        pdfUrl: candidato.pdfUrl,
        numMedidas: numMedidas,
        secciones: secciones.length,
        contenido: contenido
      });
    }
  });

  return programas;
};
