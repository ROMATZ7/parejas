// Mostrar juego después de instrucciones
document.getElementById("empezar").addEventListener("click", () => {
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("juego").style.display = "block";
  iniciarJuego();
});

const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");
const vidasElem = document.getElementById("vidas");
const reiniciarBtn = document.getElementById("reiniciar");

let cartas = ["🔥", "💧", "🌪️", "⚡", "🌙", "🪐", "🍀", "💎"];
let mezcla = [];
let reveladas = [];
let vidas = 6;
let aciertos = 0;

function iniciarJuego() {
  mezcla = [...cartas, ...cartas].sort(() => Math.random() - 0.5);
  tablero.innerHTML = "";
  mensaje.textContent = "";
  reveladas = [];
  vidas = 6;
  aciertos = 0;
  actualizarVidas();
  reiniciarBtn.style.display = "none";

  mezcla.forEach((icono, i) => {
    const div = document.createElement("div");
    div.classList.add("carta");
    div.dataset.valor = icono;
    div.dataset.index = i;
    div.addEventListener("click", () => voltearCarta(div));
    tablero.appendChild(div);
  });
}

function actualizarVidas() {
  const corazones = "❤️".repeat(vidas) + "🖤".repeat(6 - vidas);
  vidasElem.textContent = `Vidas: ${corazones}`;
}

function voltearCarta(carta) {
  if (carta.classList.contains("revelada") || reveladas.length === 2) return;

  carta.textContent = carta.dataset.valor;
  carta.classList.add("revelada");
  reveladas.push(carta);

  if (reveladas.length === 2) {
    const [c1, c2] = reveladas;
    if (c1.dataset.valor === c2.dataset.valor) {
      aciertos++;
      reveladas = [];
      if (aciertos === cartas.length) {
        // 🎉 Victoria con estrella gigante
        document.body.innerHTML = `<div id="estrellaVictoria">❤️</div>`;
        return;
      }
    } else {
      vidas--;
      actualizarVidas();
      if (vidas <= 0) {
        mensaje.textContent = "💀 ¡utyvygviukgv!";
        revelarTodo();
        reiniciarBtn.style.display = "inline-block";
      } else {
        setTimeout(() => {
          c1.textContent = "";
          c2.textContent = "";
          c1.classList.remove("revelada");
          c2.classList.remove("revelada");
          reveladas = [];
        }, 1000);
      }
    }
  }
}

function revelarTodo() {
  const todas = document.querySelectorAll(".carta");
  todas.forEach((carta) => {
    carta.textContent = carta.dataset.valor;
    carta.classList.add("revelada");
  });
}

reiniciarBtn.addEventListener("click", iniciarJuego);
