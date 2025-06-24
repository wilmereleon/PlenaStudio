#!/usr/bin/env python3
"""
Análisis Completo de Tareas TSPi - Form TASK (Sin dependencias)
Proyecto: Plena Studio
Desarrollador: Wilmer Edilson León Díaz
Análisis estadístico usando solo librerías estándar de Python
"""

import statistics
import json
from datetime import datetime

def extraer_datos_tareas():
    """Extrae los datos de las tareas del TSPi Form TASK"""
    
    # Datos extraídos de la imagen TSPi Task Planning Template
    tareas = [
        # Iteración 1 - PLAN
        {"iteracion": 1, "fase": "PLAN", "tarea": "Reconocimiento de datos", "plan_hours": 1, "actual_hours": 1.3},
        {"iteracion": 1, "fase": "PLAN", "tarea": "Crear listado de acrónimos", "plan_hours": 1, "actual_hours": 0.3},
        {"iteracion": 1, "fase": "PLAN", "tarea": "Definir listado de RNF", "plan_hours": 3, "actual_hours": 1.0},
        {"iteracion": 1, "fase": "PLAN", "tarea": "Definir prototipos", "plan_hours": 1, "actual_hours": 0.9},
        {"iteracion": 1, "fase": "PLAN", "tarea": "Definir especificaciones de arquitectura", "plan_hours": 1, "actual_hours": 1.0},
        
        # Iteración 1 - HLD (High Level Design)
        {"iteracion": 1, "fase": "HLD", "tarea": "Definir diagramas de diseño UML", "plan_hours": 1, "actual_hours": 0.8},
        {"iteracion": 1, "fase": "HLD", "tarea": "Definir diagramas clases", "plan_hours": 3, "actual_hours": 4.3},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diagramas clase", "plan_hours": 1, "actual_hours": 1.1},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diseño de componentes", "plan_hours": 2, "actual_hours": 0.8},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diseño de componentes", "plan_hours": 1, "actual_hours": 1.5},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de objetos", "plan_hours": 1, "actual_hours": 0.3},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de objetos", "plan_hours": 1, "actual_hours": 0.8},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama BD ML", "plan_hours": 3, "actual_hours": 0.3},
        {"iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de datos", "plan_hours": 3, "actual_hours": 0.3},
        
        # Iteración 1 - HLDINSP (High Level Design Inspection)
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Crear Prototipo en Figma", "plan_hours": 14, "actual_hours": 7.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Crear Prototipo funcional", "plan_hours": 6, "actual_hours": 3.1},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Generar estimación del presupuesto", "plan_hours": 3, "actual_hours": 2.2},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Reacondicionamiento de Diagrama de caso", "plan_hours": 8, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión de Diagrama de procesos", "plan_hours": 8, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión actualización del proceso", "plan_hours": 4, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Planear y actualizar diagramas UML", "plan_hours": 4, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisar y ampliar diagramas UML", "plan_hours": 8, "actual_hours": 0.4},
        
        # Iteración 1 - IT (Integration Test)
        {"iteracion": 1, "fase": "IT", "tarea": "Fase de pruebas de formularios", "plan_hours": 2, "actual_hours": 1.4},
        
        # Iteración 1 - DOC (Documentation)
        {"iteracion": 1, "fase": "DOC", "tarea": "Montaje de documentación", "plan_hours": 20, "actual_hours": 2.4},
        {"iteracion": 1, "fase": "DOC", "tarea": "Comunicación del documento", "plan_hours": 2, "actual_hours": 1.4},
        
        # Iteración 2 - PM (Project Management)
        {"iteracion": 2, "fase": "PM", "tarea": "Implementación de contexto de carrito", "plan_hours": 930, "actual_hours": 3.9},
        {"iteracion": 2, "fase": "PM", "tarea": "Refactorización de código", "plan_hours": 3, "actual_hours": 2.0},
        
        # Iteración 2 - IT (Integration Test)
        {"iteracion": 2, "fase": "IT", "tarea": "Implementación de pruebas unitarias", "plan_hours": 300, "actual_hours": 2.0},
        {"iteracion": 2, "fase": "IT", "tarea": "Desarrollo de funcionalidad y UI", "plan_hours": 400, "actual_hours": 2.0},
        {"iteracion": 2, "fase": "IT", "tarea": "Testing de funcionalidad", "plan_hours": 400, "actual_hours": 1.3},
        
        # Iteración 2 - ST (System Test)
        {"iteracion": 2, "fase": "ST", "tarea": "Pruebas de flujo y unitarias con NPM", "plan_hours": 600, "actual_hours": 2.0}
    ]
    
    return tareas

