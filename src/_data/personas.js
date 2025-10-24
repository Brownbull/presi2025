const fs = require('fs');
const path = require('path');

module.exports = function() {
  const personasFiles = [
    { id: '02', file: '02_grupos_interes_electoral.md' },
    { id: '03', file: '03_grupos_emergentes.md' }
  ];

  const personas = [];

  personasFiles.forEach(({ id, file }) => {
    const filePath = path.join(__dirname, '../../docs', file);

    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');

      // Extract personas from markdown
      const personaRegex = /## (\d+)\. (.+?) \*\*(.+?)\*\* - (.+?)\n\*\*Edad\*\*: (.+?)\n(?:.*?\n)*?\*\*(?:Ingreso familiar|Pensión|Ingreso)\*\*: (.+?)(?:\n|$)(?:[\s\S]*?)### Frase Típica\n\*"(.+?)"\*/gm;

      let match;
      while ((match = personaRegex.exec(contenido)) !== null) {
        const numero = match[1];
        const emoji = match[2];
        const nombre = match[3];
        const descripcion = match[4];
        const edad = match[5];
        const ingreso = match[6];
        const fraseTipica = match[7];

        // Extract occupation
        const ocupacionMatch = contenido.match(new RegExp(`## ${numero}\\..*?\\n[\\s\\S]*?\\*\\*Ocupación\\*\\*: (.+?)\\n`, 'm'));
        const ocupacion = ocupacionMatch ? ocupacionMatch[1] : '';

        // Extract location
        const ubicacionMatch = contenido.match(new RegExp(`## ${numero}\\..*?\\n[\\s\\S]*?\\*\\*Ubicación\\*\\*: (.+?)\\n`, 'm'));
        const ubicacion = ubicacionMatch ? ubicacionMatch[1] : '';

        // Generate slug
        const slug = `${numero.padStart(2, '0')}-${nombre.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;

        // Find evaluation file
        const evalDir = path.join(__dirname, '../../04_evaluacion_agentes');
        const evalFiles = fs.readdirSync(evalDir);
        const evalFile = evalFiles.find(f => f.includes(`persona_${numero}_`));

        personas.push({
          numero: numero,
          id: slug,
          emoji: emoji,
          nombre: nombre,
          descripcion: descripcion,
          edad: edad,
          ingreso: ingreso,
          ocupacion: ocupacion,
          ubicacion: ubicacion,
          fraseTipica: fraseTipica,
          evaluacionFile: evalFile || null
        });
      }
    }
  });

  return personas.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
};
