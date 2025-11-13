# Architecture Documentation

> Generated: 2025-11-13 | Scan Level: Exhaustive | Project: presi2025

## Executive Summary

**presi2025** is a static site generator (SSG) application built with 11ty (Eleventy) that analyzes Chilean presidential programs for the 2025 election. The site presents AI-generated evaluations of 8 candidates from the perspective of 28 diverse electoral personas.

**Architecture Pattern:** JAMstack (JavaScript, APIs, Markup)
- **JavaScript:** Build-time data processing with Node.js
- **APIs:** None (fully static after build)
- **Markup:** Pre-rendered HTML from Nunjucks templates

**Deployment Model:** Static hosting on GitHub Pages with CI/CD via GitHub Actions.

---

## Technology Stack

### Frontend Build

| Technology | Version | Purpose |
|------------|---------|---------|
| **11ty (Eleventy)** | 2.0.1 | Static site generator |
| **Nunjucks** | (built-in) | Template engine |
| **markdown-it** | 13.0.2 | Markdown processing |
| **markdown-it-anchor** | 8.6.7 | Heading anchor links |
| **Node.js** | 18+ | Build runtime |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **Playwright** | 1.56.1 | Browser testing |
| **Python** | 3.x | Data extraction scripts |
| **pypdf** | 6.1.1 | PDF processing |
| **pdfminer.six** | 20250506 | PDF text extraction |

### CI/CD

| Technology | Purpose |
|------------|---------|
| **GitHub Actions** | Automated deployment |
| **GitHub Pages** | Static hosting |

---

## Architecture Pattern: Static Site Generation (SSG)

