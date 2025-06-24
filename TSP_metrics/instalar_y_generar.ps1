# INSTRUCCIONES PARA GENERAR EL GRÁFICO DE BARRAS
# ===================================================

# PASO 1: Instalar dependencias de Python
# pip install matplotlib

# PASO 2: Ejecutar el script
# python TSP_metrics/generar_grafico_final.py

# ALTERNATIVA: Usar el comando combinado de PowerShell
# pip install matplotlib && python TSP_metrics/generar_grafico_final.py

Write-Host "🚀 Instalando matplotlib para generar gráfico de barras..." -ForegroundColor Green
pip install matplotlib

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Matplotlib instalado correctamente" -ForegroundColor Green
    Write-Host "📊 Generando gráfico de barras del presupuesto TSPi..." -ForegroundColor Yellow
    python TSP_metrics/generar_grafico_final.py
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ ¡Gráfico generado exitosamente!" -ForegroundColor Green
        Write-Host "📁 Archivo guardado en: TSP_metrics/grafico_barras_presupuesto_final.png" -ForegroundColor Cyan
        Write-Host "🔍 Abriendo carpeta de resultados..." -ForegroundColor Yellow
        explorer TSP_metrics
    } else {
        Write-Host "❌ Error al generar el gráfico" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Error al instalar matplotlib" -ForegroundColor Red
    Write-Host "💡 Intenta ejecutar manualmente: pip install matplotlib" -ForegroundColor Yellow
}
