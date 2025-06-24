#!/usr/bin/env python3
"""
Análisis Estadístico Avanzado TSPi - Porcentajes y Métricas Detalladas
Incluye: Porcentajes semanales, análisis por iteración, media/mediana comparativa
Proyecto: Plena Studio
"""

import statistics
import json
from datetime import datetime

def datos_presupuesto_semanal():
    """Datos del presupuesto semanal con detalles completos"""
    
    semanas_data = [
        {
            "semana": 1,
            "fecha": "22/05/2025",
            "planificado": 24.0,
            "real": 24.0,
            "iteracion": 1,
            "fase_principal": "PLAN",
            "descripcion": "Inicio controlado - Reconocimiento y planificación"
        },
        {
            "semana": 2,
            "fecha": "29/05/2025", 
            "planificado": 24.0,
            "real": 18.0,
            "iteracion": 1,
            "fase_principal": "HLD",
            "descripcion": "High Level Design - Diagramas UML"
        },
        {
            "semana": 3,
            "fecha": "05/06/2025",
            "planificado": 24.0,
            "real": 72.0,
            "iteracion": 1,
            "fase_principal": "HLDINSP",
            "descripcion": "Crisis de alcance - Prototipos y validación"
        },
        {
            "semana": 4,
            "fecha": "12/06/2025",
            "planificado": 68.0,
            "real": 96.0,
            "iteracion": 2,
            "fase_principal": "IT",
            "descripcion": "Integration Testing - Implementación intensiva"
        },
        {
            "semana": 5,
            "fecha": "19/06/2025",
            "planificado": 68.0,
            "real": 96.0,
            "iteracion": 2,
            "fase_principal": "PM/ST",
            "descripcion": "Project Management y System Testing"
        },
        {
            "semana": 6,
            "fecha": "26/06/2025",
            "planificado": 68.0,
            "real": 30.0,
            "iteracion": 2,
            "fase_principal": "DOC",
            "descripcion": "Documentación y finalización optimizada"
        }
    ]
    
    return semanas_data

def datos_tareas_por_iteracion():
    """Datos de tareas agrupadas por iteración con detalles"""
    
    iteraciones_data = {
        1: {
            "tareas_totales": 25,
            "horas_planificadas": 102.0,
            "horas_reales": 34.6,
            "fases": ["PLAN", "HLD", "HLDINSP", "DOC", "IT"],
            "semanas": [1, 2, 3],
            "enfoque": "Diseño y planificación",
            "complejidad": "Media"
        },
        2: {
            "tareas_totales": 6,
            "horas_planificadas": 2633.0,
            "horas_reales": 13.2,
            "fases": ["PM", "IT", "ST"],
            "semanas": [4, 5, 6],
            "enfoque": "Implementación y testing",
            "complejidad": "Alta (sobrestimada)"
        }
    }
    
    return iteraciones_data

def calcular_estadisticas_semanales(semanas_data):
    """Calcula estadísticas detalladas por semana"""
    
    total_planificado = sum(s['planificado'] for s in semanas_data)
    total_real = sum(s['real'] for s in semanas_data)
    
    estadisticas_semanales = []
    
    for semana in semanas_data:
        # Cálculos básicos
        diferencia = semana['real'] - semana['planificado']
        ratio_eficiencia = semana['real'] / semana['planificado']
        
        # Porcentajes
        pct_planificado_total = (semana['planificado'] / total_planificado) * 100
        pct_real_total = (semana['real'] / total_real) * 100
        pct_diferencia = ((semana['real'] / semana['planificado']) - 1) * 100
        
        # Estado
        if ratio_eficiencia <= 1.0:
            estado = "✅ Dentro/Ahorro"
            color = "verde"
        elif ratio_eficiencia <= 1.5:
            estado = "🟡 Sobrecarga Moderada"
            color = "amarillo"
        else:
            estado = "🔴 Sobrecarga Crítica"
            color = "rojo"
        
        estadisticas = {
            'semana': semana['semana'],
            'fecha': semana['fecha'],
            'planificado': semana['planificado'],
            'real': semana['real'],
            'diferencia': diferencia,
            'ratio_eficiencia': ratio_eficiencia,
            'pct_planificado_total': pct_planificado_total,
            'pct_real_total': pct_real_total,
            'pct_diferencia': pct_diferencia,
            'estado': estado,
            'color': color,
            'iteracion': semana['iteracion'],
            'fase_principal': semana['fase_principal'],
            'descripcion': semana['descripcion']
        }
        
        estadisticas_semanales.append(estadisticas)
    
    return estadisticas_semanales

