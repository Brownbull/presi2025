# Plan: Website Análisis con IA - Programas Presidenciales Chile 2025

**Fecha:** 24 de Octubre de 2025
**Autor:** Gabe C ([LinkedIn](https://www.linkedin.com/in/gabriel-carcamo/))
**Objetivo:** Sitio web estático para exponer análisis con IA de programas presidenciales

---

## ⚡ DECISIONES CONFIRMADAS

### Stack Tecnológico
✅ **11ty (Eleventy) + GitHub Pages**
- Generador estático
- Hosting gratuito
- Markdown a HTML
- Cero costos operativos

### Branding y SEO
✅ **Título:** Análisis con IA sobre Programas Presidenciales Chile 2025
✅ **Autor:** Gabe C
✅ **AI Disclaimer:** Visible permanentemente (ver sección 2.2)

---

## 1. AI DISCLAIMER - IMPLEMENTACIÓN

### 1.1 Ubicación: Header Sticky (RECOMENDADO)

**Diseño:**
```
┌────────────────────────────────────────────────────────────┐
│ ⚠️ Este sitio usa IA (Claude Sonnet 4.5) para analizar   │
│ programas. Programas refinados, personas y evaluaciones    │
│ son generados con IA. [Más info]                    [✕]   │
└────────────────────────────────────────────────────────────┘
```

**Características:**
- **Posición:** Top del header, encima del menú principal
- **Color de fondo:** Amarillo suave (#FFF9C4)
- **Borde:** Amarillo oscuro (#F57F17)
- **Icono:** ⚠️ o 🤖
- **Comportamiento:**
  - Visible en primera visita
  - Botón [✕] para cerrar
  - Cookie/localStorage para no mostrar más (sesión)
  - Link [Más info] → /metodologia/

**HTML:**
```html
<div class="ai-disclaimer" id="aiDisclaimer">
  <div class="disclaimer-content">
    <span class="icon">🤖</span>
    <p>
      <strong>Análisis generado con IA:</strong>
      Este sitio utiliza Claude Sonnet 4.5 de Anthropic para analizar
      programas presidenciales. Todos los contenidos (programas refinados,
      personas y evaluaciones) fueron generados con inteligencia artificial.
      <a href="/metodologia/" class="learn-more">Más información</a>
    </p>
    <button class="close-disclaimer" aria-label="Cerrar aviso">✕</button>
  </div>
</div>
```

**CSS:**
```css
.ai-disclaimer {
  position: sticky;
  top: 0;
  z-index: 9998;
  background: linear-gradient(135deg, #FFF9C4 0%, #FFF59D 100%);
  border-bottom: 2px solid #F57F17;
  padding: 12px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.disclaimer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 12px;
}

.disclaimer-content .icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.disclaimer-content p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
}

.disclaimer-content strong {
  color: #F57F17;
}

.learn-more {
  color: #1976D2;
  text-decoration: underline;
  font-weight: 600;
}

.close-disclaimer {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
  color: #666;
  flex-shrink: 0;
}

.close-disclaimer:hover {
  color: #000;
  background: rgba(0,0,0,0.05);
  border-radius: 4px;
}

/* Hidden state */
.ai-disclaimer.hidden {
  display: none;
}

/* Mobile */
@media (max-width: 768px) {
  .disclaimer-content p {
    font-size: 0.85rem;
  }
  .disclaimer-content .icon {
    font-size: 1.2rem;
  }
}
```

**JavaScript:**
```javascript
// Manage AI disclaimer visibility
document.addEventListener('DOMContentLoaded', function() {
  const disclaimer = document.getElementById('aiDisclaimer');
  const closeBtn = disclaimer.querySelector('.close-disclaimer');

  // Check if user already dismissed it
  if (sessionStorage.getItem('aiDisclaimerDismissed') === 'true') {
    disclaimer.classList.add('hidden');
  }

  // Close button handler
  closeBtn.addEventListener('click', function() {
    disclaimer.classList.add('hidden');
    sessionStorage.setItem('aiDisclaimerDismissed', 'true');
  });
});
```

### 1.2 Footer Badge (Siempre Visible)

Además del header, agregar badge permanente en footer:

```html
<div class="ai-badge">
  🤖 Análisis generado con <strong>Claude Sonnet 4.5</strong> por
  <a href="https://www.linkedin.com/in/gabriel-carcamo/">Gabe C</a>
</div>
```

---

## 2. ESTRUCTURA DE URLs

```
/                               → Home
/programas/                     → Listado programas
/programas/{slug}/              → Programa individual (8 páginas)
/personas/                      → Listado personas
/personas/{id-slug}/            → Persona individual (28 páginas)
/candidatos/                    → Listado candidatos
/candidatos/{slug}/             → Evaluaciones recibidas (8 páginas)
/matriz/                        → Matriz interactiva
/metodologia/                   → Metodología completa + AI disclaimer
/acerca/                        → Sobre el proyecto y Gabe C
```

---

## 3. ACTUALIZACIÓN: PERSONAS (/personas/)

### 3.1 Card de Persona (Actualizado)

```jsx
<PersonaCard>
  <Emoji>👔</Emoji>
  <Name>María José Contreras</Name>
  <Demographics>
    <Age style="color: #1B5E20">35 años</Age>,
    <Income style="color: #E65100">$3.500.000</Income>
  </Demographics>
  <Tag>La Profesional Agobiada</Tag>

  <!-- ✅ NUEVO: Frase Típica -->
  <Quote>
    "Trabajo para vivir estresada y pagar cuentas.
     El país se volvió invivible para la clase media profesional"
  </Quote>

  <Preference>
    Prefiere: <Strong>Evelyn Matthei (7/10)</Strong>
  </Preference>
  <Link to="/personas/01-maria-jose-contreras">Ver evaluaciones</Link>
</PersonaCard>
```

**HTML Actual:**
```html
<article class="persona-card">
  <div class="persona-header">
    <span class="persona-emoji">👔</span>
    <h3 class="persona-name">María José Contreras</h3>
  </div>

  <div class="persona-demographics">
    <span class="age">35 años</span>
    <span class="separator">·</span>
    <span class="income">$3.500.000</span>
  </div>

  <p class="persona-tag">La Profesional Agobiada</p>

  <!-- ✅ NUEVO: Frase Típica -->
  <blockquote class="persona-quote">
    "Trabajo para vivir estresada y pagar cuentas.
     El país se volvió invivible para la clase media profesional"
  </blockquote>

  <div class="persona-preference">
    <strong>Prefiere:</strong> Evelyn Matthei (7/10)
  </div>

  <a href="/personas/01-maria-jose-contreras" class="btn-view">
    Ver evaluaciones completas →
  </a>
</article>
```

**CSS:**
```css
.persona-card {
  background: white;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.persona-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.persona-demographics {
  display: flex;
  gap: 8px;
  align-items: center;
  margin: 8px 0;
  font-size: 0.9rem;
}

.persona-demographics .age {
  color: #1B5E20; /* Verde oscuro */
  font-weight: 600;
}

.persona-demographics .income {
  color: #E65100; /* Naranjo oscuro */
  font-weight: 600;
}

.persona-demographics .separator {
  color: #999;
}

.persona-quote {
  margin: 12px 0;
  padding: 12px;
  background: #F5F5F5;
  border-left: 3px solid #2C5AA0;
  font-style: italic;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}
```

### 3.2 Fuente de Datos: Frases Típicas

**Mapeo persona → frase:**
```javascript
// _data/personasFrases.js
module.exports = {
  "01": "Trabajo para vivir estresada y pagar cuentas. El país se volvió invivible para la clase media profesional",
  "02": "Construí este país y ahora vivo como pordiosero. Las AFP nos robaron",
  "03": "Los políticos no saben lo que es rebuscársela día a día",
  "04": "Estudié para surgir y solo conseguí deudas. Mi generación no tiene futuro",
  "05": "Somos la columna vertebral y nadie nos ve",
  // ... (extraer de docs/02_grupos_interes_electoral.md y docs/03_grupos_emergentes.md)
};
```

---

## 4. ACTUALIZACIÓN: MATRIZ (/matriz/)

### 4.1 Tabla Interactiva (Actualizada)

**Estructura de Fila:**
```html
<tr class="matriz-row" data-persona-id="01">
  <td class="persona-cell">
    <a href="/personas/01-maria-jose-contreras" class="persona-link">
      <div class="persona-name">01. María José Contreras</div>
      <!-- ✅ NUEVO: Edad e ingresos bajo el nombre -->
      <div class="persona-meta">
        <span class="age">35 años</span>
        <span class="income">$3.500.000</span>
      </div>
    </a>
  </td>
  <td class="rating-cell rating-1">1.0</td>
  <td class="rating-cell rating-7">7.0</td>
  <!-- ... más candidatos ... -->
  <td class="average-cell">4.9</td>
</tr>
```

**CSS:**
```css
.persona-cell {
  position: sticky;
  left: 0;
  background: white;
  z-index: 10;
  border-right: 2px solid #E0E0E0;
  padding: 12px;
  min-width: 220px;
}

.persona-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.persona-link:hover .persona-name {
  color: #2C5AA0;
  text-decoration: underline;
}

.persona-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #000;
  margin-bottom: 4px;
}

.persona-meta {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  margin-top: 4px;
}

.persona-meta .age {
  color: #1B5E20; /* Verde oscuro */
  font-weight: 600;
}

.persona-meta .income {
  color: #E65100; /* Naranjo oscuro */
  font-weight: 600;
}

/* Rating cells */
.rating-cell {
  text-align: center;
  padding: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.rating-cell:hover {
  opacity: 0.8;
  outline: 2px solid #2C5AA0;
}

/* Color gradient basado en rating */
.rating-1, .rating-2 { background-color: #FFCDD2; color: #B71C1C; }
.rating-3, .rating-4 { background-color: #FFECB3; color: #E65100; }
.rating-5, .rating-6 { background-color: #FFF9C4; color: #F57F17; }
.rating-7, .rating-8 { background-color: #C8E6C9; color: #1B5E20; }
.rating-9, .rating-10 { background-color: #A5D6A7; color: #1B5E20; }

/* Responsive: Mobile */
@media (max-width: 768px) {
  .persona-cell {
    min-width: 180px;
  }

  .persona-name {
    font-size: 0.85rem;
  }

  .persona-meta {
    flex-direction: column;
    gap: 2px;
  }

  .persona-meta .age,
  .persona-meta .income {
    font-size: 0.75rem;
  }
}
```

### 4.2 Tooltip on Hover

Al hacer hover sobre un rating, mostrar:
- Nombre de persona
- Nombre de candidato
- Snippet de evaluación (primeras 100 caracteres)

```javascript
// Tooltip functionality
document.querySelectorAll('.rating-cell').forEach(cell => {
  cell.addEventListener('mouseenter', function(e) {
    const personaId = this.closest('tr').dataset.personaId;
    const candidatoId = this.dataset.candidatoId;

    // Fetch evaluation snippet (from data embedded or AJAX)
    const snippet = getEvaluationSnippet(personaId, candidatoId);

    showTooltip(e.clientX, e.clientY, snippet);
  });

  cell.addEventListener('mouseleave', hideTooltip);
});
```

---

## 5. SEO Y META TAGS

### 5.1 Title y Description

**Home:**
```html
<title>Análisis con IA sobre Programas Presidenciales Chile 2025 | Por Gabe C</title>
<meta name="description" content="Análisis generado con Claude Sonnet 4.5 de los 8 programas presidenciales Chile 2025. Evaluaciones de 28 personas con diferentes perfiles. Por Gabe C.">
```

**Programa Individual:**
```html
<title>Programa de {Candidato} - Análisis con IA | Chile 2025</title>
<meta name="description" content="Análisis detallado del programa presidencial de {Candidato} generado con IA. Calificación promedio: {X}/10 según 28 evaluaciones.">
```

**Persona Individual:**
```html
<title>{Nombre} evalúa los 8 candidatos - Análisis con IA | Chile 2025</title>
<meta name="description" content="{Nombre}, {edad} años, {ocupación}. Evaluación con IA de los 8 programas presidenciales desde su perspectiva.">
```

**Matriz:**
```html
<title>Matriz Comparativa - Análisis con IA de Candidatos Chile 2025</title>
<meta name="description" content="Matriz interactiva con 224 evaluaciones: 28 personas evalúan a 8 candidatos presidenciales. Análisis generado con Claude Sonnet 4.5.">
```

### 5.2 Open Graph

```html
<!-- Open Graph -->
<meta property="og:site_name" content="Análisis con IA - Programas Chile 2025">
<meta property="og:title" content="{Page Title}">
<meta property="og:description" content="{Page Description}">
<meta property="og:url" content="https://{domain}{path}">
<meta property="og:type" content="website">
<meta property="og:image" content="/img/og-image-ai.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Page Title}">
<meta name="twitter:description" content="{Page Description}">
<meta name="twitter:image" content="/img/og-image-ai.jpg">
<meta name="twitter:creator" content="@{twitter_handle}">

<!-- Author -->
<meta name="author" content="Gabe C">
<link rel="author" href="https://www.linkedin.com/in/gabriel-carcamo/">
```

### 5.3 Keywords

```html
<meta name="keywords" content="análisis IA, programas presidenciales chile 2025, candidatos chile, elecciones 2025, claude sonnet, inteligencia artificial política, gabe c, gabriel carcamo">
```

### 5.4 Structured Data (Schema.org)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Análisis con IA sobre Programas Presidenciales Chile 2025",
  "description": "Análisis generado con Claude Sonnet 4.5 de los 8 programas presidenciales",
  "url": "https://{domain}/",
  "author": {
    "@type": "Person",
    "name": "Gabe C",
    "url": "https://www.linkedin.com/in/gabriel-carcamo/"
  },
  "inLanguage": "es-CL"
}
</script>
```

---

## 6. PÁGINA: ACERCA (/acerca/)

### 6.1 Contenido Actualizado

```markdown
# Sobre este Proyecto

## El Autor

**Gabe C**
Ingeniero y desarrollador interesado en la intersección entre tecnología e información política.

[LinkedIn](https://www.linkedin.com/in/gabriel-carcamo/) | [GitHub](#)

## Motivación

Este proyecto nace de la necesidad de hacer más accesible y comparable la información de los programas presidenciales Chile 2025. Utilizando inteligencia artificial (Claude Sonnet 4.5), hemos procesado y analizado los programas desde múltiples perspectivas.

## Tecnología

- **IA utilizada:** Claude Sonnet 4.5 (Anthropic)
- **Procesamiento:** Extracción, refinamiento y evaluación automatizada
- **Stack técnico:** 11ty + GitHub Pages
- **Código abierto:** [Ver en GitHub](#)

## Transparencia

⚠️ **Importante:** Todo el contenido de este sitio (programas refinados, personas y evaluaciones) fue generado con inteligencia artificial. Los análisis reflejan interpretaciones automatizadas de los programas escritos, no opiniones humanas reales.

Para información oficial y completa, consulte los programas originales en los sitios de cada candidatura.

## Apóyanos

Si este proyecto te resulta útil, considera apoyarnos:

[☕ Buy me a coffee](https://buymeacoffee.com/brownbull)

Tu apoyo ayuda a mantener este y futuros proyectos de información ciudadana.

## Contacto

Para consultas, sugerencias o colaboraciones:
- LinkedIn: [Gabriel Cárcamo](https://www.linkedin.com/in/gabriel-carcamo/)
- Email: [contacto@...]

---

**Última actualización:** 24 de Octubre de 2025
```

---

## 7. FOOTER ACTUALIZADO

```html
<footer class="site-footer">
  <div class="footer-content">

    <!-- AI Badge -->
    <div class="ai-badge">
      🤖 Análisis generado con <strong>Claude Sonnet 4.5</strong>
    </div>

    <!-- Navigation -->
    <nav class="footer-nav">
      <a href="/metodologia/">Metodología</a>
      <a href="/acerca/">Acerca</a>
      <a href="https://github.com/{repo}">GitHub</a>
    </nav>

    <!-- Author -->
    <div class="footer-author">
      Creado por
      <a href="https://www.linkedin.com/in/gabriel-carcamo/"
         target="_blank"
         rel="noopener">
        <strong>Gabe C</strong>
      </a>
    </div>

    <!-- Disclaimer -->
    <p class="footer-disclaimer">
      Los programas refinados, personas y evaluaciones fueron generados con IA.
      Para información oficial, consulte los sitios de cada candidatura.
    </p>

    <!-- Copyright -->
    <p class="footer-copyright">
      © 2025 Gabe C. Contenido bajo licencia
      <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>
    </p>

  </div>
</footer>
```

**CSS:**
```css
.site-footer {
  background: #212121;
  color: #E0E0E0;
  padding: 40px 20px 20px;
  margin-top: 80px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.ai-badge {
  background: rgba(255, 221, 0, 0.1);
  border: 1px solid rgba(255, 221, 0, 0.3);
  border-radius: 8px;
  padding: 12px 20px;
  margin-bottom: 24px;
  display: inline-block;
  font-size: 0.9rem;
}

.ai-badge strong {
  color: #FFDD00;
}

.footer-nav {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 16px;
}

.footer-nav a {
  color: #90CAF9;
  text-decoration: none;
  font-weight: 500;
}

.footer-nav a:hover {
  text-decoration: underline;
}

.footer-author {
  margin-bottom: 16px;
  font-size: 0.95rem;
}

.footer-author a {
  color: #90CAF9;
  text-decoration: none;
}

.footer-author a:hover {
  text-decoration: underline;
}

.footer-disclaimer {
  font-size: 0.85rem;
  color: #B0B0B0;
  max-width: 600px;
  margin: 16px auto;
  line-height: 1.5;
}

.footer-copyright {
  font-size: 0.8rem;
  color: #757575;
  margin-top: 16px;
}

.footer-copyright a {
  color: #90CAF9;
  text-decoration: none;
}
```

---

## 8. OG IMAGE

### 8.1 Diseño de Imagen para Compartir

**Dimensiones:** 1200x630px

**Contenido:**
```
┌────────────────────────────────────────────────┐
│                                                │
│  🤖 ANÁLISIS CON IA                           │
│                                                │
│  Programas Presidenciales                     │
│  Chile 2025                                   │
│                                                │
│  • 8 Candidatos Analizados                    │
│  • 28 Perspectivas Diferentes                 │
│  • 224 Evaluaciones Totales                   │
│                                                │
│  Generado con Claude Sonnet 4.5               │
│  Por Gabe C                                   │
│                                                │
│  [Logo o visual simple]                       │
│                                                │
└────────────────────────────────────────────────┘
```

**Colores:**
- Fondo: Gradiente azul (#2C5AA0 → #1976D2)
- Texto: Blanco (#FFFFFF)
- Acento: Amarillo AI (#FFDD00)

---

## 9. CHECKLIST FINAL ACTUALIZADO

### Pre-Launch
- [ ] ✅ Stack: 11ty + GitHub Pages configurado
- [ ] ✅ AI Disclaimer visible en header (dismissible)
- [ ] ✅ AI Badge permanente en footer
- [ ] ✅ Personas: Frases Típicas incluidas en cards
- [ ] ✅ Matriz: Edad e ingresos bajo nombre persona
- [ ] ✅ Matriz: Nombres clickeables a página persona
- [ ] ✅ SEO: Títulos incluyen "Análisis con IA"
- [ ] ✅ Meta author: Gabe C + LinkedIn
- [ ] ✅ Footer: Link a LinkedIn de Gabe C
- [ ] ✅ Botón donación: Buy Me a Coffee flotante
- [ ] ✅ OG Image: Con branding "Análisis con IA"
- [ ] Todos los programas cargados
- [ ] Todas las 28 personas con evaluaciones
- [ ] Matriz funcional e interactiva
- [ ] Links verificados (no 404s)
- [ ] Responsive: mobile, tablet, desktop
- [ ] Velocidad < 3s (PageSpeed Insights)
- [ ] Accesibilidad score > 90 (Lighthouse)

### Post-Launch
- [ ] Compartir con hashtag #AnálisisIA #Chile2025
- [ ] Publicar en LinkedIn personal (Gabe C)
- [ ] Monitorear analytics
- [ ] Responder feedback
- [ ] Actualizar si hay cambios

---

## 10. RESUMEN EJECUTIVO ACTUALIZADO

**Sitio:** Análisis con IA sobre Programas Presidenciales Chile 2025
**Stack:** 11ty + GitHub Pages
**Costo:** $0
**Desarrollo:** 10-15 días
**Autor:** Gabe C

**Características Clave:**
1. ✅ AI Disclaimer visible (header + footer)
2. ✅ Frases Típicas en cards de personas
3. ✅ Edad e ingresos en matriz (colores distintivos)
4. ✅ Nombres clickeables en matriz
5. ✅ Branding "Análisis con IA" en todo el sitio
6. ✅ Crédito a Gabe C con link a LinkedIn
7. ✅ Botón donación Buy Me a Coffee flotante

**Próximos Pasos:**
1. Setup repo y 11ty
2. Implementar AI disclaimer
3. Procesar datos con frases típicas
4. Build templates actualizados
5. Deploy y testing

