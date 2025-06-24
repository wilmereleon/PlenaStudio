import matplotlib.pyplot as plt
import numpy as np

# Datos del proyecto TSPi
semanas = ['S1\n22/05', 'S2\n29/05', 'S3\n05/06', 'S4\n12/06', 'S5\n19/06', 'S6\n26/06']
planificado = [24, 24, 24, 68, 68, 68]
real = [24, 18, 72, 96, 96, 30]

# Configurar el gráfico
fig, ax = plt.subplots(figsize=(12, 8))

# Posiciones de las barras
x = np.arange(len(semanas))
width = 0.35

# Crear barras
bars1 = ax.bar(x - width/2, planificado, width, label='Planificado', 
               color='#3498db', alpha=0.8)
bars2 = ax.bar(x + width/2, real, width, label='Real', 
               color=['#2ecc71', '#2ecc71', '#e74c3c', '#f39c12', '#f39c12', '#2ecc71'], 
               alpha=0.8)

# Personalizar el gráfico
ax.set_title('📊 ANÁLISIS DE PRESUPUESTO TSPi - PLENA STUDIO\nComportamiento Semanal: Planificado vs Real', 
             fontsize=16, fontweight='bold', pad=20)
ax.set_xlabel('Semanas del Proyecto', fontsize=12, fontweight='bold')
ax.set_ylabel('Horas de Trabajo', fontsize=12, fontweight='bold')
ax.set_xticks(x)
ax.set_xticklabels(semanas)
ax.legend(fontsize=12)
ax.grid(True, alpha=0.3, axis='y')

# Agregar valores en las barras
for i, v in enumerate(planificado):
    ax.text(i - width/2, v + 1, f'{v}h', ha='center', va='bottom', fontweight='bold')

for i, v in enumerate(real):
    ax.text(i + width/2, v + 1, f'{v}h', ha='center', va='bottom', fontweight='bold')

# Agregar diferencias como texto
diferencias = [r - p for r, p in zip(real, planificado)]
for i, diff in enumerate(diferencias):
    color = 'green' if diff <= 0 else 'red'
    ax.text(i, max(planificado[i], real[i]) + 8, f'{diff:+}h', 
            ha='center', va='bottom', fontweight='bold', color=color)

# Anotaciones especiales
ax.annotate('🚨 CRISIS\nCambio de alcance', xy=(2, 72), xytext=(1.5, 85),
            arrowprops=dict(arrowstyle='->', color='red', lw=2),
            fontsize=10, ha='center', 
            bbox=dict(boxstyle="round,pad=0.3", facecolor='yellow', alpha=0.7))

ax.annotate('✅ RECUPERACIÓN\nOptimización', xy=(5, 30), xytext=(4.2, 50),
            arrowprops=dict(arrowstyle='->', color='green', lw=2),
            fontsize=10, ha='center',
            bbox=dict(boxstyle="round,pad=0.3", facecolor='lightgreen', alpha=0.7))

# Información adicional
info = f"""RESUMEN TOTAL:
Planificado: {sum(planificado)} horas
Real: {sum(real)} horas
Diferencia: {sum(diferencias)} horas
Eficiencia: {(sum(real)/sum(planificado))*100:.1f}%"""

ax.text(0.02, 0.98, info, transform=ax.transAxes, fontsize=10,
        verticalalignment='top', 
        bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.8))

# Fases del proyecto
fases = """FASES:
🌱 Sem 1-2: Inicio Controlado
⚡ Sem 3-5: Crisis de Alcance
🎯 Sem 6: Recuperación"""

ax.text(0.7, 0.98, fases, transform=ax.transAxes, fontsize=10,
        verticalalignment='top',
        bbox=dict(boxstyle='round', facecolor='lightyellow', alpha=0.8))

plt.tight_layout()
plt.savefig('TSP_metrics/grafico_presupuesto_simple.png', dpi=300, bbox_inches='tight')
plt.show()

print("✅ Gráfico de barras generado exitosamente!")
print("📁 Archivo guardado: TSP_metrics/grafico_presupuesto_simple.png")
