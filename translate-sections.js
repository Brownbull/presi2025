const fs = require('fs');
const path = require('path');

// Translation map from English to Spanish
const translations = {
  'VISION_AND_PRINCIPLES': 'VISIÓN Y PRINCIPIOS',
  'INSTITUTIONAL_REFORMS': 'REFORMAS INSTITUCIONALES',
  'FOREIGN_POLICY': 'POLÍTICA EXTERIOR',
  'ECONOMY_AND_EMPLOYMENT': 'ECONOMÍA Y EMPLEO',
  'INDUSTRIALIZATION': 'INDUSTRIALIZACIÓN',
  'ENERGY': 'ENERGÍA',
  'AGRICULTURE_AND_FOOD_SECURITY': 'AGRICULTURA Y SEGURIDAD ALIMENTARIA',
  'MONETARY_AND_FINANCIAL_SYSTEM': 'SISTEMA MONETARIO Y FINANCIERO',
  'TAX_REFORM': 'REFORMA TRIBUTARIA',
  'PLANNING_SYSTEMS': 'SISTEMAS DE PLANIFICACIÓN',
  'STATE_MODERNIZATION': 'MODERNIZACIÓN DEL ESTADO',
  'LABOR_RIGHTS': 'DERECHOS LABORALES',
  'SECURITY_AND_PUBLIC_ORDER': 'SEGURIDAD Y ORDEN PÚBLICO',
  'HEALTH': 'SALUD',
  'HOUSING': 'VIVIENDA',
  'EDUCATION': 'EDUCACIÓN',
  'SOCIAL_POLICIES': 'POLÍTICAS SOCIALES',
  'INFRASTRUCTURE': 'INFRAESTRUCTURA',
  'ENVIRONMENT': 'MEDIO AMBIENTE',
  'IMMIGRATION': 'INMIGRACIÓN',
  'QUANTIFIED_COMMITMENTS': 'COMPROMISOS CUANTIFICADOS',
  'SCIENCE_AND_TECHNOLOGY': 'CIENCIA Y TECNOLOGÍA',
  'CULTURE': 'CULTURA',
  'SPORTS': 'DEPORTES',
  'JUSTICE': 'JUSTICIA',
  'TRANSPORTATION': 'TRANSPORTE',
  'MINING': 'MINERÍA',
  'TOURISM': 'TURISMO',
  'DEFENSE': 'DEFENSA',
  'ANTI_CORRUPTION': 'ANTI-CORRUPCIÓN',
  'GENDER_AND_DIVERSITY': 'GÉNERO Y DIVERSIDAD',
  'YOUTH': 'JUVENTUD',
  'ELDERLY': 'ADULTOS MAYORES',
  'DISABILITY': 'DISCAPACIDAD',
  'INDIGENOUS_PEOPLES': 'PUEBLOS INDÍGENAS',
  'RURAL_DEVELOPMENT': 'DESARROLLO RURAL',
  'URBAN_DEVELOPMENT': 'DESARROLLO URBANO',
  'WATER_RESOURCES': 'RECURSOS HÍDRICOS',
  'CLIMATE_CHANGE': 'CAMBIO CLIMÁTICO',
  'DIGITAL_TRANSFORMATION': 'TRANSFORMACIÓN DIGITAL',
  'SMALL_BUSINESS': 'PEQUEÑAS EMPRESAS',
  'DECENTRALIZATION': 'DESCENTRALIZACIÓN',
  'REGIONAL_DEVELOPMENT': 'DESARROLLO REGIONAL'
};

const extractDir = path.join(__dirname, '03_extract_refinement');
const files = fs.readdirSync(extractDir).filter(f => f.endsWith('.txt'));

console.log(`Processing ${files.length} files...`);

files.forEach(file => {
  const filePath = path.join(extractDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  let changesMade = false;

  // Replace each English section header with Spanish
  Object.entries(translations).forEach(([english, spanish]) => {
    const regex = new RegExp(`^## ${english}$`, 'gm');
    if (regex.test(content)) {
      content = content.replace(regex, `## ${spanish}`);
      changesMade = true;
    }
  });

  if (changesMade) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✓ Translated sections in ${file}`);
  } else {
    console.log(`- No changes needed in ${file}`);
  }
});

console.log('\nDone!');
