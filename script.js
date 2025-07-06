// --- Lógica para la Navegación por Pestañas ---
function openTab(evt, tabName) {
    // Ocultar todo el contenido de las pestañas
    const tabcontent = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Desactivar todos los botones de las pestañas
    const tablinks = document.getElementsByClassName("tab-link");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Mostrar la pestaña actual y marcar el botón como activo
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// --- Lógica para el Cálculo de la Huella de Carbono ---

function calculateFootprint() {
    // --- FACTORES DE EMISIÓN (Ejemplos para México) ---
    // Fuente: Factores de emisión del Programa GEI México, SENER, etc.
    // Estos valores son ilustrativos y deben ser actualizados según la normativa vigente.
    const FE_ELECTRICIDAD = 0.423; // tCO2e / MWh -> 0.000423 tCO2e / kWh
    const FE_GASOLINA = 2.196;     // kgCO2e / litro -> 0.002196 tCO2e / litro
    const FE_DIESEL = 2.653;       // kgCO2e / litro -> 0.002653 tCO2e / litro
    const FE_GAS_NATURAL = 1.8;      // kgCO2e / m³ -> 0.0018 tCO2e / m³

    // Obtener los valores de los inputs
    const consumoElectricidad = parseFloat(document.getElementById('electricidad-kwh').value) || 0;
    const consumoGasolina = parseFloat(document.getElementById('gasolina-litros').value) || 0;
    const consumoDiesel = parseFloat(document.getElementById('diesel-litros').value) || 0;
    const consumoGasNatural = parseFloat(document.getElementById('gas-natural-m3').value) || 0;

    // Calcular emisiones por categoría (en toneladas de CO2e)
    const emisionesElectricidad = consumoElectricidad * FE_ELECTRICIDAD / 1000; // Dividido por 1000 si el factor es en kg
    const emisionesGasolina = consumoGasolina * FE_GASOLINA / 1000;
    const emisionesDiesel = consumoDiesel * FE_DIESEL / 1000;
    const emisionesGasNatural = consumoGasNatural * FE_GAS_NATURAL / 1000;
    
    const emisionesCombustibles = emisionesGasolina + emisionesDiesel + emisionesGasNatural;

    // Calcular el total
    const totalEmisiones = emisionesElectricidad + emisionesCombustibles;

    // Mostrar los resultados en la pestaña de "Resultados"
    document.getElementById('electricidad-result').textContent = emisionesElectricidad.toFixed(2);
    document.getElementById('combustibles-result').textContent = emisionesCombustibles.toFixed(2);
    document.getElementById('total-footprint').textContent = totalEmisiones.toFixed(2);
    
    // Actualizar el año del reporte
    const anoReporte = document.getElementById('reporte-ano').value;
    document.getElementById('result-year').textContent = anoReporte || new Date().getFullYear();

    // Cambiar automáticamente a la pestaña de resultados
    document.querySelector('button[onclick*="Resultados"]').click();
}