def calcular_estadisticas_basicas(tareas):
    """Calcula estadísticas básicas de las tareas"""
    
    plan_hours = [t['plan_hours'] for t in tareas]
    actual_hours = [t['actual_hours'] for t in tareas]
    ratios = [actual/plan for actual, plan in zip(actual_hours, plan_hours)]
    
    stats = {
        'total_tareas': len(tareas),
        'total_plan_hours': sum(plan_hours),
        'total_actual_hours': sum(actual_hours),
        'diferencia_total': sum(actual_hours) - sum(plan_hours),
        
        # Estadísticas de horas planificadas
        'plan_mean': statistics.mean(plan_hours),
        'plan_median': statistics.median(plan_hours),
        'plan_stdev': statistics.stdev(plan_hours) if len(plan_hours) > 1 else 0,
        'plan_min': min(plan_hours),
        'plan_max': max(plan_hours),
        
        # Estadísticas de horas reales
        'actual_mean': statistics.mean(actual_hours),
        'actual_median': statistics.median(actual_hours),
        'actual_stdev': statistics.stdev(actual_hours) if len(actual_hours) > 1 else 0,
        'actual_min': min(actual_hours),
        'actual_max': max(actual_hours),
        
        # Ratios y eficiencias
        'eficiencia_promedio': statistics.mean(ratios),
        'eficiencia_mediana': statistics.median(ratios),
        'tareas_sobre_estimadas': len([r for r in ratios if r > 1]),
        'tareas_sub_estimadas': len([r for r in ratios if r < 1]),
        'tareas_exactas': len([r for r in ratios if r == 1])
    }
    
    return stats

def analizar_por_fase(tareas):
    """Analiza las tareas agrupadas por fase"""
    
    fases = {}
    
    for tarea in tareas:
        fase = tarea['fase']
        if fase not in fases:
            fases[fase] = []
        fases[fase].append(tarea)
    
    analisis_fases = []
    
    for fase, fase_tareas in fases.items():
        plan_total = sum(t['plan_hours'] for t in fase_tareas)
        actual_total = sum(t['actual_hours'] for t in fase_tareas)
        
        fase_stats = {
            'fase': fase,
            'num_tareas': len(fase_tareas),
            'plan_total': plan_total,
            'actual_total': actual_total,
            'diferencia': actual_total - plan_total,
            'eficiencia': actual_total / plan_total if plan_total > 0 else 0,
            'plan_promedio': plan_total / len(fase_tareas),
            'actual_promedio': actual_total / len(fase_tareas)
        }
        
        analisis_fases.append(fase_stats)
    
    return analisis_fases

def analizar_por_iteracion(tareas):
    """Analiza las tareas agrupadas por iteración"""
    
    iteraciones = {}
    
    for tarea in tareas:
        iteracion = tarea['iteracion']
        if iteracion not in iteraciones:
            iteraciones[iteracion] = []
        iteraciones[iteracion].append(tarea)
    
    analisis_iteraciones = []
    
    for iteracion, iter_tareas in iteraciones.items():
        plan_total = sum(t['plan_hours'] for t in iter_tareas)
        actual_total = sum(t['actual_hours'] for t in iter_tareas)
        fases_involucradas = list(set(t['fase'] for t in iter_tareas))
        
        iter_stats = {
            'iteracion': iteracion,
            'num_tareas': len(iter_tareas),
            'plan_total': plan_total,
            'actual_total': actual_total,
            'diferencia': actual_total - plan_total,
            'eficiencia': actual_total / plan_total if plan_total > 0 else 0,
            'fases_involucradas': fases_involucradas
        }
        
        analisis_iteraciones.append(iter_stats)
    
    return analisis_iteraciones

