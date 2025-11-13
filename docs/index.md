# Project Documentation Index

> Generated: 2025-11-13 | Documentation for: **presi2025** | Scan Level: Exhaustive

## Project Overview

**Project Name:** presi2025
**Type:** Monolith - Web Application (11ty Static Site)
**Primary Language:** JavaScript (Node.js)
**Architecture:** JAMstack (Static Site Generation)
**Purpose:** AI-powered analysis of Chilean 2025 presidential programs from the perspective of 28 electoral personas

---

## Quick Reference

| Aspect | Details |
|--------|---------|
| **Tech Stack** | 11ty (Eleventy) 2.0.1 + Nunjucks + markdown-it |
| **Node Version** | 18+ (current: v22.21.1) |
| **Entry Point** | `.eleventy.js` (build config) |
| **Source Directory** | `src/` |
| **Build Output** | `_site/` (gitignored) |
| **Development Server** | `npm start` → http://localhost:8080 |
| **Production Build** | `npm run build` |
| **Deployment** | GitHub Actions → GitHub Pages |
| **CI/CD** | `.github/workflows/deploy.yml` |

---

## Generated Documentation

### Core Documentation

#### [📊 Architecture](_architecture.md)
Complete system design and architectural patterns.

**Contents:**
- Executive summary
- Technology stack
- Architecture patterns (Build-time & Runtime)
- Data architecture and flow
- Component hierarchy
- Deployment architecture
- Security and performance
- Technology decisions and trade-offs

**When to use:** Understanding system design, planning major changes, onboarding new developers.

---

#### [📦 Data Models](_data-models.md)
Data processing scripts and structure documentation.

**Contents:**
- Data processing layer overview
- `programas.js` - Candidate programs loader
- `personas.js` - Electoral personas and evaluations loader
- `matriz.js` - Evaluation matrix parser
- Data flow diagrams
- Cross-references and validation

**When to use:** Working with data sources, understanding how markdown transforms into site data, debugging data issues.

---

#### [🎨 Component Inventory](_component-inventory.md)
UI components, templates, and page structure catalog.

**Contents:**
- Template architecture
- Layouts (`base.njk`)
- Components (`ai-disclaimer.njk`)
- Page templates (programas, personas, matriz, quiz variants)
- Template filters and helpers
- Static assets (CSS, JavaScript)
- Pagination strategy
- Accessibility features

**When to use:** Building new pages, modifying layouts, understanding template structure, styling updates.

---

#### [🌳 Source Tree Analysis](_source-tree-analysis.md)
Annotated directory tree with detailed explanations.

**Contents:**
- Complete project structure
- Critical directories explained
- Entry points (build, data, application)
- Data flow diagram
- Integration points
- Deployment structure

**When to use:** Navigating the codebase, understanding project organization, finding specific files.

---

#### [🛠️ Development Guide](_development-guide.md)
Setup instructions and development workflow.

**Contents:**
- Prerequisites and installation
- Local development commands
- Project structure
- Development workflow (data updates, templates, styles)
- Testing procedures
- Common tasks
- Troubleshooting

**When to use:** Setting up development environment, daily development tasks, resolving common issues.

---

## Existing Documentation

### Project Documentation

#### [readme.md](../readme.md)
Main project README with overview, structure, and technologies.

#### [SETUP.md](../SETUP.md)
Website implementation guide and next steps.

#### [COMPLETION_STATUS_FINAL_4_PERSONAS.md](../COMPLETION_STATUS_FINAL_4_PERSONAS.md)
Project completion status tracking.

#### [prompts_todo.md](../prompts_todo.md)
TODO prompts and extraction workflow steps.

---

### Domain Documentation

#### [01_resumen_analisis.md](01_resumen_analisis.md)
Analysis summary and overview.

#### [02_grupos_interes_electoral.md](02_grupos_interes_electoral.md)
🔑 **Interest group personas** (Personas 1-14)
**Critical:** Source file for `personas.js` data script.

#### [03_grupos_emergentes.md](03_grupos_emergentes.md)
🔑 **Emerging group personas** (Personas 15-28)
**Critical:** Source file for `personas.js` data script.

#### [04_analisis_electoral.md](04_analisis_electoral.md)
Electoral analysis and methodology.

#### [05a_resumen_agentes_chile.md](05a_resumen_agentes_chile.md)
Chilean AI agents summary.

---

### BMM Workflow Documentation

#### [bmm-workflow-status.yaml](bmm-workflow-status.yaml)
🔑 **BMad Method workflow tracker**
Tracks progress through BMM methodology phases.

**Current Status:**
- Track: BMad Method (brownfield)
- Field Type: Brownfield
- Next Workflow: brainstorm-project (optional) or PRD (required)

---

## Getting Started

### For New Developers

1. **Read:** [Development Guide](_development-guide.md) for setup
2. **Understand:** [Architecture](_architecture.md) for system design
3. **Navigate:** [Source Tree Analysis](_source-tree-analysis.md) for structure
4. **Build:** `npm install && npm start`

### For Content Updates

