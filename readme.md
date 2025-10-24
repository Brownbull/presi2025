# Análisis con IA sobre Programas Presidenciales Chile 2025

Análisis generado con **Claude Sonnet 4.5** de Anthropic sobre programas presidenciales de Chile 2025.

## Descripción

Este proyecto analiza los programas de 8 candidatos presidenciales desde la perspectiva de 28 personas electorales que representan diferentes grupos de interés en Chile.

- **8 programas procesados** con más de 1,500 medidas catalogadas
- **28 personas electorales** con perfiles detallados
- **224 evaluaciones** (28 × 8) con análisis personalizado
- **Matriz interactiva** con rankings y promedios

## Estructura del Proyecto

```
.
├── 01_programas/           # Programas originales en PDF/TXT
├── 03_extract_refinement/  # Extractos procesados según estándar v1.1
├── 04_evaluacion_agentes/  # Evaluaciones por persona
├── docs/                   # Definición de personas
├── src/                    # Código fuente del sitio 11ty
│   ├── _data/             # Scripts de procesamiento de datos
│   ├── _includes/         # Layouts y componentes
│   ├── index.njk          # Página principal
│   ├── programas/         # Páginas de programas
│   ├── personas/          # Páginas de personas
│   ├── matriz/            # Matriz de evaluación
│   └── metodologia/       # Metodología del análisis
├── assets/                 # CSS y JavaScript
├── .eleventy.js           # Configuración de 11ty
└── package.json           # Dependencias
```

## Tecnologías

- **11ty (Eleventy)**: Generador de sitios estáticos
- **Nunjucks**: Motor de plantillas
- **Markdown-it**: Procesamiento de markdown
- **GitHub Pages**: Hosting gratuito
- **Claude Sonnet 4.5**: Análisis con IA

## Desarrollo Local

### Prerrequisitos

- Node.js 18 o superior
- npm

### Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo (con hot reload)
npm start

# Build para producción
npm run build
```

El sitio estará disponible en `http://localhost:8080`

## Despliegue

El sitio se despliega automáticamente a GitHub Pages cuando se hace push a la rama `main`:

1. El workflow de GitHub Actions se ejecuta automáticamente
2. Se instalan las dependencias
3. Se construye el sitio (`_site/`)
4. Se despliega a GitHub Pages

### Configuración de GitHub Pages

1. Ve a Settings → Pages en tu repositorio
2. Source: GitHub Actions
3. El sitio estará disponible en `https://[usuario].github.io/[repositorio]/`

## Metodología

El análisis sigue un proceso de 4 etapas:

1. **Extracción de Programas**: Estándar de refinamiento v1.1 con numeración secuencial y citas precisas
2. **Definición de Personas**: 28 perfiles representativos de diferentes grupos electorales
3. **Evaluación Personalizada**: Cada persona evalúa los 8 programas (escala 0-10)
4. **Procesamiento de Datos**: Generación automática del sitio con 11ty

Ver más detalles en [/metodologia/](src/metodologia/index.njk)

## Limitaciones

⚠️ **Importante**:

- Este contenido es informativo y no constituye recomendación electoral
- Las evaluaciones son generadas por IA, no por personas reales
- Los puntajes son relativos y subjetivos
- Debe complementarse con otras fuentes de información electoral

## Autor

Creado por **Gabe C**

- LinkedIn: [gabriel-carcamo](https://www.linkedin.com/in/gabriel-carcamo/)
- Buy Me a Coffee: [khujtaaig](https://buymeacoffee.com/khujtaaig)

## Licencia

MIT License

---

🤖 **Análisis generado con IA usando Claude Sonnet 4.5 de Anthropic**


