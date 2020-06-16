const squares = document.querySelectorAll(".square");
const mole = document.querySelectorAll(".mole");
const timeLeft = document.querySelector("#time-left");
let score = document.querySelector("#score");

let result = 0;
let currentTime = timeLeft.textContent;

// con esto sabemos si se da click sobre la mole
squares.forEach((square) => {
	square.addEventListener("mouseup", () => {
		if (square.id === hitPositon) {
			result = result + 1;
			score.textContent = result;
		}
	});
});

function randomSquare() {
	if (currentTime > 1) {
		// primero quitamos la mole que hay
		squares.forEach((square) => {
			square.classList.remove("mole");
		});
		// luego la ponemos en un cuadro al azar
		let randomPosition = squares[Math.floor(Math.random() * 9)];
		randomPosition.classList.add("mole");
		// asignamos el id de random position a hitPositon para usarlo luego
		hitPositon = randomPosition.id;
	}
}

// con esto la mole cambia de posicion cada segundo
function moveMole() {
	let timeId = null;
	timeId = setInterval(randomSquare, 1000);
}

function countDown() {
	currentTime--;
	timeLeft.textContent = currentTime;

	if (currentTime === 0) {
		clearInterval(timerId);
		alert("GAME OVER!!! Your final score is" + result);
	}
}

let timerId = setInterval(countDown, 1000);
moveMole();

function start() {
	currentTime = 40;
	timeLeft.textContent = currentTime;
}
