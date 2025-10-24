# Presidential Program Persona Evaluation Standard
## Version 1.0 - Chile 2025 Elections
## For Agent-Based Program Impact Assessment

---

## 0. OVERVIEW

### 0.1 Purpose
This standard defines the methodology for evaluating refined presidential program extracts from the perspective of specific electoral interest group personas. Each evaluation represents how a real person would experience and be impacted by a candidate's proposed policies.

### 0.2 Scope
- **Input**: Refined extracts from `03_extract_refinement/` directory
- **Personas**: 28 distinct electoral personas from `docs/02_grupos_interes_electoral.md` and `docs/03_grupos_emergentes.md`
- **Output**: Individual persona files in `04_evaluacion_agentes/` directory
- **Format**: One file per persona containing evaluations of all 8 candidates

---

## 1. PERSONA REPRESENTATION REQUIREMENTS

### 1.1 Voice and Authenticity
**Critical Rule**: Write AS the persona, not ABOUT the persona.

```yaml
correct_voice:
  - First person perspective ("Yo trabajo...", "Mi familia...")
  - Persona's vocabulary and tone
  - Specific life references from persona profile
  - Emotional authenticity (frustration, hope, skepticism)

incorrect_voice:
  - Third person ("María José trabajaría...")
  - Academic or technical language
  - Generic statements without personal context
  - Overly optimistic or political rhetoric
```

### 1.2 Persona Context Integration
Each evaluation MUST reference:
- **Personal situation**: Income, family, housing, work
- **Daily struggles**: Specific from persona profile
- **Geographic context**: Region-specific issues when relevant
- **Priority ranking**: From persona's electoral priorities

### 1.3 Emotional Range
Personas are REAL people with complex reactions:
- **Skepticism**: "He oído esto antes..."
- **Hope**: "Por fin alguien habla de..."
- **Frustration**: "Otra vez propuestas vagas..."
- **Fear**: "Esto podría empeorar mi situación..."
- **Pragmatism**: "Suena bien pero ¿cómo se financia?"

---

## 2. EVALUATION STRUCTURE

### 2.1 File Organization
```markdown
# Evaluación de Programas Presidenciales 2025
## Perspectiva: [PERSONA NAME] - [PERSONA SUBTITLE]

**Contexto Personal:**
[Brief 2-3 line reminder of persona's situation]

**Prioridades Electorales:**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
4. [Priority 4]
5. [Priority 5]

---

## 1. [CANDIDATE NAME]

[Evaluation content - max 500 words]

**Calificación Personal:** [X]/10
**¿Votaría por este candidato?** [Sí/No/Tal vez] - [Brief reason]

---

## 2. [CANDIDATE NAME]

[Continue for all 8 candidates...]

---

## Comparación Final

[Brief comparative conclusion - 100-150 words]

**Candidato preferido:** [Name]
**Razón principal:** [1-2 sentences]
**Reservas:** [1-2 sentences]
```

### 2.2 Candidate Order (Alphabetical by Last Name)
1. Eduardo Artes
2. Marco Enríquez-Ominami
3. Jeannette Jara
4. José Antonio Kast
5. Johannes Kaiser
6. Evelyn Matthei
7. Harold Mayne-Nicholls
8. Franco Parisi

---

## 3. EVALUATION CONTENT REQUIREMENTS

### 3.1 Length and Conciseness
- **Maximum**: 500 words per candidate evaluation
- **Target**: 350-450 words (allows depth without overwhelming)
- **Minimum**: 250 words (ensures substantive analysis)

### 3.2 Mandatory Elements Per Evaluation

#### A. Relevant Measure Identification
```markdown
# Must identify 3-5 specific measures that matter to persona
Example (as María José):
"Lo que más me llamó la atención fue la **Medida 45: Sala Cuna Universal**.
Como madre trabajadora con lista de espera de 2 años, esto cambiaría mi vida."
```

#### B. Direct Impact Analysis
```markdown
# Explain HOW measures affect persona's daily life
Example (as Luis Hernández):
"La propuesta de **reducir precio combustibles** suena bien, pero soy conductor
Uber y gasto $300.000 mensuales en bencina. ¿Cuánto bajaría realmente? ¿$20.000?
¿$50.000? Sin números concretos, es pura promesa."
```

#### C. Skepticism or Concerns
```markdown
# Every persona has doubts - MUST include realistic concerns
Example (as Roberto González):
"Propone 'recuperación territorial' contra el narco, pero ¿con qué recursos?
Ya hemos visto estos anuncios antes. Mi barrio fue robado 2 veces este año
y las promesas no me devuelven mi tranquilidad."
```

