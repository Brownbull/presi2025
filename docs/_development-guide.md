# Development Guide

> Generated: 2025-11-13 | Project: presi2025

## Prerequisites

- **Node.js:** v18 or higher (current: v22.21.1)
- **npm:** Included with Node.js
- **Python:** 3.x (for data processing scripts)
- **Git:** For version control

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/{username}/presi2025.git
cd presi2025
```

### 2. Install Node.js Dependencies

```bash
npm install
```

**Installs:**
- `@11ty/eleventy` ^2.0.1 - Static site generator
- `playwright` ^1.56.1 - Browser automation (dev)
- `markdown-it` ^13.0.2 - Markdown processing
- `markdown-it-anchor` ^8.6.7 - Heading anchors
- `@anthropic-ai/claude-agent-sdk` ^0.1.0 - Claude integration

### 3. Install Python Dependencies (Optional)

For PDF processing and data extraction:

```bash
pip install -r requirements.txt
```

**Installs:** pypdf, pdfminer.six, jupyter, ipython

## Local Development

### Start Development Server

```bash
npm start
```

- Starts 11ty with hot reload
- Opens at `http://localhost:8080`
- Watches for file changes in `src/` and `assets/`
- Auto-rebuilds on save

### Build for Production

```bash
npm run build
```

- Generates static site in `_site/` directory
- Processes all templates and data
- Optimizes for deployment

### Debug Mode

```bash
npm run debug
```

- Runs with `DEBUG=Eleventy*` flag
- Shows detailed 11ty processing logs

## Project Structure

```
presi2025/
├── src/              # Site source (templates, pages)
├── assets/           # CSS and JavaScript
├── docs/             # Documentation
├── _site/            # Build output (gitignored)
└── .eleventy.js      # 11ty configuration
```

## Development Workflow

### 1. Data Updates

**To update candidate programs:**
1. Place new markdown in `05_mejora_evaluaciones/analisis/`
2. Follow naming: `tabla_maestra_{Candidate}_Name.md`
3. Rebuild: `npm run build`

**To update persona evaluations:**
1. Place files in `05_mejora_evaluaciones/re_evaluaciones/persona_{N}_*/`
2. Name format: `{Candidate}_evaluation.md`
3. Rebuild: `npm run build`

### 2. Template Updates

**Edit templates:**
- Pages: `src/*.njk`
- Layouts: `src/_includes/layouts/base.njk`
- Components: `src/_includes/components/*.njk`

**Hot reload** automatically shows changes.

### 3. Style Updates

**Edit CSS:**
- File: `assets/css/main.css`
- Uses CSS custom properties for theming
- Hot reload enabled

**Edit JavaScript:**
- File: `assets/js/main.js`
- Client-side only (no build step)
- Hot reload enabled

### 4. Data Processing

**Data scripts location:** `src/_data/*.js`

**Execution:** Run automatically at build time by 11ty.

**Available data:**
- `programas` - Candidate programs array
- `personas` - Personas array with evaluations
- `matriz` - Evaluation matrix object

## Testing

### Run Playwright Tests

```bash
npx playwright test
```

**Test files:**
- `playwright-test-final.js`
- `playwright-test-markdown.js`
- `playwright-test-matriz-debug.js`
- `playwright-test-site-comprehensive.js`

### Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] All 8 candidate programs accessible
- [ ] All 28 personas accessible
- [ ] Matriz displays correctly
- [ ] Quiz functionality works
- [ ] Theme toggle works (light/dark)
- [ ] AI disclaimer dismisses
- [ ] Navigation links work
- [ ] Responsive on mobile
- [ ] No console errors

## Common Tasks

### Add a New Candidate

1. Add entry to `src/_data/programas.js` candidatos array
2. Create `tabla_maestra_{Name}.md` in `05_mejora_evaluaciones/analisis/`
3. Create evaluation files for each persona
4. Rebuild and verify

### Add a New Persona

1. Add to `docs/02_grupos_interes_electoral.md` or `docs/03_grupos_emergentes.md`
2. Create folder in `05_mejora_evaluaciones/re_evaluaciones/`
3. Add 8 evaluation files (one per candidate)
4. Rebuild and verify

### Update Styles

**CSS variables location:** Top of `assets/css/main.css`

**Key variables:**
- `--color-primary`, `--color-secondary`, `--color-accent`
- `--color-text`, `--color-background`
- `--spacing-*`, `--font-size-*`

### Deploy to GitHub Pages

**Automatic deployment** via GitHub Actions:

1. Commit changes
2. Push to `main` branch
3. GitHub Actions runs `.github/workflows/deploy.yml`
4. Site deploys automatically

**Manual deployment:**

```bash
npm run build
# Copy _site/ contents to gh-pages branch or hosting
```

## Environment Configuration

### No .env Required

This is a fully static site with no backend or API keys.

### Client-Side Storage

- **localStorage:** Theme preference (`theme` key)
- **sessionStorage:** Disclaimer dismissed state

## Build Output

**Directory:** `_site/`

**Contents:**
- Static HTML files for all pages
- Copied assets (`assets/css/`, `assets/js/`)
- Generated pages from templates

**Size:** ~2-5 MB (depends on content)

## Performance Optimization

### Build Performance

- Data scripts cache parsed markdown
- 11ty incremental builds (watches for changes)
- Pagination generates pages efficiently

### Runtime Performance

- Static HTML (no server processing)
- Minimal JavaScript (45 lines)
- CSS with custom properties (fast rendering)
- No external dependencies loaded

## Troubleshooting

### Issue: "Cannot find module '@11ty/eleventy'"

**Solution:** Run `npm install`

### Issue: Data not updating

**Solution:**
1. Clear `_site/` directory: `rm -rf _site`
2. Rebuild: `npm run build`

### Issue: Hot reload not working

**Solution:**
1. Stop server (Ctrl+C)
2. Restart: `npm start`

### Issue: Persona evaluations not loading

**Solution:**
1. Check file paths in `src/_data/personas.js`
2. Verify folder structure: `re_evaluaciones/persona_{N}_*/`
3. Check candidate name mapping in `candidateFileMap`

### Issue: Matrix shows N/A

**Solution:**
1. Verify `04_evaluacion_agentes/matriz_evaluacion.md` exists
2. Check markdown table format
3. Run `python extract_ratings.py` to regenerate

## Related Scripts

### extract_ratings.py

**Purpose:** Extract ratings from evaluation files and generate matrix.

**Usage:**
```bash
python extract_ratings.py
```

**Output:** `04_evaluacion_agentes/matriz_evaluacion.md`

### build_matriz_from_re_evaluaciones.js

**Purpose:** Build matrix from re_evaluaciones folder.

**Usage:**
```bash
node build_matriz_from_re_evaluaciones.js
```

## Related Documentation

- See `_architecture.md` for system design
- See `_data-models.md` for data structure details
- See `_component-inventory.md` for UI components
- See `readme.md` for project overview
