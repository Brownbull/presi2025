# Setup Guide

## Website Implementation Complete

The 11ty website has been fully implemented with all requested features:

### ✅ Completed Features

1. **AI Disclaimer** - Sticky header with dismissible functionality (sessionStorage)
2. **Base Layout** - Complete with header, footer, navigation, and author attribution
3. **Homepage** - With rankings and overview of all sections
4. **Programas Section** - Listing and detail pages for 8 candidates
5. **Personas Section** - Listing and detail pages for 28 personas with "Frase Típica"
6. **Matriz Interactiva** - 28×8 table with edad (green) and ingresos (orange)
7. **Metodología Page** - Complete methodology documentation
8. **Responsive Design** - Mobile-first CSS with all specified colors
9. **GitHub Actions Workflow** - Automatic deployment to GitHub Pages

### 🎨 Design Specifications Implemented

- **Branding**: "Análisis con IA sobre Programas Presidenciales Chile 2025"
- **AI Disclaimer**: Yellow background (#FFF9C4), orange border (#F57F17), mentions Claude Sonnet 4.5
- **Edad color**: Green (#1B5E20)
- **Ingresos color**: Orange (#E65100)
- **Author**: Gabe C with LinkedIn link
- **Donate button**: Buy Me a Coffee link
- **Frase Típica**: Included in persona cards

## Next Steps

### 1. Move Project to Local Folder (Recommended)

Google Drive sync can cause issues with `node_modules`. Move the project to a local folder:

```bash
# Example on Windows
xcopy "g:\My Drive\Projects\2025\presidential" "C:\Projects\presidential" /E /I

# Or on macOS/Linux
cp -r "/path/to/google/drive/Projects/2025/presidential" ~/Projects/presidential
```

### 2. Install Dependencies

```bash
cd [project-folder]
npm install
```

### 3. Test Locally

```bash
# Development mode with hot reload
npm start

# Open browser to http://localhost:8080
```

### 4. Build for Production

```bash
npm run build

# Output will be in _site/
```

### 5. Push to GitHub

```bash
git add .
git commit -m "Initial 11ty website implementation"
git push origin main
```

### 6. Configure GitHub Pages

1. Go to your repository Settings → Pages
2. Source: Select "GitHub Actions"
3. The site will automatically deploy on every push to `main`
4. Your site will be live at: `https://[username].github.io/[repository]/`

## Potential Issues and Fixes

### Issue: npm install errors in Google Drive

**Solution**: Move project to a local folder (see step 1 above)

### Issue: Data scripts not finding files

**Solution**: Verify paths in `src/_data/*.js` match your file structure

### Issue: Personas evaluations not loading

**Solution**: The template expects evaluation files in `04_evaluacion_agentes/` - ensure files exist and names match

### Issue: Matriz showing N/A values

**Solution**: Run `python extract_ratings.py` to ensure `matriz_evaluacion.md` is up to date

## File Structure Created

```
├── .eleventy.js                        # 11ty configuration
├── .github/workflows/deploy.yml        # GitHub Actions deployment
├── package.json                        # NPM dependencies
├── README.md                           # Updated project README
├── SETUP.md                            # This file
│
├── src/                                # Website source
│   ├── _data/
│   │   ├── programas.js               # Processes program extracts
│   │   ├── personas.js                # Processes personas from docs/
│   │   └── matriz.js                  # Processes matriz_evaluacion.md
│   │
│   ├── _includes/
│   │   ├── layouts/
│   │   │   └── base.njk               # Base layout with AI disclaimer
│   │   └── components/
│   │       └── ai-disclaimer.njk      # Dismissible AI disclaimer
│   │
│   ├── index.njk                      # Homepage
│   ├── programas/
│   │   ├── index.njk                  # Programas listing
│   │   └── programas.njk              # Program detail template
│   ├── personas/
│   │   ├── index.njk                  # Personas listing
│   │   └── personas.njk               # Persona detail template
│   ├── matriz/
│   │   └── index.njk                  # Interactive matriz
│   └── metodologia/
│       └── index.njk                  # Methodology page
│
└── assets/
    ├── css/
    │   └── main.css                   # Complete responsive CSS
    └── js/
        └── main.js                    # Disclaimer & matriz filters
```

## Testing Checklist

Before deploying, verify:

- [ ] All 8 programas display correctly
- [ ] All 28 personas show edad/ingresos in correct colors
- [ ] Matriz loads with 224 evaluations
- [ ] AI disclaimer appears and can be dismissed
- [ ] Frase Típica appears on persona cards
- [ ] All links work (programas ↔ personas ↔ matriz)
- [ ] Footer shows author info and donate button
- [ ] Mobile responsive design works
- [ ] Rankings calculate correctly

## Support

If you encounter issues:

1. Check the browser console for errors
2. Verify file paths in `_data/*.js` scripts
3. Ensure all source data files exist
4. Test with `npm run build` to see build errors

---

Created by Gabe C | Generated with Claude Sonnet 4.5