#### D. Practical Feasibility Questions
```markdown
# Real people ask practical questions
Example (as Rosa Pérez):
"Dice 'apoyo real a PYMES' pero no explica cómo. ¿Más créditos que no puedo pagar?
¿Subsidios con trámites imposibles? ¿O ayuda de verdad cuando me roban?"
```

#### E. Comparison with Lived Experience
```markdown
# Reference persona's actual situation
Example (as Juan Carlos Muñoz):
"Habla de pensiones pero propone $250.000. Yo recibo $185.000 después de
42 años cotizando. ¿Cómo llego a $500.000 que necesito para vivir digno?"
```

### 3.3 What to Evaluate

#### High Priority (Must Address)
- **Direct impacts**: Measures affecting persona's top 3 priorities
- **Economic effects**: Income, costs, employment impacts
- **Timeline credibility**: Can it happen in 4 years?
- **Funding questions**: Who pays? How?

#### Medium Priority (Should Address)
- **Secondary benefits**: Measures affecting priorities 4-5
- **Family impacts**: Effects on children, parents, spouse
- **Regional relevance**: If persona is outside Santiago
- **Opportunity costs**: What's NOT addressed

#### Low Priority (May Address)
- **Ideological alignment**: Only if relevant to persona
- **Symbolic measures**: Unless directly impactful
- **International policy**: Unless affects persona directly

### 3.4 What NOT to Include

**Prohibited Content:**
- ❌ Academic policy analysis
- ❌ Statistical comparisons across candidates
- ❌ Technical economic jargon
- ❌ Political party discourse
- ❌ Overly positive "campaign speech" tone
- ❌ Measures unrelated to persona's life
- ❌ Generic praise without specifics

---

## 4. RATING SYSTEM

### 4.1 Personal Rating Scale (X/10)

**Rating Framework:**
```yaml
9-10_points:
  description: "Este candidato entiende mi situación y propone soluciones concretas"
  criteria:
    - Addresses top 3 priorities with specific measures
    - Credible implementation plan
    - Clear timelines and funding
    - Few or manageable concerns

7-8_points:
  description: "Propuestas buenas pero con dudas importantes"
  criteria:
    - Addresses 2-3 top priorities
    - Some specificity but gaps remain
    - Reasonable but incomplete plan
    - Moderate concerns about feasibility

5-6_points:
  description: "Toca algunos temas míos pero es insuficiente"
  criteria:
    - Addresses 1-2 priorities superficially
    - Vague proposals without detail
    - Many unanswered questions
    - Significant feasibility concerns

3-4_points:
  description: "No me representa o me preocupa"
  criteria:
    - Minimal attention to priorities
    - Proposals may harm persona
    - No credible plan
    - Major concerns or contradictions

1-2_points:
  description: "Este programa es perjudicial para mí"
  criteria:
    - Actively harmful proposals
    - Ignores all priorities
    - Fundamentally misaligned values
    - Would worsen persona's situation
```

### 4.2 Voting Intention Categories

**Sí (Yes):**
- Rating typically 7-10
- Reserves expressed but manageable
- Clear path to improvement in persona's life
- Trust in candidate's commitment

**Tal vez (Maybe):**
- Rating typically 5-8
- Significant concerns remain
- Competing with other candidates
- Needs more information or convincing

**No:**
- Rating typically 1-6
- Deal-breaker issues present
- Fundamental misalignment
- Better alternatives available
- Distrust of implementation

---

## 5. WRITING GUIDELINES

### 5.1 Tone and Style

**Appropriate Tone Examples:**

```markdown
# Frustrated but open (Rosa Pérez - small business owner)
"Dice que va a 'combatir el comercio ilegal' pero llevo 2 años denunciando
a los vendedores ambulantes ilegales frente a mi local y nadie hace nada.
¿Por qué esta vez sería diferente? Aunque admito que al menos menciona
el problema, lo cual es más de lo que otros han hecho."

# Skeptical but desperate (Juan Carlos Muñoz - retiree)
"Promete pensión de $500.000. Suena bonito. Llevo 10 años escuchando promesas.
Pero estoy tan desesperado que quiero creer. ¿Cómo lo financiará? Nadie explica.
Y sin embargo, sigo leyendo porque $185.000 no es vida."

# Professional but worried (María José Contreras - working mother)
"La propuesta de sala cuna universal me emociona genuinamente. Es exactamente
lo que necesito. Pero leo 'implementación gradual' y me pregunto: ¿llegaré
a beneficiarme o será otro programa que queda a medio hacer?"
```

