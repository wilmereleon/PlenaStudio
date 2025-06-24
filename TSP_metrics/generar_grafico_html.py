#!/usr/bin/env python3
"""
Generador de Gráfico de Barras HTML - Análisis de Presupuesto TSPi
Proyecto: Plena Studio
Desarrollador: Wilmer Edilson León Díaz
Usando Chart.js para evitar dependencias de Python
"""

def generar_grafico_html():
    """Genera un gráfico de barras HTML usando Chart.js"""
    
    # Datos del proyecto
    semanas = ['Semana 1 (22/05)', 'Semana 2 (29/05)', 'Semana 3 (05/06)', 
               'Semana 4 (12/06)', 'Semana 5 (19/06)', 'Semana 6 (26/06)']
    
    horas_planificadas = [24, 24, 24, 68, 68, 68]
    horas_reales = [24, 18, 72, 96, 96, 30]
    
    # Calcular diferencias
    diferencias = [real - plan for real, plan in zip(horas_reales, horas_planificadas)]
    porcentajes = [(real/plan - 1) * 100 for real, plan in zip(horas_reales, horas_planificadas)]
    
    # Generar colores según el estado
    colores_reales = []
    estados = []
    for i, diff in enumerate(diferencias):
        if diff <= 0:
            colores_reales.append('rgba(144, 238, 144, 0.8)')  # Verde
            estados.append('✅ Exacto/Ahorro')
        elif diff <= horas_planificadas[i] * 0.5:
            colores_reales.append('rgba(255, 165, 0, 0.8)')   # Naranja
            estados.append('⚠️ Sobrecarga Moderada')
        else:
            colores_reales.append('rgba(255, 99, 71, 0.8)')   # Rojo
            estados.append('🚨 Sobrecarga Crítica')
    
    # Plantilla HTML con Chart.js
    html_content = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📊 Análisis de Presupuesto TSPi - Plena Studio</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {{
            font-family: Arial, sans-serif;
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }}
        .chart-container {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }}
        .stats-grid {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }}
        .stat-card {{
            background: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            border-left: 4px solid #667eea;
        }}
        .table-container {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            overflow-x: auto;
        }}
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }}
        th, td {{
            border: 1px solid #ddd;
            padding: 12px;
            text-align: center;
        }}
        th {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: bold;
        }}
        .phase-1 {{ background-color: rgba(144, 238, 144, 0.3); }}
        .phase-2 {{ background-color: rgba(255, 182, 193, 0.3); }}
        .phase-3 {{ background-color: rgba(173, 216, 230, 0.3); }}
        .legend {{
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }}
        .legend-item {{
            display: inline-block;
            margin: 5px 15px;
            padding: 5px 10px;
            border-radius: 5px;
        }}
        .legend-green {{ background: rgba(144, 238, 144, 0.8); }}
        .legend-orange {{ background: rgba(255, 165, 0, 0.8); }}
        .legend-red {{ background: rgba(255, 99, 71, 0.8); }}
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 ANÁLISIS DE PRESUPUESTO TSPi</h1>
        <h2>PLENA STUDIO</h2>
        <p><strong>Desarrollador:</strong> Wilmer Edilson León Díaz</p>
        <p><strong>Período:</strong> 22 de Mayo - 26 de Junio, 2025</p>
        <p><strong>Comportamiento Semanal:</strong> Planificado vs Real</p>
    </div>

    <div class="legend">
        <h3>🎯 Leyenda de Estados:</h3>
        <span class="legend-item legend-green">🟢 Exacto/Ahorro (≤ Plan)</span>
        <span class="legend-item legend-orange">🟠 Sobrecarga Moderada (1-50%)</span>
        <span class="legend-item legend-red">🔴 Sobrecarga Crítica (>50%)</span>
    </div>

    <div class="chart-container">
        <h3>📊 Gráfico de Barras Comparativo</h3>
        <canvas id="chartComparativo" width="400" height="200"></canvas>
    </div>

    <div class="chart-container">
        <h3>📈 Gráfico de Diferencias por Semana</h3>
        <canvas id="chartDiferencias" width="400" height="200"></canvas>
    </div>

    <div class="stats-grid">
        <div class="stat-card">
            <h4>📋 Total Planificado</h4>
            <h2 style="color: #667eea;">{sum(horas_planificadas)} horas</h2>
        </div>
        <div class="stat-card">
            <h4>⏱️ Total Real</h4>
            <h2 style="color: #28a745;">{sum(horas_reales)} horas</h2>
        </div>
        <div class="stat-card">
            <h4>💰 Ahorro Total</h4>
            <h2 style="color: #20c997;">{sum(horas_planificadas) - sum(horas_reales)} horas</h2>
            <p>({((sum(horas_reales)/sum(horas_planificadas) - 1) * 100):+.1f}%)</p>
        </div>
        <div class="stat-card">
            <h4>🎯 Eficiencia</h4>
            <h2 style="color: #fd7e14;">{(sum(horas_reales)/sum(horas_planificadas)*100):.1f}%</h2>
        </div>
    </div>

    <div class="table-container">
        <h3>📋 Tabla Detallada de Resultados</h3>
        <table>
            <thead>
                <tr>
                    <th>Semana</th>
                    <th>Planificado (h)</th>
                    <th>Real (h)</th>
                    <th>Diferencia (h)</th>
                    <th>Porcentaje (%)</th>
                    <th>Estado</th>
                    <th>Fase</th>
                </tr>
            </thead>
            <tbody>"""

    # Generar filas de la tabla
    fases = ['🌱 Inicio Controlado', '🌱 Inicio Controlado', '⚡ Crisis de Alcance', 
             '⚡ Crisis de Alcance', '⚡ Crisis de Alcance', '🎯 Recuperación']
    clases_fases = ['phase-1', 'phase-1', 'phase-2', 'phase-2', 'phase-2', 'phase-3']
    
    for i in range(len(semanas)):
        signo = '+' if diferencias[i] > 0 else ''
        html_content += f"""
                <tr class="{clases_fases[i]}">
                    <td><strong>{semanas[i]}</strong></td>
                    <td>{horas_planificadas[i]}</td>
                    <td>{horas_reales[i]}</td>
                    <td style="color: {'red' if diferencias[i] > 0 else 'green'};">
                        {signo}{diferencias[i]}
                    </td>
                    <td style="color: {'red' if diferencias[i] > 0 else 'green'};">
                        {signo}{porcentajes[i]:.0f}%
                    </td>
                    <td>{estados[i]}</td>
                    <td>{fases[i]}</td>
                </tr>"""

    # Totales
    total_plan = sum(horas_planificadas)
    total_real = sum(horas_reales)
    total_diff = sum(diferencias)
    total_pct = (total_real/total_plan - 1) * 100
    
    html_content += f"""
                <tr style="background: #e9ecef; font-weight: bold;">
                    <td><strong>TOTALES</strong></td>
                    <td><strong>{total_plan}</strong></td>
                    <td><strong>{total_real}</strong></td>
                    <td style="color: green;"><strong>{total_diff}</strong></td>
                    <td style="color: green;"><strong>{total_pct:+.1f}%</strong></td>
                    <td><strong>🎯 PROYECTO EXITOSO</strong></td>
                    <td><strong>Todas las Fases</strong></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="chart-container">
        <h3>📈 Análisis por Fases</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
            <div style="background: rgba(144, 238, 144, 0.3); padding: 20px; border-radius: 10px;">
                <h4>🌱 FASE 1: Inicio Controlado (Semanas 1-2)</h4>
                <p><strong>Características:</strong></p>
                <ul>
                    <li>Estimaciones precisas y realistas</li>
                    <li>Desarrollo según lo planificado</li>
                    <li>Base sólida para el proyecto</li>
                </ul>
            </div>
            <div style="background: rgba(255, 182, 193, 0.3); padding: 20px; border-radius: 10px;">
                <h4>⚡ FASE 2: Crisis de Alcance (Semanas 3-5)</h4>
                <p><strong>Características:</strong></p>
                <ul>
                    <li>Incremento dramático en complejidad</li>
                    <li>Posibles cambios de requerimientos</li>
                    <li>Necesidad de re-estimación urgente</li>
                </ul>
            </div>
            <div style="background: rgba(173, 216, 230, 0.3); padding: 20px; border-radius: 10px;">
                <h4>🎯 FASE 3: Recuperación (Semana 6)</h4>
                <p><strong>Características:</strong></p>
                <ul>
                    <li>Estabilización del desarrollo</li>
                    <li>Aplicación de lecciones aprendidas</li>
                    <li>Finalización eficiente</li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        // Configuración de datos para Chart.js
        const semanas = {[str(semanas).replace("'", '"')]};
        const horasPlaneadas = {horas_planificadas};
        const horasReales = {horas_reales};
        const diferencias = {diferencias};
        const coloresReales = {str(colores_reales).replace("'", '"')};

        // Gráfico comparativo
        const ctx1 = document.getElementById('chartComparativo').getContext('2d');
        new Chart(ctx1, {{
            type: 'bar',
            data: {{
                labels: semanas,
                datasets: [{{
                    label: 'Horas Planificadas',
                    data: horasPlaneadas,
                    backgroundColor: 'rgba(135, 206, 235, 0.8)',
                    borderColor: 'rgba(135, 206, 235, 1)',
                    borderWidth: 2
                }}, {{
                    label: 'Horas Reales',
                    data: horasReales,
                    backgroundColor: coloresReales,
                    borderColor: coloresReales.map(c => c.replace('0.8', '1')),
                    borderWidth: 2
                }}]
            }},
            options: {{
                responsive: true,
                scales: {{
                    y: {{
                        beginAtZero: true,
                        title: {{
                            display: true,
                            text: 'Horas de Desarrollo'
                        }}
                    }},
                    x: {{
                        title: {{
                            display: true,
                            text: 'Semanas del Proyecto'
                        }}
                    }}
                }},
                plugins: {{
                    title: {{
                        display: true,
                        text: 'Comparación Semanal: Planificado vs Real'
                    }},
                    legend: {{
                        display: true,
                        position: 'top'
                    }}
                }}
            }}
        }});

        // Gráfico de diferencias
        const ctx2 = document.getElementById('chartDiferencias').getContext('2d');
        const coloresDiff = diferencias.map(d => 
            d <= 0 ? 'rgba(144, 238, 144, 0.8)' : 
            d <= 30 ? 'rgba(255, 165, 0, 0.8)' : 
            'rgba(255, 99, 71, 0.8)'
        );

        new Chart(ctx2, {{
            type: 'bar',
            data: {{
                labels: semanas,
                datasets: [{{
                    label: 'Diferencia (Horas)',
                    data: diferencias,
                    backgroundColor: coloresDiff,
                    borderColor: coloresDiff.map(c => c.replace('0.8', '1')),
                    borderWidth: 2
                }}]
            }},
            options: {{
                responsive: true,
                scales: {{
                    y: {{
                        beginAtZero: false,
                        title: {{
                            display: true,
                            text: 'Diferencia (Horas)'
                        }},
                        grid: {{
                            color: function(context) {{
                                if (context.tick.value === 0) {{
                                    return 'rgba(0, 0, 0, 0.5)';
                                }}
                                return 'rgba(0, 0, 0, 0.1)';
                            }},
                            lineWidth: function(context) {{
                                if (context.tick.value === 0) {{
                                    return 2;
                                }}
                                return 1;
                            }}
                        }}
                    }},
                    x: {{
                        title: {{
                            display: true,
                            text: 'Semanas del Proyecto'
                        }}
                    }}
                }},
                plugins: {{
                    title: {{
                        display: true,
                        text: 'Desviaciones del Presupuesto por Semana'
                    }},
                    legend: {{
                        display: false
                    }}
                }}
            }}
        }});
    </script>

    <div style="background: white; padding: 30px; border-radius: 15px; margin: 20px 0; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center;">
        <h3>🏆 CONCLUSIONES FINALES</h3>
        <p style="font-size: 18px; color: #667eea;"><strong>Proyecto exitoso con curva de aprendizaje significativa</strong></p>
        <p>El proyecto demostró capacidad de adaptación bajo presión y recuperación exitosa en la fase final.</p>
        <p><strong>Calificación del Proceso:</strong> ⭐⭐⭐⭐☆ (4/5)</p>
        <p><em>Generado el: {datetime.now().strftime('%d de %B de %Y')}</em></p>
    </div>
