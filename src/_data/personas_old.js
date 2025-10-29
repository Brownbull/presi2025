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
            // Handle multiple formats:
            // Format 1: "## 1. Candidate Name" (with number, ##)
            // Format 2: "## CANDIDATE NAME" (no number, all caps, ##)
            // Format 3: "### 1. CANDIDATE NAME" (with number, ###)
            // Format 4: "## CANDIDATE NAME (Party)" (with party info)
            // Format 5: "## Candidate Name" (Title Case with accents)
            // Format 6: "### CANDIDATE NAME - PARTY" (three hashes, all caps, with party/dash)

            // Try Format 1: ## 1. Candidate
            let candidateSections = evalContent.split(/(?=^## \d+\.)/gm).filter(s => s.trim() && s.match(/^## \d+\./m));

            // Try Format 3: ### 1. CANDIDATE (three hashes with number)
            if (candidateSections.length === 0) {
              candidateSections = evalContent.split(/(?=^### \d+\.)/gm).filter(s => s.trim() && s.match(/^### \d+\./m));
            }

            // Try Format 6: ### CANDIDATE NAME - PARTY (three hashes, all caps, no number)
            if (candidateSections.length === 0) {
              candidateSections = evalContent.split(/(?=^### [A-ZÑÁÉÍÓÚ])/gm).filter(s => {
                const firstLine = s.trim().split('\n')[0];
                // Must start with ###, contain mostly uppercase letters, and not be metadata sections
                return firstLine &&
                       firstLine.match(/^### [A-ZÑÁÉÍÓÚ]/) &&
                       !firstLine.includes('Enfermera') &&
                       !firstLine.includes('Octubre') &&
                       !firstLine.includes('PERFIL') &&
                       !firstLine.includes('CONCLUSIÓN') &&
                       !firstLine.includes('RESUMEN') &&
                       !firstLine.includes('RANKING') &&
                       !firstLine.includes('EVALUACIONES');
              });
            }

            // Try Format 2/4: ## CANDIDATE (all caps, may have party)
            if (candidateSections.length === 0) {
              candidateSections = evalContent.split(/(?=^## [A-ZÑÁÉÍÓÚ])/gm).filter(s => {
                const firstLine = s.trim().split('\n')[0];
                // Must start with ##, contain mostly uppercase letters, and not be metadata sections
                return firstLine &&
                       firstLine.match(/^## [A-ZÑÁÉÍÓÚ]/) &&
                       !firstLine.includes('Persona') &&
                       !firstLine.includes('PERFIL') &&
                       !firstLine.includes('CONTEXTO') &&
                       !firstLine.includes('CONCLUSIÓN') &&
                       !firstLine.includes('RESUMEN') &&
                       !firstLine.includes('RANKING') &&
                       !firstLine.includes('ANÁLISIS') &&
                       !firstLine.includes('EVALUACIONES') &&
                       !firstLine.includes('Perspectiva');
              });
            }

            // Try Format 5: ## Candidate Name (Title Case, e.g., "Eduardo Artés", "Marco Enríquez-Ominami")
            if (candidateSections.length === 0) {
              candidateSections = evalContent.split(/(?=^## [A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü])/gm).filter(s => {
                const firstLine = s.trim().split('\n')[0];
                // Must start with ##, capital letter followed by lowercase, and not be metadata sections
                return firstLine &&
                       firstLine.match(/^## [A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]/) &&
                       !firstLine.includes('Perfil') &&
                       !firstLine.includes('Perspectiva') &&
                       !firstLine.includes('Reflexión') &&
                       !firstLine.includes('Conclusión');
              });
            }

            // Debug logging for Daniela
            if (numero === '7') {
              console.log(`\n[DEBUG] Daniela Soto: Found ${candidateSections.length} sections`);
              candidateSections.forEach((s, i) => {
                const firstLine = s.split('\n')[0];
                console.log(`  Section ${i+1}: ${firstLine}`);
              });
            }

            candidateSections.forEach(candSection => {
              // Extract candidate name from any format
              let candidato = null;

              // Try "## 1. Name" or "### 1. NAME"
              const numberedMatch = candSection.match(/^##+ \d+\.\s+(.+?)$/m);
              if (numberedMatch) {
                candidato = numberedMatch[1].trim();
                // Remove party info if present (e.g., "CANDIDATE - Party")
                candidato = candidato.split(/\s*[-–]\s*/)[0].trim();
              }

              // Try "## CANDIDATE NAME" (all caps) or "## CANDIDATE (Party)"
              if (!candidato) {
                const capsMatch = candSection.match(/^## ([A-ZÑÁÉÍÓÚ][A-Z\s\-ÑÁÉÍÓÚ]+?)(?:\s*\([^)]+\))?$/m);
                if (capsMatch) {
                  candidato = capsMatch[1].trim();
                }
              }

              // Try "### CANDIDATE NAME" or "### CANDIDATE - PARTY" (three hashes, all caps)
              if (!candidato) {
                const caps3Match = candSection.match(/^### ([A-ZÑÁÉÍÓÚ][A-Z\s\-ÑÁÉÍÓÚ]+?)(?:\s*[-–]\s*.+)?$/m);
                if (caps3Match) {
                  candidato = caps3Match[1].trim();
                  // Remove party info after dash
                  candidato = candidato.split(/\s*[-–]\s*/)[0].trim();
                }
              }

              // Try "## Candidate Name" (Title Case, e.g., "Eduardo Artés", "Marco Enríquez-Ominami")
              if (!candidato) {
                const titleMatch = candSection.match(/^## ([A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü]+(?:[\s-][A-ZÑÁÉÍÓÚÜ][a-zñáéíóúü-]+)*)$/m);
                if (titleMatch) {
                  candidato = titleMatch[1].trim();
                }
              }

              if (!candidato) return;

              // Debug logging for Daniela
              if (numero === '7') {
                console.log(`[DEBUG] Daniela - Candidate extracted: "${candidato}"`);
              }

              // Skip if it's a metadata section (RANKING, CONCLUSION, etc.)
              if (candidato.includes('RANKING') || candidato.includes('CONCLUS') || candidato.includes('RESUMEN')) {
                if (numero === '7') console.log(`[DEBUG] Daniela - FILTERED OUT: ${candidato}`);
                return;
              }

              // Extract rating - look for "**Calificación Personal:**", "**VEREDICTO:**", or "**Evaluación:**" followed by rating
              let rating = null;
              const ratingMatch1 = candSection.match(/\*\*Calificación Personal:\*\*\s+(\d+(?:\.\d+)?)\/10/);
              const ratingMatch2 = candSection.match(/\*\*VEREDICTO:\*\*.+?(\d+(?:\.\d+)?)\/10/);
              const ratingMatch3 = candSection.match(/\*\*Evaluación\*\*:\s+(\d+(?:\.\d+)?)\/10/);
              rating = ratingMatch1 ? parseFloat(ratingMatch1[1]) : (ratingMatch2 ? parseFloat(ratingMatch2[1]) : (ratingMatch3 ? parseFloat(ratingMatch3[1]) : null));

              // Debug logging for Daniela
              if (numero === '7') {
                console.log(`[DEBUG] Daniela - ${candidato}: rating = ${rating !== null ? rating + '/10' : 'NOT FOUND'}`);
              }

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
