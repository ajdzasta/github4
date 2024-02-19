const hackFunction = document.querySelector('.hackFunction');
const hackFunction2 = document.querySelector('.hackFunction2');
const hackText = document.querySelector('.hackText');
const progressBar = document.getElementById('progressBox');
const buttonStart = document.getElementById('buttonStart');
const hackInfo = document.querySelector('.hackInfo');
const textInfo = document.getElementById('textInfo');
const progressBarId = document.getElementById('progress-bar');
const levelHack = document.getElementById('levelHack');
const upF1 = document.getElementById('upF1');
const dnF1 = document.getElementById('dnF1');
const upF2 = document.getElementById('upF2');
const dnF2 = document.getElementById('dnF2');
const upF3 = document.getElementById('upF3');
const dnF3 = document.getElementById('dnF3');
const symbol = document.getElementById('symbol');
const buttonConfirm = document.getElementById("buttonConfirm");
const result = document.querySelector(".result");
const resultInfo = document.getElementById("endInfo");
const resultInfo2 = document.getElementById("endInfo2");
const nickConfirm = document.getElementById("nickConfirm");
const register = document.querySelector(".register"); 
const username = document.getElementById("username");
const userid = document.getElementById("userid");
const startinfo = document.querySelector(".startinfo")
const input = document.getElementById('inputValue');

let vh = window.innerHeight;
document.documentElement.style.setProperty('--vh', `${vh}px`);

var __timePlay = 240;
var progressBarInterval;
var stageLevel = 0;
var check = false;
var difficulty = "normal";

const gameInit = () => {

	//const cookie = document.cookie;
	//let check2 = false;

	let check2 = true;
	//if (cookie != ""){
	//	username.innerHTML = "username: " + getCookie("username");
	//	userid.innerHTML = "userid: " + getCookie("userid");
	//	check2 = true;
	//	console.log(cookie);
	//}

	//if (cookie == ""){
	//	register.style.display = "";
	//}

	buttonConfirm.addEventListener('click', function () {
		if (check2){
			if (check) {
				if (check_numbers2(input.value) == 6) {
					GenerateNumbers()
					levelHack.textContent = "Zadanie " + stageLevel;
					input.value = '';
					progressBarStart('game', __timePlay);
				}
				else{
					gameOver();
				}
			}
		}
	});

	nickConfirm.addEventListener('click', async function () {
		var date = new Date();
		date.setFullYear(date.getFullYear() + 10); // Ustawiamy datę na 10 lat w przyszłości

		const username_input = document.getElementById("inputNick").value;

		const response = await register_api(username_input);

		const id = response["userid"];

		if (id == undefined){
			return;
		}

		const newCookie1 = "userid=" + id + "; expires=" + date.toUTCString() + "; path=/";
		const newCookie2 = "username=" + username_input + "; expires=" + date.toUTCString() + "; path=/";
		const newCookie3 = "score=0" + "; expires=" + date.toUTCString() + "; path=/";
		console.log(newCookie1);
		console.log(newCookie2);
		console.log(newCookie3);
		document.cookie = newCookie1;
		document.cookie = newCookie2;
		document.cookie = newCookie3;
		check2 = true;
		username.innerHTML = "username: " + username_input;
		userid.innerHTML = "userid: " + id;
		register.style.display = 'none';

	});

	result.style.display = 'none';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	progressBar.style.display = 'none';
	hackInfo.style.display = 'none';
	startinfo.style.display = '';
	//document.addEventListener('contextmenu', event => event.preventDefault());
};

const getCookie = (cname) => {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(';');
	for(let i = 0; i <ca.length; i++) {
	  let c = ca[i];
	  while (c.charAt(0) == ' ') {
		c = c.substring(1);
	  }
	  if (c.indexOf(name) == 0) {
		return c.substring(name.length, c.length);
	  }
	}
	return "";
};

const gameStart = () => {
	stageLevel = 0;
	check = false;
	levelHack.textContent = 'Zadanie 1';
	buttonStart.style.display = 'none';
	progressBar.style.display = 'block';
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Przygotuj sie...';
	result.style.display = 'none';
	register.style.display = 'none';
	startinfo.style.display = 'none';
	input.value = '';
	progressBarStart('start', 2);
};

const gameOver = async() => {
	check = false;
	hackInfo.style.display = 'block';
	textInfo.innerHTML = 'Zadanie nieudane!';
	hackFunction.style.display = 'none';
	hackFunction2.style.display = 'none';
	hackText.style.display = 'none';
	result.style.display = 'none';
	resultInfo.innerHTML = 'Zdobyte punkty: ' + (stageLevel - 1) + " pkt";
	startinfo.style.display = 'none';

	//const highest_score = getCookie("score");

	//if ((stageLevel - 1) > highest_score){
	//	resultInfo2.innerHTML = 'Największy wynik: ' + (stageLevel - 1) + " pkt";
	//
	//	var date = new Date();
	//	date.setFullYear(date.getFullYear() + 10); // Ustawiamy datę na 10 lat w przyszłości
	//	
	//	const editCookie = "score=" + (stageLevel - 1) + "; expires=" + date.toUTCString() + "; path=/";
	//	document.cookie = editCookie;
	//	const id = getCookie("userid")
	//	const update = await updateScore(id,(stageLevel - 1));
	//	console.log(update);
	//}
	//else{
	//	resultInfo2.innerHTML = 'Największy wynik: ' + highest_score + " pkt";
	//}

	register.style.display = 'none';
	progressBarStart('end', 2);
};

