# Presidential Program Extract Refinement Standard
## Version 1.0 - Chile 2025 Elections
## For /02_extract Directory Standardization

---

## 0. TECHNICAL SPECIFICATIONS

### 0.1 File Requirements
- **Encoding**: UTF-8 without BOM
- **Line Endings**: LF (Unix style)
- **File Extension**: `.txt`
- **Naming Convention**: `extract_[Candidate_First_Last].txt`
- **Maximum File Size**: 2MB per extract
- **Character Limit**: 50,000 lines maximum per file

### 0.2 Content Length Guidelines
- **Target Range**: 500-800 lines per extract
- **Minimum Measures**: 80 total measures across all categories
- **Maximum Measures**: 150 measures to maintain readability
- **Balance Requirement**: No single section should exceed 30% of total content

### 0.3 Quality Metrics Thresholds
- **Citation Density**: ≥90% of lines should contain page references
- **Content Density**: ≥70% of lines should be substantive content (not headers/separators)
- **Structural Consistency**: 100% compliance with header hierarchy

---

## 1. DOCUMENT STRUCTURE STANDARD

### 1.1 Header Format (Required)
```markdown
# EXTRACTO COMPREHENSIVO: [CANDIDATE_NAME]
## [PROGRAM_TITLE] - [PARTY_NAME]
### "[PROGRAM_SLOGAN]"
### [Month] [Year]

---
```

**Requirements:**
- Use exact candidate name as appears in official program
- Include complete program title and party affiliation
- Preserve original program slogan in quotes
- Date must match extraction period
- Triple dash separator required

### 1.2 Mandatory Section Categories
All extracts MUST include these sections in exact order:

```markdown
## VISION_AND_PRINCIPLES
## SECURITY_AND_PUBLIC_ORDER
## ECONOMY_AND_EMPLOYMENT
## HEALTH
## EDUCATION
## HOUSING
## SOCIAL_POLICIES
## STATE_MODERNIZATION
## INFRASTRUCTURE
## ENVIRONMENT
## FOREIGN_POLICY
## INSTITUTIONAL_REFORMS
## QUANTIFIED_COMMITMENTS
```

### 1.3 Optional Section Categories
These sections MAY be included if present in source documents:
```markdown
## STRATEGIC_SECTORS (for economy-focused programs)
## SCIENCE_AND_TECHNOLOGY (for innovation programs)
## REGIONAL_DEVELOPMENT (for territorial programs)
## CULTURE_AND_SPORTS (for comprehensive programs)
## GENDER_EQUALITY (for specific focus areas)
## DIGITAL_TRANSFORMATION (for modernization programs)
```

**Placement Rules:**
- Optional sections inserted in logical order after related mandatory sections
- STRATEGIC_SECTORS follows ECONOMY_AND_EMPLOYMENT
- SCIENCE_AND_TECHNOLOGY follows STATE_MODERNIZATION
- Maximum 3 optional sections per extract

### 1.4 Section Naming Standardization
**Mandatory Format Corrections:**
```yaml
# Current variations found → Standard format
"I. SEGURIDAD Y ORDEN PÚBLICO" → "SECURITY_AND_PUBLIC_ORDER"
"II. ECONOMÍA Y EMPLEO" → "ECONOMY_AND_EMPLOYMENT"
"VISIÓN Y PRINCIPIOS" → "VISION_AND_PRINCIPLES"
"MODERNIZACIÓN DEL ESTADO" → "STATE_MODERNIZATION"
"DESARROLLO URBANO" → "HOUSING" (merge with housing content)
```

### 1.5 Section Separator Standard
```markdown
---

## [SECTION_NAME]

---
```

---

## 2. CONTENT EXTRACTION STANDARDS

### 2.1 Measure Identification Format
**Mandatory Primary Format:**
```markdown
**Medida [NUMBER]: [Measure Title] [p.X]**
- Detailed item 1 [p.X]
- Detailed item 2 [p.X]
- Detailed item 3 [p.X]
```

