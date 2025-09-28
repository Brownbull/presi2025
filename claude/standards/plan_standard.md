# Presidential Program Extraction Standards
## Version 1.0 - Chile 2025 Elections

---

## 1. EXTRACTION COMPLETENESS STANDARDS

### 1.1 Document Coverage Requirements
- **100% Coverage**: All pages from cover to final page must be processed
- **Section Mapping**: Every chapter, section, and subsection identified and extracted
- **Annexes**: All appendices, attachments, and supplementary materials included
- **Tables/Graphics**: Data from tables and infographics must be captured with page reference
- **Footnotes**: Relevant footnotes extracted and linked to main content

### 1.2 Mandatory Extraction Categories
Each extraction MUST include ALL of the following categories if present:

```
REQUIRED_CATEGORIES = [
  "vision_and_principles",
  "security_and_public_order",
  "economy_and_employment", 
  "health",
  "education",
  "housing",
  "social_policies",
  "state_modernization",
  "infrastructure",
  "environment",
  "foreign_policy",
  "institutional_reforms"
]
```

### 1.3 Minimum Content Elements
For each category, extract:
- **Measures**: Specific actions proposed (minimum 5 per major category if available)
- **Goals**: Quantifiable targets (all numeric commitments)
- **Timelines**: Deadlines and phases (every temporal reference)
- **Investments**: Monetary commitments (all amounts mentioned)
- **Reforms**: Legal/institutional changes (all modifications proposed)

---

## 2. CITATION ACCURACY STANDARDS

### 2.1 Page Reference Requirements
- **100% Citation Rate**: Every extracted item MUST have a page reference
- **Format Compliance**: Use [p.X] for single page, [pp.X-Y] for ranges
- **No Exceptions**: Items without page references = automatic fail

### 2.2 Citation Format Examples
```
CORRECT:
"Create Border Military Police [p.23]"
"Investment of US$2,500 million [pp.45-46]"
"100% reading proficiency in 2nd grade [p.78]"

INCORRECT:
"Create Border Military Police" (missing citation)
"Investment of US$2,500M [page 45]" (wrong format)
"100% reading proficiency [sec. 4]" (section not page)
```

### 2.3 Multi-Source Citations
When information spans multiple non-consecutive pages:
```
"Comprehensive security plan [p.23, p.45, p.67]"
```

---

## 3. TERMINOLOGY FIDELITY STANDARDS

### 3.1 Original Language Preservation
- **Exact Terms**: Use program's exact terminology
- **No Synonyms**: Don't replace terms (e.g., don't change "carabineros" to "police")
- **Preserve Acronyms**: Keep all acronyms as written (FONASA, PYME, etc.)
- **Maintain Style**: If program uses capitals, maintain them

### 3.2 Prohibited Alterations
```
FORBIDDEN:
- Adding interpretive adjectives ("ambitious plan" → "plan")
- Inferring unstated connections
- Summarizing instead of extracting
- Adding context not in document
- Translating terms unless specified
```

### 3.3 Quotation Rules
- Direct quotes for promises/commitments
- Preserve numbers exactly as written
- Maintain units of measurement (UF, USD, CLP)

---

## 4. CATEGORIZATION PRECISION STANDARDS

### 4.1 Sector Assignment Rules
Each measure must be assigned to ONE primary sector:

```python
SECTOR_KEYWORDS = {
  "security": ["police", "crime", "prison", "border", "military"],
  "economy": ["GDP", "growth", "investment", "tax", "fiscal"],
  "health": ["hospital", "doctor", "FONASA", "medicine", "cancer"],
  "education": ["school", "teacher", "student", "university", "literacy"],
  "housing": ["house", "apartment", "mortgage", "construction", "rent"],
  "employment": ["job", "work", "salary", "unemployment", "labor"]
}
```

### 4.2 Cross-Sector Measures
When measures span sectors:
- Assign to PRIMARY impact sector
- Note secondary sectors in metadata
- Never duplicate across categories

### 4.3 Hierarchy Rules
```
National > Regional > Local
Structural > Programmatic > Operational
Permanent > Temporary > Pilot
```

---

## 5. QUANTIFIABLE ELEMENTS STANDARDS

### 5.1 Numeric Commitments
Extract ALL instances of:
- Absolute numbers (1,000,000 jobs)
- Percentages (reduce 50%)
- Monetary amounts (US$2,500 million)
- Timeframes (100 days, 4 years)
- Quantities (5 hospitals, 10,000 police)

### 5.2 Measurement Units
Preserve exact units:
- Currency: USD, CLP, UF
- Time: days, months, years
- Quantities: units, percentage, per capita
- Don't convert or standardize

### 5.3 Ranges and Estimates
```
"Between 10,000 and 15,000" → Extract as range
"Approximately 1 million" → Extract with qualifier
"More than 500,000" → Extract with comparison operator
```

---

## 6. FORMAT CONSISTENCY STANDARDS

### 6.1 JSON Structure Requirements
```json
{
  "measure": {
    "id": "SEC001",
    "text": "Exact text from document",
    "page": 23,
    "category": "security",
    "type": "institutional_creation",
    "has_timeline": true,
    "timeline_value": "4 years",
    "has_goal": true,
    "goal_value": "10000",
    "goal_unit": "police officers",
    "has_investment": true,
    "investment_value": 2500000000,
    "investment_currency": "USD"
  }
}
```

### 6.2 Field Requirements
- **Mandatory fields**: id, text, page, category
- **Conditional fields**: Required IF mentioned in document
- **Null handling**: Use null, not empty strings
- **Data types**: Strict typing (numbers as numbers, not strings)

