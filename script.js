import { openTab } from './tabs.js';  // si modularizas navegación

function calculateFootprint() {
  // 1. Leer factores del formulario
  const fe = {
    electricidad: parseFloat(document.getElementById('fe-electricidad').value) || 0.000423,
    gasolina:     (parseFloat(document.getElementById('fe-gasolina').value)  || 2.196) / 1000,
    diesel:       (parseFloat(document.getElementById('fe-diesel').value)    || 2.653) / 1000,
    gasNatural:   (parseFloat(document.getElementById('fe-gas-natural').value)|| 1.8)   / 1000
  };

  // 2. Leer consumos
  const consumo = {
    electricidad: parseFloat(document.getElementById('electricidad-kwh').value) || 0,
    gasolina:     parseFloat(document.getElementById('gasolina-litros').value)   || 0,
    diesel:       parseFloat(document.getElementById('diesel-litros').value)     || 0,
    gasNatural:   parseFloat(document.getElementById('gas-natural-m3').value)   || 0
  };

  // 3. Calcular emisiones
  const emis = {
    electricidad: consumo.electricidad * fe.electricidad,
    gasolina:     consumo.gasolina     * fe.gasolina,
    diesel:       consumo.diesel       * fe.diesel,
    gasNatural:   consumo.gasNatural   * fe.gasNatural
  };
  emis.combustibles = emis.gasolina + emis.diesel + emis.gasNatural;
  emis.total = emis.electricidad + emis.combustibles;

  // 4. Mostrar resultados
  document.getElementById('electricidad-result').textContent = emis.electricidad.toFixed(2);
  document.getElementById('combustibles-result').textContent = emis.combustibles.toFixed(2);
  document.getElementById('total-footprint').textContent = emis.total.toFixed(2);

  const ano = document.getElementById('reporte-ano').value || new Date().getFullYear();
  document.getElementById('result-year').textContent = ano;

  // 5. Navegar a resultados
  document.querySelector('button[onclick*="Resultados"]').click();
}

document.querySelector('.calculate-btn').addEventListener('click', calculateFootprint);
