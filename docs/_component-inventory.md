# UI Components and Templates

> Generated: 2025-11-13 | Scan Level: Exhaustive | Project: presi2025

## Overview

This document catalogs all UI components, layouts, and page templates in the 11ty static site. The site uses Nunjucks (.njk) templates with a component-based architecture.

## Template Architecture

### Pattern: Layout-Based Templates

**Structure:**
```
src/
├── _includes/
│   ├── layouts/
│   │   └── base.njk           # Base layout (header, footer, meta)
│   └── components/
│       └── ai-disclaimer.njk  # Reusable AI disclaimer component
└── [pages]/
    └── *.njk                   # Content pages extending base layout
```

**All pages extend:** `layouts/base.njk`

---

## Layouts

### base.njk

**Location:** `src/_includes/layouts/base.njk`

**Purpose:** Master layout providing consistent structure for all pages.

**Features:**
- HTML5 semantic structure
- Meta tags (SEO, Open Graph)
- Theme toggle with localStorage persistence
- Responsive header navigation
- Footer with AI attribution and links
- Client-side theme switcher

**Navigation Structure:**
```
Inicio | Quiz (dropdown: Todo/Prioridades/Contexto) | Programas | Personas | Evaluación | Metodología
```

**Header Elements:**
- Site title: "Análisis Presidencial Chile 2025 con IA"
- Main navigation with dropdown for quiz variants
- Theme toggle button (light/dark modes)

**Footer Sections:**
1. **AI Badge:** Always visible, links to Anthropic Claude
2. **Sobre este proyecto:** AI analysis disclaimer
3. **Enlaces:** Navigation to key sections
4. **Autor:** Khujta AI contact and donation link

**Scripts:** Loads `assets/js/main.js` for interactivity

**CSS:** Loads `assets/css/main.css` for styling

**Theme System:**
- Uses `data-theme` attribute on `<html>`
- Persists theme choice in localStorage
- Prevents flash of unstyled content with inline script

---

## Components

### ai-disclaimer.njk

**Location:** `src/_includes/components/ai-disclaimer.njk`

**Purpose:** Dismissible banner warning that content is AI-generated.

**Content:**
- Robot emoji icon
- Message: "Análisis generado con IA: Este sitio utiliza Claude Sonnet 4.5..."
- Link to methodology page
- Close button with `dismissDisclaimer()` function

**Usage:** Included in pages that need prominent AI disclosure.

---

## Page Templates

### Homepage (index.njk)

**Location:** `src/index.njk`

**Key Sections:**
1. **Hero/Value Proposition**
   - Main question: "¿Por quién votaría la IA si fuera un chileno?"
   - Answer: Depends on context and priorities

2. **Quiz CTA (Call to Action)**
   - 3 quiz options: Todo / Prioridades / Contexto
   - Each with icon, button, and subtitle

3. **Value Benefits**
   - 28 diverse Chilean profiles
   - 1,547 analyzed measures
   - 224 personalized evaluations
   - 5 minutes to get oriented

4. **How It Works**
   - 3-step process cards
   - Exploration cards for programs/personas/matriz

**Data Dependencies:** None (static content)

---

### Programas List (programas/index.njk)

**Location:** `src/programas/index.njk`

**Purpose:** Listing page for all 8 presidential candidates.

**Data Source:** `programas` global data from `src/_data/programas.js`

**Display:**
- Card grid of candidates
- Each card shows: Name, party, measure count, sections count
- Color-coded by party
- Links to individual program detail pages

---

### Programa Detail (programas/programas.njk)

**Location:** `src/programas/programas.njk`

**Purpose:** Individual candidate program detail page.

**Features:**
- **11ty Pagination:** Creates one page per candidate
- **Breadcrumb navigation:** Inicio / Programas / {Candidate}
- **Header:**
  - Candidate name
  - Party affiliation
  - Stats: measures count, sections count
  - PDF download link (official SERVEL source)
- **Content:** Full markdown content rendered with `markdown` filter

**Data Source:** Paginated from `programas` global data

**Permalink Pattern:** `/programas/{slug}/`

**Dynamic Title:** Candidate name

**Dynamic Description:** "Programa de gobierno de {Candidate} - {Party}"

---

### Personas List (personas/index.njk)

**Location:** `src/personas/index.njk`

**Purpose:** Listing page for all 28 electoral personas.

**Data Source:** `personas` global data from `src/_data/personas.js`

**Display:**
- Card grid of personas
- Each card shows:
  - Emoji icon
  - Number and name
  - Description
  - Age and income (color-coded)
  - Typical phrase
- Links to individual persona detail pages

---

### Persona Detail (personas/personas.njk)

**Location:** `src/personas/personas.njk`

**Purpose:** Individual persona profile and evaluations.

**Features:**
- **11ty Pagination:** Creates one page per persona
- **Breadcrumb:** Inicio / Personas / {Name}
- **Header:**
  - Large emoji
  - Number, name, description
  - Demographics: age, income, occupation, location, situation
- **Quote Block:** Typical phrase (if available)
- **Contexto Section:** Bullet list of context items
- **Prioridades Section:** Ordered list of electoral priorities
- **Evaluaciones Section:** Candidate ratings with summaries
- **Vote Intention:** Top 3 candidates by rating