**Numbering Requirements:**
- **Sequential Numbering**: Start with Medida 1, increment by 1
- **Global Numbering**: Continue sequence across all sections (no restart per section)
- **No Gaps**: Every number from 1 to final count must be used
- **Format Consistency**: Always use "Medida X:" format, never "MEDIDA" or "Measure"

**Alternative Format (for subsections only):**
```markdown
### [Subsection Title]
**Objective: [Main objective] [p.X]**
- Implementation detail 1 [p.X]
- Implementation detail 2 [p.X]
```

**Format Conversion Required:**
```yaml
# Current variations found → Standard format
"- [Policy item]" → "**Medida X: [Policy title] [p.X]**"
"• [Bullet point]" → "- [Sub-item] [p.X]"
"1. [Numbered item]" → "**Medida X: [Measure title] [p.X]**"
```

**Prohibited Formats:**
- Generic bullet points without measure numbers
- Roman numerals (I., II., III.)
- Letter indexing (A., B., C.)
- Unnumbered policy descriptions

### 2.2 Citation Requirements
- **100% Citation Rate**: Every extracted item MUST have page reference
- **Format**: Use [p.X] for single page, [pp.X-Y] for ranges
- **Placement**: Citation at end of each statement/bullet point
- **No Exceptions**: Items without citations are invalid

### 2.3 Content Minimum Requirements
Each mandatory section must contain:
- **Minimum 5 measures** for major categories
- **Minimum 3 measures** for specialized categories
- **Complete subsection structure** when applicable
- **All quantifiable commitments** extracted

---

## 3. TERMINOLOGY AND PRECISION STANDARDS

### 3.1 Fidelity Requirements
- **Exact Terminology**: Use program's exact terms, no synonyms
- **Preserve Acronyms**: Keep all acronyms as written (FONASA, PYME, etc.)
- **Maintain Style**: If program uses capitals, maintain them
- **No Interpretation**: Extract only what is explicitly stated

### 3.2 Forbidden Alterations
```
PROHIBITED:
- Adding interpretive adjectives ("ambitious plan" → "plan")
- Inferring unstated connections
- Summarizing instead of extracting
- Adding context not in document
- Translating terms unless specified
```

### 3.3 Language Consistency
- **Spanish First**: Preserve original Spanish terminology
- **Consistent Translation**: If translation needed, use consistently
- **Technical Terms**: Keep sector-specific language intact

---

## 4. QUANTIFIED COMMITMENTS STANDARDS

### 4.1 Extraction Requirements
Extract ALL instances of:
- **Absolute Numbers**: 1,000,000 jobs, 10,000 police, etc.
- **Percentages**: reduce 50%, increase 25%, etc.
- **Monetary Amounts**: US$2,500 million, $500.000 monthly, etc.
- **Timeframes**: 100 days, 4 years, by 2030, etc.
- **Quantities**: 5 hospitals, 15 schools, etc.

### 4.2 Format Preservation
```markdown
### Metas [Category Type]
- [Specific commitment with exact numbers] [p.X]
- [Another commitment with timeframe] [p.X]
```

### 4.3 Units and Precision
- **Preserve Units**: USD, CLP, UF, percentage, per capita
- **Exact Numbers**: Don't round unless document does
- **Ranges**: "Between 10,000-15,000" → extract as range
- **Qualifiers**: "Approximately 1 million" → extract with qualifier

---

## 5. CATEGORIZATION PRECISION STANDARDS

### 5.1 Primary Assignment Rules
- **One Primary Category**: Each measure assigned to single main category
- **Clear Classification**: Based on predominant policy area
- **Cross-Reference Notes**: Note secondary impacts in metadata only

### 5.2 Category Keywords Guide
```yaml
security: ["police", "crime", "prison", "border", "military", "terrorism"]
economy: ["GDP", "growth", "investment", "tax", "fiscal", "employment"]
health: ["hospital", "doctor", "FONASA", "medicine", "healthcare"]
education: ["school", "teacher", "student", "university", "curriculum"]
housing: ["house", "apartment", "mortgage", "construction", "rent"]
social: ["poverty", "family", "children", "elderly", "benefits"]
environment: ["climate", "energy", "water", "pollution", "resources"]
```