### Build-Time Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD TIME (Local / CI)                   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌────────────────┐        ┌──────────────────┐            │
│  │  Markdown Data │───────▶│  Data Scripts    │            │
│  │  Sources       │        │  (_data/*.js)    │            │
│  └────────────────┘        └──────────────────┘            │
│         │                           │                        │
│         │                           ▼                        │
│         │                  ┌──────────────────┐            │
│         │                  │  JavaScript      │            │
│         │                  │  Objects         │            │
│         │                  │  (programas,     │            │
│         │                  │   personas,      │            │
│         │                  │   matriz)        │            │
│         │                  └──────────────────┘            │
│         │                           │                        │
│         └───────────────────────────┼────────────┐          │
│                                     ▼            │          │
│                            ┌──────────────────┐  │          │
│                            │  11ty Engine     │  │          │
│                            │  (Nunjucks)      │  │          │
│                            └──────────────────┘  │          │
│                                     │            │          │
│                                     ▼            ▼          │
│                            ┌────────────────────────┐       │
│                            │  Static HTML Pages     │       │
│                            │  (_site/ directory)    │       │
│                            └────────────────────────┘       │
│                                     │                        │
└─────────────────────────────────────┼────────────────────────┘
                                      │
                                      ▼
                            ┌────────────────────┐
                            │  GitHub Pages      │
                            │  (Static Hosting)  │
                            └────────────────────┘
```

### Runtime Architecture

```
┌────────────────────────────────────────────────────────┐
│                  RUNTIME (Browser)                      │
├────────────────────────────────────────────────────────┤
│                                                          │
│   User Browser                                          │
│   ┌──────────────────────────────────────────────┐    │
│   │                                                │    │
│   │  ┌──────────────┐      ┌──────────────────┐  │    │
│   │  │ Static HTML   │      │  CSS (main.css)  │  │    │
│   │  │ (Pre-rendered)│      │  (826 lines)     │  │    │
│   │  └──────────────┘      └──────────────────┘  │    │
│   │         │                        │            │    │
│   │         └────────────┬───────────┘            │    │
│   │                      ▼                         │    │
│   │              ┌───────────────┐                │    │
│   │              │  DOM Rendered │                │    │
│   │              └───────────────┘                │    │
│   │                      │                         │    │
│   │                      ▼                         │    │
│   │           ┌──────────────────────┐            │    │
│   │           │ JS (main.js, 45 LOC) │            │    │
│   │           │ - Theme toggle        │            │    │
│   │           │ - Disclaimer dismiss  │            │    │
│   │           │ - Quiz scoring        │            │    │
│   │           └──────────────────────┘            │    │
│   │                      │                         │    │
│   │                      ▼                         │    │
│   │              ┌───────────────┐                │    │
│   │              │ localStorage   │                │    │
│   │              │ sessionStorage │                │    │
│   │              └───────────────┘                │    │
│   │                                                │    │
│   └──────────────────────────────────────────────┘    │
│                                                          │
│   NO SERVER-SIDE PROCESSING                            │
│   NO API CALLS                                         │
│   NO DATABASE                                          │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## Data Architecture

### Data Flow

```
Original Sources (PDF)
         ↓
   [PDF → Text Extraction]
         ↓
Markdown Files (05_mejora_evaluaciones/)
         ├─ analisis/tabla_maestra_{Candidate}.md      (8 files)
         └─ re_evaluaciones/persona_{N}_*/{Candidate}.md  (224 files)
         ↓
Data Scripts (Build-time)
         ├─ programas.js  → Array<Programa>
         ├─ personas.js   → Array<Persona>
         └─ matriz.js     → MatrizData
         ↓
11ty Global Data
         ↓
Nunjucks Templates
         ↓
Static HTML (_site/)
```

### Data Models

**Programa Object:**
```javascript
{
  slug: String,          // URL identifier
  nombre: String,        // Candidate name
  partido: String,       // Political party
  color: String,         // Brand color
  numMedidas: Number,    // Measures count
  secciones: Number,     // Sections count
  contenido: String      // Full markdown content
}
```

**Persona Object:**
```javascript
{
  numero: String,              // Persona number
  id: String,                  // URL-friendly ID
  nombre: String,              // Name
  edad: String,                // Age
  ingreso: String,             // Income
  evaluaciones: Array<{        // Candidate ratings
    candidato: String,
    rating: Number,
    resumen: String
  }>,
  voteIntention: Array<{...}>  // Top 3 candidates
}
```

**Matriz Object:**
```javascript
{
  candidatos: Array<String>,       // Candidate names
  evaluaciones: Array<{            // Persona evaluations
    numero: String,
    nombre: String,
    evaluaciones: Object,          // Map: candidato → rating
    promedio: Number
  }>,
  promedios: Object,               // Map: candidato → average
  rankings: Array<{...}>           // Sorted by average
}
```

---

## Component Architecture

### Layout Hierarchy

```
base.njk (Master Layout)
    ├─ HTML structure
    ├─ <head> (meta, CSS)
    ├─ <header> (navigation)
    ├─ <main>
    │     └─ {{ content | safe }}  ← Page content injected here
    ├─ <footer> (AI attribution, links)
    └─ <script> (main.js)

Page Templates (extend base.njk)
    ├─ index.njk (Homepage)
    ├─ programas/
    │     ├─ index.njk (List)
    │     └─ programas.njk (Detail, paginated)
    ├─ personas/
    │     ├─ index.njk (List)
    │     └─ personas.njk (Detail, paginated)
    ├─ matriz/index.njk
    ├─ quiz/index.njk
    ├─ quiz-ideology/index.njk
    ├─ quiz-demographics/index.njk
    └─ metodologia/index.njk

Components (reusable)
    └─ ai-disclaimer.njk
```

### Pagination Strategy

**11ty Pagination** generates multiple pages from collections:

1. **Programas:** 8 pages from `programas` data
   - URL pattern: `/programas/{slug}/`

2. **Personas:** 28 pages from `personas` data
   - URL pattern: `/personas/{id}/`

---

## Deployment Architecture

### CI/CD Pipeline

```
Developer
    ↓
git push origin main
    ↓
GitHub Actions (.github/workflows/deploy.yml)
    │
    ├─ 1. Checkout code
    ├─ 2. Setup Node.js 18
    ├─ 3. npm ci (install dependencies)
    ├─ 4. npm run build (generate _site/)
    ├─ 5. Upload artifact
    └─ 6. Deploy to GitHub Pages
            ↓
    GitHub Pages (Static Hosting)
            ↓
    https://{username}.github.io/presi2025/
```

### Hosting Infrastructure

**Provider:** GitHub Pages

**Features:**
- Global CDN
- HTTPS enabled
- Custom domain support (CNAME file present)
- Zero server management

**Build Artifact:**
- `_site/` directory
- Contains all static HTML, CSS, JS, and assets
- No server-side processing required

---

## Development Workflow

### Local Development

```bash
npm start  # Start dev server with hot reload
```

**Process:**
1. 11ty watches `src/` and `assets/`
2. On file change: Rebuilds affected pages
3. BrowserSync reloads browser automatically
4. Data scripts re-run on template changes

### Production Build

```bash
npm run build
```

**Process:**
1. Clean previous `_site/` (optional)
2. Run all data scripts in `src/_data/`
3. Process all templates
4. Copy assets to `_site/`
5. Generate final HTML

---

## Testing Strategy

### Automated Testing

**Tool:** Playwright

**Test Files:**
- `playwright-test-final.js` - End-to-end tests
- `playwright-test-markdown.js` - Markdown rendering tests
- `playwright-test-matriz-debug.js` - Matrix functionality tests
- `playwright-test-site-comprehensive.js` - Comprehensive site tests

**Test Coverage:**
- Page rendering
- Navigation
- Quiz functionality
- Theme toggle
- Responsive design

### Manual Testing

**Areas:**
- Cross-browser compatibility (Chrome, Firefox, Safari)
- Mobile responsiveness
- Accessibility (WCAG compliance)
- Performance (Lighthouse scores)

---

## Security Architecture

### Build-Time Security

- No secrets in codebase
- Dependencies scanned via npm audit
- Playwright runs in isolated containers

### Runtime Security

**No Attack Surface:**
- No backend server
- No database
- No API endpoints
- No user authentication
- No form submissions (quiz is client-side only)

**Client-Side Storage:**
- localStorage: Theme preference (non-sensitive)
- sessionStorage: Disclaimer state (non-sensitive)

**Content Security:**
- Static HTML (no XSS vectors)
- No eval() or dangerous functions
- Markdown sanitized by markdown-it

---

## Performance Characteristics

### Build Performance

- **Build Time:** ~5-15 seconds (depends on content size)
- **Incremental Builds:** Yes (dev mode)
- **Parallelization:** 11ty processes templates in parallel

### Runtime Performance

- **Page Load:** < 1 second (cached)
- **Time to Interactive:** < 1 second
- **JavaScript Size:** 45 lines (~2 KB)
- **CSS Size:** 826 lines (~15 KB)
- **No external dependencies** loaded at runtime

### Optimization Techniques

- Static HTML (no server processing)
- Minimal JavaScript
- CSS custom properties (fast theme switching)
- Lazy loading not needed (pages are small)

---

## Scalability

### Content Scalability

**Current:**
- 8 candidates
- 28 personas
- 224 evaluations
- ~100 pages generated

**Scalable To:**
- 50+ candidates
- 100+ personas
- 5,000+ pages
- No performance degradation (static files)

### Build Scalability

- Build time grows linearly with content
- Can be parallelized with GitHub Actions matrix strategy
- No database bottlenecks

---

## Extensibility

### Adding New Features

**New Page Types:**
1. Create template in `src/`
2. Add to navigation in `base.njk`
3. No backend changes needed

**New Data Sources:**
1. Add script to `src/_data/`
2. Return JavaScript object/array
3. Access in templates via global data

**New Components:**
1. Create in `src/_includes/components/`
2. Include in templates with `{% include %}`

### Integration Points

**Possible Integrations:**
- **Analytics:** Add script to `base.njk`
- **Comments:** Embed third-party widget
- **Social Sharing:** Add meta tags and buttons
- **Newsletter:** Embed form (static or iframe)

---

## Disaster Recovery

### Backup Strategy

**Source Code:** Git repository on GitHub

**Data Sources:** Committed to repository
- `05_mejora_evaluaciones/`
- `docs/`
- `04_evaluacion_agentes/`

**Build Artifacts:** Regenerable from source

### Recovery Process

1. Clone repository
2. `npm install`
3. `npm run build`
4. Deploy `_site/` to any static host

**Recovery Time Objective (RTO):** < 1 hour

---

## Monitoring and Observability

### Build Monitoring

- GitHub Actions logs
- Build status badges
- Email notifications on failures

### Runtime Monitoring

**No server-side monitoring needed** (static site).

**Possible Monitoring:**
- Google Analytics (page views)
- GitHub Pages status
- Uptime monitoring (external service)

---

## Technology Decisions

### Why 11ty?

- **Simplicity:** Minimal configuration
- **Performance:** Fast builds, fast sites
- **Flexibility:** Works with multiple template engines
- **No client-side framework:** Pure HTML/CSS/JS
- **SEO-friendly:** Pre-rendered HTML

### Why JAMstack?

- **Speed:** Static files serve instantly
- **Security:** No server attack surface
- **Cost:** Free hosting on GitHub Pages
- **Scalability:** CDN distribution
- **Developer Experience:** Simple deployment

### Why Nunjucks?

- **Powerful:** Template inheritance, macros, filters
- **Familiar:** Similar to Jinja2, Liquid
- **Well-integrated:** Native 11ty support

---

## Constraints and Limitations

### Current Limitations

1. **No Backend:** Can't store user data, handle authentication
2. **No Real-time:** Content updates require rebuild + redeploy
3. **No Search:** Would need client-side search index or third-party service
4. **Large Datasets:** Build time grows with content size

### Architectural Constraints

- Static content only
- Build-time data processing
- Client-side interactivity limited to JavaScript
- No database queries at runtime

---

## Future Architecture Considerations

### For Interactive Features (Voting, Comments)

**Option 1: Serverless Functions**
- Add Netlify/Vercel functions
- Store data in cloud database
- Hybrid static + dynamic

**Option 2: Third-Party Services**
- Comments: Disqus, Utterances
- Voting: Custom API with CORS
- Analytics: Google Analytics

### For Search

**Option 1: Client-Side Search**
- Generate search index at build time (JSON)
- Use Lunr.js or similar

**Option 2: Third-Party Search**
- Algolia DocSearch
- Elasticsearch (hosted)

---

## Related Documentation

- See `_data-models.md` for data structure details
- See `_component-inventory.md` for UI components
- See `_source-tree-analysis.md` for directory structure
- See `_development-guide.md` for setup and workflow
