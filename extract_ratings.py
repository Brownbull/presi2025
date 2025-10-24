#!/usr/bin/env python3
"""
Extract candidate ratings from all persona evaluation files and create a matrix.
"""

import re
import os
from pathlib import Path

# Define candidate order
CANDIDATES = [
    "Eduardo Artes",
    "Marco Enríquez-Ominami",
    "Jeannette Jara",
    "José Antonio Kast",
    "Johannes Kaiser",
    "Evelyn Matthei",
    "Harold Mayne-Nicholls",
    "Franco Parisi"
]

def extract_ratings_from_file(filepath):
    """Extract ratings for all 8 candidates from a persona file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract persona name from filename
    filename = Path(filepath).stem
    match = re.match(r'persona_(\d+)_(.+)', filename)
    if match:
        persona_num = match.group(1)
        persona_name = match.group(2).replace('_', ' ')
    else:
        persona_num = "?"
        persona_name = filename

    # Extract all ratings using multiple patterns
    # Pattern 1: **Calificación Personal:** X/10
    pattern1 = r'\*\*Calificación Personal:\*\*\s*(\d+(?:\.\d+)?)/10'
    # Pattern 2: **X/10** (at end of section)
    pattern2 = r'\*\*(\d+(?:\.\d+)?)/10\*\*'
    # Pattern 3: **Evaluación: X/10**
    pattern3 = r'\*\*Evaluación:\s*(\d+(?:\.\d+)?)/10\*\*'
    # Pattern 4: **VEREDICTO:** ... X/10
    pattern4 = r'\*\*VEREDICTO:\*\*[^\n]*?(\d+(?:\.\d+)?)/10'

    ratings1 = re.findall(pattern1, content)
    ratings2 = re.findall(pattern2, content)
    ratings3 = re.findall(pattern3, content)
    ratings4 = re.findall(pattern4, content, re.IGNORECASE)

    # Use whichever pattern found exactly 8 ratings
    if len(ratings1) == 8:
        ratings = ratings1
    elif len(ratings3) == 8:
        ratings = ratings3
    elif len(ratings4) == 8:
        ratings = ratings4
    elif len(ratings2) >= 8:
        ratings = ratings2[:8]  # Take first 8
    else:
        # Try to find ratings by sections
        ratings = []
        for i in range(1, 9):
            # Find section for candidate i
            section_pattern = rf'###? {i}\.'
            section_match = re.search(section_pattern, content)
            if section_match:
                # Look for rating after this section and before next
                next_section = rf'###? {i+1}\.'
                next_match = re.search(next_section, content)

                start = section_match.end()
                end = next_match.start() if next_match else len(content)
                section_text = content[start:end]

                # Find rating in this section (try multiple patterns)
                rating_match = re.search(r'\*\*(\d+(?:\.\d+)?)/10\*\*', section_text)
                if not rating_match:
                    rating_match = re.search(r'(\d+(?:\.\d+)?)/10', section_text)

                if rating_match:
                    ratings.append(rating_match.group(1))
                else:
                    ratings.append("N/A")
            else:
                ratings.append("N/A")

    if len(ratings) != 8:
        print(f"Warning: {filename} has {len(ratings)} ratings instead of 8")
        # Pad with N/A if needed
        while len(ratings) < 8:
            ratings.append("N/A")

    return persona_num, persona_name, ratings

def main():
    eval_dir = Path("04_evaluacion_agentes")

    # Get all persona files
    persona_files = sorted(eval_dir.glob("persona_*.md"))

    # Extract all ratings
    all_data = []
    for filepath in persona_files:
        persona_num, persona_name, ratings = extract_ratings_from_file(filepath)
        all_data.append((persona_num, persona_name, ratings))

    # Create matrix output
    output_lines = []
    output_lines.append("# Matriz de Evaluación: Personas x Candidatos")
    output_lines.append("## Chile Elecciones Presidenciales 2025")
    output_lines.append("")
    output_lines.append("Calificaciones numéricas (X/10) otorgadas por cada persona electoral a cada candidato.")
    output_lines.append("")
    output_lines.append("---")
    output_lines.append("")

    # Create CSV-style table header
    header = "| Persona | " + " | ".join(CANDIDATES) + " | Promedio |"
    separator = "|---------|" + "|".join(["--------" for _ in CANDIDATES]) + "|----------|"

    output_lines.append(header)
    output_lines.append(separator)

    # Add data rows
    candidate_totals = [0.0] * 8
    candidate_counts = [0] * 8

    for persona_num, persona_name, ratings in all_data:
        persona_label = f"{persona_num:02s}. {persona_name}"

        # Calculate row average
        numeric_ratings = []
        for r in ratings:
            try:
                numeric_ratings.append(float(r))
            except:
                numeric_ratings.append(None)

        valid_ratings = [r for r in numeric_ratings if r is not None]
        row_avg = sum(valid_ratings) / len(valid_ratings) if valid_ratings else 0

        # Format ratings for display
        rating_strs = []
        for i, r in enumerate(ratings):
            try:
                val = float(r)
                rating_strs.append(f"{val:.1f}")
                candidate_totals[i] += val
                candidate_counts[i] += 1
            except:
                rating_strs.append("N/A")

        row = f"| {persona_label} | " + " | ".join(rating_strs) + f" | {row_avg:.1f} |"
        output_lines.append(row)

    # Add separator before averages
    output_lines.append(separator)

    # Calculate and add candidate averages
    avg_strs = []
    for total, count in zip(candidate_totals, candidate_counts):
        avg = total / count if count > 0 else 0
        avg_strs.append(f"{avg:.1f}")

    overall_avg = sum(candidate_totals) / sum(candidate_counts) if sum(candidate_counts) > 0 else 0
    avg_row = f"| **PROMEDIO** | " + " | ".join([f"**{a}**" for a in avg_strs]) + f" | **{overall_avg:.1f}** |"
    output_lines.append(avg_row)

    # Add summary statistics
    output_lines.append("")
    output_lines.append("---")
    output_lines.append("")
    output_lines.append("## Estadísticas Resumen")
    output_lines.append("")
    output_lines.append(f"- **Total personas evaluadas:** {len(all_data)}")
    output_lines.append(f"- **Total candidatos:** {len(CANDIDATES)}")
    output_lines.append(f"- **Total evaluaciones:** {sum(candidate_counts)}")
    output_lines.append(f"- **Calificación promedio general:** {overall_avg:.2f}/10")
    output_lines.append("")

    # Ranking by average
    output_lines.append("### Ranking de Candidatos por Calificación Promedio")
    output_lines.append("")

    candidate_avgs = []
    for i, (total, count) in enumerate(zip(candidate_totals, candidate_counts)):
        avg = total / count if count > 0 else 0
        candidate_avgs.append((CANDIDATES[i], avg, count))

    candidate_avgs.sort(key=lambda x: x[1], reverse=True)

    for rank, (name, avg, count) in enumerate(candidate_avgs, 1):
        output_lines.append(f"{rank}. **{name}**: {avg:.2f}/10 (basado en {count} evaluaciones)")

    output_lines.append("")
    output_lines.append("---")
    output_lines.append("")
    output_lines.append("**Fecha de generación:** 23 de Octubre de 2025")
    output_lines.append("**Fuente:** Evaluaciones de 28 personas electorales en 04_evaluacion_agentes/")
    output_lines.append("**Metodología:** Extractos refinados de programas presidenciales evaluados desde perspectivas auténticas de votantes")

    # Write output
    output_path = "04_evaluacion_agentes/matriz_evaluacion.md"
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join(output_lines))

    print(f"Matrix created successfully: {output_path}")
    print(f"Total personas: {len(all_data)}")
    print(f"Total evaluations: {sum(candidate_counts)}")
    print(f"\nCandidate rankings:")
    for rank, (name, avg, count) in enumerate(candidate_avgs, 1):
        print(f"  {rank}. {name}: {avg:.2f}/10")

if __name__ == "__main__":
    main()
