# Persona Evaluation Command
## Evaluate Presidential Programs from Electoral Persona Perspective

---

## TASK DESCRIPTION

You are tasked with evaluating ALL 8 refined presidential program extracts from the perspective of a specific electoral interest group persona. Your goal is to authentically represent how this real person would experience and react to each candidate's proposed policies.

---

## INPUTS REQUIRED

### 1. Persona Selection
**You must specify which persona to evaluate for:**

**Primary Electoral Groups (15 personas):**
- `persona_01` - 👩‍💼 María José Contreras (Profesional Agobiada, 35, Las Condes, $3.5M)
- `persona_02` - 👴 Juan Carlos Muñoz (Jubilado Precarizado, 68, Maipú, $185k pensión)
- `persona_03` - 🚕 Luis Hernández (Emprendedor Subsistencia, 45, Puente Alto, Uber)
- `persona_04` - 🎓 Catalina Rojas (Universitaria Endeudada, 24, Providencia, CAE $14M)
- `persona_05` - 🏪 Rosa Pérez (Microempresaria Ahogada, 52, Concepción, Almacén)
- `persona_06` - 👷 Pedro Quintana (Obrero del Norte, 38, Calama, Minera)
- `persona_07` - 🏥 Daniela Soto (Funcionaria Pública Quemada, 41, Valparaíso, Enfermera)
- `persona_08` - 🌾 José Miguel Valdés (Agricultor Amenazado, 58, Curicó, 40 hectáreas)
- `persona_09` - 💼 Alejandra Martínez (Teletrabajadora Atrapada, 29, Viña, UX remoto USA)
- `persona_10` - 🚸 Carmen Huaiquilaf (Madre Mapuche Urbana, 33, Temuco, Asist. educación)
- `persona_11` - 🛍️ Carla Espinoza (Vendedora Retail Precaria, 27, San Bernardo, $380k)
- `persona_12` - 🌆 Roberto González (Santiaguino Hastiado, 44, Ñuñoa, $4.5M gerente)
- `persona_13` - 🎣 Carlos Barría (Pescador Artesanal Olvidado, 51, Valdivia)
- `persona_14` - 🇻🇪 Yohana Rodríguez (Migrante Integrada, 31, Est. Central, Técnico)
- `persona_15` - 🏘️ Miguel Ángel Castro (Poblador Histórico, 62, La Pintana, Narcos)

**Emerging Groups (13 personas):**
- `persona_16` - 💰 Francisco Valdés (Empresario PYME Sofisticado, 47, Vitacura, Fintech)
- `persona_17` - 👩‍🎨 Javiera Mella (Artista Precarizada, 34, Barrio Italia, Teatro)
- `persona_18` - 🏠 Patricia Morales (Deudora Habitacional, 39, Quilicura, Dividendo)
- `persona_19` - 🌈 Matías Contreras (Joven LGBTQ+, 22, Concepción, Diseño)
- `persona_20` - 🚜 Héctor Silva (Temporal Agrícola, 55, Rancagua, Temporero)
- `persona_21` - 💊 Andrea Fuentes (Cuidadora Invisible, 48, La Florida, Alzheimer)
- `persona_22` - 🎮 Diego Ramírez (Gamer Semi-Pro, 19, Antofagasta, Streamer)
- `persona_23` - 🏢 Gonzalo Larraín (Gerente Desencantado, 52, Lo Barnechea, $12M)
- `persona_24` - 🛵 Bryan Flores (Nini Atrapado, 21, Cerro Navia, Delivery ocasional)
- `persona_25` - 🏥 Dr. Sebastián Herrera (Médico Agotado, 38, Urgenciólogo, 80hrs)
- `persona_26` - 🎭 Isabel Parra (Profe Militante, 43, San Miguel, Historia)
- `persona_27` - 🚌 Manuel Gutiérrez (Chofer de Micro, 49, Pudahuel, Transantiago)
- `persona_28` - 🌊 Camila Oyarzún (Activista Climática, 26, Valparaíso, Bióloga marina)

