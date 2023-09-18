const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const resaultend = document.getElementById('resaultend');
const symbol = document.getElementById('symbol');
const resultscreen = document.querySelector(".resultscreen");
const clearButton = document.getElementById("clear");
const confirmButton = document.getElementById("confirm");
const container2 = document.getElementById("container2");
const wrapper = document.querySelector(".wrapper");
const buttons = document.querySelector(".buttons");
const inputs = document.querySelectorAll('.input');
const operators = document.querySelectorAll('.op');

let vh = window.innerHeight;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var __timePlay = 600;
var progressBarInterval;
var check = false;

const gameInit = () => {

	clearButton.addEventListener('click', () => {
		Clear();
	});

	confirmButton.addEventListener('click', () => {
		const check = Check();
		if (check == true){
			gameWin();
		}
		else if (check == false){
			gameOver();
		}

	});

	buttonStart.addEventListener('click', () => {
		gameStart();
		Generate();
		Clear();
	});

	resultscreen.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	wrapper.style.display = 'none';
	buttons.style.display = 'none';
	
};

const gameStart = () => {
	check = false;
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	resultscreen.style.display = 'none';
	progressBarStart('start', 2);
};

const gameOver = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie nieudane!';
	wrapper.style.display = 'none';
	buttons.style.display = 'none';
	hackText.style.display = 'none';
	resultscreen.style.display = 'none';
	document.getElementById("endInfo").innerHTML = "Otrzymane punkty: 0 pkt";

	progressBarStart('end', 2);
};

const gameWin = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie udane!';
	wrapper.style.display = 'none';
	buttons.style.display = 'none';
	hackText.style.display = 'none';
	resultscreen.style.display = 'none';
	document.getElementById("endInfo").innerHTML = "Otrzymane punkty: 10 pkt";

	progressBarStart('end', 2);
};

function progressBarStart(type, time) {
	let start = new Date().getTime();
	var maxwidth = 1000;
	var width = maxwidth;
	const process = () => {
		if (width > 0) {
			if (type == 'start' || type == 'end') width = width - 3;
			else width--;
			progressBarId.style.width = (width * 100.0) / maxwidth + '%';

			let now = new Date().getTime();
  			let distance = start + time*1000 - now;
			//console.log(distance);

  			// Time calculations for days, hours, minutes and seconds
  			let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  			let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  			// Display the result in the element with id="demo"
  			document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";

		} else {
			if (type == 'start') {
				wrapper.style.display = 'grid';
				buttons.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				wrapper.style.display = 'none';
				buttons.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				wrapper.style.display = 'none';
				buttons.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				resultscreen.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function Generate() {
	t1 = performance.now();

	const char_list = ["+","-","*"];
	for (let i = 0; i < operators.length; i++){
		operators[i].value = char_list[getRandomInt(0,2)];
	}

	let hidden_numbers = [];
	for (let i = 0; i < 9; i++){
		hidden_numbers.push(getRandomInt(0,9));
	}

	let rows = [];

	for (let i = 0; i < 3; i++){
		rows.push(eval(hidden_numbers[3*i] + String(document.getElementById("O" + 5*i).value) + hidden_numbers[3*i + 1] + String(document.getElementById("O" + (5*i + 1)).value) + hidden_numbers[3*i + 2]))
		//console.log(hidden_numbers[3*i] + String(document.getElementById("O" + 5*i).value) + hidden_numbers[3*i + 1] + String(document.getElementById("O" + (5*i + 1)).value) + hidden_numbers[3*i + 2]);
	}

	//console.log("");

	let columns = [];

	for (let i = 0; i < 3; i++){
		columns.push(eval(hidden_numbers[i] + String(document.getElementById("O" + (i + 2)).value) + hidden_numbers[i + 3] + String(document.getElementById("O" + (i + 7)).value) + hidden_numbers[i + 6]))
		//console.log(hidden_numbers[i] + String(document.getElementById("O" + (i + 2)).value) + hidden_numbers[i + 3] + String(document.getElementById("O" + (i + 7)).value) + hidden_numbers[i + 6]);
	}

	for (let i = 0; i < 3; i++){
		if(columns[i] < 0){
			Generate();
			return;
		}
		if(rows[i] < 0){
			Generate();
			return;
		}
	}

	for (let i = 0; i < 3; i++){
		document.getElementById("R" + (2*i + 3)).value = rows[i];
		document.getElementById("R" + (2*i + 4)).value = rows[i];
	}

	for (let i = 0; i < 3; i++){
		document.getElementById("R" + i).value = columns[i];
		document.getElementById("R" + (i + 9)).value = columns[i];
	}

	console.log(hidden_numbers);
	console.log(rows);
	console.log(columns);

	console.log((performance.now() - t1) + " ms");
}

function Check() {
	for (let i = 0; i < 9; i++){
		if (document.getElementById("I" + i).value == ""){
			return;
		}
	}
	for (let i = 0; i < 3; i++){
		if (eval(document.getElementById("I" + 3*i).value + String(document.getElementById("O" + 5*i).value) + document.getElementById("I" + (3*i + 1)).value + String(document.getElementById("O" + (5*i + 1)).value) + document.getElementById("I" + (3*i + 2)).value) != document.getElementById("R" + (2*i + 3)).value){
			return false;
		}
		if (eval(document.getElementById("I" + i).value + String(document.getElementById("O" + (i + 2)).value) + document.getElementById("I" + (i + 3)).value + String(document.getElementById("O" + (i + 7)).value) + document.getElementById("I" + (i +6)).value) != document.getElementById("R" + i).value){
			return false;
		}
	}
	return true;
}

function Clear() {
	for (let i = 0; i < inputs.length; i++){
		inputs[i].value = '';
	}
}

gameInit();
