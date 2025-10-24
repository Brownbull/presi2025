# Plan: Website para Evaluación de Programas Presidenciales Chile 2025

**Fecha:** 24 de Octubre de 2025
**Objetivo:** Crear sitio web simple y navegable para exponer programas presidenciales, evaluaciones de personas y matriz comparativa

---

## 1. ANÁLISIS DE DATOS EXISTENTES

### Contenido Disponible:
- **8 programas presidenciales refinados** (03_extract_refinement/)
  - Eduardo Artes
  - Evelyn Matthei
  - Franco Parisi
  - Harold Mayne-Nicholls
  - Jeannette Jara
  - Johannes Kaiser
  - José Antonio Kast
  - Marco Enríquez-Ominami

- **28 evaluaciones de personas** (04_evaluacion_agentes/)
  - Cada persona evalúa los 8 candidatos
  - Total: 224 evaluaciones individuales

- **1 matriz comparativa** (matriz_evaluacion.md)
  - Tabla 28x8 con calificaciones numéricas
  - Promedios por candidato y persona
  - Rankings generales

---

## 2. ARQUITECTURA DEL SITIO

### 2.1 Stack Tecnológico Recomendado (Simplicidad Máxima)

**Opción A: Generador Estático + GitHub Pages (RECOMENDADO)**
- **Tecnología:** 11ty (Eleventy) o Next.js con export estático
- **Hosting:** GitHub Pages (gratuito)
- **Ventajas:**
  - Cero costo
  - Rápido (pre-renderizado)
  - No requiere servidor
  - Fácil mantenimiento
  - Markdown a HTML automático

**Opción B: Framework Simple + Netlify**
- **Tecnología:** Astro o SvelteKit
- **Hosting:** Netlify (gratuito tier)
- **Ventajas:**
  - Similar a Opción A
  - Mejor DX (developer experience)
  - Hot reload durante desarrollo

**Opción C: HTML/CSS/JS Vanilla + GitHub Pages**
- **Tecnología:** HTML, CSS, JavaScript puro
- **Ventajas:**
  - Máxima simplicidad
  - Sin build tools
  - Control total

**RECOMENDACIÓN: Opción A con 11ty** por balance simplicidad/potencia

---

## 3. ESTRUCTURA DE URLs

```
/                               → Home con introducción y acceso rápido
/programas/                     → Listado de 8 programas
/programas/eduardo-artes/       → Programa individual de Artes
/programas/evelyn-matthei/      → Programa individual de Matthei
... (8 páginas de programas)

/personas/                      → Listado de 28 personas
/personas/01-maria-jose-contreras/  → Evaluación de María José de todos los candidatos
/personas/02-juan-carlos-munoz/     → Evaluación de Juan Carlos
... (28 páginas de personas)

/candidatos/                    → Listado de 8 candidatos con resumen
/candidatos/eduardo-artes/      → Todas las evaluaciones QUE RECIBIÓ Artes
/candidatos/evelyn-matthei/     → Todas las evaluaciones QUE RECIBIÓ Matthei
... (8 páginas de candidatos)

/matriz/                        → Matriz comparativa completa
/metodologia/                   → Explicación del proyecto
/acerca/                        → Sobre el proyecto
```

**Total páginas:** ~50 páginas estáticas

---

## 4. DISEÑO DE INTERFAZ

### 4.1 Principios de Diseño

**Target Audience:** Votantes chilenos (clase media, diversos niveles educativos)

**Características:**
- **Claridad visual:** Tipografía grande, contraste alto
- **Navegación obvia:** Menú fijo, breadcrumbs
- **Responsive:** Mobile-first (70% usuarios móviles en Chile)
- **Accesibilidad:** WCAG AA mínimo
- **Colores:** Neutros, evitar colores políticos partidistas

### 4.2 Layout Base

