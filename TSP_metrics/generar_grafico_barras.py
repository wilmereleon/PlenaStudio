#!/usr/bin/env python3
"""
Generador de Gráfico de Barras - Análisis de Presupuesto TSPi
Proyecto: Plena Studio
Desarrollador: Wilmer Edilson León Díaz
"""

import matplotlib.pyplot as plt
import numpy as np
from datetime import datetime

# Configuración de datos
semanas = ['Semana 1\n22/05', 'Semana 2\n29/05', 'Semana 3\n05/06', 
           'Semana 4\n12/06', 'Semana 5\n19/06', 'Semana 6\n26/06']

horas_planificadas = [24, 24, 24, 68, 68, 68]
horas_reales = [24, 18, 72, 96, 96, 30]

# Calcular diferencias
diferencias = [real - plan for real, plan in zip(horas_reales, horas_planificadas)]
porcentajes = [(real/plan - 1) * 100 for real, plan in zip(horas_reales, horas_planificadas)]

# Configurar colores basados en el rendimiento
colores_plan = ['#3498db'] * 6  # Azul para planificado
colores_real = []
for diff in diferencias:
    if diff <= 0:
        colores_real.append('#2ecc71')  # Verde para ahorro/exacto
    elif diff <= 20:
        colores_real.append('#f39c12')  # Naranja para sobrecarga leve
    else:
        colores_real.append('#e74c3c')  # Rojo para sobrecarga crítica

# Crear el gráfico
fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(14, 12))

# Gráfico principal de barras
x = np.arange(len(semanas))
width = 0.35

bars_plan = ax1.bar(x - width/2, horas_planificadas, width, 
                   label='Horas Planificadas', color=colores_plan[0], alpha=0.8)
bars_real = ax1.bar(x + width/2, horas_reales, width, 
                   label='Horas Reales', color=colores_real, alpha=0.8)

# Personalizar el gráfico principal
ax1.set_title('📊 ANÁLISIS DE PRESUPUESTO TSPi - PLENA STUDIO\n' + 
              'Comportamiento Semanal: Planificado vs Real', 
              fontsize=16, fontweight='bold', pad=20)
ax1.set_xlabel('Semanas del Proyecto', fontsize=12, fontweight='bold')
ax1.set_ylabel('Horas de Trabajo', fontsize=12, fontweight='bold')
ax1.set_xticks(x)
ax1.set_xticklabels(semanas)
ax1.legend(fontsize=11)
ax1.grid(True, alpha=0.3, axis='y')

# Agregar valores en las barras
for i, (plan, real) in enumerate(zip(horas_planificadas, horas_reales)):
    ax1.text(i - width/2, plan + 1, f'{plan}h', ha='center', va='bottom', fontweight='bold')
    ax1.text(i + width/2, real + 1, f'{real}h', ha='center', va='bottom', fontweight='bold')

# Agregar líneas de referencia
ax1.axhline(y=np.mean(horas_planificadas), color='blue', linestyle='--', alpha=0.5, 
           label=f'Promedio Plan: {np.mean(horas_planificadas):.1f}h')
ax1.axhline(y=np.mean(horas_reales), color='red', linestyle='--', alpha=0.5,
           label=f'Promedio Real: {np.mean(horas_reales):.1f}h')

# Gráfico de diferencias
bars_diff = ax2.bar(x, diferencias, color=colores_real, alpha=0.8)
ax2.set_title('📈 Diferencias por Semana (Real - Planificado)', 
              fontsize=14, fontweight='bold')
ax2.set_xlabel('Semanas del Proyecto', fontsize=12)
ax2.set_ylabel('Diferencia en Horas', fontsize=12)
ax2.set_xticks(x)
ax2.set_xticklabels(semanas)
ax2.grid(True, alpha=0.3, axis='y')
ax2.axhline(y=0, color='black', linewidth=1)

# Agregar valores en las barras de diferencia
for i, (diff, pct) in enumerate(zip(diferencias, porcentajes)):
    y_pos = diff + (1 if diff >= 0 else -3)
    ax2.text(i, y_pos, f'{diff:+.0f}h\n({pct:+.0f}%)', 
             ha='center', va='bottom' if diff >= 0 else 'top', 
             fontweight='bold', fontsize=9)

# Agregar anotaciones especiales
ax1.annotate('🚨 PUNTO CRÍTICO\nCambio de complejidad', 
             xy=(2, 72), xytext=(2.5, 85),
             arrowprops=dict(arrowstyle='->', color='red', lw=2),
             fontsize=10, ha='center',
             bbox=dict(boxstyle="round,pad=0.3", facecolor='yellow', alpha=0.7))

ax1.annotate('✅ RECUPERACIÓN\nOptimización exitosa', 
             xy=(5, 30), xytext=(4.5, 45),
             arrowprops=dict(arrowstyle='->', color='green', lw=2),
             fontsize=10, ha='center',
             bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgreen', alpha=0.7))

# Información del proyecto
info_text = """
PROYECTO: Plena Studio - Desarrollo de aplicación web
DESARROLLADOR: Wilmer Edilson León Díaz
EQUIPO: Grupo 13
PERÍODO: 22/05/2025 - 26/06/2025 (6 semanas)

📊 MÉTRICAS FINALES:
• Total Planificado: 276 horas
• Total Ejecutado: 192 horas  
• Diferencia: -84 horas (-30.4%)
• Eficiencia: 69.6%
"""

plt.figtext(0.02, 0.02, info_text, fontsize=9, 
           bbox=dict(boxstyle="round,pad=0.5", facecolor='lightblue', alpha=0.8))

# Leyenda de fases
fases_text = """
🌱 FASE 1 (Sem 1-2): Inicio Controlado
⚡ FASE 2 (Sem 3-5): Crisis de Alcance  
🎯 FASE 3 (Sem 6): Recuperación
"""

plt.figtext(0.75, 0.02, fases_text, fontsize=9,
           bbox=dict(boxstyle="round,pad=0.5", facecolor='lightyellow', alpha=0.8))

# Ajustar layout
plt.tight_layout()
plt.subplots_adjust(bottom=0.15)

# Guardar el gráfico
plt.savefig('TSP_metrics/grafico_barras_presupuesto_tsp.png', 
           dpi=300, bbox_inches='tight', facecolor='white')
plt.savefig('TSP_metrics/grafico_barras_presupuesto_tsp.pdf', 
           bbox_inches='tight', facecolor='white')

# Mostrar el gráfico
plt.show()

print("✅ Gráfico generado exitosamente!")
print("📁 Archivos guardados:")
print("   - TSP_metrics/grafico_barras_presupuesto_tsp.png")
print("   - TSP_metrics/grafico_barras_presupuesto_tsp.pdf")

# Crear tabla resumen
print("\n📊 TABLA RESUMEN:")
df = pd.DataFrame({
    'Semana': semanas,
    'Planificado (h)': horas_planificadas,
    'Real (h)': horas_reales,
    'Diferencia (h)': diferencias,
    'Porcentaje (%)': [f'{p:+.1f}%' for p in porcentajes]
})
print(df.to_string(index=False))

print(f"\n🏆 RESUMEN TOTAL:")
print(f"   Planificado Total: {sum(horas_planificadas)} horas")
print(f"   Real Total: {sum(horas_reales)} horas")
print(f"   Diferencia Total: {sum(diferencias)} horas")
print(f"   Eficiencia: {(sum(horas_reales)/sum(horas_planificadas))*100:.1f}%")
