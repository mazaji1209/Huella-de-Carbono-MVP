window.addEventListener('DOMContentLoaded', () => {
  // Dinámico: instalaciones
  const inst = document.getElementById('num-instalaciones');
  const instContainer = document.getElementById('nombres-instalaciones');
  inst.addEventListener('change', () => {
    const count = Math.max(1, +inst.value);
    instContainer.innerHTML = '';
    for (let i = 1; i <= count; i++) {
      const div = document.createElement('div');
      div.className = 'input-group';
      div.innerHTML = `
        <label for="instalacion-${i}">Instalación ${i}:</label>
        <input type="text" id="instalacion-${i}" name="instalacion-${i}">
      `;
      instContainer.appendChild(div);
    }
  });
  inst.dispatchEvent(new Event('change'));

  // Función genérica mensual/anual
  function setupMonthly(selectId, containerId, label) {
    const sel = document.getElementById(selectId);
    const cont = document.getElementById(containerId);
    sel.addEventListener('change', () => {
      cont.innerHTML = '';
      const monthly = sel.value === 'mensual';
      const qty = monthly ? 12 : 1;
      for (let i = 1; i <= qty; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
          <label for="${containerId}-${i}">${label}${monthly ? ' mes '+i : ' anual'}:</label>
          <input type="number" id="${containerId}-${i}" name="${containerId}-${i}">
        `;
        cont.appendChild(div);
      }
    });
    sel.dispatchEvent(new Event('change'));
  }

  setupMonthly('empleados-modo',   'empleados-inputs',   'Empleados');
  setupMonthly('facturacion-modo', 'facturacion-inputs', 'Facturación');
  setupMonthly('produccion-modo',  'produccion-inputs',  'Producción');
});