#!/usr/bin/env python3
"""
Análisis Estadístico Avanzado de Tareas TSPi con Porcentajes Semanales
Incluye: porcentajes por semana, iteración, media/mediana vs presupuesto
"""

import statistics
import json
from datetime import datetime, timedelta

def extraer_datos_avanzados():
    """Extrae datos con mapeo temporal y de presupuesto semanal"""
    
    # Datos de presupuesto semanal (del análisis anterior)
    presupuesto_semanal = {
        'semana_1': {'planificado': 24, 'real': 24},
        'semana_2': {'planificado': 24, 'real': 18}, 
        'semana_3': {'planificado': 24, 'real': 72},
        'semana_4': {'planificado': 68, 'real': 96},
        'semana_5': {'planificado': 68, 'real': 96},
        'semana_6': {'planificado': 68, 'real': 30}
    }
    
    # Tareas con mapeo temporal aproximado basado en secuencia lógica
    tareas_detalladas = [
        # Semana 1-2: Planificación inicial (Iteración 1)
        {"semana": 1, "iteracion": 1, "fase": "PLAN", "tarea": "Reconocimiento de datos", "plan_hours": 1, "actual_hours": 1.3, "porcentaje_semana": 5.4},
        {"semana": 1, "iteracion": 1, "fase": "PLAN", "tarea": "Crear listado de acrónimos", "plan_hours": 1, "actual_hours": 0.3, "porcentaje_semana": 1.25},
        {"semana": 1, "iteracion": 1, "fase": "PLAN", "tarea": "Definir listado de RNF", "plan_hours": 3, "actual_hours": 1.0, "porcentaje_semana": 4.17},
        {"semana": 1, "iteracion": 1, "fase": "PLAN", "tarea": "Definir prototipos", "plan_hours": 1, "actual_hours": 0.9, "porcentaje_semana": 3.75},
        {"semana": 1, "iteracion": 1, "fase": "PLAN", "tarea": "Definir especificaciones de arquitectura", "plan_hours": 1, "actual_hours": 1.0, "porcentaje_semana": 4.17},
        
        # Semana 2: Diseño de alto nivel 
        {"semana": 2, "iteracion": 1, "fase": "HLD", "tarea": "Definir diagramas de diseño UML", "plan_hours": 1, "actual_hours": 0.8, "porcentaje_semana": 4.44},
        {"semana": 2, "iteracion": 1, "fase": "HLD", "tarea": "Definir diagramas clases", "plan_hours": 3, "actual_hours": 4.3, "porcentaje_semana": 23.89},
        {"semana": 2, "iteracion": 1, "fase": "HLD", "tarea": "Crear diagramas clase", "plan_hours": 1, "actual_hours": 1.1, "porcentaje_semana": 6.11},
        {"semana": 2, "iteracion": 1, "fase": "HLD", "tarea": "Crear diseño de componentes", "plan_hours": 2, "actual_hours": 0.8, "porcentaje_semana": 4.44},
        {"semana": 2, "iteracion": 1, "fase": "HLD", "tarea": "Crear diseño de componentes 2", "plan_hours": 1, "actual_hours": 1.5, "porcentaje_semana": 8.33},
        
        # Semana 3: Crisis de alcance - Inspecciones y ajustes
        {"semana": 3, "iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de objetos", "plan_hours": 1, "actual_hours": 0.3, "porcentaje_semana": 0.42},
        {"semana": 3, "iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de objetos 2", "plan_hours": 1, "actual_hours": 0.8, "porcentaje_semana": 1.11},
        {"semana": 3, "iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama BD ML", "plan_hours": 3, "actual_hours": 0.3, "porcentaje_semana": 0.42},
        {"semana": 3, "iteracion": 1, "fase": "HLD", "tarea": "Crear diagrama de datos", "plan_hours": 3, "actual_hours": 0.3, "porcentaje_semana": 0.42},
        {"semana": 3, "iteracion": 1, "fase": "HLDINSP", "tarea": "Crear Prototipo en Figma", "plan_hours": 14, "actual_hours": 7.4, "porcentaje_semana": 10.28},
        {"semana": 3, "iteracion": 1, "fase": "HLDINSP", "tarea": "Crear Prototipo funcional", "plan_hours": 6, "actual_hours": 3.1, "porcentaje_semana": 4.31},
        {"semana": 3, "iteracion": 1, "fase": "HLDINSP", "tarea": "Generar estimación del presupuesto", "plan_hours": 3, "actual_hours": 2.2, "porcentaje_semana": 3.06},
        
        # Semana 4-5: Desarrollo intensivo e inspecciones
        {"semana": 4, "iteracion": 1, "fase": "HLDINSP", "tarea": "Reacondicionamiento de Diagrama de caso", "plan_hours": 8, "actual_hours": 0.4, "porcentaje_semana": 0.42},
        {"semana": 4, "iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión de Diagrama de procesos", "plan_hours": 8, "actual_hours": 0.4, "porcentaje_semana": 0.42},
        {"semana": 4, "iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión actualización del proceso", "plan_hours": 4, "actual_hours": 0.4, "porcentaje_semana": 0.42},
        {"semana": 4, "iteracion": 1, "fase": "HLDINSP", "tarea": "Planear y actualizar diagramas UML", "plan_hours": 4, "actual_hours": 0.4, "porcentaje_semana": 0.42},
        {"semana": 4, "iteracion": 1, "fase": "HLDINSP", "tarea": "Revisar y ampliar diagramas UML", "plan_hours": 8, "actual_hours": 0.4, "porcentaje_semana": 0.42},
        {"semana": 4, "iteracion": 1, "fase": "IT", "tarea": "Fase de pruebas de formularios", "plan_hours": 2, "actual_hours": 1.4, "porcentaje_semana": 1.46},
        {"semana": 4, "iteracion": 1, "fase": "DOC", "tarea": "Montaje de documentación", "plan_hours": 20, "actual_hours": 2.4, "porcentaje_semana": 2.5},
        {"semana": 4, "iteracion": 1, "fase": "DOC", "tarea": "Comunicación del documento", "plan_hours": 2, "actual_hours": 1.4, "porcentaje_semana": 1.46},
        
        # Semana 5: Continuación desarrollo
        {"semana": 5, "iteracion": 2, "fase": "PM", "tarea": "Implementación de contexto de carrito", "plan_hours": 930, "actual_hours": 3.9, "porcentaje_semana": 4.06},
        {"semana": 5, "iteracion": 2, "fase": "IT", "tarea": "Implementación de pruebas unitarias", "plan_hours": 300, "actual_hours": 2.0, "porcentaje_semana": 2.08},
        {"semana": 5, "iteracion": 2, "fase": "IT", "tarea": "Desarrollo de funcionalidad y UI", "plan_hours": 400, "actual_hours": 2.0, "porcentaje_semana": 2.08},
        
        # Semana 6: Finalización y testing
        {"semana": 6, "iteracion": 2, "fase": "IT", "tarea": "Testing de funcionalidad", "plan_hours": 400, "actual_hours": 1.3, "porcentaje_semana": 4.33},
        {"semana": 6, "iteracion": 2, "fase": "ST", "tarea": "Pruebas de flujo y unitarias con NPM", "plan_hours": 600, "actual_hours": 2.0, "porcentaje_semana": 6.67},
        {"semana": 6, "iteracion": 2, "fase": "PM", "tarea": "Refactorización de código", "plan_hours": 3, "actual_hours": 2.0, "porcentaje_semana": 6.67}
    ]
    
    return tareas_detalladas, presupuesto_semanal

