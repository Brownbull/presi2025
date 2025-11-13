# Data Models and Processing

> Generated: 2025-11-13 | Scan Level: Exhaustive | Project: presi2025

## Overview

This document describes the data processing layer for the 11ty static site. The data files in `src/_data/` load and transform electoral analysis data from markdown sources into structured JavaScript objects that templates can consume.

## Data Processing Scripts

### programas.js

**Purpose:** Loads and processes candidate presidential programs from markdown master tables.

**Source Location:** `src/_data/programas.js`

**Input Data:**
- `05_mejora_evaluaciones/analisis/tabla_maestra_{Candidate}_Name.md`
- 8 candidates total

**Output Structure:**
```javascript
{
  slug: String,           // URL-friendly identifier (e.g., "eduardo-artes")
  nombre: String,         // Candidate full name
  partido: String,        // Political party
  color: String,          // Brand color (hex)
  archivo: String,        // Source filename
  pdfUrl: String,         // Official SERVEL PDF link
  numMedidas: Number,     // Total measures count
  secciones: Number,      // Section count
  contenido: String       // Full markdown content
}
```

**Processing Logic:**
1. Reads markdown files for 8 pre-defined candidates
2. Extracts total measures count from header pattern: `**Total de medidas:** 179`
3. Parses section index to count thematic sections
4. Returns array of programa objects

**Key Features:**
- Hardcoded candidate list with metadata (name, party, color, PDF URLs)
- Flexible markdown parsing with regex
- Falls back gracefully if files don't exist

---

### personas.js

**Purpose:** Loads 28 electoral personas with their evaluations of all candidates.

**Source Location:** `src/_data/personas.js`

**Input Data:**
- `docs/02_grupos_interes_electoral.md` - Interest group personas
- `docs/03_grupos_emergentes.md` - Emerging group personas
- `05_mejora_evaluaciones/re_evaluaciones/persona_{N}_*/` - Evaluation files

**Output Structure:**
```javascript
{
  numero: String,                    // Persona number (e.g., "1")
  id: String,                        // URL-friendly ID (e.g., "01-maria-jose-contreras")
  nombre: String,                    // Persona name
  emoji: String,                     // Representative emoji
  descripcion: String,               // Short description
  edad: String,                      // Age or age range
  ingreso: String,                   // Income/pension/debt info
  ocupacion: String,                 // Occupation
  ubicacion: String,                 // Geographic location
  situacion: String,                 // Life situation
  contexto: Array<String>,           // Context bullet points
  prioridades: Array<String>,        // Electoral priorities (ordered)
  fraseTipica: String,               // Typical phrase/quote
  evaluaciones: Array<{              // Candidate evaluations
    candidato: String,               // Candidate full name
    rating: Number,                  // Rating (0-10)
    resumen: String,                 // Summary (300 char max)
    contenidoCompleto: String        // Full evaluation markdown
  }>,
  voteIntention: Array<{             // Top 3 candidates
    candidato: String,
    rating: Number
  }>
}
```

**Processing Logic:**
1. Parses persona definitions from markdown using regex patterns
2. Extracts demographic info, context, priorities, and typical phrases
3. Scans `re_evaluaciones/` for evaluation files matching persona number
4. Maps candidate short names to full names for file matching
5. Extracts ratings using flexible pattern: `Calificación.*?(\\d+(?:\\.\\d+)?)\\s*\\/\\s*10`
6. Generates summaries from SÍNTESIS section or fallback patterns
7. Sorts evaluations and calculates vote intention (top 3 by rating)

**Key Features:**
- Flexible markdown parsing handles variations in format
- Multiple fallback strategies for extracting ratings and summaries
- Automatic vote intention calculation
- Candidate name mapping for file matching

---

### matriz.js

**Purpose:** Loads the evaluation matrix showing all personas' ratings for all candidates.

**Source Location:** `src/_data/matriz.js`

**Input Data:**
- `04_evaluacion_agentes/matriz_evaluacion.md` - Markdown table

**Output Structure:**
```javascript
{
  candidatos: Array<String>,         // Candidate names in order
  evaluaciones: Array<{              // Persona evaluations
    numero: String,                  // Persona number
    nombre: String,                  // Persona name
    evaluaciones: Object,            // Map: candidato -> rating
    promedio: Number                 // Persona's average rating
  }>,
  promedios: Object,                 // Map: candidato -> average rating across all personas
  rankings: Array<{                  // Candidates sorted by average
    posicion: Number,                // Rank position (1-8)
    candidato: String,               // Candidate name
    promedio: Number                 // Average rating
  }>
}
```

**Processing Logic:**
1. Parses markdown table header to extract candidate order
2. Iterates table rows to extract persona evaluations
3. Handles N/A values gracefully
4. Calculates candidate averages from PROMEDIO row
5. Generates rankings by sorting candidates by average descending

**Key Features:**
- Robust table parsing with whitespace handling
- Validates table structure before processing
- Automatic ranking generation
- N/A handling for missing data

---

## Data Flow

```
Markdown Sources
  ├─ 05_mejora_evaluaciones/analisis/*.md      → programas.js
  ├─ docs/02_grupos_interes_electoral.md       → personas.js
  ├─ docs/03_grupos_emergentes.md              → personas.js
  ├─ 05_mejora_evaluaciones/re_evaluaciones/*  → personas.js
  └─ 04_evaluacion_agentes/matriz_evaluacion.md → matriz.js
                  ↓
          11ty Data Files (programas, personas, matriz)
                  ↓
          Nunjucks Templates (.njk)
                  ↓
          Static HTML (_site/)
```

## Data Consistency

**Cross-references:**
- `programas.js` and `personas.js` must use consistent candidate names
- `candidateFileMap` in `personas.js` maps short names to full names for file matching
- Matriz uses full candidate names matching `programas.js`

**Validation:**
- Console logs track loading progress (e.g., "Loaded 28 personas with improved evaluations")
- Missing files are handled gracefully (checks with `fs.existsSync()`)
- Flexible regex patterns accommodate markdown format variations

## File Locations

| Data Script | Input Sources | Output Usage |
|-------------|---------------|--------------|
| `src/_data/programas.js` | `05_mejora_evaluaciones/analisis/` | `/programas/` pages |
| `src/_data/personas.js` | `docs/`, `05_mejora_evaluaciones/re_evaluaciones/` | `/personas/` pages |
| `src/_data/matriz.js` | `04_evaluacion_agentes/matriz_evaluacion.md` | `/matriz/` page |

## Related Documentation

- See `_component-inventory.md` for how templates consume this data
- See `_architecture.md` for overall system design
