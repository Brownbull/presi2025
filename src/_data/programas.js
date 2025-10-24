const fs = require('fs');
const path = require('path');

module.exports = function() {
  const programasDir = path.join(__dirname, '../../03_extract_refinement');
  const programas = [];

  const candidatos = [
    {
      slug: 'eduardo-artes',
      nombre: 'Eduardo Artés',
      archivo: 'extract_Eduardo_Artes.txt',
      partido: 'Partido Comunista (Acción Proletaria)',
      color: '#C62828'
    },
    {
      slug: 'evelyn-matthei',
      nombre: 'Evelyn Matthei',
      archivo: 'extract_Evelyn_Matthei.txt',
      partido: 'Unión Demócrata Independiente (UDI)',
      color: '#1565C0'
    },
    {
      slug: 'franco-parisi',
      nombre: 'Franco Parisi',
      archivo: 'extract_Franco_Parisi.txt',
      partido: 'Partido de la Gente (PDG)',
      color: '#F57C00'
    },
    {
      slug: 'harold-mayne-nicholls',
      nombre: 'Harold Mayne-Nicholls',
      archivo: 'extract_Harold_Mayne_Nicholls.txt',
      partido: 'Partido Social Cristiano',
      color: '#7B1FA2'
    },
    {
      slug: 'jeannette-jara',
      nombre: 'Jeannette Jara',
      archivo: 'extract_Jeannette_Jara.txt',
      partido: 'Partido Comunista de Chile (PCCh)',
      color: '#C62828'
    },
    {
      slug: 'johannes-kaiser',
      nombre: 'Johannes Kaiser',
      archivo: 'extract_Johannes_Kaiser.txt',
      partido: 'Partido Republicano',
      color: '#1B5E20'
    },
    {
      slug: 'jose-antonio-kast',
      nombre: 'José Antonio Kast',
      archivo: 'extract_Jose_Antonio_Kast.txt',
      partido: 'Partido Republicano',
      color: '#1B5E20'
    },
    {
      slug: 'marco-enriquez-ominami',
      nombre: 'Marco Enríquez-Ominami',
      archivo: 'extract_Marco_Enriquez_Ominami.txt',
      partido: 'Partido Progresista',
      color: '#00897B'
    }
  ];

  candidatos.forEach(candidato => {
    const filePath = path.join(programasDir, candidato.archivo);

    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');

      // Extract title and date
      const titleMatch = contenido.match(/# EXTRACTO COMPREHENSIVO: (.+)/);
      const subtitleMatch = contenido.match(/## (.+)/);

      // Count measures - handle both **Medida and plain Medida formats
      const medidasBold = contenido.match(/\*\*Medida \d+:/g) || [];
      const medidasPlain = contenido.match(/^Medida \d+:/gm) || [];
      const numMedidas = medidasBold.length > 0 ? medidasBold.length : medidasPlain.length;

      // Extract sections
      const secciones = [];
      const seccionRegex = /^## ([A-Z_]+)$/gm;
      let match;
      while ((match = seccionRegex.exec(contenido)) !== null) {
        if (match[1] !== 'VISION_AND_PRINCIPLES') {
          secciones.push(match[1]);
        }
      }

      programas.push({
        slug: candidato.slug,
        nombre: candidato.nombre,
        partido: candidato.partido,
        color: candidato.color,
        archivo: candidato.archivo,
        numMedidas: numMedidas,
        secciones: secciones.length,
        contenido: contenido
      });
    }
  });

  return programas;
};
