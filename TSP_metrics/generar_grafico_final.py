# Script para generar gráfico de barras del presupuesto TSPi
# Instalar dependencias: pip install matplotlib numpy

import matplotlib.pyplot as plt

# Datos del proyecto TSPi - Plena Studio
semanas = ['Semana 1\n22/05', 'Semana 2\n29/05', 'Semana 3\n05/06', 
           'Semana 4\n12/06', 'Semana 5\n19/06', 'Semana 6\n26/06']

horas_planificadas = [24, 24, 24, 68, 68, 68]
horas_reales = [24, 18, 72, 96, 96, 30]

# Calcular diferencias
diferencias = []
for i in range(len(horas_reales)):
    diff = horas_reales[i] - horas_planificadas[i]
    diferencias.append(diff)

# Configurar colores según el rendimiento
colores_reales = []
for diff in diferencias:
    if diff <= 0:
        colores_reales.append('#2ecc71')  # Verde - Ahorro
    elif diff <= 30:
        colores_reales.append('#f39c12')  # Naranja - Sobrecarga moderada  
    else:
        colores_reales.append('#e74c3c')  # Rojo - Sobrecarga crítica

# Crear el gráfico
fig, ax = plt.subplots(figsize=(14, 10))

# Posiciones de las barras
x_pos = list(range(len(semanas)))
width = 0.35

# Crear barras dobles
bars_plan = []
bars_real = []

for i in range(len(semanas)):
    # Barra planificada (azul)
    bar_p = ax.bar(x_pos[i] - width/2, horas_planificadas[i], width, 
                   color='#3498db', alpha=0.8, label='Planificado' if i == 0 else "")
    bars_plan.append(bar_p)
    
    # Barra real (color según rendimiento)
    bar_r = ax.bar(x_pos[i] + width/2, horas_reales[i], width, 
                   color=colores_reales[i], alpha=0.8, label='Real' if i == 0 else "")
    bars_real.append(bar_r)

# Personalizar el gráfico
ax.set_title('📊 ANÁLISIS DE PRESUPUESTO TSPi - PLENA STUDIO\n' +
             'Comportamiento Semanal: Planificado vs Real\n' +
             'Desarrollador: Wilmer Edilson León Díaz | Período: 22/05 - 26/06/2025', 
             fontsize=16, fontweight='bold', pad=25)

ax.set_xlabel('Semanas del Proyecto', fontsize=14, fontweight='bold')
ax.set_ylabel('Horas de Trabajo', fontsize=14, fontweight='bold')
ax.set_xticks(x_pos)
ax.set_xticklabels(semanas, fontsize=11)
ax.legend(fontsize=12, loc='upper left')
ax.grid(True, alpha=0.3, axis='y')

# Agregar valores en las barras
for i in range(len(semanas)):
    # Valores planificados
    ax.text(x_pos[i] - width/2, horas_planificadas[i] + 2, 
            f'{horas_planificadas[i]}h', ha='center', va='bottom', 
            fontweight='bold', fontsize=10)
    
    # Valores reales
    ax.text(x_pos[i] + width/2, horas_reales[i] + 2, 
            f'{horas_reales[i]}h', ha='center', va='bottom', 
            fontweight='bold', fontsize=10)
    
    # Diferencias
    max_height = max(horas_planificadas[i], horas_reales[i])
    diff_color = 'green' if diferencias[i] <= 0 else 'red'
    porcentaje = (diferencias[i] / horas_planificadas[i]) * 100
    
    ax.text(x_pos[i], max_height + 8, 
            f'{diferencias[i]:+}h\n({porcentaje:+.0f}%)', 
            ha='center', va='bottom', fontweight='bold', 
            color=diff_color, fontsize=9)

# Anotaciones especiales para puntos clave
ax.annotate('🚨 PUNTO CRÍTICO\nCambio de complejidad\n+200% del plan', 
            xy=(2, 72), xytext=(1.3, 88),
            arrowprops=dict(arrowstyle='->', color='red', lw=2),
            fontsize=11, ha='center',
            bbox=dict(boxstyle="round,pad=0.5", facecolor='yellow', alpha=0.8))

ax.annotate('✅ RECUPERACIÓN EXITOSA\nOptimización de procesos\n-56% del plan', 
            xy=(5, 30), xytext=(4.2, 55),
            arrowprops=dict(arrowstyle='->', color='green', lw=2),
            fontsize=11, ha='center',
            bbox=dict(boxstyle="round,pad=0.5", facecolor='lightgreen', alpha=0.8))

# Resumen total en el gráfico
total_plan = sum(horas_planificadas)
total_real = sum(horas_reales)
total_diff = sum(diferencias)
eficiencia = (total_real / total_plan) * 100

resumen_texto = f"""📊 RESUMEN TOTAL:
• Total Planificado: {total_plan} horas
• Total Ejecutado: {total_real} horas
• Diferencia: {total_diff} horas ({((total_diff/total_plan)*100):+.1f}%)
• Eficiencia General: {eficiencia:.1f}%
• Estado: {'✅ EXITOSO' if eficiencia < 100 else '⚠️ SOBRECARGA'}"""

ax.text(0.02, 0.98, resumen_texto, transform=ax.transAxes, fontsize=11,
        verticalalignment='top', fontweight='bold',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='lightblue', alpha=0.9))

# Análisis por fases
fases_texto = """🎯 ANÁLISIS POR FASES:

🌱 FASE 1 (Sem 1-2): Inicio Controlado
   • Estimaciones precisas
   • Desarrollo según plan

⚡ FASE 2 (Sem 3-5): Crisis de Alcance
   • Desfases críticos  
   • Sobrecarga sostenida

🎯 FASE 3 (Sem 6): Recuperación
   • Optimización exitosa
   • Corrección dramática"""

ax.text(0.65, 0.98, fases_texto, transform=ax.transAxes, fontsize=10,
        verticalalignment='top',
        bbox=dict(boxstyle='round,pad=0.5', facecolor='lightyellow', alpha=0.9))

# Ajustar el layout
plt.tight_layout()
plt.subplots_adjust(top=0.85)

# Guardar el gráfico
plt.savefig('TSP_metrics/grafico_barras_presupuesto_final.png', 
           dpi=300, bbox_inches='tight', facecolor='white')

plt.show()

print("✅ ¡Gráfico de barras generado exitosamente!")
print("📁 Archivo guardado: TSP_metrics/grafico_barras_presupuesto_final.png")
print("\n📊 TABLA DE DATOS:")
print("="*70)
print(f"{'Semana':<12} {'Planificado':<12} {'Real':<8} {'Diferencia':<12} {'%':<8}")
print("="*70)
for i in range(len(semanas)):
    semana_corta = semanas[i].split('\n')[0]
    pct = (diferencias[i] / horas_planificadas[i]) * 100
    print(f"{semana_corta:<12} {horas_planificadas[i]:<12} {horas_reales[i]:<8} {diferencias[i]:+<12} {pct:+.1f}%")
print("="*70)
print(f"{'TOTAL':<12} {total_plan:<12} {total_real:<8} {total_diff:+<12} {((total_diff/total_plan)*100):+.1f}%")
print("="*70)
