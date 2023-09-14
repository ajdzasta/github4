const hackList = document.querySelector('.hackList');
const credits = document.getElementById('credits');

const listHacks = [
	{
		name: 'UŁAMKI',
		desc: 'Dodaj ułamki',
		link: 'game1',
	},
	{
		name: 'RÓWNANIA',
		desc: 'Rozwiąż równania',
		link: 'game2',
	}
];

const hubInit = () => {
	for (let x = 0; x < listHacks.length; x++) {

		const el2 = document.createElement('a');

		el2.setAttribute('href', './' + listHacks[x].link + '/');

		hackList.appendChild(el2);

		const button = document.createElement('button');
		button.classList.add('boxButton');
		el2.appendChild(button);

		const div1 = document.createElement('div');
		div1.textContent = listHacks[x].name;
		button.appendChild(div1);

		const div2 = document.createElement('div');
		div2.textContent = listHacks[x].desc;
		button.appendChild(div2);
	}
};
