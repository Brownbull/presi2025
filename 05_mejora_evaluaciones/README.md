# 05 - Mejora de Evaluaciones

## Objetivo
Eliminar inconsistencias factuales entre evaluaciones de diferentes personas sobre los mismos candidatos, manteniendo la diversidad legítima de opiniones.

## Estructura

```
05_mejora_evaluaciones/
├── README.md                          # Este archivo
├── analisis/                          # Análisis del problema
│   ├── 00_PROBLEMA_IDENTIFICADO.md   # Descripción del problema
│   └── inconsistencias_detectadas.md # Lista de inconsistencias encontradas
├── metodologia/                       # Nueva metodología
│   ├── 01_METODOLOGIA_MEJORADA.md    # Proceso mejorado de evaluación
│   └── template_evaluacion.md        # Template para nuevas evaluaciones
└── evaluaciones_mejoradas/            # Evaluaciones corregidas
    ├── persona_25_Dr_Sebastian_Herrera_v2.md
    └── ...
```

## Estado Actual

### ✅ Completado
- [x] Identificación del problema
- [x] Creación de estructura de carpetas
- [x] Diseño de metodología mejorada

### 🔄 En Proceso
- [ ] Auditoría completa de inconsistencias
- [ ] Creación de tabla maestra de medidas por candidato
- [ ] Re-evaluación de personas (sector salud primero)

### ⏳ Pendiente
- [ ] Verificación cruzada de consistencia
- [ ] Actualización del sitio web con evaluaciones mejoradas
- [ ] Documentación de cambios

## Problema Identificado

**Inconsistencias factuales:** Diferentes personas evaluando el mismo programa presidencial reportan hechos contradictorios (ej: una dice que existe una medida, otra dice que no existe nada al respecto).

**Impacto:** Pérdida de credibilidad, confusión en usuarios, posible cuestionamiento legal/ético.

## Solución Propuesta

1. **Fuente única de verdad:** Todas las personas evalúan desde las MISMAS medidas extraídas
2. **Consistencia factual:** Si existe una medida, TODAS las personas la ven
3. **Diferencias legítimas:** Las personas DEBEN diferir en valoración, NO en hechos
4. **Trazabilidad:** Cada evaluación cita medidas específicas del programa

## Proceso de Mejora

### Fase 1: Auditoría (Actual)
1. Revisar todas las evaluaciones existentes
2. Identificar inconsistencias factuales
3. Documentar patrones

### Fase 2: Preparación
1. Crear tabla maestra de medidas por candidato
2. Categorizar medidas por tema
3. Preparar contextos actualizados de personas

### Fase 3: Re-evaluación
1. Empezar por sector salud (inconsistencias reportadas)
2. Aplicar nueva metodología
3. Verificar consistencia entre personas del mismo sector

### Fase 4: Validación
1. Comparar evaluaciones nuevas vs. antiguas
2. Verificar eliminación de inconsistencias
3. Mantener riqueza de perspectivas

### Fase 5: Implementación
1. Reemplazar evaluaciones en `04_evaluacion_agentes/`
2. Regenerar datos del sitio
3. Actualizar documentación

## Prioridades

### Alta Prioridad
1. **Sector Salud:** Dr. Sebastián Herrera (25), Daniela Soto (7), otros trabajadores de salud
   - Evaluando TODOS los 8 candidatos
   - Enfoque en medidas de salud

### Media Prioridad
2. **Sector Educación:** Profesores y estudiantes
3. **Trabajadores:** Por sectores económicos

### Baja Prioridad
4. **Resto de personas:** Una vez validada la metodología

## Criterios de Éxito

✅ **Eliminación de contradicciones factuales**
- Si Persona A dice "el candidato propone X", Persona B no puede decir "no propone nada sobre X"

✅ **Mantenimiento de perspectivas diversas**
- Personas diferentes DEBEN valorar las mismas medidas de forma diferente

✅ **Trazabilidad completa**
- Cada afirmación rastreable a medida específica en programa

✅ **Mejora de credibilidad**
- Usuarios confían en la consistencia del análisis

## Notas Importantes

### Diferencia Clave

**❌ INCONSISTENCIA (Eliminar):**
```
Dr. Herrera: "Matthei propone tarjeta única de salud"
Enfermera Soto: "Matthei no menciona nada sobre integración del sistema"
```
→ Ambos no pueden tener razón

**✅ DIFERENCIA LEGÍTIMA (Mantener):**
```
Dr. Herrera: "La tarjeta única es insuficiente, necesito más especialistas"
Enfermera Soto: "La tarjeta única me facilitaría el trabajo administrativo"
```
→ Ambos ven la MISMA medida, pero la valoran diferente

## Contacto

Para dudas o sugerencias sobre este proceso de mejora, revisar los documentos en las carpetas `analisis/` y `metodologia/`.

---

**Última actualización:** Octubre 27, 2025
