#!/usr/bin/env python3
"""
Análisis Completo de Tareas TSPi - Form TASK
Proyecto: Plena Studio
Desarrollador: Wilmer Edilson León Díaz
Análisis estadístico y visualización de tareas del proyecto TSPi
"""

import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json

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
        
        # Iteración 1 - IT (Integration Test)
        {"iteracion": 1, "fase": "IT", "tarea": "Fase de pruebas de formularios", "plan_hours": 2, "actual_hours": 1.4},
        
        # Iteración 1 - DOC (Documentation)
        {"iteracion": 1, "fase": "DOC", "tarea": "Montaje de documentación", "plan_hours": 20, "actual_hours": 2.4},
        {"iteracion": 1, "fase": "DOC", "tarea": "Comunicación del documento", "plan_hours": 2, "actual_hours": 1.4},
        
        # Iteración 1 - HLDINSP (continuación)
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Reacondicionamiento de Diagrama de caso", "plan_hours": 8, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión de Diagrama de procesos", "plan_hours": 8, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisión actualización del proceso", "plan_hours": 4, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Planear y actualizar diagramas UML", "plan_hours": 4, "actual_hours": 0.4},
        {"iteracion": 1, "fase": "HLDINSP", "tarea": "Revisar y ampliar diagramas UML", "plan_hours": 8, "actual_hours": 0.4},
        
        # Iteración 2 - PM (Project Management)
        {"iteracion": 2, "fase": "PM", "tarea": "Implementación de contexto de carrito", "plan_hours": 930, "actual_hours": 3.9},
        
        # Iteración 2 - IT (Integration Test)
        {"iteracion": 2, "fase": "IT", "tarea": "Implementación de pruebas unitarias", "plan_hours": 300, "actual_hours": 2.0},
        {"iteracion": 2, "fase": "IT", "tarea": "Desarrollo de funcionalidad y UI", "plan_hours": 400, "actual_hours": 2.0},
        {"iteracion": 2, "fase": "IT", "tarea": "Testing de funcionalidad", "plan_hours": 400, "actual_hours": 1.3},
        
        # Iteración 2 - ST (System Test)
        {"iteracion": 2, "fase": "ST", "tarea": "Pruebas de flujo y unitarias con NPM", "plan_hours": 600, "actual_hours": 2.0},
        
        # Iteración 2 - PM (continuación)
        {"iteracion": 2, "fase": "PM", "tarea": "Refactorización de código", "plan_hours": 3, "actual_hours": 2.0}
    ]
    
    return pd.DataFrame(tareas)

def calcular_estadisticas_basicas(df):
    """Calcula estadísticas básicas de las tareas"""
    
    stats = {
        'total_tareas': len(df),
        'total_plan_hours': df['plan_hours'].sum(),
        'total_actual_hours': df['actual_hours'].sum(),
        'diferencia_total': df['actual_hours'].sum() - df['plan_hours'].sum(),
        
        # Estadísticas de horas planificadas
        'plan_mean': df['plan_hours'].mean(),
        'plan_median': df['plan_hours'].median(),
        'plan_std': df['plan_hours'].std(),
        'plan_min': df['plan_hours'].min(),
        'plan_max': df['plan_hours'].max(),
        
        # Estadísticas de horas reales
        'actual_mean': df['actual_hours'].mean(),
        'actual_median': df['actual_hours'].median(),
        'actual_std': df['actual_hours'].std(),
        'actual_min': df['actual_hours'].min(),
        'actual_max': df['actual_hours'].max(),
        
        # Ratios y eficiencias
        'eficiencia_promedio': (df['actual_hours'] / df['plan_hours']).mean(),
        'eficiencia_mediana': (df['actual_hours'] / df['plan_hours']).median(),
        'tareas_sobre_estimadas': len(df[df['actual_hours'] > df['plan_hours']]),
        'tareas_sub_estimadas': len(df[df['actual_hours'] < df['plan_hours']]),
        'tareas_exactas': len(df[df['actual_hours'] == df['plan_hours']])
    }
    
    return stats

def analizar_por_fase(df):
    """Analiza las tareas agrupadas por fase"""
    
    analisis_fases = []
    
    for fase in df['fase'].unique():
        fase_data = df[df['fase'] == fase]
        
        fase_stats = {
            'fase': fase,
            'num_tareas': len(fase_data),
            'plan_total': fase_data['plan_hours'].sum(),
            'actual_total': fase_data['actual_hours'].sum(),
            'diferencia': fase_data['actual_hours'].sum() - fase_data['plan_hours'].sum(),
            'eficiencia': fase_data['actual_hours'].sum() / fase_data['plan_hours'].sum(),
            'plan_promedio': fase_data['plan_hours'].mean(),
            'actual_promedio': fase_data['actual_hours'].mean(),
            'desviacion_std': (fase_data['actual_hours'] / fase_data['plan_hours']).std()
        }
        
        analisis_fases.append(fase_stats)
    
    return pd.DataFrame(analisis_fases)

def analizar_por_iteracion(df):
    """Analiza las tareas agrupadas por iteración"""
    
    analisis_iteraciones = []
    
    for iteracion in df['iteracion'].unique():
        iter_data = df[df['iteracion'] == iteracion]
        
        iter_stats = {
            'iteracion': iteracion,
            'num_tareas': len(iter_data),
            'plan_total': iter_data['plan_hours'].sum(),
            'actual_total': iter_data['actual_hours'].sum(),
            'diferencia': iter_data['actual_hours'].sum() - iter_data['plan_hours'].sum(),
            'eficiencia': iter_data['actual_hours'].sum() / iter_data['plan_hours'].sum(),
            'fases_involucradas': list(iter_data['fase'].unique())
        }
        
        analisis_iteraciones.append(iter_stats)
    
    return pd.DataFrame(analisis_iteraciones)