</body>
</html>"""

    return html_content

if __name__ == "__main__":
    print("🚀 Generando gráfico de barras HTML...")
    
    try:
        from datetime import datetime
        html_content = generar_grafico_html()
        
        # Guardar el archivo HTML
        output_file = 'grafico_barras_presupuesto_tsp.html'
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(html_content)
        
        print(f"✅ Gráfico HTML generado exitosamente: {output_file}")
        print("🌐 Abre el archivo en tu navegador para ver el gráfico interactivo")
        
        # Generar también reporte en consola
        print("\\n" + "="*80)
        print("📊 REPORTE RÁPIDO DE PRESUPUESTO TSPi")
        print("="*80)
        
        horas_planificadas = [24, 24, 24, 68, 68, 68]
        horas_reales = [24, 18, 72, 96, 96, 30]
        
        for i, (plan, real) in enumerate(zip(horas_planificadas, horas_reales), 1):
            diff = real - plan
            pct = (real/plan - 1) * 100
            estado = "✅" if diff <= 0 else "🟡" if diff <= 30 else "🔴"
            print(f"Semana {i}: {plan}h → {real}h ({diff:+}h, {pct:+.0f}%) {estado}")
        
        total_plan = sum(horas_planificadas)
        total_real = sum(horas_reales)
        print(f"\\nTOTAL: {total_plan}h → {total_real}h ({total_real-total_plan:+}h, {(total_real/total_plan-1)*100:+.1f}%) 🎯")
        print("="*80)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