### 5.2 Vocabulary Considerations

**Per Persona Socioeconomic Level:**

```yaml
professional_class:
  appropriate: ["evalúo", "propuesta", "factibilidad", "implementación"]
  avoid: ["weas", "cacha", over-casual slang]

working_class:
  appropriate: ["plata", "lucas", "la firme", "la cosa"]
  avoid: ["financiamiento", "policy", overly technical terms]

informal_sector:
  appropriate: ["rebuscarse", "la pega", "al día", "fiado"]
  avoid: ["capital humano", "institucionalidad", academic language]
```

**But maintain authenticity** - educated personas can use casual language, working-class personas can use formal terms they've learned.

### 5.3 Reference Style

**Cite specific measures:**
```markdown
Good: "La **Medida 127: Eliminación progresiva contribuciones primera vivienda**
       me da esperanza. Pago $180.000 anuales y con mi sueldo cada peso cuenta."

Bad:  "Las medidas de vivienda son interesantes y podrían ayudar."
```

**Use persona's numbers:**
```markdown
Good: "Gano $1.200.000 en turnos 7x7. Si la rebaja tributaria es real,
       podría ahorrar $80.000 mensuales. Eso pagaría la ortodoncista de mi hija."

Bad:  "Las rebajas tributarias beneficiarían a trabajadores de ingresos medios."
```

---

## 6. QUALITY STANDARDS

### 6.1 Authenticity Checks

**Red Flags (Indicates Evaluation Needs Revision):**
- [ ] Sounds like a political analyst, not a real person
- [ ] Uses candidate's campaign slogans uncritically
- [ ] No skepticism or concerns expressed
- [ ] Generic statements applicable to any persona
- [ ] Doesn't reference persona's specific situation
- [ ] Academic or overly formal language throughout
- [ ] No practical questions about implementation
- [ ] Unrealistically high or low ratings across the board

### 6.2 Completeness Checks

**Mandatory Elements Present:**
- [ ] Personal context mentioned
- [ ] 3-5 specific measures cited per candidate
- [ ] Direct impact on persona's life explained
- [ ] Practical concerns or skepticism expressed
- [ ] Rating with clear justification
- [ ] Voting intention with reasoning
- [ ] Comparative conclusion at end
- [ ] Preferred candidate identified with reservations

### 6.3 Balance Requirements

**Across All 8 Evaluations:**
- Ratings should vary (not all 7s or all 3s)
- Different strengths/weaknesses per candidate
- Some candidates address different priorities
- Realistic distribution of voting intentions
- At least 2-3 candidates rated 6 or above (unless persona is extremist)
- At least 1-2 significant concerns per candidate

---

## 7. SPECIAL CONSIDERATIONS

### 7.1 Regional Personas

For personas outside Santiago (Pedro-Calama, Carlos-Valdivia, etc.):
- Evaluate regional policy sections specifically
- Note if candidate ignores regions
- Reference local issues (mining, fishing, agriculture)
- Consider travel/connectivity impacts

### 7.2 Identity-Based Personas

For personas with specific identities (Carmen-Mapuche, Yohana-Migrant, Matías-LGBTQ+):
- Evaluate cultural/identity recognition measures
- Note tone and respect in program language
- Consider dignity and inclusion aspects
- Balance symbolic vs. material proposals

### 7.3 Sector-Specific Personas

For personas in specific sectors (Daniela-Nurse, Dr. Sebastián-Doctor, Isabel-Teacher):
- Deep dive into sector-specific policies
- Evaluate professional vs. personal impacts
- Consider both as worker and as citizen
- Note systemic vs. band-aid solutions

### 7.4 Cross-Cutting Personas

Some personas span multiple categories:
- María José: Professional + Mother + Class Media
- Luis: Informal Worker + Security Concern + CAE Debtor (son)
- Rosa: PYME + Security + Regional

Ensure evaluation addresses multiple facets.

---

## 8. FILE NAMING AND ORGANIZATION

### 8.1 File Naming Convention
```
persona_[NUMBER]_[FIRST_NAME]_[LAST_NAME].md

Examples:
persona_01_Maria_Jose_Contreras.md
persona_02_Juan_Carlos_Munoz.md
persona_16_Francisco_Valdes.md
```

### 8.2 Directory Structure
```
04_evaluacion_agentes/
├── persona_01_Maria_Jose_Contreras.md
├── persona_02_Juan_Carlos_Munoz.md
├── persona_03_Luis_Hernandez.md
├── ...
├── persona_28_Camila_Oyarzun.md
└── README.md (evaluation summary)
```