### 5.3 Hierarchy Application
```
National > Regional > Local
Structural > Programmatic > Operational
Permanent > Temporary > Pilot
```

---

## 6. VALIDATION AND QUALITY STANDARDS

### 6.1 Automatic Validation Checks
```yaml
required_validations:
  - citation_rate: 100%
  - valid_categories: all_mandatory_present
  - minimum_measures: 5_per_major_category
  - format_compliance: markdown_structure
  - no_interpretation: no_added_adjectives
```

### 6.2 Quality Metrics
- **Coverage Completeness**: ≥95% of major program sections
- **Citation Accuracy**: 100% with correct page format
- **Categorization Precision**: ≤5% misclassification acceptable
- **Format Consistency**: ≤2% deviation from standard

### 6.3 Error Handling
**Common Issues and Solutions:**
```markdown
Issue: Missing page citations
Solution: Re-extract with mandatory citation requirement

Issue: Interpretive language added
Solution: Use exact program terminology only

Issue: Insufficient measures in category
Solution: Search deeper in source document

Issue: Inconsistent formatting
Solution: Apply standard markdown structure
```

---

## 7. COMPARATIVE ANALYSIS PREPARATION

### 7.1 Cross-Candidate Compatibility
**Standardized Elements:**
- Consistent category names across all candidates
- Standardized measure classification types
- Comparable quantitative unit formats
- Aligned timeline presentation

**Compatibility Testing Requirements:**
```yaml
required_tests:
  - header_format_consistency: all_files_match_template
  - section_order_alignment: exact_sequence_match
  - measure_numbering_format: medida_x_format_only
  - citation_format_uniformity: bracket_p_dot_x_only
  - quantitative_unit_standardization: comparable_formats
```

**Cross-File Validation Checklist:**
- [ ] All files use identical header structure
- [ ] All files contain same 13 mandatory sections
- [ ] All measures use "Medida X:" numbering format
- [ ] All citations use [p.X] format consistently
- [ ] No file exceeds 30% content imbalance in any section
- [ ] All files meet minimum measure count thresholds

### 7.2 Comparison Matrix Requirements
```yaml
comparison_types:
  - consensus_total: 4/4_candidates
  - consensus_high: 3/4_candidates
  - consensus_partial: 2/4_candidates
  - unique_proposal: 1/4_candidates
  - contradictory: mutually_exclusive
  - complementary: compatible_but_different
```

### 7.3 Dimensional Standardization
```yaml
standard_dimensions:
  security: [citizen_security, prison_system, border_control]
  economy: [economic_growth, employment, sme_support, tax_policy]
  health: [public_health, healthcare_access, health_insurance]
  education: [school_system, higher_education, technical_training]
  housing: [social_housing, real_estate, urban_planning]
  social: [poverty_reduction, family_support, elderly_care]
  environment: [climate_policy, energy_transition, conservation]
  foreign: [diplomacy, trade_relations, migration_policy]
```

---

## 8. METADATA AND DOCUMENTATION STANDARDS

### 8.1 Footer Information (Required)
```markdown
---

**DOCUMENTO FUENTE:** [Full Program Title] - [Candidate Full Name], [Party], [Year]
**TOTAL MEDIDAS EXTRAÍDAS:** [X] medidas específicas
**COBERTURA:** [Coverage description]
**FECHA EXTRACCIÓN:** [DD] de [Month] de [YYYY]
**FECHA REFINAMIENTO:** [DD] de [Month] de [YYYY] (if applicable)

**REFINAMIENTOS REALIZADOS:** (if applicable)
- [Description of refinements made]
- [Sections expanded with measure counts]
- [Quality improvements implemented]
- [Standards compliance achievements]
```

### 8.2 Version Control
- **Track Changes**: Document all major refinements
- **Date Stamps**: Include extraction and refinement dates
- **Coverage Notes**: Specify document coverage percentage
- **Iteration History**: Note improvement iterations