### 6.3 ID Convention
```
[CATEGORY_CODE][SEQUENTIAL_NUMBER]
SEC001 = Security measure #1
ECO023 = Economy measure #23
EDU045 = Education measure #45
```

---

## 7. EXTRACTION DEPTH STANDARDS

### 7.1 Granularity Requirements
- **Main proposals**: 100% extraction required
- **Sub-measures**: Extract if numbered or bulleted
- **Examples**: Include if part of commitment
- **Context**: Only if defines scope

### 7.2 Detail Hierarchy
```
LEVEL 1: Major program pillar/axis
  LEVEL 2: Sectoral proposal
    LEVEL 3: Specific measure
      LEVEL 4: Implementation detail (if provided)
```

### 7.3 Minimum Extraction Depth
- Stop at Level 3 unless Level 4 contains:
  - Quantifiable commitments
  - Specific timelines
  - Budget allocations
  - Named institutions

---

## 8. QUALITY VALIDATION STANDARDS

### 8.1 Automatic Validation Checks
```python
VALIDATION_RULES = {
  "has_page_citation": lambda item: "[p." in item["text"],
  "valid_category": lambda item: item["category"] in REQUIRED_CATEGORIES,
  "numeric_if_quantified": lambda item: isinstance(item.get("goal_value"), (int, float)) if item.get("has_goal") else True,
  "no_interpretation": lambda item: not any(word in item["text"].lower() for word in ["probably", "seems", "might", "appears"]),
  "id_format": lambda item: bool(re.match(r'^[A-Z]{3}\d{3}$', item["id"]))
}
```

### 8.2 Manual Review Triggers
Flag for manual review if:
- Score < 8 after 3 iterations
- >10% of items fail validation
- Contradictory information detected
- Missing major program sections

### 8.3 Acceptable Error Margins
- Citation accuracy: 0% margin (100% required)
- Categorization: ≤5% error acceptable
- Format compliance: ≤2% deviation acceptable
- Coverage: ≥95% required

---

## 9. COMPARATIVE READINESS STANDARDS

### 9.1 Cross-Candidate Compatibility
Ensure extraction enables comparison:
- Consistent category names across candidates
- Standardized measure types
- Comparable quantitative units
- Aligned timeline formats

### 9.2 Comparison Matrix Requirements
Each measure must be classifiable as:
```
COMPARISON_TYPES = [
  "consensus_total",      # 4/4 candidates
  "consensus_high",        # 3/4 candidates
  "consensus_partial",     # 2/4 candidates
  "unique_proposal",       # 1/4 candidates
  "contradictory",         # Mutually exclusive proposals
  "complementary"          # Compatible but different
]
```

### 9.3 Dimensional Mapping
All measures must map to standard dimensions:
```
STANDARD_DIMENSIONS = [
  "security_citizen", "prison_system", "border_control",
  "economic_growth", "employment", "sme_support",
  "public_health", "education", "housing",
  "state_modernization", "tax_policy", "gender_equity",
  "elderly_care", "infrastructure", "energy",
  "regional_development", "disability", "childhood_family",
  "innovation_tech", "anticorruption", "agriculture_rural",
  "environment", "public_transport", "mental_health",
  "culture_sports"
]
```

---

## 10. SCORING RUBRIC

### 10.1 Scoring Distribution (Total: 10 points)
```
Coverage       (2 points):  0.0 - 0.5 - 1.0 - 1.5 - 2.0
Citations      (2 points):  0.0 - 0.5 - 1.0 - 1.5 - 2.0
Precision      (2 points):  0.0 - 0.5 - 1.0 - 1.5 - 2.0
Categorization (2 points):  0.0 - 0.5 - 1.0 - 1.5 - 2.0
Format         (2 points):  0.0 - 0.5 - 1.0 - 1.5 - 2.0
```

### 10.2 Pass/Fail Thresholds
- **Score ≥ 8**: Ready for comparative analysis
- **Score 6-7**: Requires refinement
- **Score < 6**: Major rework needed
- **Score < 4**: Restart extraction

### 10.3 Excellence Indicators (Score 9-10)
- 100% page citations
- Zero interpretation added
- Complete sectoral coverage
- Perfect format compliance
- Enables seamless comparison

---

## 11. AUDIT TRAIL REQUIREMENTS

### 11.1 Extraction Log
Maintain log of:
```json
{
  "extraction_id": "uuid",
  "document": "candidate_program.pdf",
  "start_time": "ISO-8601",
  "end_time": "ISO-8601",
  "pages_processed": 147,
  "items_extracted": 234,
  "iterations": 2,
  "final_score": 8.5,
  "operator": "agent_id"
}
```

### 11.2 Version Control
- Track extraction versions
- Document refinements made
- Preserve all iterations
- Note manual interventions

### 11.3 Quality Metrics
Track and report:
- Citation rate per section
- Categorization accuracy
- Processing time per page
- Refinement efficiency

---

## 12. CONTINUOUS IMPROVEMENT

### 12.1 Feedback Integration
- Document persistent issues
- Update standards based on edge cases
- Refine validation rules
- Improve categorization keywords

### 12.2 Calibration Process
Quarterly review of:
- Scoring consistency
- Category definitions
- Format requirements
- Comparison compatibility

### 12.3 Version Updates
Standards versioning:
- Major: Structural changes (1.0 → 2.0)
- Minor: New categories (1.0 → 1.1)
- Patch: Clarifications (1.0.0 → 1.0.1)

---

*Presidential Program Extraction Standards v1.0*
*Last Updated: 2025*
*Next Review: Post-Election Analysis*