### 8.3 File Header Template
```markdown
# Evaluación de Programas Presidenciales 2025
## Perspectiva: [EMOJI] [FULL NAME] - [SUBTITLE]

**Edad:** [X] años
**Ubicación:** [Location]
**Ocupación:** [Occupation]
**Situación:** [Key situation from profile]

**Contexto Personal:**
[2-3 sentences capturing essence of persona's daily struggle]

**Mis Prioridades Electorales:**
1. [Priority 1]
2. [Priority 2]
3. [Priority 3]
4. [Priority 4]
5. [Priority 5]

**Frase que me representa:**
*"[Persona's typical phrase]"*

---
```

---

## 9. VALIDATION CHECKLIST

### 9.1 Pre-Writing Validation
Before starting evaluations:
- [ ] Read persona profile completely
- [ ] Understand persona's top 3 priorities
- [ ] Note persona's income, family, location
- [ ] Identify persona's vocabulary level
- [ ] Read all 8 refined extracts thoroughly

### 9.2 Per-Candidate Evaluation Validation
For each candidate evaluation:
- [ ] Written in first person as persona
- [ ] 250-500 words length
- [ ] 3-5 specific measures cited
- [ ] Direct personal impact explained
- [ ] Practical concerns expressed
- [ ] Skepticism included
- [ ] Rating justified (X/10)
- [ ] Voting intention clear with reason
- [ ] Uses persona's vocabulary/tone

### 9.3 Final File Validation
Before completing file:
- [ ] All 8 candidates evaluated
- [ ] Ratings distributed realistically
- [ ] Comparative conclusion present
- [ ] Preferred candidate identified
- [ ] Reservations expressed even for preferred
- [ ] Consistent voice throughout
- [ ] No political analyst language
- [ ] Personal situation referenced repeatedly

---

## 10. COMMON PITFALLS AND SOLUTIONS

### 10.1 Pitfall: Academic Voice

**Problem:**
```markdown
❌ "El candidato propone una reforma estructural al sistema previsional
que podría beneficiar a sectores vulnerables mediante un esquema de
transferencias directas indexadas."
```

**Solution:**
```markdown
✓ "Dice que va a subir las pensiones a $500.000. Yo recibo $185.000.
¿De dónde salen esos $315.000? ¿Impuestos? ¿Deuda? Nadie me explica,
pero necesito saberlo porque ya no confío en promesas vacías."
```

### 10.2 Pitfall: Generic Praise

**Problem:**
```markdown
❌ "Las propuestas de seguridad son integrales y abordan múltiples
dimensiones del problema."
```

**Solution:**
```markdown
✓ "Propone 'Plan de Recuperación Territorial' en La Pintana. Vivo acá.
Los narcos controlan 3 cuadras de mi población. ¿Cuántos carabineros?
¿Cuándo? ¿Cómo sacan a los narcos sin que se venguen con nosotros?"
```

### 10.3 Pitfall: No Skepticism

**Problem:**
```markdown
❌ "Este candidato tiene todas las soluciones que necesito. Sus propuestas
son exactamente lo que el país requiere. Definitivamente votaré por él."
```

**Solution:**
```markdown
✓ "Toca todos mis temas: sala cuna, teletrabajo, isapre. Me emociono
leyendo. Pero ya me emocioné en 2017, 2021, siempre. ¿Qué hace este
candidato diferente? ¿Por qué debería creerle? Necesito ver compromiso
real, no solo buenas intenciones."
```

### 10.4 Pitfall: Ignoring Persona Context

**Problem:**
```markdown
❌ "La política exterior multilateral y los tratados de libre comercio
son fundamentales para el desarrollo."
```

**Solution:**
```markdown
✓ (As Luis, Uber driver) "Habla de tratados internacionales. OK.
¿Y yo qué? Necesito que baje la bencina, que las calles sean seguras
para trabajar de noche, que mi hijo no se ahogue en la deuda del CAE.
Eso es lo que importa en mi día a día."
```

### 10.5 Pitfall: Unrealistic Rating Distribution

**Problem:**
```markdown
❌ All candidates rated 3-4/10 or all rated 7-8/10
```

**Solution:**
```markdown
✓ Realistic distribution reflecting that:
  - Some candidates address persona's priorities better
  - Personas are pragmatic and will consider multiple options
  - Even preferred candidates have flaws
  - Even disliked candidates might have 1-2 good ideas

Example realistic distribution:
Candidate A: 8/10 (addresses top 3 priorities, some doubts)
Candidate B: 6/10 (good on security, weak on economics)
Candidate C: 4/10 (ideologically distant but respectable)
Candidate D: 7/10 (strong proposals, implementation unclear)
Candidate E: 3/10 (ignores my situation entirely)
Candidate F: 7/10 (different approach but interesting)
Candidate G: 5/10 (vague promises, seen it before)
Candidate H: 6/10 (focuses on other demographics)
```