1. **Read:** [Data Models](_data-models.md) to understand data sources
2. **Update:** Markdown files in `05_mejora_evaluaciones/`
3. **Rebuild:** `npm run build`
4. **Verify:** Check `_site/` output

### For UI Changes

1. **Read:** [Component Inventory](_component-inventory.md)
2. **Edit:** Templates in `src/` or styles in `assets/css/`
3. **Hot Reload:** Changes appear automatically with `npm start`

### For Architecture Planning

1. **Read:** [Architecture](_architecture.md) for current design
2. **Consider:** Constraints and limitations section
3. **Plan:** Future architecture considerations

---

## Data Sources Location

| Data Type | Source Location | Consumed By |
|-----------|----------------|-------------|
| **Candidate Programs** | `05_mejora_evaluaciones/analisis/tabla_maestra_*.md` | `src/_data/programas.js` |
| **Persona Definitions** | `docs/02_grupos_interes_electoral.md`, `docs/03_grupos_emergentes.md` | `src/_data/personas.js` |
| **Persona Evaluations** | `05_mejora_evaluaciones/re_evaluaciones/persona_*/*` | `src/_data/personas.js` |
| **Evaluation Matrix** | `04_evaluacion_agentes/matriz_evaluacion.md` | `src/_data/matriz.js` |

---

## Key Directories

| Directory | Purpose | Documentation |
|-----------|---------|---------------|
| `src/` | Site source (templates, pages) | [Component Inventory](_component-inventory.md) |
| `src/_data/` | Build-time data processing | [Data Models](_data-models.md) |
| `assets/` | CSS and JavaScript | [Component Inventory](_component-inventory.md) |
| `05_mejora_evaluaciones/` | Primary data source | [Data Models](_data-models.md), [Source Tree](_source-tree-analysis.md) |
| `docs/` | Documentation + persona sources | This index |
| `.bmad/` | BMAD Method framework | `bmm-workflow-status.yaml` |
| `.claude/` | Claude Code configuration | See `.claude/agents/`, `.claude/commands/` |

---

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (hot reload)
npm start

# Build for production
npm run build

# Run tests
npx playwright test

# Debug mode
npm run debug
```

---

## Deployment

**Automatic Deployment:**
- Push to `main` branch
- GitHub Actions runs `.github/workflows/deploy.yml`
- Site builds and deploys to GitHub Pages

**Manual Deployment:**
- Run `npm run build`
- Deploy `_site/` contents to any static host

---

## Architecture Highlights

### Build-Time Architecture

```
Markdown Sources → Data Scripts → 11ty → Static HTML → GitHub Pages
```

### Data Flow

```
PDF (SERVEL) → Text Extraction → AI Analysis (Claude Sonnet 4.5) →
Markdown (05_mejora_evaluaciones/) → Build-time Processing →
Static Site
```

### No Runtime Dependencies

- No backend server
- No database
- No API calls
- Fully static after build

---

## Technology Decisions

**Why 11ty?**
- Simple, fast static site generator
- No client-side framework overhead
- SEO-friendly pre-rendered HTML

**Why JAMstack?**
- Instant page loads (static files)
- Free hosting (GitHub Pages)
- No server management
- High security (no attack surface)

**Why No Backend?**
- Project requirements met with static content
- No user data storage needed
- Simplifies deployment and hosting

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Module not found | [Development Guide - Troubleshooting](_development-guide.md#troubleshooting) |
| Data not updating | [Development Guide - Troubleshooting](_development-guide.md#issue-data-not-updating) |
| Persona evaluations missing | [Development Guide - Troubleshooting](_development-guide.md#issue-persona-evaluations-not-loading) |
| Matrix shows N/A | [Development Guide - Troubleshooting](_development-guide.md#issue-matrix-shows-na) |
| Hot reload not working | [Development Guide - Troubleshooting](_development-guide.md#issue-hot-reload-not-working) |

---

## Next Steps with BMad Method

According to `bmm-workflow-status.yaml`, your workflow path:

**Phase 0: Discovery** (Optional)
- ✅ Brainstorm Project
- ✅ Research

**Phase 1: Planning** (Required)
- 📋 PRD - Product Requirements Document
- 🎨 UX Design (if UI components)

**Phase 2: Solutioning** (Recommended for brownfield)
- 🏗️ Architecture - Integration design
- ✅ Solutioning Gate Check

**Phase 3: Implementation**
- 📊 Sprint Planning
- 💻 Story Development

**To continue:** Run BMM workflows starting with brainstorm-project or PRD.

---

## Contact and Attribution

**Author:** Khujta AI (Gabe C)
**Email:** khujta.ai@gmail.com
**AI Analysis:** Claude Sonnet 4.5 (Anthropic)
**License:** MIT

---

## Documentation Maintenance

**Last Generated:** 2025-11-13
**Workflow:** document-project (exhaustive scan)
**Status File:** `project-scan-report.json`

**To update documentation:**
1. Run `/bmad:bmm:workflows:document-project`
2. Choose scan level (quick/deep/exhaustive)
3. Documentation regenerates automatically

---

**📌 This index is your primary entry point for AI-assisted development. All documentation is optimized for LLM context and human readability.**
