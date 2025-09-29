# Flujo de trabajo:
## Descargar programas
- [Jose Antonio Kast](https://kast.cl/)
- [Jeannette Jara](https://jeannettejara.cl/)
- [Evelyn Matthei](https://evelynmatthei.cl/programa-gobierno-matthei/)
- [Johannes Kaiser](https://static.emol.cl/emol50/documentos/archivos/2025/09/25/202509251166.pdf)

## Formato pdf a txt
Se evaluaron 3 alternativas de parseo de pdf a texto usando el programa de evelyn matthei asociado al snapshot 20250928:
- pdfcandy: https://pdfcandy.com/
- pypdf: [01_convert_pdf_pypdf.ipynb](./01_convert_pdf_pypdf.ipynb) <i>WINNER!!</i>
- pdfminer: [01_convert_pdf_pdfminer.ipynb](./01_convert_pdf_pdfminer.ipynb)

De estos 3, inspeccionando las primeras 6 paginas el mejor fue <b>pypdf</b>, por lo que sera la herramienta por defecto a usar.

## Comando extractor programas
Con ayuda de Claude se creo comando y standard a seguir para extraer contenido de los programas de gobierno:
- Comando: [plan_extractor.md](./claude/commands/plan_extractor.md)
- Standard: [plan_standard.md](./claude/standards/plan_standard.md)

Estos se utilizaron con Claude Code para realizar iteraciones incrementales en la extraccion hasta llegar a una evaluacion de >8 en escala de 10 en la extraccion del programa.

## Extraccion
```claude code
1.execute command @claude\commands\plan_extractor.md considering candidate {candidate_here}, text presidential plan is @01_programas\ss_20250928\txt\Programa_{candidate_here}_ss_20250928.txt
2.perfect, now perform the "análisis adicional de las páginas restantes" to complete the extraction according to standards 
3.do a final check for missing items on the extract according to the standard and proceed with changes if any required
```

## Refinamiento
### Create
```claude code
1.ok now considering the files created at /02_extract create a file called extract_refinement_standard at folder
/claude/standards which describes a common standard to present the information in /02_extract files in a normalized way. The
standard should allow to specify all the contents of the files in /02_extract folder in a normalized way.
2.do a final check for missing items on the standard proceed with changes if any required
```
### Execute
```claude code
1.execute command @claude\commands\extract_refinement.md considering candidate {candidate_here}, text presidential extract is @02_extract\extreact_{candidate_here}.txt
2.do a final check for missing items on the refined extract according to the standard and proceed with changes if any required
```

## Agents
La creacion de agentes se hizo completamente utilizando Claude Opus 4.1, enfocandose en espectros politicos, casos de personas representativas y en formas de evaluacion de medidas y factibilidad de estas.