```
┌─────────────────────────────────────┐
│ HEADER                              │
│ Logo | Programas | Personas | Matriz│
│                          [☕ Donar] │
├─────────────────────────────────────┤
│ BREADCRUMB                          │
│ Home > Programas > Eduardo Artes    │
├─────────────────────────────────────┤
│                                     │
│ CONTENIDO PRINCIPAL                 │
│                                     │
│                                     │
├─────────────────────────────────────┤
│ FOOTER                              │
│ Metodología | Acerca | GitHub       │
└─────────────────────────────────────┘
```

### 4.3 Botón Flotante de Donación

```css
/* Floating Donate Button */
position: fixed;
bottom: 20px;
right: 20px;
z-index: 1000;
background: #FFDD00; /* Buy Me a Coffee yellow */
color: #000;
padding: 15px 25px;
border-radius: 50px;
box-shadow: 0 4px 12px rgba(0,0,0,0.15);
```

**Texto:** "☕ Apóyanos"
**Link:** https://buymeacoffee.com/khujtaaig
**Comportamiento:** Siempre visible, sticky

---

## 5. PÁGINAS DETALLADAS

### 5.1 HOME (/)

**Secciones:**
1. **Hero:**
   - Título: "Programas Presidenciales Chile 2025 - Análisis Comparativo"
   - Subtítulo: "Evaluaciones de 28 personas sobre 8 candidatos"
   - CTA: "Explorar Programas" | "Ver Matriz"

2. **Resumen Rápido:**
   - 3 cards con íconos:
     - 📄 8 Programas Analizados
     - 👥 28 Perspectivas Diferentes
     - 🎯 224 Evaluaciones Totales

3. **Rankings Preview:**
   - Top 3 candidatos por promedio general
   - Link a matriz completa

4. **Navegación Principal:**
   - Grid de 3 columnas: Programas | Personas | Matriz
   - Descripción breve de cada sección

### 5.2 PROGRAMAS (/programas/)

**Listado:**
- Grid de 8 cards (2x4 en desktop, 1x8 en mobile)
- Cada card:
  - Foto del candidato
  - Nombre completo
  - Partido/Coalición
  - Promedio de calificación (X/10)
  - Badge con nivel: "Bien evaluado", "Promedio", "Bajo"
  - Link a programa completo

**Ordenamiento:** Por promedio de calificación (default) con opción A-Z

### 5.3 PROGRAMA INDIVIDUAL (/programas/{slug}/)

**Estructura:**