function progressBarStart(type, time) {
	let start = new Date().getTime();
	var maxwidth = 1000;
	var width = maxwidth;
	progressBarId.style.width = '100%';
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
			if (distance > 0){
				if (minutes > 0 && seconds == 0){
					document.getElementById("timer").innerHTML = minutes + "m "
				}
				else if (minutes > 0){
  					document.getElementById("timer").innerHTML = minutes + "m " + seconds + "s ";
				}
				else{
					document.getElementById("timer").innerHTML = seconds + "s ";
				}
			}

		} else {
			if (type == 'start') {
				hackFunction.style.display = '';
				hackFunction2.style.display = '';
				hackText.style.display = '';
				hackInfo.style.display = 'none';
				check = true;
				GenerateNumbers()
				progressBarStart('game', __timePlay);
				return;
			}

			if (type == 'game') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackInfo.style.display = 'block';
				hackText.style.display = 'none';
				gameOver();
				return;
			}

			if (type == 'end') {
				hackFunction.style.display = 'none';
				hackFunction2.style.display = 'none';
				hackText.style.display = 'none';
				buttonStart.style.display = '';
				progressBar.style.display = 'none';
				hackInfo.style.display = 'none';
				result.style.display = '';
				startinfo.style.display = '';
			}
		}
	};
	clearInterval(progressBarInterval);
	progressBarInterval = setInterval(process, time);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
  }

let resaultQuestion = 0;

let numbers = [];
let length = 0

const number_dif = {
	easy: 3,
	normal: 4,
	hard: 5
}

function GenerateNumbers(){

	numbers = []

	length = number_dif[difficulty]

    for (let i = 0; i < 7; i++){
        numbers.push(unique_random_number(length));
    }

	for (let i = 0; i < 6; i++){
		number_string = (numbers[i + 1]).join("");
		document.getElementById("clue" + i + "0").innerText = number_string;
	}

	for (let i = 0; i < 6; i++){
		number_check = (check_numbers(numbers[0],numbers[i + 1]))
		let string = number_check;
		if (number_check[0] == 0){
			string = "żadna nie jest porawna"
		}
		else if (number_check[0] == number_check[1]){
			if (number_check[0] == 1){
				string = "jedna jest poprawna i na dobrym miejscu"
			}
			if (number_check[0] == 2){
				string = "dwie są poprawne i na dobrych miejscach"
			}
			if (number_check[0] == 3){
				string = "trzy są poprawne i na dobrych miejscach"
			}
			if (number_check[0] == 4){
				string = "cztery są poprawne i na dobrych miejscach"
			}

		}
		else {
			if (number_check[0] == 1){
				string = "jedna jest poprawna"
				if (number_check[1] == 0){
					string += ", ale na złym miejscu"
				}
			}
			if (number_check[0] == 2){
				string = "dwie są porawne"
				if (number_check[1] == 0){
					string += ", ale na złych miejscach"
				}
				if (number_check[1] == 1){
					string += ", ale jedna na dobrym miejscu"
				}
			}
			if (number_check[0] == 3){
				string = "trzy są porawne"
				if (number_check[1] == 0){
					string += ", ale na złych miejscach"
				}
				if (number_check[1] == 1){
					string += ", ale jedna na dobrym miejscu"
				}
				if (number_check[1] == 2){
					string += ", ale dwie na dobrych miejscach"
				}
			}
			if (number_check[0] == 4){
				string = "cztery są porawne"
				if (number_check[1] == 0){
					string += ", ale na złych miejscach"
				}
				if (number_check[1] == 1){
					string += ", ale jedna na dobrym miejscu"
				}
				if (number_check[1] == 2){
					string += ", ale dwie na dobrych miejscach"
				}
				if (number_check[1] == 3){
					string += ", ale trzy na dobrych miejscach"
				}
			}
		}
		document.getElementById("clue" + i + "1").innerText = string;
	}

    console.log(numbers[0]);
    console.log(numbers)
	stageLevel++;

}

function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function check_numbers(start, number){
    //number = number.toString().split("")
    let correct = [0,0];
    //console.log(correct);
    for (let i = 0; i < number.length; i ++){
        for (let j = 0; j < number.length; j ++){
            if (number[i] == start[j]){
                //console.log(i,j);
                correct[0] += 1;
            }
        }
    }

    for (let i = 0; i < number.length; i ++){
            if (start[i] == number[i]){
                correct[1] += 1;
            }
    }

    return correct;
}

function random_number(length){
    let number = []

    number.push(getRandomIntInclusive(0,9));
    let random = getRandomIntInclusive(0,9);
    
    while (number.length < length){
        if (number.indexOf(random) == -1){
            number.push(random);
        }
        else{
            random = getRandomIntInclusive(0,9);
        }
    }

    return number;
}

function unique_random_number(length){
    number = random_number(length);
    while (numbers.indexOf(number) != -1){
        number = random_number(length);
        if (numbers.length > 0){
            while (check_numbers(numbers[0],number)[0] > length - 1){
                number = random_number(length)
            }
        }
    }
    
    return number;
}

function check_numbers2(number){
    let checks = 0
    for (let i = 1; i < 7; i++){
        if (check_numbers(numbers[0],numbers[i]).toString() == check_numbers(number.toString().split(""),numbers[i]).toString()){
            //console.log("chuj");
            checks += 1;
        }
    }
    return checks;
}

function solver(){

    for (let i = 0; i < Math.pow(10,length); i++){
        i = i.toString()
        while (i.length < length){
            i = "0" + i
        }
        if (check_numbers2(i) == 6){
            console.log(i)
        }
    }
}

function level(id){
	document.getElementById("easy").style.border = "none";
	document.getElementById("normal").style.border = "none";
	document.getElementById("hard").style.border = "none";

	document.getElementById(id).style.border = "1px solid rgba(105, 105, 105, 0.5)";
	difficulty = id;
}