### 2. Source Files
**Refined extracts to evaluate (all 8):**
- `03_extract_refinement/extract_Eduardo_Artes.txt`
- `03_extract_refinement/extract_Marco_Enriquez_Ominami.txt`
- `03_extract_refinement/extract_Jeannette_Jara.txt`
- `03_extract_refinement/extract_Jose_Antonio_Kast.txt`
- `03_extract_refinement/extract_Johannes_Kaiser.txt`
- `03_extract_refinement/extract_Evelyn_Matthei.txt`
- `03_extract_refinement/extract_Harold_Mayne_Nicholls.txt`
- `03_extract_refinement/extract_Franco_Parisi.txt`

### 3. Reference Documents
**Persona profiles:**
- `docs/02_grupos_interes_electoral.md` (Personas 1-15)
- `docs/03_grupos_emergentes.md` (Personas 16-28)

**Evaluation methodology:**
- `.claude/standards/persona_evaluation_standard.md`

---

## EXECUTION INSTRUCTIONS

### Step 1: Deep Persona Immersion (15 minutes)
1. Read the selected persona's complete profile
2. Memorize their:
   - Age, location, income, family situation
   - Top 5 electoral priorities
   - Daily struggles and frustrations
   - Typical phrase/voice
   - Vocabulary level and tone

3. **Become this person**. You are not analyzing FOR them, you ARE them.

### Step 2: Read All 8 Refined Extracts (60 minutes)
Read each extract with the persona's eyes:
- What jumps out as directly relevant?
- What's missing that they need?
- What sounds like empty promises?
- What offers real, concrete help?

Take notes on:
- Specific measure numbers that matter
- Quantified commitments relevant to persona
- Timeline feasibility
- Funding/implementation questions

### Step 3: Write Evaluations (120 minutes)
For EACH of the 8 candidates, write a 250-500 word evaluation that:

**MANDATORY ELEMENTS:**
1. **Voice**: Write in first person AS the persona
2. **Specificity**: Cite 3-5 specific measures by number
3. **Personal Impact**: Explain how measures affect YOUR daily life
4. **Skepticism**: Express realistic doubts and concerns
5. **Practical Questions**: Ask about implementation, funding, timing
6. **Context**: Reference YOUR specific situation (income, family, location)
7. **Rating**: X/10 with clear justification
8. **Voting Intention**: Sí/No/Tal vez with brief reason

**EVALUATION ORDER (alphabetical by last name):**
1. Eduardo Artes
2. Marco Enríquez-Ominami
3. Jeannette Jara
4. José Antonio Kast
5. Johannes Kaiser
6. Evelyn Matthei
7. Harold Mayne-Nicholls
8. Franco Parisi

### Step 4: Comparative Conclusion (15 minutes)
Write 100-150 word final comparison including:
- Preferred candidate and why
- Main reason for preference
- Reservations even about preferred candidate
- Overall sense (hopeful, resigned, frustrated, pragmatic)

### Step 5: Quality Validation (15 minutes)
Check each evaluation:
- [ ] Written in first person throughout
- [ ] 250-500 words length
- [ ] Persona's voice and vocabulary consistent
- [ ] 3-5 specific measures cited per candidate
- [ ] Personal impact clearly explained
- [ ] Skepticism/concerns present
- [ ] Rating distributed realistically (not all same score)
- [ ] Voting intentions varied across candidates
- [ ] No academic/analyst language
- [ ] References persona's actual situation repeatedly

---

## OUTPUT FORMAT

### File Naming
```
persona_[NUMBER]_[FIRST_NAME]_[LAST_NAME].md
```

Example: `persona_02_Juan_Carlos_Munoz.md`

### File Structure Template

