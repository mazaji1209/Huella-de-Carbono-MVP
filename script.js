function openTab(evt, tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tc => tc.classList.remove('active'));

  const tabLinks = document.querySelectorAll('.tab-link');
  tabLinks.forEach(link => link.classList.remove('active'));

  document.getElementById(tabName).classList.add('active');
  evt.currentTarget.classList.add('active');
}

document.querySelectorAll('.tab-link').forEach(btn => {
  btn.addEventListener('click', (e) => openTab(e, btn.getAttribute('data-tab')));
});

// Cálculo de la huella de carbono
function calculateFootprint() {
  const fe = {
    electricidad: parseFloat(document.getElementById('fe-electricidad').value) || 0.000423,
    gasolina: (parseFloat(document.getElementById('fe-gasolina').value) || 2.196) / 1000,
    diesel: (parseFloat(document.getElementById('fe-diesel').value) || 2.653) / 1000,
    gasNatural: (parseFloat(document.getElementById('fe-gas-natural').value) || 1.8) / 1000
  };

  const consumo = {
    electricidad: parseFloat(document.getElementById('electricidad-kwh').value) || 0,
    gasolina: parseFloat(document.getElementById('gasolina-litros').value) || 0,
    diesel: parseFloat(document.getElementById('diesel-litros').value) || 0,
    gasNatural: parseFloat(document.getElementById('gas-natural-m3').value) || 0
  };

  const emis = {
    electricidad: consumo.electricidad * fe.electricidad,
    gasolina: consumo.gasolina * fe.gasolina,
    diesel: consumo.diesel * fe.diesel,
    gasNatural: consumo.gasNatural * fe.gasNatural
  };
  emis.combustibles = emis.gasolina + emis.diesel + emis.gasNatural;
  emis.total = emis.electricidad + emis.combustibles;

  document.getElementById('electricidad-result').textContent = emis.electricidad.toFixed(2);
  document.getElementById('combustibles-result').textContent = emis.combustibles.toFixed(2);
  document.getElementById('total-footprint').textContent = emis.total.toFixed(2);

  const year = document.getElementById('reporte-ano').value || new Date().getFullYear();
  document.getElementById('result-year').textContent = year;
  document.querySelector('[data-tab="Resultados"]').click();
}

document.querySelector('.calculate-btn').addEventListener('click', calculateFootprint);
