# Source Tree Analysis

> Generated: 2025-11-13 | Scan Level: Exhaustive | Project: presi2025

## Overview

This document provides an annotated directory tree of the presi2025 project, highlighting critical folders, entry points, and key file locations.

## Project Structure

```
presi2025/                                    # Project root
│
├── 📦 Package Configuration
│   ├── package.json                          # Node.js dependencies (11ty, playwright, markdown-it)
│   ├── package-lock.json                     # Dependency lock file
│   ├── requirements.txt                      # Python dependencies (pypdf, pdfminer)
│   └── .eleventy.js                          # 🔑 11ty configuration (entry point)
│
├── 🚀 Static Site Source (11ty)
│   └── src/                                  # Main site source directory
│       ├── _data/                            # 🔑 Data processing scripts (build-time)
│       │   ├── programas.js                  # Loads candidate programs from markdown
│       │   ├── personas.js                   # Loads 28 electoral personas + evaluations
│       │   ├── matriz.js                     # Loads evaluation matrix table
│       │   └── personas_old.js               # Legacy version (unused)
│       │
│       ├── _includes/                        # Reusable templates and components
│       │   ├── layouts/
│       │   │   └── base.njk                  # Master layout (header, footer, nav)
│       │   └── components/
│       │       └── ai-disclaimer.njk         # Dismissible AI warning banner
│       │
│       ├── index.njk                         # 🔑 Homepage (hero, quiz CTA)
│       ├── programas/
│       │   ├── index.njk                     # Candidate listing page
│       │   └── programas.njk                 # Candidate detail template (paginated)
│       ├── personas/
│       │   ├── index.njk                     # Personas listing page
│       │   └── personas.njk                  # Persona detail template (paginated)
│       ├── matriz/
│       │   └── index.njk                     # Interactive evaluation matrix
│       ├── quiz/
│       │   └── index.njk                     # Combined quiz (7 questions)
│       ├── quiz-ideology/
│       │   └── index.njk                     # Priorities-only quiz (5 questions)
│       ├── quiz-demographics/
│       │   └── index.njk                     # Demographics-only quiz (6 questions)
│       ├── metodologia/
│       │   └── index.njk                     # Methodology documentation
│       └── acerca/
│           └── index.njk                     # About page
│
├── 🎨 Static Assets
│   └── assets/
│       ├── css/
│       │   └── main.css                      # Site styles (826 lines, dark mode support)
│       └── js/
│           └── main.js                       # Client-side scripts (45 lines, theme toggle)
│
├── 📊 Data Sources (Electoral Analysis)
│   ├── 01_programas/                         # Original presidential programs
│   │   └── ss_20251020/
│   │       ├── pdf/                          # PDF versions from SERVEL
│   │       └── txt/                          # Text-extracted versions
│   │
│   ├── 02_extract/                           # Initial program extracts
│   │   ├── ss_20250928/                      # Older snapshot (Sept 28)
│   │   └── ss_20251020/                      # Current snapshot (Oct 20)
│   │
│   ├── 03_extract_refinement/                # Refined program extracts
│   │   └── ss_20250928/                      # Refined versions with citations
│   │
│   ├── 04_evaluacion_agentes/                # 🔑 Agent evaluations
│   │   └── matriz_evaluacion.md              # Master matrix (28×8 table)
│   │
│   └── 05_mejora_evaluaciones/               # 🔑 Improved evaluations (primary source)
│       ├── analisis/                         # Candidate master tables
│       │   ├── tabla_maestra_Eduardo_Artes.md
│       │   ├── tabla_maestra_Evelyn_Matthei.md
│       │   ├── tabla_maestra_Franco_Parisi.md
│       │   ├── tabla_maestra_Harold_Mayne_Nicholls.md
│       │   ├── tabla_maestra_Jeannette_Jara.md
│       │   ├── tabla_maestra_Johannes_Kaiser.md
│       │   ├── tabla_maestra_Jose_Antonio_Kast.md
│       │   └── tabla_maestra_Marco_Enriquez_Ominami.md
│       │
│       ├── re_evaluaciones/                  # Persona-specific evaluations
│       │   ├── persona_01_Maria_Jose_Contreras/
│       │   ├── persona_02_Juan_Carlos_Munoz/
│       │   ├── ... (28 persona folders total)
│       │   └── persona_28_*/
│       │       ├── {Candidate}_evaluation.md  # Individual candidate evaluations
│       │       └── ... (8 files per persona)
│       │
│       ├── demo/                             # Demo/prototype files
│       └── metodologia/                      # Methodology docs
│
├── 📄 Documentation
│   └── docs/                                 # BMM documentation + domain docs
│       ├── 01_resumen_analisis.md            # Analysis summary
│       ├── 02_grupos_interes_electoral.md    # 🔑 Interest group personas (source)
│       ├── 03_grupos_emergentes.md           # 🔑 Emerging group personas (source)
│       ├── 04_analisis_electoral.md          # Electoral analysis
│       ├── 05a_resumen_agentes_chile.md      # Chilean agents summary
│       ├── bmm-workflow-status.yaml          # 🔑 BMM workflow tracker
│       ├── project-scan-report.json          # 🔑 Document-project state file
│       ├── _data-models.md                   # Generated: Data processing docs
│       ├── _component-inventory.md           # Generated: Component catalog
│       └── _source-tree-analysis.md          # Generated: This file
│
├── 🤖 AI & Automation
│   ├── .bmad/                                # BMAD Method framework
│   │   ├── bmm/                              # BMad Method module
│   │   ├── bmb/                              # BMad Builder module
│   │   ├── cis/                              # Creative Innovation System
│       └── core/                             # Core workflows and tools
│   │
│   ├── .claude/                              # Claude Code configuration
│   │   ├── agents/                           # Custom AI agents
│   │   ├── commands/                         # Slash commands
│   │   ├── skills/                           # Skills
│   │   └── standards/                        # Documentation standards
│   │
│   ├── ai/                                   # AI-related content
│   │   └── marketing/                        # Marketing materials
│   │
│   ├── 00_metadata/                          # Project metadata
│   └── extract_ratings.py                    # Python script: Extract ratings from evaluations
│
├── 🧪 Testing & Build
│   ├── test-results/                         # Playwright test results
│   ├── playwright-test-*.js                  # Test scripts (4 files)
│   ├── test-site.js                          # Site testing script
│   └── build_matriz_from_re_evaluaciones.js  # Matrix builder script
│
├── ⚙️ CI/CD
│   └── .github/
│       └── workflows/
│           └── deploy.yml                    # 🔑 GitHub Actions deployment workflow
│
└── 📋 Project Documentation
    ├── readme.md                             # Main README
    ├── SETUP.md                              # Setup guide
    ├── COMPLETION_STATUS_FINAL_4_PERSONAS.md # Completion status
    └── prompts_todo.md                       # TODO prompts
```

