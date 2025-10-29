const fs = require('fs');
const path = require('path');

module.exports = function() {
  const personasFiles = [
    { id: '02', file: '02_grupos_interes_electoral.md' },
    { id: '03', file: '03_grupos_emergentes.md' }
  ];

  const personas = [];

  // Map candidate short names to full names for file matching
  const candidateFileMap = {
    'Jeannette Jara': ['Jara', 'Jeannette_Jara'],
    'José Antonio Kast': ['Kast', 'Jose_Antonio_Kast'],
    'Evelyn Matthei': ['Matthei', 'Evelyn_Matthei'],
    'Johannes Kaiser': ['Kaiser', 'Johannes_Kaiser'],
    'Marco Enríquez-Ominami': ['MEO', 'Marco_Enriquez_Ominami'],
    'Eduardo Artés': ['Artes', 'Eduardo_Artes'],
    'Franco Parisi': ['Parisi', 'Franco_Parisi'],
    'Harold Mayne-Nicholls': ['Mayne', 'Harold_Mayne_Nicholls']
  };

  personasFiles.forEach(({ id, file }) => {
    const filePath = path.join(__dirname, '../../docs', file);

    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8');

      // Split by persona sections (## number. emoji **name**)
      const personaSections = contenido.split(/(?=^## \d+\. )/gm).filter(s => s.trim());

      personaSections.forEach(section => {
        // Extract header: ## 1. 👩‍💼 **María José Contreras** - La Profesional Agobiada
        const headerMatch = section.match(/^## (\d+)\. (.+?) \*\*(.+?)\*\* - (.+?)$/m);
        if (!headerMatch) return;

        const numero = headerMatch[1];
        const emoji = headerMatch[2];
        const nombre = headerMatch[3];
        const descripcion = headerMatch[4];

        // Extract age
        const edadMatch = section.match(/\*\*Edad\*\*:\s*(.+?)(?:\s*$|\n)/m);
        const edad = edadMatch ? edadMatch[1].trim() : '';

        // Extract income (flexible - could be Ingreso familiar, Pensión, Deuda, or Ingreso)
        const ingresoMatch = section.match(/\*\*(?:Ingreso familiar|Pensión|Ingreso|Deuda)\*\*:\s*(.+?)(?:\s*$|\n)/m);
        const ingreso = ingresoMatch ? ingresoMatch[1].trim() : '';

        // Extract occupation
        const ocupacionMatch = section.match(/\*\*Ocupación\*\*:\s*(.+?)(?:\s*$|\n)/m);
        const ocupacion = ocupacionMatch ? ocupacionMatch[1].trim() : '';

        // Extract location
        const ubicacionMatch = section.match(/\*\*Ubicación\*\*:\s*(.+?)(?:\s*$|\n)/m);
        const ubicacion = ubicacionMatch ? ubicacionMatch[1].trim() : '';

        // Extract situacion
        const situacionMatch = section.match(/\*\*Situación\*\*:\s*(.+?)(?:\s*$|\n)/m);
        const situacion = situacionMatch ? situacionMatch[1].trim() : '';

        // Extract context (list items under ### Contexto)
        const contextoSection = section.split('### Contexto')[1];
        const contexto = [];
        if (contextoSection) {
          const lines = contextoSection.split('\n');
          for (const line of lines) {
            if (line.trim().startsWith('-')) {
              contexto.push(line.replace(/^-\s*/, '').trim());
            } else if (line.trim().startsWith('#')) {
              break; // Stop at next section
            }
          }
        }

        // Extract priorities (numbered list under ### Prioridades Electorales)
        const prioridadesSection = section.split('### Prioridades Electorales')[1];
        const prioridades = [];
        if (prioridadesSection) {
          const lines = prioridadesSection.split('\n');
          for (const line of lines) {
            if (line.trim().match(/^\d+\./)) {
              prioridades.push(line.replace(/^\d+\.\s*/, '').trim());
            } else if (line.trim().startsWith('#')) {
              break; // Stop at next section
            }
          }
        }

        // Extract frase típica
        const fraseMatch = section.match(/### Frase Típica\s*\n\*"(.+?)"\*/s);
        const fraseTipica = fraseMatch ? fraseMatch[1].trim() : '';

        // Generate slug
        const slug = `${numero.padStart(2, '0')}-${nombre.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`;

        // Look for improved evaluations in re_evaluaciones folder
        const reEvalDir = path.join(__dirname, '../../05_mejora_evaluaciones/re_evaluaciones');
        let evaluaciones = [];
        let voteIntention = [];

        if (fs.existsSync(reEvalDir)) {
          // Find persona folder - try different naming patterns
          const reEvalFolders = fs.readdirSync(reEvalDir);
          const personaFolder = reEvalFolders.find(f => {
            const match = f.match(/persona_(\d+)_/);
            return match && parseInt(match[1]) === parseInt(numero);
          });

          if (personaFolder) {
            const personaEvalDir = path.join(reEvalDir, personaFolder);
            const evalFiles = fs.readdirSync(personaEvalDir).filter(f => f.endsWith('.md') && !f.includes('VERIFICACION'));

            // Process each evaluation file
            Object.entries(candidateFileMap).forEach(([candidatoFull, patterns]) => {
              // Find matching file for this candidate
              const evalFile = evalFiles.find(f => {
                return patterns.some(pattern => f.includes(pattern));
              });

              if (evalFile) {
                const evalPath = path.join(personaEvalDir, evalFile);
                const evalContent = fs.readFileSync(evalPath, 'utf-8');

                // Extract rating - use flexible pattern
                const ratingMatch = evalContent.match(/Calificaci.n.*?(\d+(?:\.\d+)?)\s*\/\s*10/i);
                const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;

                if (rating !== null) {
                  // Extract a summary - take first paragraph after "## SÍNTESIS"
                  let resumen = '';
                  const sintesisMatch = evalContent.match(/## SÍNTESIS\s*\n\n(.+?)(?:\n\n##|$)/s);
                  if (sintesisMatch) {
                    // Take first paragraph from síntesis, clean it up
                    const firstPara = sintesisMatch[1].split('\n\n')[0].trim();
                    resumen = firstPara.substring(0, 300) + (firstPara.length > 300 ? '...' : '');
                  } else {
                    // Fallback: extract from CALIFICACIÓN Y VOTO - Razón principal
                    const razonMatch = evalContent.match(/\*\*Raz.n principal:\*\*\s*(.+?)(?:\n\n|---)/s);
                    if (razonMatch) {
                      const text = razonMatch[1].trim();
                      resumen = text.substring(0, 300) + (text.length > 300 ? '...' : '');
                    } else {
                      // Last fallback: take text after a key section
                      const contentMatch = evalContent.match(/\*\*Lo que valoro positivamente:\*\*\s*\n\n(.+?)(?:\n\n\*\*|$)/s);
                      if (contentMatch) {
                        const text = contentMatch[1].split('\n\n')[0].replace(/\*\*/g, '').trim();
                        resumen = text.substring(0, 300) + (text.length > 300 ? '...' : '');
                      }
                    }
                  }

                  evaluaciones.push({
                    candidato: candidatoFull,
                    rating: rating,
                    resumen: resumen,
                    contenidoCompleto: evalContent
                  });
                }
              }
            });

            // Sort evaluaciones by rating descending for vote intention
            const sortedEvals = [...evaluaciones].sort((a, b) => b.rating - a.rating);
            voteIntention = sortedEvals.slice(0, 3).map(e => ({
              candidato: e.candidato,
              rating: e.rating
            }));

            // Sort evaluaciones by candidate name for display consistency
            evaluaciones.sort((a, b) => a.candidato.localeCompare(b.candidato));
          }
        }

        personas.push({
          numero: numero,
          id: `${numero.padStart(2, '0')}-${nombre.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")}`,
          nombre: nombre,
          emoji: emoji,
          descripcion: descripcion,
          edad: edad,
          ingreso: ingreso,
          ocupacion: ocupacion,
          ubicacion: ubicacion,
          situacion: situacion,
          contexto: contexto,
          prioridades: prioridades,
          fraseTipica: fraseTipica,
          evaluaciones: evaluaciones,
          voteIntention: voteIntention
        });
      });
    }
  });

  console.log(`Loaded ${personas.length} personas with improved evaluations from re_evaluaciones`);
  return personas;
};