### 8.3 Processing Audit Trail
```markdown
**PROCESSING LOG:**
- Initial extraction: [Date] - [Measures count]
- Standards review: [Date] - [Issues identified]
- Refinement pass: [Date] - [Improvements made]
- Final validation: [Date] - [Score achieved]
```

---

## 9. SCORING AND ASSESSMENT FRAMEWORK

### 9.1 Scoring Distribution (Total: 10 points)
```yaml
Coverage: 2.0_points       # Completeness of mandatory categories
Citations: 2.0_points      # 100% citation rate requirement
Precision: 2.0_points      # Terminology fidelity and accuracy
Categorization: 2.0_points # Correct assignment and organization
Format: 2.0_points         # Structure and consistency standards
```

### 9.2 Pass/Fail Thresholds
- **Score ≥ 8.5**: Excellence - Ready for comparative analysis
- **Score 8.0-8.4**: Pass - Meets minimum standards
- **Score 6.0-7.9**: Requires refinement
- **Score < 6.0**: Major rework needed

### 9.3 Excellence Indicators (Score 9.0-10.0)
- 100% page citations with perfect format
- Zero interpretation or added content
- Complete coverage of all program sections
- Perfect categorization alignment
- Seamless comparative analysis readiness

---

## 10. IMPLEMENTATION WORKFLOW

### 10.1 Standard Operating Procedure
1. **Initial Extraction**: Apply basic standards
2. **Gap Analysis**: Check against mandatory requirements
3. **Content Search**: Find missing measures in source
4. **Refinement Pass**: Enhance based on standards
5. **Validation Check**: Run quality assessment
6. **Final Review**: Ensure comparative compatibility

### 10.2 Automated Validation Commands
**File Format Validation:**
```bash
# Check header format compliance
grep -E "^# EXTRACTO COMPREHENSIVO:" extract_*.txt | wc -l  # Should equal 4

# Verify measure numbering format
grep -E "^\*\*Medida [0-9]+:" extract_*.txt | wc -l  # Count total measures

# Check citation format consistency
grep -oE "\[p\.[0-9]+\]" extract_*.txt | wc -l  # Count page references
```

**Content Balance Validation:**
```bash
# Check section distribution
for file in extract_*.txt; do
  echo "=== $file ==="
  wc -l "$file"
  grep -c "^## " "$file"  # Count sections
  grep -c "^\*\*Medida" "$file"  # Count measures
done
```

**Cross-File Compatibility Check:**
```bash
# Verify section naming consistency
for file in extract_*.txt; do
  grep "^## " "$file" > sections_$file.txt
done
# Compare all section files - should be identical structure
```

### 10.3 Quality Assurance Checklist
**Pre-Implementation Check:**
- [ ] Source document accessibility verified
- [ ] Target file format confirmed (UTF-8, .txt)
- [ ] Extraction methodology documented

**During Implementation Check:**
- [ ] Measure numbering sequential and complete
- [ ] All mandatory sections present with content
- [ ] Citation format consistent throughout
- [ ] Content balance maintained across sections

**Post-Implementation Check:**
- [ ] File size within acceptable range (500-800 lines)
- [ ] Total measure count meets minimums
- [ ] Cross-candidate compatibility confirmed
- [ ] Quality score ≥8.0 achieved

### 10.4 Quality Gates
**Gate 1: Structure Compliance**
- All mandatory sections present
- Proper formatting applied
- Basic categorization complete

**Gate 2: Content Completeness**
- Minimum measure counts achieved
- All quantified commitments extracted
- Citation requirements met

**Gate 3: Precision and Fidelity**
- Exact terminology preserved
- No interpretive additions
- Format consistency maintained

**Gate 4: Comparative Readiness**
- Cross-candidate compatibility verified
- Standard dimensional mapping complete
- Analysis-ready format achieved

---

## 11. ERROR HANDLING AND TROUBLESHOOTING

### 11.1 Common Issues and Solutions

**Issue: Inconsistent Header Formats**
```yaml
Problem: Files use different header structures
Detection: grep "^#" extract_*.txt shows variations
Solution: Apply standard header template to all files
Command: Standardize to "# EXTRACTO COMPREHENSIVO: [NAME]" format
```

