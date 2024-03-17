const hackList = document.querySelector('.hackList');
const credits = document.getElementById('credits');

const game_names = {
	game1: "RÓWNANIA",
	game2: "UŁAMKI",
	game3: "LICZBY PIERWSZE",
	game4: "PODZIELNOŚĆ",
	game5: "KOD",
	game6: "HANOI"
}

const listUsers = [
	{
		username: 'user1',
		score: 12,
		games: 
			[
				{
					name: "game5",
					score: 5 
				},
				{
					name: "game2",
					score: 3 
				},
				{
					name: "game1",
					score: 2 
				},
				{
					name: "game6",
					score: 2 
				},
				{
					name: "game3",
					score: 0 
				},
				{
					name: "game4",
					score: 0 
				},
			]
	},
	{
		username: 'user2',
		score: 10,
		games:
			[
				{
					name: "game5",
					score: 4 
				},
				{
					name: "game6",
					score: 3 
				},
				{
					name: "game1",
					score: 1 
				},
				{
					name: "game2",
					score: 1 
				},
				{
					name: "game5",
					score: 1 
				},
				{
					name: "game4",
					score: 0 
				},
			]
	},
	{
		username: 'user3',
		score: 7,
		games:
			[
				{
					name: "game5",
					score: 4 
				},
				{
					name: "game5",
					score: 3 
				},
				{
					name: "game1",
					score: 0 
				},
				{
					name: "game2",
					score: 0 
				},
				{
					name: "game3",
					score: 0 
				},
				{
					name: "game4",
					score: 0 
				},
			]
	}
];

const hubInit = () => {
	for (let x = 0; x < listUsers.length; x++) {

		const el2 = document.createElement('a');

		hackList.appendChild(el2);

		const button = document.createElement('button');
		button.classList.add('boxButton');
		el2.appendChild(button);

		const div1 = document.createElement('div');
		div1.textContent = (x + 1) + ".";
		button.appendChild(div1);

		const div2 = document.createElement('div');
		div2.textContent = listUsers[x].username;
		div2.style.marginLeft = "25px";
		button.appendChild(div2);

		const div3 = document.createElement('div');
		div3.textContent = listUsers[x].score + " pkt";
		div3.style.marginLeft = "auto";
		button.appendChild(div3);

		const div4 = document.createElement('div');
		div4.classList.add('boxDiv');
		div4.style.marginLeft = "auto";
		div4.style.display = "none";
		for (let i = 0; i < listUsers[x].games.length; i++){
			const div5 = document.createElement('div');
			div5.textContent = (i + 1) + ". " + game_names[listUsers[x].games[i].name] + " : " + listUsers[x].games[i].score + " pkt";
			div4.appendChild(div5);
		}
		el2.appendChild(div4);

		button.addEventListener("click", function (event) {
			//console.log(event.target);
			let x = event.target.parentElement.children[1]
			if (x.style.display === "none") {
			  x.style.display = "flex";
			} else {
			  x.style.display = "none";
			}
		});
	}
};