def calcular_estadisticas_por_semana(tareas, presupuesto):
    """Calcula estadísticas detalladas por semana"""
    
    estadisticas_semanales = {}
    
    for semana in range(1, 7):
        tareas_semana = [t for t in tareas if t['semana'] == semana]
        presup_semana = presupuesto[f'semana_{semana}']
        
        if tareas_semana:
            plan_total_tareas = sum(t['plan_hours'] for t in tareas_semana)
            real_total_tareas = sum(t['actual_hours'] for t in tareas_semana)
            porcentajes = [t['porcentaje_semana'] for t in tareas_semana]
            
            estadisticas_semanales[f'semana_{semana}'] = {
                'numero_semana': semana,
                'presupuesto_planificado': presup_semana['planificado'],
                'presupuesto_real': presup_semana['real'],
                'presupuesto_eficiencia': (presup_semana['real'] / presup_semana['planificado']) * 100,
                'presupuesto_diferencia': presup_semana['real'] - presup_semana['planificado'],
                
                'tareas_count': len(tareas_semana),
                'tareas_plan_total': plan_total_tareas,
                'tareas_real_total': real_total_tareas,
                'tareas_eficiencia': (real_total_tareas / plan_total_tareas * 100) if plan_total_tareas > 0 else 0,
                'tareas_diferencia': real_total_tareas - plan_total_tareas,
                
                'porcentaje_tiempo_promedio': statistics.mean(porcentajes) if porcentajes else 0,
                'porcentaje_tiempo_mediana': statistics.median(porcentajes) if porcentajes else 0,
                'porcentaje_tiempo_total': sum(porcentajes),
                
                'plan_mean': statistics.mean([t['plan_hours'] for t in tareas_semana]),
                'plan_median': statistics.median([t['plan_hours'] for t in tareas_semana]),
                'real_mean': statistics.mean([t['actual_hours'] for t in tareas_semana]),
                'real_median': statistics.median([t['actual_hours'] for t in tareas_semana]),
                
                'fases_involucradas': list(set(t['fase'] for t in tareas_semana)),
                'iteraciones_involucradas': list(set(t['iteracion'] for t in tareas_semana))
            }
    
    return estadisticas_semanales