1. **Header:**
   - Foto del candidato
   - Nombre + Partido
   - Calificación promedio destacada (grande, colorida)
   - Badges: Ranking (#1 de 8), Categoría evaluación

2. **Navegación interna:**
   - Tabs o accordion:
     - Medidas del Programa (texto completo refinado)
     - Resumen Ejecutivo (extraer primeras líneas)
     - Evaluaciones Recibidas (lista de personas que lo evaluaron)

3. **Sección Medidas:**
   - Formato:
     ```
     Medida 1: [Título]
     [Descripción completa]
     [Citas de página]

     Medida 2: ...
     ```
   - Con índice lateral colapsable por secciones

4. **Sección Evaluaciones Recibidas:**
   - Tabla/Cards con:
     - Persona que evaluó
     - Calificación (X/10)
     - Snippet de evaluación (primeros 150 caracteres)
     - Link a evaluación completa

5. **Sidebar (desktop):**
   - Comparar con otro candidato (dropdown)
   - Descargar programa (TXT/PDF)
   - Compartir en redes

### 5.4 PERSONAS (/personas/)

**Listado:**
- Grid de 28 cards (3x10 aprox)
- Cada card:
  - Nombre
  - Edad, Comuna, Ocupación
  - Emoji representativo (según perfil)
  - Tag de grupo: "Profesional", "Trabajador", "Vulnerable", etc.
  - Candidato preferido (con calificación)
  - Link a evaluación completa

**Filtros:**
- Por grupo de interés
- Por rango edad
- Por región
- Por candidato preferido

### 5.5 PERSONA INDIVIDUAL (/personas/{id-slug}/)

**Estructura:**

1. **Perfil:**
   - Nombre destacado
   - Datos demográficos (edad, comuna, ocupación, ingreso)
   - Contexto personal (1-2 párrafos)
   - Prioridades electorales (lista numerada)
   - Frase representativa (quote box)

2. **Evaluaciones:**
   - 8 secciones (una por candidato)
   - Cada sección:
     - Nombre del candidato
     - Calificación (X/10) destacada con color
     - Texto completo de evaluación (250-500 palabras)
     - Badge: ¿Votaría? (Sí/No/Tal vez)
     - Link al programa del candidato

3. **Resumen Visual:**
   - Gráfico de barras con las 8 calificaciones
   - Tabla comparativa rápida

4. **Sidebar:**
   - Candidato preferido (destacado)
   - Candidato rechazado (si aplica)
   - Ver otras personas similares

### 5.6 CANDIDATOS (/candidatos/)

**Listado:**
- Igual que /programas/ pero con énfasis en "evaluaciones recibidas"

### 5.7 CANDIDATO INDIVIDUAL (/candidatos/{slug}/)

**Estructura:**

1. **Header:**
   - Similar a programa individual
   - Promedio de calificación GRANDE
   - Ranking (#X de 8)

2. **Distribución de Evaluaciones:**
   - Gráfico: Histograma de calificaciones (cuántas personas dieron 1/10, 2/10, etc.)
   - Tabla resumen:
     - Calificación más alta (persona + valor)
     - Calificación más baja (persona + valor)
     - Mediana, desviación estándar

3. **Evaluaciones por Persona:**
   - Lista de 28 evaluaciones
   - Cada una:
     - Nombre de persona + perfil breve
     - Calificación (X/10)
     - Extracto de evaluación (150 caracteres)
     - Link a evaluación completa

4. **Análisis por Grupos:**
   - Tabla: "¿Cómo lo evaluó cada grupo?"
     - Profesionales: X.X/10
     - Trabajadores: X.X/10
     - Vulnerables: X.X/10
     - etc.

5. **Sidebar:**
   - Link a programa completo
   - Comparar con otro candidato
   - Compartir análisis

### 5.8 MATRIZ (/matriz/)

**Visualización Principal:**

**Opción A: Tabla Interactiva (RECOMENDADO)**
```
┌────────────────┬─────────┬─────────┬─────────┬───┐
│ Persona        │ Artes   │ Matthei │ Jara    │...│
├────────────────┼─────────┼─────────┼─────────┼───┤
│ 01. María José │ 1.0 🔴  │ 7.0 🟢  │ 6.0 🟡  │...│
│ 02. Juan Carlos│ 6.0 🟡  │ 4.0 🟡  │ 8.0 🟢  │...│
│ ...            │         │         │         │   │
├────────────────┼─────────┼─────────┼─────────┼───┤
│ PROMEDIO       │ 2.7     │ 5.4     │ 5.5     │   │
└────────────────┴─────────┴─────────┴─────────┴───┘
```

**Características:**
- **Colores:** Gradiente verde (10) → amarillo (5) → rojo (0)
- **Hover:** Tooltip con nombre completo + snippet evaluación
- **Click:** Link a evaluación completa
- **Sticky headers:** Nombres de columnas siempre visibles
- **Responsive:** Scroll horizontal en mobile con headers fijos

**Controles:**
- Ordenar por columna (candidato)
- Ordenar por fila (persona)
- Filtrar por grupo de personas
- Highlight: Resaltar candidato o persona

**Opción B: Heatmap Visual**
- Matriz de colores sin números (más visual)
- Para vista general rápida

**Estadísticas Adicionales:**
- Ranking final (ya incluido en markdown)
- Gráfico de barras: Promedio por candidato
- Box plot: Distribución de calificaciones por candidato

### 5.9 METODOLOGÍA (/metodologia/)

**Contenido:**
1. **Introducción:**
   - Qué es este proyecto
   - Por qué lo hicimos
   - A quién está dirigido

2. **Proceso:**
   - Extracción de programas (de dónde, cuándo)
   - Refinamiento a formato estándar
   - Creación de personas (basado en qué)
   - Evaluación (cómo se generaron)

3. **Estándares:**
   - Link a persona_evaluation_standard.md
   - Link a extract_refinement_standard.md
   - Explicación de criterios

4. **Limitaciones:**
   - Evaluaciones generadas (no reales)
   - Basadas en programas escritos (no discursos)
   - Snapshot de fecha específica

5. **Transparencia:**
   - Todo el código en GitHub
   - Datos abiertos
   - Metodología reproducible

### 5.10 ACERCA (/acerca/)

**Contenido:**
1. Quiénes somos (mantener anónimo o usar seudónimo)
2. Motivación del proyecto
3. Cómo apoyarnos (link a Buy Me a Coffee)
4. Contacto (email o form)
5. GitHub repo link

---

## 6. COMPONENTES REUTILIZABLES

### 6.1 Tarjeta de Candidato
```jsx
<CandidateCard>
  <Avatar src="foto.jpg" />
  <Name>Eduardo Artes</Name>
  <Party>Unión Patriótica</Party>
  <Rating value="2.7" max="10" />
  <Badge level="bajo">Bajo promedio</Badge>
  <Link to="/candidatos/eduardo-artes">Ver más</Link>
</CandidateCard>
```

### 6.2 Tarjeta de Persona
```jsx
<PersonaCard>
  <Emoji>👔</Emoji>
  <Name>María José Contreras</Name>
  <Demographics>35 años, Las Condes, Ingeniera</Demographics>
  <Tag>Profesional Agobiada</Tag>
  <Preference>
    Prefiere: <Strong>Evelyn Matthei (7/10)</Strong>
  </Preference>
  <Link to="/personas/01-maria-jose-contreras">Ver evaluaciones</Link>
</PersonaCard>
```

### 6.3 Rating Badge
```jsx
<RatingBadge value={7.0}>
  7.0/10
  <!-- Background color basado en valor -->
</RatingBadge>
```

### 6.4 Evaluation Snippet
```jsx
<EvaluationSnippet>
  <Header>
    <PersonaName>María José</PersonaName>
    <Rating>7.0/10</Rating>
  </Header>
  <Excerpt>
    "Matthei tiene propuestas concretas para salas cuna y sistema de cuidados..."
  </Excerpt>
  <Footer>
    <WouldVote>Sí</WouldVote>
    <Link>Leer completo</Link>
  </Footer>
</EvaluationSnippet>
```

---

## 7. ESTILO VISUAL

### 7.1 Paleta de Colores

**Primarios:**
- **Azul neutro:** #2C5AA0 (confianza, institucional)
- **Verde:** #28A745 (calificaciones altas)
- **Amarillo:** #FFC107 (calificaciones medias)
- **Rojo:** #DC3545 (calificaciones bajas)

**Secundarios:**
- **Gris oscuro:** #343A40 (texto principal)
- **Gris medio:** #6C757D (texto secundario)
- **Gris claro:** #F8F9FA (backgrounds)

**Acentos:**
- **Buy Me a Coffee:** #FFDD00 (botón donar)

**Evitar:** Rojo/Azul políticos tradicionales de Chile

### 7.2 Tipografía

**Encabezados:**
- Fuente: Inter, Roboto, o system-ui
- Peso: 700 (bold)
- Tamaño: 2rem → 1.2rem (h1 → h6)

**Cuerpo:**
- Fuente: Inter, Roboto, o system-ui
- Peso: 400 (regular)
- Tamaño: 16px base, 1.6 line-height
- Max width: 65ch (óptimo para lectura)

**Código/Datos:**
- Fuente: Monospace (para números de medidas)

### 7.3 Espaciado

**Sistema 8pt:**
- 8px, 16px, 24px, 32px, 48px, 64px

**Contenedores:**
- Max width: 1200px (contenido principal)
- Max width: 800px (texto largo)
- Padding horizontal: 16px (mobile), 32px (desktop)

---

## 8. IMPLEMENTACIÓN TÉCNICA

### 8.1 Stack con 11ty (Eleventy)

**Estructura de carpetas:**
```
proyecto/
├── src/
│   ├── _includes/
│   │   ├── layouts/
│   │   │   ├── base.njk           # Layout principal
│   │   │   ├── programa.njk       # Template programa
│   │   │   ├── persona.njk        # Template persona
│   │   │   └── candidato.njk      # Template candidato
│   │   ├── components/
│   │   │   ├── header.njk
│   │   │   ├── footer.njk
│   │   │   ├── candidateCard.njk
│   │   │   ├── personaCard.njk
│   │   │   └── donateButto.njk
│   ├── programas/
│   │   ├── programas.json         # Data para todas las páginas
│   │   ├── eduardo-artes.md
│   │   ├── evelyn-matthei.md
│   │   └── ...
│   ├── personas/
│   │   ├── personas.json
│   │   ├── 01-maria-jose-contreras.md
│   │   └── ...
│   ├── candidatos/
│   │   └── (generado dinámicamente)
│   ├── matriz/
│   │   └── index.njk
│   ├── css/
│   │   ├── main.css
│   │   └── matriz.css
│   ├── js/
│   │   ├── matriz-interactive.js
│   │   └── filters.js
│   └── index.md
├── _data/
│   ├── programas.js               # Parse programas desde TXT
│   ├── personas.js                # Parse personas desde MD
│   ├── matriz.js                  # Parse matriz
│   └── metadata.js                # Info del sitio
├── .eleventy.js                   # Config 11ty
└── package.json
```

### 8.2 Procesamiento de Datos

**Script: _data/programas.js**
```javascript
// Leer archivos TXT de 03_extract_refinement/
// Parsear Medida 1, Medida 2, etc.
// Extraer metadata (nombre candidato, partido)
// Retornar array de objetos

module.exports = function() {
  const fs = require('fs');
  const path = require('path');

  const programasDir = '../03_extract_refinement';
  const files = fs.readdirSync(programasDir).filter(f => f.endsWith('.txt'));

  return files.map(file => {
    const content = fs.readFileSync(path.join(programasDir, file), 'utf8');
    return {
      slug: slugify(file),
      nombre: extractName(file),
      partido: extractPartido(content),
      medidas: parseMedidas(content),
      promedioCalificacion: getPromedio(nombre)
    };
  });
};
```

**Script: _data/personas.js**
```javascript
// Similar para personas
// Parsear markdown
// Extraer perfil + evaluaciones
// Asociar calificaciones
```

**Script: _data/matriz.js**
```javascript
// Parsear matriz_evaluacion.md
// Extraer tabla
// Calcular estadísticas adicionales
// Preparar para visualización
```

### 8.3 Templates Nunjucks

**Ejemplo: layouts/programa.njk**
```html
{% extends "layouts/base.njk" %}

{% block content %}
<article class="programa">
  <header class="programa-header">
    <img src="/img/candidatos/{{ programa.slug }}.jpg" alt="{{ programa.nombre }}">
    <h1>{{ programa.nombre }}</h1>
    <p class="partido">{{ programa.partido }}</p>
    <div class="rating-badge rating-{{ programa.nivel }}">
      {{ programa.promedioCalificacion }}/10
    </div>
  </header>

  <nav class="tabs">
    <button class="tab active">Medidas</button>
    <button class="tab">Evaluaciones</button>
  </nav>

  <section class="medidas">
    {% for medida in programa.medidas %}
    <div class="medida">
      <h3>Medida {{ medida.numero }}: {{ medida.titulo }}</h3>
      <p>{{ medida.descripcion }}</p>
      {% if medida.citas %}
      <cite>[p.{{ medida.citas }}]</cite>
      {% endif %}
    </div>
    {% endfor %}
  </section>

  <section class="evaluaciones">
    {% for evaluacion in programa.evaluacionesRecibidas %}
    {% include "components/evaluationSnippet.njk" %}
    {% endfor %}
  </section>
</article>
{% endblock %}
```

### 8.4 Estilos CSS

**Approach:** Utility-first con custom properties

```css
:root {
  --color-primary: #2C5AA0;
  --color-success: #28A745;
  --color-warning: #FFC107;
  --color-danger: #DC3545;
  --spacing-unit: 8px;
  --font-sans: 'Inter', -apple-system, system-ui, sans-serif;
}

.rating-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing-unit) * 2);
  border-radius: calc(var(--spacing-unit) * 1);
  font-weight: 700;
  font-size: 1.5rem;
}

.rating-alto { background-color: var(--color-success); }
.rating-medio { background-color: var(--color-warning); }
.rating-bajo { background-color: var(--color-danger); }
```

### 8.5 JavaScript Interactivo

**Para la matriz:**
```javascript
// matriz-interactive.js

// Ordenamiento de tabla
function sortTable(columnIndex) {
  // ...
}

// Filtrado de personas
function filterByGroup(group) {
  // ...
}

// Highlight on hover
function highlightRow(personaId) {
  // ...
}

// Tooltips
function showTooltip(cell) {
  // Fetch evaluation snippet
  // Display en tooltip flotante
}
```

---

## 9. BOTÓN DE DONACIÓN

### 9.1 Implementación

**HTML:**
```html
<a
  href="https://buymeacoffee.com/khujtaaig"
  target="_blank"
  rel="noopener noreferrer"
  class="donate-button"
  aria-label="Apóyanos con una donación"
>
  <span class="emoji">☕</span>
  <span class="text">Apóyanos</span>
</a>
```

**CSS:**
```css
.donate-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;

  display: flex;
  align-items: center;
  gap: 8px;

  background: #FFDD00;
  color: #000;
  padding: 12px 24px;
  border-radius: 50px;

  font-weight: 600;
  text-decoration: none;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s, box-shadow 0.2s;
}

.donate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.donate-button .emoji {
  font-size: 1.5rem;
}

/* Mobile: Smaller button */
@media (max-width: 768px) {
  .donate-button {
    bottom: 12px;
    right: 12px;
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
```

### 9.2 Ubicación del Botón

**Presente en:**
- ✅ Todas las páginas
- ✅ Siempre visible (sticky)
- ✅ No intrusivo (esquina)
- ✅ Mobile-friendly

---

## 10. DEPLOYMENT

### 10.1 GitHub Pages (Recomendado)

**Pasos:**
1. Crear repositorio: `programas-presidenciales-2025`
2. Pushear código fuente a `main` branch
3. Configurar GitHub Actions para build automático:

```yaml
# .github/workflows/build.yml
name: Build and Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

4. Configurar Pages en settings
5. URL: `https://username.github.io/programas-presidenciales-2025/`

**Opcional: Dominio Custom**
- Comprar dominio: `programas2025.cl` o similar
- Configurar CNAME en GitHub Pages
- Costo: ~$10-15 USD/año

### 10.2 Netlify (Alternativa)

**Pasos:**
1. Conectar repo de GitHub
2. Build command: `npm run build`
3. Publish directory: `_site`
4. Deploy automático en cada push
5. URL: `https://random-name-12345.netlify.app`
6. Custom domain disponible (gratis)

---

## 11. CRONOGRAMA DE DESARROLLO

### Fase 1: Setup y Data Processing (2-3 días)
- [ ] Instalar 11ty y dependencias
- [ ] Crear estructura de carpetas
- [ ] Escribir scripts de parseo de datos
- [ ] Verificar que todos los datos se cargan correctamente

### Fase 2: Templates y Layouts (3-4 días)
- [ ] Layout base (header, footer)
- [ ] Template programa individual
- [ ] Template persona individual
- [ ] Template candidato individual
- [ ] Página home
- [ ] Página listados (programas, personas)

### Fase 3: Matriz y Visualizaciones (2-3 días)
- [ ] Tabla interactiva
- [ ] Gráficos (Chart.js o similar)
- [ ] Filtros y ordenamiento
- [ ] Responsive design

### Fase 4: Estilos y UX (2-3 días)
- [ ] CSS completo
- [ ] Responsive design
- [ ] Botón de donación
- [ ] Accesibilidad (a11y)
- [ ] Performance optimization

### Fase 5: Testing y Deploy (1-2 días)
- [ ] Pruebas en diferentes dispositivos
- [ ] Pruebas de navegación
- [ ] Configurar GitHub Pages/Netlify
- [ ] Deploy inicial
- [ ] Verificar que todo funciona

**Total estimado: 10-15 días de desarrollo**

---

## 12. CONSIDERACIONES FINALES

### 12.1 SEO

**Meta tags esenciales:**
```html
<meta name="description" content="Análisis comparativo de los 8 programas presidenciales Chile 2025. Evaluaciones de 28 personas con diferentes perfiles.">
<meta name="keywords" content="elecciones chile 2025, programas presidenciales, candidatos">
<meta property="og:title" content="Programas Presidenciales Chile 2025">
<meta property="og:description" content="...">
<meta property="og:image" content="/img/og-image.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**sitemap.xml:** Generado automáticamente por 11ty

### 12.2 Analytics

**Google Analytics 4 o alternativa open-source:**
- Plausible Analytics (privacy-friendly)
- Simple Analytics
- Umami

**Métricas clave:**
- Páginas más visitadas
- Tiempo en sitio
- Candidatos más consultados
- Personas más consultadas

### 12.3 Mantenimiento

**Actualizaciones:**
- Si hay nuevos programas: Re-correr scripts de parseo
- Si hay correcciones: Editar archivos fuente y rebuild
- Si hay nuevas personas: Agregar MD y rebuild

**Backup:**
- Todo en Git (GitHub)
- Data source en `03_extract_refinement/` y `04_evaluacion_agentes/`

### 12.4 Legal

**Disclaimer:**
```
Este sitio presenta evaluaciones generadas con IA basadas en los programas
presidenciales publicados por los candidatos. No representa opiniones
oficiales de ningún candidato ni partido político. Datos actualizados
al [fecha]. Para información oficial, consultar sitios de cada candidatura.
```

---

## 13. CHECKLIST FINAL

### Pre-Launch
- [ ] Todos los programas cargados correctamente
- [ ] Todas las 28 personas con sus evaluaciones
- [ ] Matriz funcional e interactiva
- [ ] Botón de donación funcionando
- [ ] Links verificados (no 404s)
- [ ] Responsive en mobile, tablet, desktop
- [ ] Velocidad < 3s (PageSpeed Insights)
- [ ] Accesibilidad score > 90 (Lighthouse)
- [ ] SEO básico implementado

### Post-Launch
- [ ] Compartir en redes sociales
- [ ] Submittir a directorios/agregadores
- [ ] Monitorear analytics
- [ ] Responder feedback
- [ ] Actualizar si hay cambios en programas

---

## 14. RECURSOS NECESARIOS

### Imágenes
- **Fotos de candidatos:** 8 fotos (buscar en Servel o prensa)
- **Favicon:** Crear simple (ej: 📊)
- **OG Image:** Para compartir en redes (1200x630px)

### Librerías
- **11ty:** Generador estático
- **Chart.js:** Gráficos (opcional)
- **Tippy.js:** Tooltips (para matriz)
- **No jQuery:** Vanilla JS suficiente

### Hosting
- **GitHub Pages:** Gratis, ilimitado
- **Netlify:** Gratis hasta 100GB/mes

**Total costo: $0** (o $10-15/año si se compra dominio)

---

## 15. PRÓXIMOS PASOS

1. **Decisión de stack:** Confirmar 11ty vs Astro vs HTML vanilla
2. **Setup inicial:** Crear repo, instalar dependencias
3. **Data processing:** Prioridad #1 - scripts de parseo
4. **Prototipo:** Crear 1 página de cada tipo para validar
5. **Iteración:** Feedback y ajustes
6. **Launch:** Deploy y compartir

---

**RESUMEN EJECUTIVO:**

Este plan propone un sitio estático simple, rápido y gratuito usando 11ty + GitHub Pages, con 5 secciones principales (programas, personas, candidatos, matriz, metodología), navegación intuitiva, botón flotante de donación siempre visible, y enfoque en mobile-first para el público chileno. Desarrollo estimado: 10-15 días. Costo: $0 (o $10-15/año con dominio custom).