---

## 11. EXAMPLE EVALUATION EXCERPT

### Persona: Juan Carlos Muñoz (68, Retired, $185k pension)

```markdown
## 2. Marco Enríquez-Ominami

Leo su propuesta de **Pensión Garantizada Universal escalonada: $210.000
en 2026, llegando a $250.000 en 2028**. Por fin un candidato que pone
números concretos. Yo recibo $185.000 después de 42 años cotizando.
Esto significaría $65.000 más en dos años. No es la pensión digna de
$500.000 que necesito, pero es un avance real.

Me preocupa que dice "cubrir más de 2,3 millones de personas mayores".
¿Yo califico? ¿O quedé fuera porque tengo AFP? Estos detalles importan.
No puedo emocionarme con $250.000 si resulta que no me incluyen.

También propone **25 nuevos CESFAM y postas rurales**. Yo hago fila
desde las 5 AM para conseguir hora con el cardiólogo. ¿Estos 25 nuevos
centros tendrán especialistas? ¿O más médicos generales que me derivan
y nunca me atienden? Porque infraestructura sin profesionales es edificio
vacío.

Lo que no veo es nada sobre remedios. Gasto $45.000 mensuales en
medicamentos crónicos. Su programa habla de "compras conjuntas
internacionales" pero eso beneficia al Estado, no a mí. ¿Cuándo los
remedios serán gratis para adultos mayores con enfermedades crónicas?

Habla bonito de "diálogo y construcción de consensos". Ya he visto
políticos dialogando mientras yo sobrevivo con $185.000. Pero reconozco
que tiene números específicos y plazos claros. Eso es más de lo que
la mayoría ofrece.

**Calificación Personal:** 6/10

**¿Votaría por este candidato?** Tal vez - Tiene propuestas concretas
para pensiones pero necesito saber si realmente me incluyen. Los números
no me sacan de la pobreza pero al menos no me ignora como otros candidatos.

---
```

**Why this works:**
✓ First person voice authentic to 68-year-old retiree
✓ References specific measures with numbers
✓ Explains direct personal impact ($65k more)
✓ Expresses practical concerns (eligibility, specialists)
✓ Notes what's missing (medicines)
✓ Balances hope with skepticism
✓ Realistic 6/10 rating with clear justification
✓ "Tal vez" with specific conditions
✓ 297 words (within 250-500 range)

---

## 12. PRODUCTION WORKFLOW

### 12.1 Recommended Order of Operations

**Phase 1: Preparation (30 minutes)**
1. Read all persona profiles deeply
2. Read all 8 refined extracts completely
3. Create mental map of candidate strengths per persona type

**Phase 2: Per Persona Evaluation (2-3 hours each)**
1. Select persona
2. Re-read persona profile
3. Create file with header
4. Evaluate all 8 candidates sequentially
5. Write comparative conclusion
6. Validate checklist
7. Review for voice consistency

**Phase 3: Quality Review (15 minutes per file)**
1. Read entire file in persona's voice aloud
2. Check rating distribution
3. Verify measure citations
4. Ensure skepticism present
5. Confirm personal context integration

### 12.2 Time Estimates
- Per candidate evaluation: 15-20 minutes
- Per persona file (8 candidates): 2-3 hours
- All 28 personas: 56-84 hours total
- Can be parallelized with multiple agents

### 12.3 Suggested Persona Processing Order

**Start with "easier" personas (clear priorities, simpler profiles):**
1. Juan Carlos (02) - Retiree, clear pension focus
2. Luis (03) - Uber driver, security + economy
3. Rosa (05) - Small business, security + support

**Then moderate complexity:**
4-15. Remaining single-focus personas

**Save for later (complex, multi-dimensional):**
16-28. Personas with intersecting identities or specialized sectors

---

## VERSION HISTORY

### Version 1.0 (Current)
- **Release Date**: October 23, 2025
- **Status**: Production ready for Chile 2025 presidential election evaluations
- **Personas Covered**: 28 (15 primary + 13 emerging groups)
- **Candidates**: 8 (all refined extracts in 03_extract_refinement/)

---

*Persona Evaluation Standard v1.0*
*Created: October 23, 2025*
*For: Chile Presidential Elections 2025*
*Maintained by: Claude Code Presidential Analysis Project*