## Critical Directories

### 1. `src/` - Static Site Source

**Purpose:** 11ty static site generator source files.

**Key Files:**
- `.eleventy.js` - Configuration, filters, plugins
- `src/_data/*.js` - Build-time data processors
- `src/_includes/layouts/base.njk` - Master layout template
- `src/index.njk` - Homepage entry point

**Build Process:**
1. Data scripts in `_data/` run at build time
2. Load markdown sources from `05_mejora_evaluaciones/` and `docs/`
3. Nunjucks templates render with data
4. Output to `_site/` (excluded from tree)

---

### 2. `05_mejora_evaluaciones/` - Primary Data Source

**Purpose:** Contains the improved candidate programs and persona evaluations.

**Structure:**
- `analisis/` - 8 master tables (one per candidate)
- `re_evaluaciones/` - 28 folders (one per persona)
  - Each persona folder: 8 markdown files (one per candidate)

**Usage:**
- `programas.js` reads from `analisis/`
- `personas.js` reads from `re_evaluaciones/`
- Contains 224 total evaluation files (28 personas × 8 candidates)

---

### 3. `docs/` - Documentation Hub

**Purpose:** BMM documentation, domain docs, and generated docs.

**Key Files:**
- `02_grupos_interes_electoral.md` - Personas 1-14 (interest groups)
- `03_grupos_emergentes.md` - Personas 15-28 (emerging groups)
- `bmm-workflow-status.yaml` - Workflow progress tracker
- `project-scan-report.json` - Document-project state
- `_*.md` files - Generated documentation (prefixed with underscore)