def detectar_outliers(df):
    """Detecta tareas con comportamientos atípicos"""
    
    # Calcular ratio de eficiencia para cada tarea
    df['ratio_eficiencia'] = df['actual_hours'] / df['plan_hours']
    
    # Detectar outliers usando IQR
    Q1 = df['ratio_eficiencia'].quantile(0.25)
    Q3 = df['ratio_eficiencia'].quantile(0.75)
    IQR = Q3 - Q1
    
    lower_bound = Q1 - 1.5 * IQR
    upper_bound = Q3 + 1.5 * IQR
    
    outliers = df[(df['ratio_eficiencia'] < lower_bound) | (df['ratio_eficiencia'] > upper_bound)]
    
    return outliers

def generar_diagnostico_completo():
    """Genera el diagnóstico completo de tareas TSPi"""
    
    print("🚀 Iniciando análisis completo de tareas TSPi...")
    print("="*80)
    
    # Cargar datos
    df = extraer_datos_tareas()
    
    # Estadísticas básicas
    stats = calcular_estadisticas_basicas(df)
    
    # Análisis por fase y iteración
    analisis_fases = analizar_por_fase(df)
    analisis_iteraciones = analizar_por_iteracion(df)
    
    # Detectar outliers
    outliers = detectar_outliers(df)
    
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
    print(f"  • Desviación estándar: {stats['plan_std']:.2f}h")
    print(f"  • Rango: {stats['plan_min']:.1f}h - {stats['plan_max']:.1f}h")
    
    print("\\n🟢 HORAS REALES:")
    print(f"  • Media: {stats['actual_mean']:.2f}h")
    print(f"  • Mediana: {stats['actual_median']:.2f}h")
    print(f"  • Desviación estándar: {stats['actual_std']:.2f}h")
    print(f"  • Rango: {stats['actual_min']:.1f}h - {stats['actual_max']:.1f}h")
    
    print("\\n🎯 ANÁLISIS DE ESTIMACIONES:")
    print(f"  • Eficiencia promedio: {stats['eficiencia_promedio']:.2f}")
    print(f"  • Eficiencia mediana: {stats['eficiencia_mediana']:.2f}")
    print(f"  • Tareas sobre-estimadas: {stats['tareas_sobre_estimadas']} ({stats['tareas_sobre_estimadas']/stats['total_tareas']*100:.1f}%)")
    print(f"  • Tareas sub-estimadas: {stats['tareas_sub_estimadas']} ({stats['tareas_sub_estimadas']/stats['total_tareas']*100:.1f}%)")
    print(f"  • Tareas exactas: {stats['tareas_exactas']} ({stats['tareas_exactas']/stats['total_tareas']*100:.1f}%)")
    
    print("\\n" + "="*80)
    print("📋 ANÁLISIS POR FASE")
    print("="*80)
    
    for _, fase in analisis_fases.iterrows():
        print(f"🔶 {fase['fase']}:")
        print(f"  • Tareas: {fase['num_tareas']}")
        print(f"  • Plan vs Real: {fase['plan_total']:.1f}h → {fase['actual_total']:.1f}h ({fase['diferencia']:+.1f}h)")
        print(f"  • Eficiencia: {fase['eficiencia']:.2f} ({fase['eficiencia']*100:.1f}%)")
        print(f"  • Promedio por tarea: {fase['plan_promedio']:.1f}h → {fase['actual_promedio']:.1f}h")
        print()
    
    print("="*80)
    print("🔄 ANÁLISIS POR ITERACIÓN")
    print("="*80)
    
    for _, iteracion in analisis_iteraciones.iterrows():
        print(f"🔹 ITERACIÓN {int(iteracion['iteracion'])}:")
        print(f"  • Tareas: {iteracion['num_tareas']}")
        print(f"  • Plan vs Real: {iteracion['plan_total']:.1f}h → {iteracion['actual_total']:.1f}h ({iteracion['diferencia']:+.1f}h)")
        print(f"  • Eficiencia: {iteracion['eficiencia']:.2f} ({iteracion['eficiencia']*100:.1f}%)")
        print(f"  • Fases: {', '.join(iteracion['fases_involucradas'])}")
        print()
    
    if len(outliers) > 0:
        print("="*80)
        print("⚠️ TAREAS ATÍPICAS (OUTLIERS)")
        print("="*80)
        
        for _, outlier in outliers.iterrows():
            print(f"🔸 {outlier['tarea']} ({outlier['fase']}):")
            print(f"  • Plan vs Real: {outlier['plan_hours']:.1f}h → {outlier['actual_hours']:.1f}h")
            print(f"  • Ratio: {outlier['ratio_eficiencia']:.2f}")
            print()
    
    # Guardar datos para visualización
    df.to_csv('tareas_tspi_data.csv', index=False)
    analisis_fases.to_csv('analisis_fases.csv', index=False)
    analisis_iteraciones.to_csv('analisis_iteraciones.csv', index=False)
    
    print("="*80)
    print("✅ Análisis completado")
    print("📁 Datos guardados en:")
    print("  • tareas_tspi_data.csv")
    print("  • analisis_fases.csv") 
    print("  • analisis_iteraciones.csv")
    print("="*80)
    
    return df, analisis_fases, analisis_iteraciones, outliers, stats

if __name__ == "__main__":
    df, fases, iteraciones, outliers, stats = generar_diagnostico_completo()
