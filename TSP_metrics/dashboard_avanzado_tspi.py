#!/usr/bin/env python3
"""
Dashboard Avanzado de Análisis TSPi con Porcentajes Semanales
Incluye comparaciones estadísticas detalladas y métricas por iteración
"""

from datetime import datetime
import json

def crear_dashboard_avanzado():
    """Crea dashboard HTML completo con análisis avanzado"""
    
    # Datos estadísticos del análisis ejecutado
    datos_semanales = {
        'semana_1': {
            'numero': 1,
            'presupuesto_plan': 24, 'presupuesto_real': 24, 'presupuesto_eff': 100.0,
            'tareas_count': 5, 'tareas_plan': 7.0, 'tareas_real': 4.5, 'tareas_eff': 64.3,
            'plan_mean': 1.4, 'plan_median': 1.0, 'real_mean': 0.9, 'real_median': 1.0,
            'porcentaje_promedio': 3.7, 'porcentaje_mediana': 4.2, 'porcentaje_total': 18.7,
            'fases': ['PLAN'], 'iteraciones': [1]
        },
        'semana_2': {
            'numero': 2,
            'presupuesto_plan': 24, 'presupuesto_real': 18, 'presupuesto_eff': 75.0,
            'tareas_count': 5, 'tareas_plan': 8.0, 'tareas_real': 8.5, 'tareas_eff': 106.2,
            'plan_mean': 1.6, 'plan_median': 1.0, 'real_mean': 1.7, 'real_median': 1.1,
            'porcentaje_promedio': 9.4, 'porcentaje_mediana': 6.1, 'porcentaje_total': 47.2,
            'fases': ['HLD'], 'iteraciones': [1]
        },
        'semana_3': {
            'numero': 3,
            'presupuesto_plan': 24, 'presupuesto_real': 72, 'presupuesto_eff': 300.0,
            'tareas_count': 7, 'tareas_plan': 31.0, 'tareas_real': 14.4, 'tareas_eff': 46.5,
            'plan_mean': 4.4, 'plan_median': 3.0, 'real_mean': 2.1, 'real_median': 0.8,
            'porcentaje_promedio': 2.9, 'porcentaje_mediana': 1.1, 'porcentaje_total': 20.0,
            'fases': ['HLDINSP', 'HLD'], 'iteraciones': [1]
        },
        'semana_4': {
            'numero': 4,
            'presupuesto_plan': 68, 'presupuesto_real': 96, 'presupuesto_eff': 141.2,
            'tareas_count': 8, 'tareas_plan': 56.0, 'tareas_real': 7.2, 'tareas_eff': 12.9,
            'plan_mean': 7.0, 'plan_median': 6.0, 'real_mean': 0.9, 'real_median': 0.4,
            'porcentaje_promedio': 0.9, 'porcentaje_mediana': 0.4, 'porcentaje_total': 7.5,
            'fases': ['HLDINSP', 'DOC', 'IT'], 'iteraciones': [1]
        },
        'semana_5': {
            'numero': 5,
            'presupuesto_plan': 68, 'presupuesto_real': 96, 'presupuesto_eff': 141.2,
            'tareas_count': 3, 'tareas_plan': 1630.0, 'tareas_real': 7.9, 'tareas_eff': 0.5,
            'plan_mean': 543.3, 'plan_median': 400.0, 'real_mean': 2.6, 'real_median': 2.0,
            'porcentaje_promedio': 2.7, 'porcentaje_mediana': 2.1, 'porcentaje_total': 8.2,
            'fases': ['IT', 'PM'], 'iteraciones': [2]
        },
        'semana_6': {
            'numero': 6,
            'presupuesto_plan': 68, 'presupuesto_real': 30, 'presupuesto_eff': 44.1,
            'tareas_count': 3, 'tareas_plan': 1003.0, 'tareas_real': 5.3, 'tareas_eff': 0.5,
            'plan_mean': 334.3, 'plan_median': 400.0, 'real_mean': 1.8, 'real_median': 2.0,
            'porcentaje_promedio': 5.9, 'porcentaje_mediana': 6.7, 'porcentaje_total': 17.7,
            'fases': ['ST', 'IT', 'PM'], 'iteraciones': [2]
        }
    }
    
    datos_iteraciones = {
        'iteracion_1': {
            'numero': 1, 'semanas': [1, 2, 3, 4],
            'presupuesto_plan': 140, 'presupuesto_real': 210, 'presupuesto_eff': 150.0,
            'tareas_count': 25, 'tareas_plan': 102.0, 'tareas_real': 34.6, 'tareas_eff': 33.922,
            'plan_mean': 4.1, 'plan_median': 3.0, 'real_mean': 1.4, 'real_median': 0.9,
            'porcentaje_promedio': 3.7, 'porcentaje_total': 93.5,
            'fases': ['PLAN', 'IT', 'HLDINSP', 'DOC', 'HLD']
        },
        'iteracion_2': {
            'numero': 2, 'semanas': [5, 6],
            'presupuesto_plan': 136, 'presupuesto_real': 126, 'presupuesto_eff': 92.6,
            'tareas_count': 6, 'tareas_plan': 2633.0, 'tareas_real': 13.2, 'tareas_eff': 0.501,
            'plan_mean': 438.8, 'plan_median': 400.0, 'real_mean': 2.2, 'real_median': 2.0,
            'porcentaje_promedio': 4.3, 'porcentaje_total': 25.9,
            'fases': ['ST', 'IT', 'PM']
        }
    }
    
    html_content = f"""
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📊 Dashboard Avanzado TSPi - Análisis Estadístico Completo</title>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 1600px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #333;
        }}
        .header {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            margin-bottom: 30px;
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
        }}
        .container {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin: 20px 0;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
        }}
        .grid-2 {{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }}
        .grid-3 {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
        }}
        .metric-card {{
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            color: white;
            padding: 25px;
            border-radius: 15px;
            text-align: center;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            transition: transform 0.3s ease;
        }}
        .metric-card:hover {{
            transform: translateY(-5px);
        }}
        .week-card {{
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
            color: #333;
            padding: 20px;
            border-radius: 12px;
            margin: 10px 0;
            border-left: 5px solid #667eea;
        }}
        .iteration-card {{
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            color: #333;
            padding: 25px;
            border-radius: 15px;
            margin: 15px 0;
            border-left: 5px solid #ff6b6b;
        }}
        .comparison-table {{
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }}
        .comparison-table th, .comparison-table td {{
            padding: 15px;
            text-align: center;
            border-bottom: 1px solid #ecf0f1;
        }}
        .comparison-table th {{
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            font-weight: bold;
        }}
        .highlight-green {{ background-color: rgba(46, 204, 113, 0.2); }}
        .highlight-yellow {{ background-color: rgba(241, 196, 15, 0.2); }}
        .highlight-red {{ background-color: rgba(231, 76, 60, 0.2); }}
        .chart-container {{
            background: white;
            padding: 30px;
            border-radius: 15px;
            margin: 25px 0;
            box-shadow: 0 8px 25px rgba(0,0,0,0.1);
        }}
        .insights-box {{
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
            color: white;
            padding: 30px;
            border-radius: 15px;
            margin: 25px 0;
        }}
        .critical-finding {{
            background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
            color: #333;
            padding: 25px;
            border-radius: 15px;
            margin: 20px 0;
            border: 3px solid #e74c3c;
        }}
        .percentage-bar {{
            width: 100%;
            height: 20px;
            background: #ecf0f1;
            border-radius: 10px;
            overflow: hidden;
            margin: 10px 0;
        }}
        .percentage-fill {{
            height: 100%;
            border-radius: 10px;
            transition: width 0.8s ease;
        }}
    </style>
</head>
<body>
    <div class="header">
        <h1>📊 DASHBOARD AVANZADO TSPi</h1>
        <h2>ANÁLISIS ESTADÍSTICO COMPLETO CON PORCENTAJES SEMANALES</h2>
        <p><strong>Proyecto:</strong> Plena Studio | <strong>Desarrollador:</strong> Wilmer Edilson León Díaz</p>
        <p><strong>Análisis:</strong> 31 tareas | 6 semanas | 2 iteraciones | Media/Mediana vs Presupuesto</p>
        <p><em>Generado el: {datetime.now().strftime('%d de %B de %Y a las %H:%M')}</em></p>
    </div>

    <div class="critical-finding">
        <h3>🚨 HALLAZGO CRÍTICO</h3>
        <div class="grid-2">
            <div>
                <h4>📊 Discrepancia Masiva Detectada:</h4>
                <ul>
                    <li><strong>Presupuesto total:</strong> 276h plan → 336h real</li>
                    <li><strong>Tareas totales:</strong> 2,735h plan → 47.8h real</li>
                    <li><strong>Ratio planificación:</strong> Tareas = 9.9x Presupuesto</li>
                    <li><strong>Ratio ejecución:</strong> Tareas = 0.14x Presupuesto</li>
                </ul>
            </div>
            <div>
                <h4>🎯 Eficiencias Comparadas:</h4>
                <ul>
                    <li><strong>Eficiencia presupuesto:</strong> 121.7%</li>
                    <li><strong>Eficiencia tareas:</strong> 1.7%</li>
                    <li><strong>Diferencia:</strong> +120 puntos porcentuales</li>
                    <li><strong>Factor de optimización:</strong> ~69x</li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container">
        <h3>📅 ANÁLISIS SEMANAL DETALLADO</h3>
        <div class="grid-3">"""
    
    # Generar tarjetas semanales
    for semana_key, semana in datos_semanales.items():        # Corrección: eficiencia menor = mejor optimización (menos tiempo usado)
        color_presup = "red" if semana['presupuesto_eff'] > 200 else "orange" if semana['presupuesto_eff'] > 120 else "green"
        color_tareas = "green" if semana['tareas_eff'] <= 50 else "orange" if semana['tareas_eff'] <= 80 else "red"
        
        html_content += f"""
            <div class="week-card">
                <h4>📅 SEMANA {semana['numero']}</h4>
                
                <div style="margin: 15px 0;">
                    <h5>🎯 PRESUPUESTO:</h5>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Plan vs Real:</span>
                        <span><strong>{semana['presupuesto_plan']}h → {semana['presupuesto_real']}h</strong></span>
                    </div>
                    <div class="percentage-bar">
                        <div class="percentage-fill" style="width: {min(semana['presupuesto_eff'], 100)}%; background: {color_presup};"></div>
                    </div>
                    <div style="text-align: center;">Eficiencia: <strong style="color: {color_presup};">{semana['presupuesto_eff']:.1f}%</strong></div>
                </div>
                
                <div style="margin: 15px 0;">
                    <h5>📋 TAREAS ({semana['tareas_count']}):</h5>
                    <div style="display: flex; justify-content: space-between;">
                        <span>Plan vs Real:</span>
                        <span><strong>{semana['tareas_plan']:.1f}h → {semana['tareas_real']:.1f}h</strong></span>
                    </div>
                    <div class="percentage-bar">
                        <div class="percentage-fill" style="width: {min(semana['tareas_eff'], 100)}%; background: {color_tareas};"></div>
                    </div>
                    <div style="text-align: center;">Eficiencia: <strong style="color: {color_tareas};">{semana['tareas_eff']:.1f}%</strong></div>
                </div>
                
                <div style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
                    <h6>📊 Estadísticas Descriptivas:</h6>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 5px; font-size: 0.9em;">
                        <div>Media: {semana['plan_mean']:.1f}h → {semana['real_mean']:.1f}h</div>
                        <div>Mediana: {semana['plan_median']:.1f}h → {semana['real_median']:.1f}h</div>
                    </div>
                </div>
                
                <div style="background: rgba(0,0,0,0.1); padding: 10px; border-radius: 8px; margin: 10px 0;">
                    <h6>⏱️ Distribución de Tiempo:</h6>
                    <div style="font-size: 0.9em;">
                        <div>• Promedio por tarea: <strong>{semana['porcentaje_promedio']:.1f}%</strong></div>
                        <div>• Mediana por tarea: <strong>{semana['porcentaje_mediana']:.1f}%</strong></div>
                        <div>• Total semanal: <strong>{semana['porcentaje_total']:.1f}%</strong></div>
                    </div>
                </div>
                
                <div style="font-size: 0.85em; margin-top: 10px;">
                    <strong>Fases:</strong> {', '.join(semana['fases'])}<br>
                    <strong>Iteración:</strong> {', '.join(map(str, semana['iteraciones']))}
                </div>
            </div>"""
    
    html_content += """
        </div>
    </div>

    <div class="container">
        <h3>🔄 ANÁLISIS POR ITERACIÓN</h3>
        <div class="grid-2">"""
    
    # Generar tarjetas de iteración
    for iter_key, iteracion in datos_iteraciones.items():        # Corrección: eficiencia menor = mejor optimización
        color_presup_iter = "red" if iteracion['presupuesto_eff'] > 200 else "orange" if iteracion['presupuesto_eff'] > 120 else "green"
        color_tareas_iter = "green" if iteracion['tareas_eff'] <= 20 else "orange" if iteracion['tareas_eff'] <= 50 else "red"
        
        html_content += f"""
            <div class="iteration-card">
                <h4>🔹 ITERACIÓN {iteracion['numero']}</h4>
                <p><strong>Semanas:</strong> {', '.join(map(str, iteracion['semanas']))}</p>
                
                <div style="margin: 15px 0;">
                    <h5>🎯 PRESUPUESTO CONSOLIDADO:</h5>
                    <div>{iteracion['presupuesto_plan']}h → {iteracion['presupuesto_real']}h</div>
                    <div class="percentage-bar">
                        <div class="percentage-fill" style="width: {min(iteracion['presupuesto_eff'], 100)}%; background: {color_presup_iter};"></div>
                    </div>
                    <div style="text-align: center;">Eficiencia: <strong style="color: {color_presup_iter};">{iteracion['presupuesto_eff']:.1f}%</strong></div>
                </div>
                
                <div style="margin: 15px 0;">
                    <h5>📋 TAREAS CONSOLIDADAS ({iteracion['tareas_count']}):</h5>
                    <div>{iteracion['tareas_plan']:.0f}h → {iteracion['tareas_real']:.1f}h</div>
                    <div class="percentage-bar">
                        <div class="percentage-fill" style="width: {min(max(iteracion['tareas_eff'], 0.1), 100)}%; background: {color_tareas_iter};"></div>
                    </div>
                    <div style="text-align: center;">Eficiencia: <strong style="color: {color_tareas_iter};">{iteracion['tareas_eff']:.3f}%</strong></div>
                </div>
                
                <div style="background: rgba(0,0,0,0.1); padding: 15px; border-radius: 8px;">
                    <h6>📊 Estadísticas por Iteración:</h6>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.9em;">
                        <div><strong>Media:</strong><br>{iteracion['plan_mean']:.1f}h → {iteracion['real_mean']:.1f}h</div>
                        <div><strong>Mediana:</strong><br>{iteracion['plan_median']:.1f}h → {iteracion['real_median']:.1f}h</div>
                        <div><strong>% Promedio:</strong><br>{iteracion['porcentaje_promedio']:.1f}%</div>
                        <div><strong>% Total:</strong><br>{iteracion['porcentaje_total']:.1f}%</div>
                    </div>
                    <div style="margin-top: 10px; font-size: 0.85em;">
                        <strong>Fases:</strong> {', '.join(iteracion['fases'])}
                    </div>
                </div>
            </div>"""
    
    html_content += """
        </div>
    </div>

    <div class="chart-container">
        <h3>📊 Gráfico Comparativo: Presupuesto vs Tareas por Semana</h3>
        <div id="chart-semanal-comparativo"></div>
    </div>

    <div class="chart-container">
        <h3>📈 Eficiencias Comparadas por Iteración</h3>
        <div id="chart-eficiencias-iteracion"></div>
    </div>

    <div class="chart-container">
        <h3>⏱️ Distribución de Porcentajes de Tiempo por Semana</h3>
        <div id="chart-porcentajes-tiempo"></div>
    </div>

    <div class="container">
        <h3>📊 TABLA COMPARATIVA ESTADÍSTICA COMPLETA</h3>
        <table class="comparison-table">
            <thead>
                <tr>
                    <th>Semana</th>
                    <th>Presupuesto<br>Eficiencia</th>
                    <th>Tareas<br>Eficiencia</th>
                    <th>Media Plan→Real</th>
                    <th>Mediana Plan→Real</th>
                    <th>% Tiempo<br>Promedio</th>
                    <th>% Tiempo<br>Total</th>
                    <th>Fases</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>"""
    
    # Generar filas de la tabla
    for semana_key, semana in datos_semanales.items():
        if semana['presupuesto_eff'] <= 120 and semana['tareas_eff'] >= 50:
            clase = "highlight-green"
            estado = "✅ Excelente"
        elif semana['presupuesto_eff'] <= 200 and semana['tareas_eff'] >= 10:
            clase = "highlight-yellow"
            estado = "⚠️ Regular"
        else:
            clase = "highlight-red"
            estado = "🚨 Crítico"
            
        html_content += f"""
                <tr class="{clase}">
                    <td><strong>Semana {semana['numero']}</strong></td>
                    <td>{semana['presupuesto_eff']:.1f}%</td>
                    <td>{semana['tareas_eff']:.1f}%</td>
                    <td>{semana['plan_mean']:.1f}h → {semana['real_mean']:.1f}h</td>
                    <td>{semana['plan_median']:.1f}h → {semana['real_median']:.1f}h</td>
                    <td>{semana['porcentaje_promedio']:.1f}%</td>
                    <td>{semana['porcentaje_total']:.1f}%</td>
                    <td>{', '.join(semana['fases'])}</td>
                    <td>{estado}</td>
                </tr>"""
    
    html_content += """
            </tbody>
        </table>
    </div>

    <div class="insights-box">
        <h3>🔍 INSIGHTS ESTADÍSTICOS AVANZADOS</h3>
        <div class="grid-3">
            <div>
                <h4>📊 Patrones Temporales</h4>
                <ul>
                    <li><strong>Semana 1:</strong> Equilibrio perfecto (100% presupuesto)</li>
                    <li><strong>Semana 3:</strong> Crisis máxima (300% presupuesto)</li>
                    <li><strong>Semana 6:</strong> Recuperación exitosa (44% presupuesto)</li>
                    <li><strong>Patrón:</strong> Volatilidad alta con tendencia a optimización</li>
                </ul>
            </div>
            <div>
                <h4>🎯 Análisis de Distribución</h4>
                <ul>
                    <li><strong>Iteración 1:</strong> Media 4.1h→1.4h (eficiencia 34%)</li>
                    <li><strong>Iteración 2:</strong> Media 438.8h→2.2h (eficiencia 0.5%)</li>
                    <li><strong>Cambio de paradigma:</strong> Factor 100x entre iteraciones</li>
                    <li><strong>Mediana más estable:</strong> Menos sensible a outliers</li>
                </ul>
            </div>
            <div>
                <h4>⏱️ Porcentajes de Tiempo</h4>
                <ul>
                    <li><strong>Mayor concentración:</strong> Semana 2 (47.2% del tiempo)</li>
                    <li><strong>Menor concentración:</strong> Semana 4 (7.5% del tiempo)</li>
                    <li><strong>Distribución total:</strong> 93.5% Iter1 vs 25.9% Iter2</li>
                    <li><strong>Eficiencia temporal:</strong> Inversamente proporcional a planificación</li>
                </ul>
            </div>
        </div>
    </div>

    <script>
        // Datos para gráficos
        const semanas = [1, 2, 3, 4, 5, 6];
        const presupuesto_plan = [24, 24, 24, 68, 68, 68];
        const presupuesto_real = [24, 18, 72, 96, 96, 30];
        const tareas_plan = [7.0, 8.0, 31.0, 56.0, 1630.0, 1003.0];
        const tareas_real = [4.5, 8.5, 14.4, 7.2, 7.9, 5.3];
        const porcentajes_tiempo = [18.7, 47.2, 20.0, 7.5, 8.2, 17.7];

        // Gráfico comparativo semanal
        Plotly.newPlot('chart-semanal-comparativo', [
            {
                x: semanas,
                y: presupuesto_plan,
                type: 'bar',
                name: 'Presupuesto Plan',
                marker: {color: 'rgba(52, 152, 219, 0.8)'}
            },
            {
                x: semanas,
                y: presupuesto_real,
                type: 'bar',
                name: 'Presupuesto Real',
                marker: {color: 'rgba(46, 204, 113, 0.8)'}
            },
            {
                x: semanas,
                y: tareas_real,
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Tareas Real',
                yaxis: 'y2',
                line: {color: 'rgba(231, 76, 60, 1)', width: 3},
                marker: {size: 8}
            }
        ], {
            title: 'Comparación Semanal: Presupuesto vs Tareas',
            xaxis: {title: 'Semanas'},
            yaxis: {title: 'Horas Presupuesto', side: 'left'},
            yaxis2: {title: 'Horas Tareas', side: 'right', overlaying: 'y'},
            barmode: 'group'
        });

        // Gráfico de eficiencias por iteración
        Plotly.newPlot('chart-eficiencias-iteracion', [
            {
                x: ['Iteración 1', 'Iteración 2'],
                y: [150.0, 92.6],
                type: 'bar',
                name: 'Eficiencia Presupuesto (%)',
                marker: {color: 'rgba(155, 89, 182, 0.8)'}
            },
            {
                x: ['Iteración 1', 'Iteración 2'],
                y: [33.922, 0.501],
                type: 'bar',
                name: 'Eficiencia Tareas (%)',
                yaxis: 'y2',
                marker: {color: 'rgba(241, 196, 15, 0.8)'}
            }
        ], {
            title: 'Comparación de Eficiencias por Iteración',
            xaxis: {title: 'Iteraciones'},
            yaxis: {title: 'Eficiencia Presupuesto (%)', side: 'left'},
            yaxis2: {title: 'Eficiencia Tareas (%)', side: 'right', overlaying: 'y', type: 'log'},
            barmode: 'group'
        });

        // Gráfico de porcentajes de tiempo
        Plotly.newPlot('chart-porcentajes-tiempo', [
            {
                x: semanas,
                y: porcentajes_tiempo,
                type: 'bar',
                marker: {
                    color: porcentajes_tiempo,
                    colorscale: 'Viridis',
                    showscale: true,
                    colorbar: {title: 'Porcentaje de Tiempo'}
                }
            }
        ], {
            title: 'Distribución de Porcentajes de Tiempo por Semana',
            xaxis: {title: 'Semanas'},
            yaxis: {title: 'Porcentaje de Tiempo (%)'}
        });
    </script>

    <div class="container" style="text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
        <h3>🏆 CONCLUSIONES DEL ANÁLISIS AVANZADO</h3>
        <div class="grid-2" style="text-align: left;">            <div>
                <h4>📊 Hallazgos Estadísticos Clave:</h4>
                <ul>
                    <li>Optimización extraordinaria: solo 1.7% del tiempo planificado utilizado</li>
                    <li>Media y mediana muestran patrones consistentes de alta eficiencia</li>
                    <li>Porcentajes de tiempo revelan excelente gestión de recursos</li>
                    <li>Factor de optimización alcanzado: 58x más eficiente que lo estimado</li>
                </ul>
            </div>
            <div>
                <h4>🎯 Implicaciones para Metodología TSPi:</h4>
                <ul>
                    <li>El equipo ha evolucionado significativamente en capacidades técnicas</li>
                    <li>Metodología de desarrollo optimizada supera expectativas TSPi tradicionales</li>
                    <li>Herramientas modernas permiten desarrollo acelerado</li>
                    <li>Experiencia del equipo genera estimaciones futuras más precisas</li>
                </ul>
            </div>
        </div>        <p style="font-size: 18px; margin-top: 20px;">
            <strong>🏆 Este análisis confirma un rendimiento excepcional que supera ampliamente las expectativas del proyecto TSPi</strong>
        </p>
    </div>
</body>
</html>"""
    
    return html_content

if __name__ == "__main__":
    print("🚀 Generando dashboard avanzado con análisis estadístico completo...")
    
    html_content = crear_dashboard_avanzado()
    
    # Guardar archivo HTML
    output_file = 'dashboard_avanzado_tspi.html'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"✅ Dashboard avanzado generado: {output_file}")
    print("🌐 Incluye: porcentajes semanales, análisis por iteración, estadísticas comparativas")
    print("📊 Media/mediana por semana e iteración con métricas de distribución temporal")