**Issue: Missing Measure Numbering**
```yaml
Problem: Files use bullet points instead of "Medida X:" format
Detection: grep -c "^\*\*Medida" shows low counts
Solution: Convert all policy items to numbered measures
Command: Transform "- [item]" → "**Medida X: [item] [p.X]**"
```

**Issue: Citation Format Inconsistency**
```yaml
Problem: Mixed citation formats across files
Detection: grep -oE "\[[^]]*\]" shows format variations
Solution: Standardize all citations to [p.X] format
Command: Replace "(p.X)", "[page X]", etc. → "[p.X]"
```

**Issue: Content Length Imbalance**
```yaml
Problem: Files vary significantly in size (385-955 lines)
Detection: wc -l extract_*.txt shows wide range
Solution: Balance content extraction across candidates
Target: 500-800 lines per file with proportional measures
```

**Issue: Section Name Variations**
```yaml
Problem: Different section naming conventions used
Detection: grep "^##" extract_*.txt shows name inconsistencies
Solution: Apply standardized section names
Reference: Use MANDATORY section list exactly as specified
```

### 11.2 Validation Failure Recovery

**Automatic Fixes:**
- Header format standardization
- Citation format normalization
- Section name correction
- Basic measure numbering

**Manual Review Required:**
- Content quality assessment
- Measure categorization accuracy
- Cross-candidate compatibility
- Quantified commitment extraction

**Escalation Triggers:**
- Quality score < 6.0 after two iterations
- Missing mandatory sections after refinement
- Incompatible content structure
- Source document accessibility issues

### 11.3 Performance Optimization

**Processing Efficiency:**
- Batch validation across all files
- Automated format checking scripts
- Progressive quality improvement
- Parallel processing when possible

**Resource Management:**
- File size monitoring (stay under 2MB)
- Memory usage optimization
- Processing time tracking
- Error logging and reporting

---

## 12. MAINTENANCE AND UPDATES

### 12.1 Standard Evolution
- **Version Control**: Track standard improvements
- **Feedback Integration**: Update based on analysis needs
- **Quality Refinement**: Enhance validation rules
- **Comparative Optimization**: Improve cross-candidate analysis

### 12.2 Periodic Reviews
- **Monthly**: Quality metric assessment
- **Quarterly**: Standard effectiveness review
- **Post-Election**: Complete framework evaluation
- **Annual**: Major version updates

---

---

## VERSION HISTORY

### Version 1.1 (Current)
- **Release Date**: September 29, 2025
- **Changes**: Added technical specifications, automated validation, error handling
- **Compatibility**: Full backward compatibility with v1.0 extracts
- **Status**: Production ready

### Version 1.0 (Initial)
- **Release Date**: September 29, 2025
- **Changes**: Initial standard creation
- **Features**: Basic structure and content requirements
- **Status**: Superseded by v1.1

---

## IMPLEMENTATION PRIORITY

### Immediate (High Priority)
1. **Header Standardization**: All files must use identical header format
2. **Measure Numbering**: Convert all content to "Medida X:" format
3. **Citation Normalization**: Standardize all citations to [p.X] format
4. **Section Name Consistency**: Apply mandatory section naming exactly

### Short Term (Medium Priority)
1. **Content Balance**: Bring all files to 500-800 line target range
2. **Quality Assessment**: Achieve minimum 8.0 score for all files
3. **Cross-File Validation**: Ensure comparative compatibility
4. **Automated Testing**: Implement validation command scripts

### Long Term (Low Priority)
1. **Advanced Analytics**: Implement dimensional mapping
2. **Performance Optimization**: Enhance processing efficiency
3. **Standard Evolution**: Incorporate feedback and improvements
4. **Documentation Updates**: Maintain comprehensive guides

---

*Presidential Program Extract Refinement Standard v1.1*
*Created: September 29, 2025*
*Last Updated: September 29, 2025*
*Next Review: Post-Implementation Analysis*
*Maintained by: Claude Code Presidential Analysis Project*