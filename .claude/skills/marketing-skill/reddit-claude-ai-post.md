# Reddit Post for r/ClaudeAI

## DETAILED VERSION (Recommended for r/ClaudeAI)

---

**Title:** I used Claude to analyze 8 Chilean presidential programs, generate 28 fictional voter personas, and vibecode the entire frontend - all in one week

**Body:**

Hey r/ClaudeAI! I wanted to share a project that pushed Claude to its limits across multiple domains: data analysis, creative generation, and rapid frontend development.

## The Project

I built an AI-powered analysis tool for Chile's 2025 presidential election that evaluates all 8 candidates' government programs from the perspective of 28 fictional voter personas.

**Live site:** https://brownbull.github.io/presi2025/

## How I Used Claude (Step-by-Step)

### 1. **Program Analysis & Normalization** (Claude Sonnet 4.5)
- Fed Claude each candidate's PDF program (50-200 pages each)
- Prompted it to extract concrete policy measures with precise citations
- Created a standardized extraction format across all 8 programs
- Result: **1,547 specific policy measures** catalogued with quotes

### 2. **Persona Generation** (The Creative Part)
This was fascinating. I asked Claude to:
- Generate 28 diverse fictional voter personas representing Chilean electoral demographics
- Each persona needed: age, occupation, income, location, family situation, and specific concerns
- Examples: "María José - 32yo overworked professional in healthcare," "Rosa - 68yo struggling retiree," "Bryan - 22yo student with debt"
- Claude nailed the diversity and authenticity - they feel like real people

### 3. **Cross-Evaluation Matrix** (The Heavy Lifting)
- Had Claude evaluate EACH program from EACH persona's perspective
- That's 8 candidates × 28 personas = **224 unique evaluations**
- Each evaluation had to:
  - Rate the program 1-10 from that persona's viewpoint
  - Cite specific measures that matter to them
  - Explain reasoning in first-person voice
  - Maintain realistic skepticism (no candidate gets 10/10)
- This took multiple iterations to get the tone right - not too positive, not robotic