**Data Source:** Paginated from `personas` global data

**Permalink Pattern:** `/personas/{id}/`

**Dynamic Title:** "{Name} - {Description}"

**Dynamic Description:** "Perfil y evaluaciones de {Name}: {Description}"

---

### Matriz (matriz/index.njk)

**Location:** `src/matriz/index.njk`

**Purpose:** Interactive matrix showing all evaluations.

**Data Source:** `matriz` global data from `src/_data/matriz.js`

**Features:**
- Filterable table (28 personas × 8 candidates)
- Color-coded ratings (green=high, red=low)
- Candidate averages and rankings
- Persona averages
- Client-side filtering/sorting

**Display:**
- Table headers: Candidate names
- Table rows: Persona names with ratings
- Bottom row: Average ratings
- Sidebar: Rankings sorted by average

---

### Metodología (metodologia/index.njk)

**Location:** `src/metodologia/index.njk`

**Purpose:** Explains the analysis methodology.

**Content:** Static markdown describing:
- How programs were extracted and refined
- How personas were defined
- How evaluations were generated with Claude Sonnet 4.5
- Limitations and disclaimers

**Data Dependencies:** None (static content)

---

### Quiz Pages

**Locations:**
- `src/quiz/index.njk` - Combined quiz (7 questions)
- `src/quiz-ideology/index.njk` - Priorities only (5 questions)
- `src/quiz-demographics/index.njk` - Demographics only (6 questions)

**Purpose:** Interactive questionnaires to match users with personas.

**Features:**
- Multi-step form with progress indicator
- Question types: Multiple choice, sliders, checkboxes
- Client-side scoring algorithm
- Results show matched personas with similarity scores
- Links to matched persona detail pages

**Interaction:** Pure client-side JavaScript (no backend)

---

## Component Reusability

### Shared Patterns

**Breadcrumb Navigation:**
- Used in: Programas, Personas detail pages
- Pattern: `<nav class="breadcrumb">` with links

**Card Grid:**
- Used in: Homepage, Programas list, Personas list
- Pattern: `.card-grid` with `.card` items

**Demographics Display:**
- Used in: Personas list and detail
- Pattern: `.persona-demographics` with icon + text spans
- Color-coded: Age (green), Income (orange)

**Rating Display:**
- Used in: Personas evaluations, Matriz
- Filter: `ratingColor` (JavaScript filter in `.eleventy.js`)
- Visual: Background color varies by rating value

---

## Template Filters

Defined in `.eleventy.js`:

| Filter | Purpose | Example |
|--------|---------|---------|
| `limit` | Limit array size | `{% raw %}{{ arr \| limit(5) }}{% endraw %}` |
| `formatNumber` | Format numbers to 2 decimals | `{% raw %}{{ rating \| formatNumber }}{% endraw %}` |
| `ratingColor` | Get color for rating value | `{% raw %}{{ rating \| ratingColor }}{% endraw %}` |
| `slug` | Convert to URL-friendly string | `{% raw %}{{ name \| slug }}{% endraw %}` |
| `personaId` | Zero-pad persona numbers | `{% raw %}{{ numero \| personaId }}{% endraw %}` |
| `find` | Find persona by number | `{% raw %}{{ personas \| find(numero) }}{% endraw %}` |
| `markdown` | Render markdown to HTML | `{% raw %}{{ content \| markdown \| safe }}{% endraw %}` |

---

## Static Assets

### CSS (assets/css/main.css)

**Size:** 826 lines

**Features:**
- CSS custom properties for theming
- Responsive design (mobile-first)
- Dark mode support via `data-theme` attribute
- Color system: Primary, secondary, accent colors
- Typography system
- Component styles for cards, tables, forms
- Quiz-specific styles

**Theme Variables:**
- Light theme (default)
- Dark theme (opt-in via toggle)

### JavaScript (assets/js/main.js)

**Size:** 45 lines

**Features:**
- Theme toggle functionality
- AI disclaimer dismissal (sessionStorage)
- Quiz scoring algorithms (in quiz pages)
- Matrix filtering and sorting

**Client-Side State:**
- `localStorage.theme` - User theme preference
- `sessionStorage.disclaimerDismissed` - Disclaimer state

---

## Pagination Strategy

**11ty Pagination** creates individual pages from collections:

1. **Programas:** 8 pages (one per candidate)
   - Source: `programas` data
   - Alias: `programa`
   - Permalink: `/programas/{slug}/`

2. **Personas:** 28 pages (one per persona)
   - Source: `personas` data
   - Alias: `persona`
   - Permalink: `/personas/{id}/`

---

## Accessibility Features

- Semantic HTML5 elements (`<header>`, `<main>`, `<footer>`, `<nav>`)
- ARIA labels on interactive elements (e.g., theme toggle)
- Keyboard navigation support
- Alt text for meaningful images (emojis are decorative)
- Sufficient color contrast (checked for WCAG compliance)
- Responsive text sizing

---

## Related Documentation

- See `_data-models.md` for data structure details
- See `_architecture.md` for system design
- See `_development-guide.md` for local development setup