def calcular_estadisticas_por_iteracion(tareas, presupuesto):
    """Calcula estadísticas detalladas por iteración"""
    
    estadisticas_iteraciones = {}
    
    for iteracion in [1, 2]:
        tareas_iter = [t for t in tareas if t['iteracion'] == iteracion]
        
        if tareas_iter:
            # Calcular semanas involucradas
            semanas_iter = list(set(t['semana'] for t in tareas_iter))
            
            # Sumar presupuesto de las semanas involucradas
            presup_total_plan = sum(presupuesto[f'semana_{s}']['planificado'] for s in semanas_iter)
            presup_total_real = sum(presupuesto[f'semana_{s}']['real'] for s in semanas_iter)
            
            plan_total_tareas = sum(t['plan_hours'] for t in tareas_iter)
            real_total_tareas = sum(t['actual_hours'] for t in tareas_iter)
            porcentajes = [t['porcentaje_semana'] for t in tareas_iter]
            
            estadisticas_iteraciones[f'iteracion_{iteracion}'] = {
                'numero_iteracion': iteracion,
                'semanas_involucradas': sorted(semanas_iter),
                
                'presupuesto_planificado': presup_total_plan,
                'presupuesto_real': presup_total_real,
                'presupuesto_eficiencia': (presup_total_real / presup_total_plan) * 100,
                'presupuesto_diferencia': presup_total_real - presup_total_plan,
                
                'tareas_count': len(tareas_iter),
                'tareas_plan_total': plan_total_tareas,
                'tareas_real_total': real_total_tareas,
                'tareas_eficiencia': (real_total_tareas / plan_total_tareas * 100) if plan_total_tareas > 0 else 0,
                'tareas_diferencia': real_total_tareas - plan_total_tareas,
                
                'porcentaje_tiempo_promedio': statistics.mean(porcentajes) if porcentajes else 0,
                'porcentaje_tiempo_total': sum(porcentajes),
                
                'plan_mean': statistics.mean([t['plan_hours'] for t in tareas_iter]),
                'plan_median': statistics.median([t['plan_hours'] for t in tareas_iter]),
                'real_mean': statistics.mean([t['actual_hours'] for t in tareas_iter]),
                'real_median': statistics.median([t['actual_hours'] for t in tareas_iter]),
                
                'fases_involucradas': list(set(t['fase'] for t in tareas_iter))
            }
    
    return estadisticas_iteraciones

