// Cálculo de huella
document.querySelector('.calculate-btn')?.addEventListener('click', () => {
  const fe = {
    electricidad: parseFloat(document.getElementById('fe-electricidad')?.value) || 0.000423,
    gasolina:     (parseFloat(document.getElementById('fe-gasolina')?.value)||2.196)/1000,
    diesel:       (parseFloat(document.getElementById('fe-diesel')?.value)||2.653)/1000,
    gasNatural:   (parseFloat(document.getElementById('fe-gas-natural')?.value)||1.8)/1000
  };
  const c = {
    electricidad: parseFloat(document.getElementById('electricidad-kwh')?.value)||0,
    gasolina:     parseFloat(document.getElementById('gasolina-litros')?.value)||0,
    diesel:       parseFloat(document.getElementById('diesel-litros')?.value)||0,
    gasNatural:   parseFloat(document.getElementById('gas-natural-m3')?.value)||0
  };
  const emis = {
    electricidad: c.electricidad*fe.electricidad,
    gasolina: c.gasolina*fe.gasolina,
    diesel:   c.diesel*fe.diesel,
    gasNatural: c.gasNatural*fe.gasNatural
  };
  emis.combustibles = emis.gasolina+emis.diesel+emis.gasNatural;
  emis.total = emis.electricidad+emis.combustibles;
  document.getElementById('electricidad-result')?.textContent = emis.electricidad.toFixed(2);
  document.getElementById('combustibles-result')?.textContent = emis.combustibles.toFixed(2);
  document.getElementById('total-footprint')?.textContent = emis.total.toFixed(2);
  const year = document.getElementById('reporte-ano')?.value||new Date().getFullYear();
  document.getElementById('result-year')?.textContent = year;
});
// Genera inputs dinámicos para instalaciones
document.getElementById('num-instalaciones').addEventListener('change', e => {
  const count = Math.max(1, parseInt(e.target.value));
  const container = document.getElementById('nombres-instalaciones');
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'input-group';
    div.innerHTML = `
      <label>Nombre instalación ${i}:</label>
      <input type="text" name="instalacion-${i}">
    `;
    container.appendChild(div);
  }
});
// Función genérica modo mensual/anual
function setupMonthly(selectId, containerId, label) {
  const select = document.getElementById(selectId);
  const container = document.getElementById(containerId);
  select.addEventListener('change', () => {
    container.innerHTML = '';
    const isMonthly = select.value === 'mensual';
    const count = isMonthly ? 12 : 1;
    for (let i = 1; i <= count; i++) {
      const div = document.createElement('div');
      div.className = 'input-group';
      div.innerHTML = `
        <label>${label}${isMonthly ? ' mes ' + i : ' anual'}:</label>
        <input type="number" name="${containerId}-${i}">
      `;
      container.appendChild(div);
      if (!isMonthly) break;
    }
  });
  select.dispatchEvent(new Event('change'));
}
// Configura empleados, facturación y producción
setupMonthly('empleados-modo',   'empleados-inputs',   'Número empleados');
setupMonthly('facturacion-modo', 'facturacion-inputs', 'Facturación');
setupMonthly('produccion-modo',  'produccion-inputs',  'Producción');