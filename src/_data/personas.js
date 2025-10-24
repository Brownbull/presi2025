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

        // Find and parse evaluation file
        const evalDir = path.join(__dirname, '../../04_evaluacion_agentes');
        let evalFile = null;
        let evaluaciones = [];
        let voteIntention = [];

        if (fs.existsSync(evalDir)) {
          const evalFiles = fs.readdirSync(evalDir);
          evalFile = evalFiles.find(f => f.includes(`persona_${numero.padStart(2, '0')}_`) || f.includes(`persona_${numero}_`));

          if (evalFile) {
            const evalPath = path.join(evalDir, evalFile);
            const evalContent = fs.readFileSync(evalPath, 'utf-8');

            // Parse candidate evaluations
            // Handle two formats:
            // Format 1: "## 1. Candidate Name" (with number)
            // Format 2: "## CANDIDATE NAME" (no number, all caps)
            let candidateSections = evalContent.split(/(?=^## \d+\.)/gm).filter(s => s.trim() && s.match(/^## \d+\./m));

            // If no numbered sections found, try all-caps format
            if (candidateSections.length === 0) {
              candidateSections = evalContent.split(/(?=^## [A-ZÑÁÉÍÓÚ])/gm).filter(s => {
                const firstLine = s.trim().split('\n')[0];
                // Must start with ##, contain mostly uppercase letters, and not be "Persona" or "CONCLUSIÓN"
                return firstLine &&
                       firstLine.match(/^## [A-ZÑÁÉÍÓÚ]/) &&
                       !firstLine.includes('Persona') &&
                       !firstLine.includes('CONCLUSIÓN') &&
                       !firstLine.includes('Perspectiva');
              });
            }

            candidateSections.forEach(candSection => {
              // Extract candidate name from either format
              let candidato = null;
              const numberedMatch = candSection.match(/^## \d+\.\s+(.+?)$/m);
              const capsMatch = candSection.match(/^## ([A-ZÑÁÉÍÓÚ][A-Z\s\-ÑÁÉÍÓÚ]+?)$/m);

              if (numberedMatch) {
                candidato = numberedMatch[1].trim();
              } else if (capsMatch) {
                candidato = capsMatch[1].trim();
              }

              if (!candidato) return;

              // Extract rating - look for either "**Calificación Personal:**" or "**VEREDICTO:**" followed by rating
              let rating = null;
              const ratingMatch1 = candSection.match(/\*\*Calificación Personal:\*\*\s+(\d+(?:\.\d+)?)\/10/);
              const ratingMatch2 = candSection.match(/\*\*VEREDICTO:\*\*.+?(\d+(?:\.\d+)?)\/10/);
              rating = ratingMatch1 ? parseFloat(ratingMatch1[1]) : (ratingMatch2 ? parseFloat(ratingMatch2[1]) : null);

              // Extract first paragraph as summary
              const paragraphs = candSection.split('\n\n').filter(p => p.trim() && !p.startsWith('#') && !p.includes('**Calificación') && !p.includes('**¿Votaría'));
              const resumen = paragraphs[0] ? paragraphs[0].replace(/\n/g, ' ').trim() : '';

              if (rating !== null) {
                evaluaciones.push({
                  candidato,
                  rating,
                  resumen,
                  contenidoCompleto: candSection
                });
              }
            });

            // Sort by rating and get top 3 for vote intention
            voteIntention = evaluaciones
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 3)
              .map(e => ({ candidato: e.candidato, rating: e.rating }));
          }
        }

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
          situacion: situacion,
          contexto: contexto,
          prioridades: prioridades,
          fraseTipica: fraseTipica,
          evaluacionFile: evalFile || null,
          evaluaciones: evaluaciones,
          voteIntention: voteIntention
        });
      });
    }
  });

  return personas.sort((a, b) => parseInt(a.numero) - parseInt(b.numero));
};