def detectar_outliers(tareas):
    """Detecta tareas con comportamientos atípicos"""
    
    ratios = [t['actual_hours'] / t['plan_hours'] for t in tareas]
    
    # Calcular cuartiles
    ratios_sorted = sorted(ratios)
    n = len(ratios_sorted)
    Q1 = ratios_sorted[int(n * 0.25)]
    Q3 = ratios_sorted[int(n * 0.75)]
    IQR = Q3 - Q1
    
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = []
    for i, tarea in enumerate(tareas):
        ratio = ratios[i]
        if ratio < lower_bound or ratio > upper_bound:
            tarea_outlier = tarea.copy()
            tarea_outlier['ratio_eficiencia'] = ratio
            outliers.append(tarea_outlier)
    
    return outliers

def generar_diagnostico_completo():
    """Genera el diagnóstico completo de tareas TSPi"""
    
    print("🚀 Iniciando análisis completo de tareas TSPi...")
    print("="*80)
    
    # Cargar datos
    tareas = extraer_datos_tareas()
    
    # Estadísticas básicas
    stats = calcular_estadisticas_basicas(tareas)
    
    # Análisis por fase y iteración
    analisis_fases = analizar_por_fase(tareas)
    analisis_iteraciones = analizar_por_iteracion(tareas)
    
    # Detectar outliers
    outliers = detectar_outliers(tareas)
    
    # Generar reporte
    print("📊 ANÁLISIS DE TAREAS TSPi - FORM TASK")
    print("="*80)
    print(f"📋 Total de tareas analizadas: {stats['total_tareas']}")
    print(f"⏱️ Total horas planificadas: {stats['total_plan_hours']:.1f}h")
    print(f"⏱️ Total horas reales: {stats['total_actual_hours']:.1f}h")
    print(f"📈 Diferencia total: {stats['diferencia_total']:+.1f}h")
    print(f"🎯 Eficiencia global: {(stats['total_actual_hours']/stats['total_plan_hours']*100):.1f}%")
    
    print("\\n" + "="*80)
    print("📊 ESTADÍSTICAS DESCRIPTIVAS")
    print("="*80)
    
    print("🔵 HORAS PLANIFICADAS:")
    print(f"  • Media: {stats['plan_mean']:.2f}h")
    print(f"  • Mediana: {stats['plan_median']:.2f}h")
    print(f"  • Desviación estándar: {stats['plan_stdev']:.2f}h")
    print(f"  • Rango: {stats['plan_min']:.1f}h - {stats['plan_max']:.1f}h")
    
    print("\\n🟢 HORAS REALES:")
    print(f"  • Media: {stats['actual_mean']:.2f}h")
    print(f"  • Mediana: {stats['actual_median']:.2f}h")
    print(f"  • Desviación estándar: {stats['actual_stdev']:.2f}h")
    print(f"  • Rango: {stats['actual_min']:.1f}h - {stats['actual_max']:.1f}h")
    
    print("\\n🎯 ANÁLISIS DE ESTIMACIONES:")
    print(f"  • Eficiencia promedio: {stats['eficiencia_promedio']:.3f}")
    print(f"  • Eficiencia mediana: {stats['eficiencia_mediana']:.3f}")
    print(f"  • Tareas sobre-estimadas: {stats['tareas_sobre_estimadas']} ({stats['tareas_sobre_estimadas']/stats['total_tareas']*100:.1f}%)")
    print(f"  • Tareas sub-estimadas: {stats['tareas_sub_estimadas']} ({stats['tareas_sub_estimadas']/stats['total_tareas']*100:.1f}%)")
    print(f"  • Tareas exactas: {stats['tareas_exactas']} ({stats['tareas_exactas']/stats['total_tareas']*100:.1f}%)")
    
    print("\\n" + "="*80)
    print("📋 ANÁLISIS POR FASE")
    print("="*80)
    
    for fase in analisis_fases:
        print(f"🔶 {fase['fase']}:")
        print(f"  • Tareas: {fase['num_tareas']}")
        print(f"  • Plan vs Real: {fase['plan_total']:.1f}h → {fase['actual_total']:.1f}h ({fase['diferencia']:+.1f}h)")
        print(f"  • Eficiencia: {fase['eficiencia']:.3f} ({fase['eficiencia']*100:.1f}%)")
        print(f"  • Promedio por tarea: {fase['plan_promedio']:.1f}h → {fase['actual_promedio']:.1f}h")
        print()
    
    print("="*80)
    print("🔄 ANÁLISIS POR ITERACIÓN")
    print("="*80)
    
    for iteracion in analisis_iteraciones:
        print(f"🔹 ITERACIÓN {int(iteracion['iteracion'])}:")
        print(f"  • Tareas: {iteracion['num_tareas']}")
        print(f"  • Plan vs Real: {iteracion['plan_total']:.1f}h → {iteracion['actual_total']:.1f}h ({iteracion['diferencia']:+.1f}h)")
        print(f"  • Eficiencia: {iteracion['eficiencia']:.3f} ({iteracion['eficiencia']*100:.1f}%)")
        print(f"  • Fases: {', '.join(iteracion['fases_involucradas'])}")
        print()
    
    if len(outliers) > 0:
        print("="*80)
        print("⚠️ TAREAS ATÍPICAS (OUTLIERS)")
        print("="*80)
        
        for outlier in outliers[:10]:  # Mostrar solo los primeros 10
            print(f"🔸 {outlier['tarea']} ({outlier['fase']}):")
            print(f"  • Plan vs Real: {outlier['plan_hours']:.1f}h → {outlier['actual_hours']:.1f}h")
            print(f"  • Ratio: {outlier['ratio_eficiencia']:.3f}")
            print()
    
    print("="*80)
    print("🚨 HALLAZGOS CRÍTICOS")
    print("="*80)
    
    # Detectar problemas principales
    max_plan = max(t['plan_hours'] for t in tareas)
    avg_actual = statistics.mean([t['actual_hours'] for t in tareas])
    
    print(f"1. 📊 DISCREPANCIA MASIVA:")
    print(f"   • Estimación máxima: {max_plan}h")
    print(f"   • Promedio real: {avg_actual:.1f}h")
    print(f"   • Factor de sobrestimación: ~{max_plan/avg_actual:.0f}x")
    
    print(f"\\n2. 🎯 PATRÓN POR ITERACIÓN:")
    iter1_eff = next(i['eficiencia'] for i in analisis_iteraciones if i['iteracion'] == 1)
    iter2_eff = next(i['eficiencia'] for i in analisis_iteraciones if i['iteracion'] == 2)
    print(f"   • Iteración 1: {iter1_eff*100:.1f}% eficiencia")
    print(f"   • Iteración 2: {iter2_eff*100:.3f}% eficiencia")
    print(f"   • Diferencia: {abs(iter1_eff - iter2_eff)*100:.1f} puntos porcentuales")
    
    print("\\n3. 🔍 FASES PROBLEMÁTICAS:")
    fases_problematicas = [f for f in analisis_fases if f['eficiencia'] < 0.1]
    for fase in fases_problematicas:
        print(f"   • {fase['fase']}: {fase['eficiencia']*100:.2f}% eficiencia")
    
    print("\\n" + "="*80)
    print("✅ Análisis completado")
    print("📊 Datos preparados para visualización")
    print("="*80)
    
    return tareas, analisis_fases, analisis_iteraciones, outliers, stats

if __name__ == "__main__":
    tareas, fases, iteraciones, outliers, stats = generar_diagnostico_completo()