### 4. **Vibecoding the Frontend** (Claude Code)
Once I had all the data, I used **Claude Code** (the new agentic coding tool) to:
- Build an Eleventy static site from scratch
- Design the UI/UX (responsive, mobile-first)
- Create an interactive matrix visualization
- Add a quiz feature ("Find personas similar to you")
- Deploy to GitHub Pages
- **Total dev time: ~8 hours** (would've been days manually)

The vibecoding experience was wild - I'd describe what I wanted visually, Claude would write the HTML/CSS/JS, I'd give feedback, repeat. It understood context across files.

## Technical Stack

- **Analysis:** Claude Sonnet 4.5 via API
- **Frontend:** Eleventy (11ty) + vanilla JS
- **Deployment:** GitHub Pages
- **Development:** Claude Code for rapid iteration

## Key Challenges & Solutions

**Challenge 1:** Keeping evaluations authentic
- Solution: Gave Claude detailed persona backstories and told it to "think like this person, including their biases and skepticism"

**Challenge 2:** Citation accuracy
- Solution: Required exact quotes from source PDFs, Claude was surprisingly good at this

**Challenge 3:** Avoiding electoral bias perception
- Solution: Multiple iterations to strengthen disclaimers, remove ranking sections, emphasize educational purpose

**Challenge 4:** Frontend consistency
- Solution: Claude Code maintained state across files surprisingly well, but I had to occasionally remind it of design system choices

## Stats

- 📄 8 presidential programs analyzed
- 👥 28 fictional personas created
- 📊 1,547 policy measures extracted
- ⭐ 224 persona evaluations generated
- 💻 ~8 hours of vibecoding
- 🚀 Deployed and live

## What Surprised Me

1. **Claude's political nuance** - It understood Chilean context (regions, socioeconomic realities, political history) without much prompting
2. **Consistency at scale** - 224 evaluations with consistent tone/format
3. **Vibecoding speed** - Building the site was 5-10x faster than traditional coding
4. **Citation accuracy** - Very few hallucinated quotes (I spot-checked ~50)

## Limitations & Disclaimers

- This is an **educational/informative exercise**, NOT electoral advice
- Personas are fictional, not based on real voter surveys
- All evaluations are AI-generated interpretations
- I'm transparent about this on the site (big disclaimers everywhere)

## Takeaways for Claude Users

1. **Structured prompts = better output** - I created templates for extraction and evaluation
2. **Iterative refinement works** - First pass was too positive, second too robotic, third was just right
3. **Claude Code is underrated** - For rapid prototyping, it's incredible
4. **Context management matters** - Breaking tasks into stages (extract → generate → evaluate → build) worked better than one mega-prompt

Would love to hear thoughts, questions, or suggestions! This was my first major multi-domain Claude project.

---

## CONCISE VERSION (If character limit is tight)

---

**Title:** Used Claude to analyze 8 presidential programs, generate 28 voter personas, and vibecode the site - one week build

**Body:**

Built an AI tool that analyzes Chile's 8 presidential candidates from 28 fictional voter perspectives.

**Live:** https://brownbull.github.io/presi2025/

**Claude's role:**
1. Extracted 1,547 policy measures from PDFs (50-200 pages each)
2. Generated 28 diverse fictional voter personas (age, job, income, concerns)
3. Created 224 evaluations (8 candidates × 28 personas) with citations and reasoning
4. Vibecoded the entire Eleventy frontend via Claude Code (~8 hours)

**What worked:**
- Political nuance without much context
- Consistent tone across 224 evaluations
- Accurate citations (minimal hallucinations)
- Lightning-fast frontend development

**What was hard:**
- Getting authentic skeptical tone (not too positive/robotic)
- Avoiding electoral bias perception (heavy disclaimers needed)
- Context management across stages

**Stats:** 1,547 measures analyzed, 224 evaluations, ~8hrs vibecoding

**Takeaway:** Claude excels at structured, multi-stage projects. Breaking it into extract → generate → evaluate → build worked perfectly.

Questions welcome!

---

## POSTING TIPS

### Best Time to Post
- Tuesday-Thursday, 10am-2pm EST (high engagement on r/ClaudeAI)

### Recommended Flair
- "Project Showcase" or "Use Case" (if available)

### Engagement Strategy
1. **Respond quickly** to first 5-10 comments (boosts visibility)
2. **Share code snippets** if people ask about prompts
3. **Be transparent** about limitations
4. **Offer to share methodology** (people love details)

### Potential Follow-up Comments (Pre-write these)

**If someone asks about prompts:**
"Happy to share! For persona generation, I used: 'Generate a diverse Chilean voter persona with [specific requirements]. Include realistic financial stress, regional context, and specific policy priorities based on their situation.' The key was asking for SPECIFIC concerns, not generic ones."

**If someone asks about accuracy:**
"I spot-checked about 50 citations randomly and found 2-3 that were slightly paraphrased but contextually accurate. No complete hallucinations. I think the PDF quality and clear extraction format helped a lot."

**If someone asks about vibecoding:**
"Claude Code (the VSCode extension) was a game-changer. I'd say things like 'make the matriz table sortable and add hover effects' and it would update multiple files correctly. Not perfect - sometimes I had to remind it of design choices - but 5-10x faster than manual coding."

**If someone is skeptical about bias:**
"Totally valid concern. That's why the site has massive disclaimers, I removed all ranking sections, and changed wording from 'find your candidate' to 'find personas similar to you.' It's educational data, not voting advice. All evaluations cite specific measures - users can verify everything."

### Hashtags/Keywords to Mention
- Claude Sonnet 4.5
- Claude Code
- Vibecoding
- Political analysis
- Persona generation
- Eleventy
- GitHub Pages

### Alternative Subreddits to Cross-Post
- r/LangChain (if you used it)
- r/MachineLearning (technical angle)
- r/WebDev (vibecoding angle)
- r/Chile (for Chilean audience, Spanish version)

---

## SPANISH VERSION FOR r/Chile

**Título:** Usé IA (Claude) para analizar los 8 programas presidenciales desde la perspectiva de 28 personas ficticias

**Cuerpo:**

Hola! Quería compartir un proyecto que hice para las presidenciales 2025.

**Sitio:** https://brownbull.github.io/presi2025/

**¿Qué hace?**
- Analiza los 8 programas presidenciales completos
- Crea 28 "personas electorales" ficticias (profesional agobiada, jubilado precarizado, estudiante endeudado, etc.)
- Cada persona evalúa cada programa según sus necesidades específicas
- Todo generado con IA (Claude Sonnet 4.5)

**Datos:**
- 1,547 medidas específicas extraídas (con citas textuales)
- 224 evaluaciones (28 personas × 8 candidatos)
- Hay un quiz para encontrar personas parecidas a ti

**Disclaimer importante:**
Esto es un ejercicio informativo/educativo. Las personas son ficticias. NO es recomendación electoral ni encuesta real. Solo quería hacer los programas más accesibles.

¿Comentarios? ¿Sugerencias?

