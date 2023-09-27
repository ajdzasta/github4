const hackList = document.querySelector('.hackList');
const credits = document.getElementById('credits');

const listHacks = [
	{
		username: 'user1',
		score: 12,
	},
	{
		username: 'user2',
		score: 10,
	},
	{
		username: 'user1',
		score: 7,
	}
];

const hubInit = () => {
	for (let x = 0; x < listHacks.length; x++) {

		const el2 = document.createElement('a');

		hackList.appendChild(el2);

		const button = document.createElement('button');
		button.classList.add('boxButton');
		el2.appendChild(button);

		const div1 = document.createElement('div');
		div1.textContent = (x + 1) + ".";
		button.appendChild(div1);

		const div2 = document.createElement('div');
		div2.textContent = listHacks[x].username;
		div2.style.marginLeft = "25px";
		button.appendChild(div2);

		const div3 = document.createElement('div');
		div3.textContent = listHacks[x].score + " pkt";
		div3.style.marginLeft = "auto";
		button.appendChild(div3);
	}
};