def generar_comparacion_detallada(tareas, presupuesto):
    """Genera comparación detallada entre presupuesto y tareas"""
    
    # Totales generales
    total_presup_plan = sum(p['planificado'] for p in presupuesto.values())
    total_presup_real = sum(p['real'] for p in presupuesto.values())
    total_tareas_plan = sum(t['plan_hours'] for t in tareas)
    total_tareas_real = sum(t['actual_hours'] for t in tareas)
    
    comparacion = {
        'resumen_general': {
            'presupuesto_vs_tareas_plan': {
                'presupuesto_total': total_presup_plan,
                'tareas_total': total_tareas_plan,
                'diferencia': total_tareas_plan - total_presup_plan,
                'ratio': total_tareas_plan / total_presup_plan if total_presup_plan > 0 else 0
            },
            'presupuesto_vs_tareas_real': {
                'presupuesto_total': total_presup_real,
                'tareas_total': total_tareas_real,
                'diferencia': total_tareas_real - total_presup_real,
                'ratio': total_tareas_real / total_presup_real if total_presup_real > 0 else 0
            },
            'eficiencia_comparada': {
                'presupuesto_eficiencia': (total_presup_real / total_presup_plan) * 100,
                'tareas_eficiencia': (total_tareas_real / total_tareas_plan) * 100,
                'diferencia_eficiencia': ((total_presup_real / total_presup_plan) - (total_tareas_real / total_tareas_plan)) * 100
            }
        }
    }
    
    return comparacion