def calcular_estadisticas_por_iteracion(semanas_data, iteraciones_data):
    """Calcula estadísticas detalladas por iteración"""
    
    estadisticas_iteraciones = []
    
    for iter_num, iter_info in iteraciones_data.items():
        # Filtrar semanas de esta iteración
        semanas_iter = [s for s in semanas_data if s['iteracion'] == iter_num]
        
        # Sumar horas de semanas
        planificado_semanas = sum(s['planificado'] for s in semanas_iter)
        real_semanas = sum(s['real'] for s in semanas_iter)
        
        # Estadísticas de la iteración
        diferencia_semanas = real_semanas - planificado_semanas
        eficiencia_semanas = real_semanas / planificado_semanas if planificado_semanas > 0 else 0
        
        # Estadísticas de tareas
        eficiencia_tareas = iter_info['horas_reales'] / iter_info['horas_planificadas'] if iter_info['horas_planificadas'] > 0 else 0
        diferencia_tareas = iter_info['horas_reales'] - iter_info['horas_planificadas']
        
        estadisticas = {
            'iteracion': iter_num,
            'semanas_incluidas': [s['semana'] for s in semanas_iter],
            'duracion_semanas': len(semanas_iter),
            
            # Datos de semanas (presupuesto)
            'presupuesto_planificado': planificado_semanas,
            'presupuesto_real': real_semanas,
            'presupuesto_diferencia': diferencia_semanas,
            'presupuesto_eficiencia': eficiencia_semanas,
            'presupuesto_pct': ((real_semanas / planificado_semanas) - 1) * 100 if planificado_semanas > 0 else 0,
            
            # Datos de tareas (Form TASK)
            'tareas_totales': iter_info['tareas_totales'],
            'tareas_planificadas': iter_info['horas_planificadas'],
            'tareas_reales': iter_info['horas_reales'],
            'tareas_diferencia': diferencia_tareas,
            'tareas_eficiencia': eficiencia_tareas,
            'tareas_pct': ((iter_info['horas_reales'] / iter_info['horas_planificadas']) - 1) * 100 if iter_info['horas_planificadas'] > 0 else 0,
            
            # Información adicional
            'fases': iter_info['fases'],
            'enfoque': iter_info['enfoque'],
            'complejidad': iter_info['complejidad']
        }
        
        estadisticas_iteraciones.append(estadisticas)
    
    return estadisticas_iteraciones

def calcular_metricas_comparativas(semanas_data):
    """Calcula métricas estadísticas comparativas"""
    
    planificados = [s['planificado'] for s in semanas_data]
    reales = [s['real'] for s in semanas_data]
    diferencias = [s['real'] - s['planificado'] for s in semanas_data]
    ratios = [s['real'] / s['planificado'] for s in semanas_data]
    
    metricas = {
        'planificado': {
            'total': sum(planificados),
            'media': statistics.mean(planificados),
            'mediana': statistics.median(planificados),
            'desv_estandar': statistics.stdev(planificados) if len(planificados) > 1 else 0,
            'minimo': min(planificados),
            'maximo': max(planificados),
            'rango': max(planificados) - min(planificados)
        },
        'real': {
            'total': sum(reales),
            'media': statistics.mean(reales),
            'mediana': statistics.median(reales),
            'desv_estandar': statistics.stdev(reales) if len(reales) > 1 else 0,
            'minimo': min(reales),
            'maximo': max(reales),
            'rango': max(reales) - min(reales)
        },
        'diferencias': {
            'total': sum(diferencias),
            'media': statistics.mean(diferencias),
            'mediana': statistics.median(diferencias),
            'desv_estandar': statistics.stdev(diferencias) if len(diferencias) > 1 else 0,
            'minimo': min(diferencias),
            'maximo': max(diferencias)
        },
        'ratios': {
            'media': statistics.mean(ratios),
            'mediana': statistics.median(ratios),
            'desv_estandar': statistics.stdev(ratios) if len(ratios) > 1 else 0,
            'minimo': min(ratios),
            'maximo': max(ratios)
        },
        'globales': {
            'eficiencia_total': sum(reales) / sum(planificados) * 100,
            'ahorro_total': sum(planificados) - sum(reales),
            'ahorro_porcentual': ((sum(planificados) - sum(reales)) / sum(planificados)) * 100,
            'semanas_ahorro': len([r for r in ratios if r <= 1.0]),
            'semanas_sobrecarga': len([r for r in ratios if r > 1.0])
        }
    }
    
    return metricas

