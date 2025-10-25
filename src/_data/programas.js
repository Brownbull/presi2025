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
      color: '#C62828',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/EDUARDO-ANTONIO-ARTES-BRICHETTI.pdf'
    },
    {
      slug: 'evelyn-matthei',
      nombre: 'Evelyn Matthei',
      archivo: 'extract_Evelyn_Matthei.txt',
      partido: 'Unión Demócrata Independiente (UDI)',
      color: '#1565C0',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/EVELYN-MATTHEI-FORNET.pdf'
    },
    {
      slug: 'franco-parisi',
      nombre: 'Franco Parisi',
      archivo: 'extract_Franco_Parisi.txt',
      partido: 'Partido de la Gente (PDG)',
      color: '#F57C00',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/FRANCO-PARISI-FERNANDEZ.pdf'
    },
    {
      slug: 'harold-mayne-nicholls',
      nombre: 'Harold Mayne-Nicholls',
      archivo: 'extract_Harold_Mayne_Nicholls.txt',
      partido: 'Partido Social Cristiano',
      color: '#7B1FA2',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/HAROLD-MAYNE-NICHOLLS-SECUL.pdf'
    },
    {
      slug: 'jeannette-jara',
      nombre: 'Jeannette Jara',
      archivo: 'extract_Jeannette_Jara.txt',
      partido: 'Partido Comunista de Chile (PCCh)',
      color: '#C62828',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JEANNETTE-JARA-ROMAN.pdf'
    },
    {
      slug: 'johannes-kaiser',
      nombre: 'Johannes Kaiser',
      archivo: 'extract_Johannes_Kaiser.txt',
      partido: 'Partido Republicano',
      color: '#1B5E20',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JOHANNES-KAISER-BARENTS-VON-HOHENHAGEN.pdf'
    },
    {
      slug: 'jose-antonio-kast',
      nombre: 'José Antonio Kast',
      archivo: 'extract_Jose_Antonio_Kast.txt',
      partido: 'Partido Republicano',
      color: '#1B5E20',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/JOSE-ANTONIO-KAST-RIST.pdf'
    },
    {
      slug: 'marco-enriquez-ominami',
      nombre: 'Marco Enríquez-Ominami',
      archivo: 'extract_Marco_Enriquez_Ominami.txt',
      partido: 'Partido Progresista',
      color: '#00897B',
      pdfUrl: 'https://www.servel.cl/wp-content/uploads/2025/09/MARCO-ANTONIO-ENRIQUEZ-OMINAMI-GUMUCIO.pdf'
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
        pdfUrl: candidato.pdfUrl,
        numMedidas: numMedidas,
        secciones: secciones.length,
        contenido: contenido
      });
    }
  });

  return programas;
};
