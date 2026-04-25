let participantes = [];

// ✅ TU LINK CSV
const url = "https://docs.google.com/spreadsheets/d/1jUA8xbmMT2q8k09w_eDF9G9M6gTrG-agFsalSyDrSFo/export?format=csv&gid=0";

// Cargar datos
fetch(url)
  .then(res => res.text())
  .then(data => {
    const filas = data.trim().split("\n");

    for (let i = 1; i < filas.length; i++) {
      const col = filas[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      if (col.length >= 3) {
        participantes.push({
          numero: col[0].trim(),
          nombre: col[1].trim(),
          celular: col[2].trim()
        });
      }
    }

    console.log("Participantes:", participantes.length);
  })
  .catch(err => console.error("Error:", err));

// BOTON
document.getElementById("btnSortear").addEventListener("click", () => {
  if (participantes.length === 0) {
    alert("No se cargaron los datos");
    return;
  }

  const anim = document.getElementById("animacion");
  const card = document.getElementById("ganador");

  card.classList.add("hidden");
  anim.style.opacity = 1;

  const intervalo = setInterval(() => {
    const random = participantes[Math.floor(Math.random() * participantes.length)];
    anim.innerHTML = random.numero;
  }, 100);

  setTimeout(() => {
    clearInterval(intervalo);

    const ganador = participantes[Math.floor(Math.random() * participantes.length)];

    document.getElementById("num").textContent = ganador.numero;
    document.getElementById("nombre").textContent = ganador.nombre;
    document.getElementById("celular").textContent = ganador.celular;

    anim.style.opacity = 0;
    card.classList.remove("hidden");

    // 🎉 CONFETI PRO
    lanzarConfeti();

  }, 3000);
});

// 🎉 FUNCION CONFETI
function lanzarConfeti() {
  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}