def generar_reporte_detallado():
    """Genera el reporte completo con todas las métricas"""
    
    print("🚀 Iniciando análisis estadístico avanzado TSPi...")
    print("=" * 100)
    
    # Cargar datos
    semanas_data = datos_presupuesto_semanal()
    iteraciones_data = datos_tareas_por_iteracion()
    
    # Calcular estadísticas
    stats_semanales = calcular_estadisticas_semanales(semanas_data)
    stats_iteraciones = calcular_estadisticas_por_iteracion(semanas_data, iteraciones_data)
    metricas_comp = calcular_metricas_comparativas(semanas_data)
    
    # ========================================
    # REPORTE PRINCIPAL
    # ========================================
    
    print("📊 ANÁLISIS ESTADÍSTICO AVANZADO TSPi - PLENA STUDIO")
    print("=" * 100)
    print(f"📅 Período: {semanas_data[0]['fecha']} - {semanas_data[-1]['fecha']}")
    print(f"🔢 Total semanas: {len(semanas_data)}")
    print(f"🔄 Iteraciones: {len(iteraciones_data)}")
    print(f"📋 Total tareas analizadas: {sum(iter_info['tareas_totales'] for iter_info in iteraciones_data.values())}")
    
    # ========================================
    # ANÁLISIS SEMANAL DETALLADO
    # ========================================
    
    print("\\n" + "=" * 100)
    print("📅 ANÁLISIS SEMANAL DETALLADO CON PORCENTAJES")
    print("=" * 100)
    
    print(f"{'Sem':<3} {'Fecha':<10} {'Plan':<6} {'Real':<6} {'Diff':<6} {'Ratio':<6} {'%Plan':<6} {'%Real':<6} {'%Diff':<7} {'Estado':<20} {'Fase':<10}")
    print("-" * 95)
    
    for stat in stats_semanales:
        print(f"{stat['semana']:<3} "
              f"{stat['fecha']:<10} "
              f"{stat['planificado']:>5.1f}h "
              f"{stat['real']:>5.1f}h "
              f"{stat['diferencia']:>+5.1f}h "
              f"{stat['ratio_eficiencia']:>5.2f} "
              f"{stat['pct_planificado_total']:>5.1f}% "
              f"{stat['pct_real_total']:>5.1f}% "
              f"{stat['pct_diferencia']:>+6.0f}% "
              f"{stat['estado']:<20} "
              f"{stat['fase_principal']:<10}")
    
    # ========================================
    # MÉTRICAS ESTADÍSTICAS COMPARATIVAS
    # ========================================
    
    print("\\n" + "=" * 100)
    print("📊 MÉTRICAS ESTADÍSTICAS COMPARATIVAS")
    print("=" * 100)
    
    print("📋 HORAS PLANIFICADAS:")
    print(f"  • Total: {metricas_comp['planificado']['total']:.1f}h")
    print(f"  • Media: {metricas_comp['planificado']['media']:.1f}h")
    print(f"  • Mediana: {metricas_comp['planificado']['mediana']:.1f}h")
    print(f"  • Desv. Estándar: {metricas_comp['planificado']['desv_estandar']:.1f}h")
    print(f"  • Rango: {metricas_comp['planificado']['minimo']:.1f}h - {metricas_comp['planificado']['maximo']:.1f}h")
    
    print("\\n⏱️ HORAS REALES:")
    print(f"  • Total: {metricas_comp['real']['total']:.1f}h")
    print(f"  • Media: {metricas_comp['real']['media']:.1f}h") 
    print(f"  • Mediana: {metricas_comp['real']['mediana']:.1f}h")
    print(f"  • Desv. Estándar: {metricas_comp['real']['desv_estandar']:.1f}h")
    print(f"  • Rango: {metricas_comp['real']['minimo']:.1f}h - {metricas_comp['real']['maximo']:.1f}h")
    
    print("\\n🔄 DIFERENCIAS:")
    print(f"  • Total: {metricas_comp['diferencias']['total']:+.1f}h")
    print(f"  • Media: {metricas_comp['diferencias']['media']:+.1f}h")
    print(f"  • Mediana: {metricas_comp['diferencias']['mediana']:+.1f}h")
    print(f"  • Desv. Estándar: {metricas_comp['diferencias']['desv_estandar']:.1f}h")
    print(f"  • Rango: {metricas_comp['diferencias']['minimo']:+.1f}h a {metricas_comp['diferencias']['maximo']:+.1f}h")
    
    print("\\n🎯 RATIOS DE EFICIENCIA:")
    print(f"  • Media: {metricas_comp['ratios']['media']:.3f}")
    print(f"  • Mediana: {metricas_comp['ratios']['mediana']:.3f}")
    print(f"  • Desv. Estándar: {metricas_comp['ratios']['desv_estandar']:.3f}")
    print(f"  • Rango: {metricas_comp['ratios']['minimo']:.3f} - {metricas_comp['ratios']['maximo']:.3f}")
    
    print("\\n🌐 MÉTRICAS GLOBALES:")
    print(f"  • Eficiencia Total: {metricas_comp['globales']['eficiencia_total']:.1f}%")
    print(f"  • Ahorro Total: {metricas_comp['globales']['ahorro_total']:+.1f}h")
    print(f"  • Ahorro Porcentual: {metricas_comp['globales']['ahorro_porcentual']:+.1f}%")
    print(f"  • Semanas con Ahorro: {metricas_comp['globales']['semanas_ahorro']}/{len(semanas_data)} ({metricas_comp['globales']['semanas_ahorro']/len(semanas_data)*100:.1f}%)")
    print(f"  • Semanas con Sobrecarga: {metricas_comp['globales']['semanas_sobrecarga']}/{len(semanas_data)} ({metricas_comp['globales']['semanas_sobrecarga']/len(semanas_data)*100:.1f}%)")
    
    # ========================================
    # ANÁLISIS POR ITERACIÓN
    # ========================================
    
    print("\\n" + "=" * 100)
    print("🔄 ANÁLISIS DETALLADO POR ITERACIÓN")
    print("=" * 100)
    
    for stat in stats_iteraciones:
        print(f"\\n🔹 ITERACIÓN {stat['iteracion']} - {stat['enfoque'].upper()}")
        print(f"   📅 Semanas: {', '.join(map(str, stat['semanas_incluidas']))} (duración: {stat['duracion_semanas']} semanas)")
        print(f"   🎯 Fases: {', '.join(stat['fases'])}")
        print(f"   📊 Complejidad: {stat['complejidad']}")
        
        print("\\n   📋 PRESUPUESTO SEMANAL:")
        print(f"   • Plan vs Real: {stat['presupuesto_planificado']:.1f}h → {stat['presupuesto_real']:.1f}h ({stat['presupuesto_diferencia']:+.1f}h)")
        print(f"   • Eficiencia: {stat['presupuesto_eficiencia']:.3f} ({stat['presupuesto_pct']:+.1f}%)")
        
        print("\\n   📝 TAREAS (FORM TASK):")
        print(f"   • Tareas totales: {stat['tareas_totales']}")
        print(f"   • Plan vs Real: {stat['tareas_planificadas']:.1f}h → {stat['tareas_reales']:.1f}h ({stat['tareas_diferencia']:+.1f}h)")
        print(f"   • Eficiencia: {stat['tareas_eficiencia']:.3f} ({stat['tareas_pct']:+.1f}%)")
        
        print("\\n   🔍 ANÁLISIS COMPARATIVO:")
        discrepancia = abs(stat['presupuesto_eficiencia'] - stat['tareas_eficiencia'])
        print(f"   • Discrepancia Presupuesto vs Tareas: {discrepancia:.3f}")
        if discrepancia > 0.1:
            print(f"   • ⚠️ ALTA DISCREPANCIA - Diferencia significativa entre estimaciones")
        
        # Análisis de consistencia
        if stat['presupuesto_eficiencia'] > 1.0 and stat['tareas_eficiencia'] < 0.1:
            print(f"   • 🚨 PATRÓN CRÍTICO - Sobrecarga en presupuesto, subestimación masiva en tareas")
        elif stat['presupuesto_eficiencia'] < 1.0 and stat['tareas_eficiencia'] < 1.0:
            print(f"   • ✅ PATRÓN CONSISTENTE - Ambos muestran eficiencia")
    
    # ========================================
    # COMPARACIÓN ENTRE ITERACIONES
    # ========================================
    
    print("\\n" + "=" * 100)
    print("⚖️ COMPARACIÓN ENTRE ITERACIONES")
    print("=" * 100)
    
    if len(stats_iteraciones) >= 2:
        iter1 = stats_iteraciones[0]
        iter2 = stats_iteraciones[1]
        
        print("📊 DIFERENCIAS CLAVE:")
        print(f"• Duración: Iter1 {iter1['duracion_semanas']} sem vs Iter2 {iter2['duracion_semanas']} sem")
        print(f"• Eficiencia Presupuesto: {iter1['presupuesto_eficiencia']:.3f} vs {iter2['presupuesto_eficiencia']:.3f}")
        print(f"• Eficiencia Tareas: {iter1['tareas_eficiencia']:.3f} vs {iter2['tareas_eficiencia']:.3f}")
        print(f"• Tareas por semana: {iter1['tareas_totales']/iter1['duracion_semanas']:.1f} vs {iter2['tareas_totales']/iter2['duracion_semanas']:.1f}")
        
        print("\\n🎯 TENDENCIAS:")
        if iter2['presupuesto_eficiencia'] > iter1['presupuesto_eficiencia']:
            print("• 📈 Incremento en carga de trabajo real (Iter2 > Iter1)")
        else:
            print("• 📉 Reducción en carga de trabajo real (Iter2 < Iter1)")
            
        if iter2['tareas_eficiencia'] < iter1['tareas_eficiencia']:
            print("• ⚠️ Mayor subestimación en tareas de Iter2")
        
        # Cálculo de volatilidad
        volatilidad_presupuesto = abs(iter2['presupuesto_eficiencia'] - iter1['presupuesto_eficiencia'])
        volatilidad_tareas = abs(iter2['tareas_eficiencia'] - iter1['tareas_eficiencia'])
        
        print(f"\\n📊 VOLATILIDAD:")
        print(f"• Volatilidad Presupuesto: {volatilidad_presupuesto:.3f}")
        print(f"• Volatilidad Tareas: {volatilidad_tareas:.3f}")
        
        if volatilidad_tareas > 0.2:
            print("• 🚨 ALTA VOLATILIDAD en estimación de tareas entre iteraciones")
    
    # ========================================
    # CONCLUSIONES Y RECOMENDACIONES
    # ========================================
    
    print("\\n" + "=" * 100)
    print("🏆 CONCLUSIONES PRINCIPALES")
    print("=" * 100)
    
    print("1. 📊 PATRÓN GENERAL:")
    if metricas_comp['globales']['eficiencia_total'] < 100:
        print(f"   • Proyecto ejecutado con {100 - metricas_comp['globales']['eficiencia_total']:.1f}% de eficiencia (ahorro)")
    else:
        print(f"   • Proyecto excedió presupuesto en {metricas_comp['globales']['eficiencia_total'] - 100:.1f}%")
    
    print("\\n2. 🎯 PRECISIÓN DE ESTIMACIONES:")
    cv_planificado = (metricas_comp['planificado']['desv_estandar'] / metricas_comp['planificado']['media']) * 100
    cv_real = (metricas_comp['real']['desv_estandar'] / metricas_comp['real']['media']) * 100
    print(f"   • Coeficiente de Variación Planificado: {cv_planificado:.1f}%")
    print(f"   • Coeficiente de Variación Real: {cv_real:.1f}%")
    
    if cv_planificado > cv_real:
        print("   • ✅ Mayor consistencia en ejecución que en planificación")
    else:
        print("   • ⚠️ Mayor variabilidad en ejecución")
    
    print("\\n3. 🔄 EVOLUCIÓN ENTRE ITERACIONES:")
    if len(stats_iteraciones) >= 2:
        if stats_iteraciones[1]['presupuesto_eficiencia'] > stats_iteraciones[0]['presupuesto_eficiencia']:
            print("   • 📈 Incremento de complejidad en Iteración 2")
        else:
            print("   • 📉 Mayor eficiencia en Iteración 2")
    
    print("\\n" + "=" * 100)
    print("✅ Análisis estadístico avanzado completado")
    print("📊 Todos los porcentajes, medias y medianas calculados")
    print("🔄 Comparación entre iteraciones incluida")
    print("=" * 100)
    
    return stats_semanales, stats_iteraciones, metricas_comp

if __name__ == "__main__":
    stats_semanales, stats_iteraciones, metricas_comp = generar_reporte_detallado()