def generar_reporte_avanzado():
    """Genera el reporte estadístico avanzado completo"""
    
    print("🚀 Iniciando análisis estadístico avanzado TSPi...")
    print("="*80)
    
    # Cargar datos
    tareas, presupuesto = extraer_datos_avanzados()
    
    # Análisis por semana
    stats_semanales = calcular_estadisticas_por_semana(tareas, presupuesto)
    
    # Análisis por iteración  
    stats_iteraciones = calcular_estadisticas_por_iteracion(tareas, presupuesto)
    
    # Comparación detallada
    comparacion = generar_comparacion_detallada(tareas, presupuesto)
    
    print("📊 ANÁLISIS ESTADÍSTICO AVANZADO - TSPi")
    print("="*80)
    
    print("\\n🗓️ ANÁLISIS SEMANAL DETALLADO")
    print("="*80)
    
    for semana_key, stats in stats_semanales.items():
        print(f"\\n📅 SEMANA {stats['numero_semana']}:")
        print(f"  🎯 PRESUPUESTO:")
        print(f"    • Plan vs Real: {stats['presupuesto_planificado']}h → {stats['presupuesto_real']}h ({stats['presupuesto_diferencia']:+}h)")
        print(f"    • Eficiencia: {stats['presupuesto_eficiencia']:.1f}%")
        
        print(f"  📋 TAREAS ({stats['tareas_count']} tareas):")
        print(f"    • Plan vs Real: {stats['tareas_plan_total']:.1f}h → {stats['tareas_real_total']:.1f}h ({stats['tareas_diferencia']:+.1f}h)")
        print(f"    • Eficiencia: {stats['tareas_eficiencia']:.1f}%")
        print(f"    • Media: {stats['plan_mean']:.1f}h → {stats['real_mean']:.1f}h")
        print(f"    • Mediana: {stats['plan_median']:.1f}h → {stats['real_median']:.1f}h")
        
        print(f"  ⏱️ PORCENTAJE DE TIEMPO:")
        print(f"    • Promedio por tarea: {stats['porcentaje_tiempo_promedio']:.1f}%")
        print(f"    • Mediana por tarea: {stats['porcentaje_tiempo_mediana']:.1f}%")
        print(f"    • Total semanal: {stats['porcentaje_tiempo_total']:.1f}%")
        
        print(f"  🔧 FASES: {', '.join(stats['fases_involucradas'])}")
        print(f"  🔄 ITERACIONES: {', '.join(map(str, stats['iteraciones_involucradas']))}")
    
    print("\\n\\n🔄 ANÁLISIS POR ITERACIÓN DETALLADO")
    print("="*80)
    
    for iter_key, stats in stats_iteraciones.items():
        print(f"\\n🔹 ITERACIÓN {stats['numero_iteracion']}:")
        print(f"  📅 Semanas: {', '.join(map(str, stats['semanas_involucradas']))}")
        
        print(f"  🎯 PRESUPUESTO CONSOLIDADO:")
        print(f"    • Plan vs Real: {stats['presupuesto_planificado']}h → {stats['presupuesto_real']}h ({stats['presupuesto_diferencia']:+}h)")
        print(f"    • Eficiencia: {stats['presupuesto_eficiencia']:.1f}%")
        
        print(f"  📋 TAREAS CONSOLIDADAS ({stats['tareas_count']} tareas):")
        print(f"    • Plan vs Real: {stats['tareas_plan_total']:.1f}h → {stats['tareas_real_total']:.1f}h ({stats['tareas_diferencia']:+.1f}h)")
        print(f"    • Eficiencia: {stats['tareas_eficiencia']:.3f}%")
        print(f"    • Media: {stats['plan_mean']:.1f}h → {stats['real_mean']:.1f}h")
        print(f"    • Mediana: {stats['plan_median']:.1f}h → {stats['real_median']:.1f}h")
        
        print(f"  ⏱️ DISTRIBUCIÓN DE TIEMPO:")
        print(f"    • Promedio por tarea: {stats['porcentaje_tiempo_promedio']:.1f}%")
        print(f"    • Total de la iteración: {stats['porcentaje_tiempo_total']:.1f}%")
        
        print(f"  🔧 FASES: {', '.join(stats['fases_involucradas'])}")
    
    print("\\n\\n📊 COMPARACIÓN PRESUPUESTO vs TAREAS")
    print("="*80)
    
    comp = comparacion['resumen_general']
    
    print("🔵 PLANIFICACIÓN:")
    print(f"  • Presupuesto total: {comp['presupuesto_vs_tareas_plan']['presupuesto_total']}h")
    print(f"  • Tareas total: {comp['presupuesto_vs_tareas_plan']['tareas_total']:.1f}h") 
    print(f"  • Diferencia: {comp['presupuesto_vs_tareas_plan']['diferencia']:+.1f}h")
    print(f"  • Ratio tareas/presupuesto: {comp['presupuesto_vs_tareas_plan']['ratio']:.1f}x")
    
    print("\\n🟢 EJECUCIÓN REAL:")
    print(f"  • Presupuesto real: {comp['presupuesto_vs_tareas_real']['presupuesto_total']}h")
    print(f"  • Tareas reales: {comp['presupuesto_vs_tareas_real']['tareas_total']:.1f}h")
    print(f"  • Diferencia: {comp['presupuesto_vs_tareas_real']['diferencia']:+.1f}h")
    print(f"  • Ratio tareas/presupuesto: {comp['presupuesto_vs_tareas_real']['ratio']:.2f}x")
    
    print("\\n🎯 EFICIENCIAS COMPARADAS:")
    print(f"  • Eficiencia presupuesto: {comp['eficiencia_comparada']['presupuesto_eficiencia']:.1f}%")
    print(f"  • Eficiencia tareas: {comp['eficiencia_comparada']['tareas_eficiencia']:.3f}%")
    print(f"  • Diferencia: {comp['eficiencia_comparada']['diferencia_eficiencia']:+.1f} puntos porcentuales")
    
    print("\\n" + "="*80)
    print("✅ Análisis estadístico avanzado completado")
    print("📊 Datos preparados para visualización detallada")
    print("="*80)
    
    return stats_semanales, stats_iteraciones, comparacion

if __name__ == "__main__":
    semanales, iteraciones, comparacion = generar_reporte_avanzado()