---

### 4. `assets/` - Static Assets

**Purpose:** CSS and JavaScript for client-side functionality.

**Files:**
- `css/main.css` - 826 lines, CSS variables, dark mode
- `js/main.js` - 45 lines, theme toggle, disclaimer dismissal

**Features:**
- Responsive design
- Dark/light theme switching with localStorage
- AI disclaimer sessionStorage

---

### 5. `.github/workflows/` - CI/CD

**Purpose:** Automated deployment to GitHub Pages.

**File:** `deploy.yml`

**Workflow:**
1. Trigger: Push to `main` or manual dispatch
2. Setup Node.js 18
3. Install dependencies: `npm ci`
4. Build site: `npm run build`
5. Deploy to GitHub Pages

---

## Entry Points

### Build Entry Point

**File:** `.eleventy.js`

**Function:** Configures 11ty static site generator.

**Key Configuration:**
- Input directory: `src/`
- Output directory: `_site/`
- Includes directory: `src/_includes/`
- Data directory: `src/_data/`
- Template formats: Markdown, Nunjucks, HTML
- Markdown engine: markdown-it with anchor plugin

**Filters Defined:**
- `limit`, `formatNumber`, `ratingColor`, `slug`, `personaId`, `find`, `markdown`

---

### Data Entry Points

**Files:**
- `src/_data/programas.js` - Loads candidate programs
- `src/_data/personas.js` - Loads personas and evaluations
- `src/_data/matriz.js` - Loads evaluation matrix

**Execution:** Run automatically by 11ty at build time.

---

### Application Entry Point

**File:** `src/index.njk`

**Purpose:** Homepage of the deployed static site.

**Key Sections:**
- Hero with value proposition
- Quiz call-to-action
- How it works
- Benefits

---

## Data Flow Diagram

```
PDF Sources (SERVEL)
         ↓
01_programas/ss_20251020/pdf/
         ↓
    [PDF Extraction]
         ↓
01_programas/ss_20251020/txt/
         ↓
    [AI Analysis - Claude Sonnet 4.5]
         ↓
05_mejora_evaluaciones/
  ├─ analisis/ (Master Tables)
  └─ re_evaluaciones/ (Persona Evaluations)
         ↓
src/_data/*.js (Build-time Processing)
         ↓
Nunjucks Templates
         ↓
_site/ (Static HTML)
         ↓
GitHub Pages (Deployment)
```

## Integration Points

**No external APIs** - Fully static site after build.

**Build-Time Integration:**
- `src/_data/programas.js` reads `05_mejora_evaluaciones/analisis/`
- `src/_data/personas.js` reads `docs/` and `05_mejora_evaluaciones/re_evaluaciones/`
- `src/_data/matriz.js` reads `04_evaluacion_agentes/matriz_evaluacion.md`

**Client-Side Integration:**
- localStorage: Theme preference
- sessionStorage: Disclaimer dismissed state
- No server-side processing
- No databases

## Deployment Structure

**Source Control:** Git repository

**Branch Strategy:**
- `main` - Production branch (auto-deploys)
- Feature branches: `claude/*` for AI-assisted development

**Build Artifact:**
- `_site/` directory (gitignored)
- Generated by `npm run build`
- Deployed to GitHub Pages

**Hosting:**
- GitHub Pages (Static hosting)
- Custom domain: CNAME file present

## Related Documentation

- See `_data-models.md` for detailed data structure documentation
- See `_component-inventory.md` for UI component catalog
- See `_architecture.md` for system design overview
- See `_development-guide.md` for setup instructions