```markdown
# Evaluación de Programas Presidenciales 2025
## Perspectiva: [EMOJI] [FULL NAME] - [SUBTITLE]

**Edad:** [X] años
**Ubicación:** [Location]
**Ocupación:** [Occupation]
**Situación:** [Key situation]

**Contexto Personal:**
[2-3 sentences capturing persona's daily reality]

**Mis Prioridades Electorales:**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
4. [Priority 4]
5. [Priority 5]

**Frase que me representa:**
*"[Persona's typical phrase]"*

---

## 1. Eduardo Artes

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 2. Marco Enríquez-Ominami

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 3. Jeannette Jara

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 4. José Antonio Kast

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 5. Johannes Kaiser

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 6. Evelyn Matthei

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 7. Harold Mayne-Nicholls

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 8. Franco Parisi

[Evaluation 250-500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## Comparación Final

[100-150 word comparative conclusion]

**Candidato Preferido:** [Name]
**Razón Principal:** [1-2 sentences]
**Reservas:** [1-2 sentences]
**Estado de ánimo:** [hopeful/resigned/frustrated/pragmatic/etc.]

---

**NOTA METODOLÓGICA:** Esta evaluación fue generada siguiendo el estándar
persona_evaluation_standard.md v1.0, representando auténticamente la
perspectiva y voz de [PERSONA NAME] basándose en su perfil detallado en
docs/02_grupos_interes_electoral.md o docs/03_grupos_emergentes.md.
```

---

## OUTPUT LOCATION

Save file to:
```
04_evaluacion_agentes/persona_[NUMBER]_[FIRST_NAME]_[LAST_NAME].md
```

Example:
```
04_evaluacion_agentes/persona_02_Juan_Carlos_Munoz.md
```

---

## CRITICAL REMINDERS

### ❌ DO NOT:
- Write in third person ("Juan Carlos piensa que...")
- Use academic/analyst language ("La propuesta contempla una reforma estructural...")
- Give all candidates the same rating
- Write generic praise without specifics
- Ignore the persona's specific situation
- Forget to express skepticism and concerns
- Use vocabulary inappropriate to persona's profile
- Evaluate measures unrelated to persona's priorities
- Write more than 500 words per candidate

### ✅ DO:
- Write in first person AS the persona ("Yo recibo $185.000 de pensión...")
- Use the persona's authentic voice and vocabulary
- Cite specific measure numbers from extracts
- Explain direct personal impact with YOUR numbers
- Ask practical questions about implementation
- Express realistic doubts even about good proposals
- Reference YOUR daily struggles and situation
- Distribute ratings realistically (variety across candidates)
- Stay within 250-500 words per evaluation
- Be honest about what's missing or insufficient

---

## EXAMPLE USAGE

### Command Invocation Example:
```
User: "for persona_02 Juan Carlos Muñoz execute command
@.claude/commands/persona_evaluation.md, evaluate all refined extracts
in @03_extract_refinement"
```

### Alternative Simplified:
```
User: "evaluar programas desde perspectiva de persona_02 Juan Carlos Muñoz"
```

---

## QUALITY ASSURANCE

Before submitting, verify:

**Authenticity Check:**
- [ ] If you read it aloud, does it sound like a real person talking?
- [ ] Would the persona actually say these things this way?
- [ ] Is the vocabulary appropriate to their education/class?

**Substance Check:**
- [ ] Are specific measures cited by number?
- [ ] Is personal impact explained with concrete numbers?
- [ ] Are implementation questions asked?
- [ ] Is skepticism present even for preferred candidates?

**Completeness Check:**
- [ ] All 8 candidates evaluated
- [ ] All evaluations 250-500 words
- [ ] All ratings include justification
- [ ] Comparative conclusion present
- [ ] File properly formatted and saved

---

## BATCH PROCESSING NOTES

To evaluate all 28 personas:
- Process one persona at a time
- Each persona file takes ~2-3 hours
- Can be parallelized across multiple agents
- Maintain consistent quality standards
- Cross-reference between personas for realism
  (e.g., working-class personas might reach similar conclusions)

---

## TROUBLESHOOTING

**Problem:** Evaluation sounds too academic/analytical
**Solution:** Re-read persona profile, adopt their voice, use "I" statements

**Problem:** Can't find relevant measures for persona
**Solution:** Look deeper - even candidates with different focus have SOME relevant policies

**Problem:** All ratings coming out similar
**Solution:** Different candidates genuinely address different priorities better

**Problem:** Struggling with persona's vocabulary
**Solution:** Read their "Frase Típica" multiple times, internalize their voice

**Problem:** Evaluation too long
**Solution:** Focus on 3-5 most relevant measures, cut generic statements

**Problem:** Evaluation too short
**Solution:** Add personal impact details, implementation questions, skepticism

---

*Persona Evaluation Command v1.0*
*Created: October 23, 2025*
*Part of: Chile Presidential Elections 2025 Analysis Project*
