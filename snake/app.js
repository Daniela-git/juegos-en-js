document.addEventListener("DOMContentLoaded", () => {
	// variables html
	const squares = document.querySelectorAll(".grid div");
	const scoreDisplay = document.querySelector("span");
	const startBtn = document.querySelector(".start");

	// variables game
	const width = 10;
	let currentIndex = 0; //so fisrt div in our grid
	let appleIndex = 0; //fisrt div in our grid
	let currentSnake = [2, 1, 0]; // so the 3rd div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the body fro now on)
	let direction = 1;
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// to start and restar the game
	function startGame() {
		// reinicia todas las clases
		currentSnake.forEach((index) =>{
			squares[index].classList.remove("snake")
			squares[index].classList.remove("lose")
		}
		);
		squares[appleIndex].classList.remove("apple");
		clearInterval(interval);
		score = 0;
		randomApple();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake = [2, 1, 0];
		curentIndex = 0;
		currentSnake.forEach((index) => squares[index].classList.add("snake"));
		interval = setInterval(moveOutcome, intervalTime);
	}

	//lidear con los resultados del comportamiento de la snake
	function moveOutcome() {
		//function que dice cuando la snake golpea un borde o a ella misma
		if (
			(currentSnake[0] + width >= width * width && direction === width) || //golpea abajo
			(currentSnake[0] % width === width - 1 && direction === 1) || //golpea derecha
			(currentSnake[0] % width === 0) & (direction === -1) || //golpea izquierd
			(currentSnake[0] - width < 0 && direction === -width) ||
			squares[currentSnake[0] + direction].classList.contains("snake") //golpea ella misma
		) {
			currentSnake.forEach((index)=>{
				squares[index].classList.add('lose')
			})
			return clearInterval(interval); //limpia el interval si cualquiera pasa
		}

		const tail = currentSnake.pop(); //quita el ultimo elemento, y lo retorna
		squares[tail].classList.remove("snake"); //quita la clase snake de la cola
		currentSnake.unshift(currentSnake[0] + direction); //inserta la direccion a la cabeza del array

		//la snake consigue una apple
		if (squares[currentSnake[0]].classList.contains("apple")) {
			squares[currentSnake[0]].classList.remove("apple");
			squares[tail].classList.add("snake");
			currentSnake.push(tail);
			randomApple();
			score++;
			scoreDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcome, intervalTime);
		}
		squares[currentSnake[0]].classList.add("snake");
	}

	// generando el aleatorio para la manzana
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains("snake")); //para que no se agregue donde esta la snake
		squares[appleIndex].classList.add("apple");
	}

	// assign functions to keycodes
	function control(e) {
		squares[currentIndex].classList.remove("snake"); //quita la clase snake de todos los square

		if (e.keyCode === 39) {
			direction = 1; //al presionar derecha la snake ira 1 a la derecha
		} else if (e.keyCode === 38) {
			direction = -width; //al presionar arriba la snake se devolvera 10 divs, aparentando ir arriba
		} else if (e.keyCode === 37) {
			direction = -1; // izquierda la snake ira un div a la izquierda
		} else if (e.keyCode === 40) {
			direction = +width;
		}
	}
	document.addEventListener("keyup", control); //cuando se presione una tecla

	startBtn.addEventListener("click", startGame);
});
