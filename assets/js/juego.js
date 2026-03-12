// Patrón modulo
(() => {
  "use strict";

  const personajes = ["Ana", "Mercy", "Luis"];
  console.log(personajes);
})();

let deck = [];
const tipos = ["C", "D", "H", "S"],
      especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias HTML
const btnPedir = document.querySelector("#btnPedir"),
      divCartasJugador = document.querySelector("#jugador-cartas"),
      puntosHTML = document.querySelectorAll("small");

// Crear deck
const crearDeck = () => {
  deck = [];

  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let esp of especiales) {
      deck.push(esp + tipo);
    }
  }

  deck = _.shuffle(deck);

  return deck;
};

// Pedir carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  return deck.pop();
};

// Valor de la carta
const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);

  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

// Turno de la computadora
const turnoComputadora = (puntosMinimos) => {
  const carta = pedirCarta();

  puntosComputadora = puntosComputadora + valorCarta(carta);
  puntosHTML[1].innerText = puntosComputadora;
};

// Evento botón pedir carta
btnPedir.addEventListener("click", () => {
  const carta = pedirCarta();

  puntosJugador += valorCarta(carta);

  puntosHTML[0].innerText = puntosJugador;

  console.log("Carta:", carta);
  console.log("Puntos jugador:", puntosJugador);

  // Crear imagen de carta
  const imgCarta = document.createElement("img");
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add("carta");
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.warn("sorry, you lose, try again");
    btnPedir.disabled = true;
  } else if (puntosJugador === 21) {
    consolo.warn("21, Great!!, you win!!");
  }

  // Mostrar carta en pantalla
  divCartasJugador.append(imgCarta);
});

// Inicializar juego
crearDeck();
