const hackList = document.querySelector('.hackList');
const credits = document.getElementById('credits');

const listHacks = [
	{
		name: 'RÓWNANIA',
		desc: 'Rozwiąż równania',
		link: 'game1',
	},
	{
		name: 'UŁAMKI',
		desc: 'Dodaj ułamki',
		link: 'game2',
	},
	{
		name: 'LICZBY PIERWSZE',
		desc: 'znajdź liczbę',
		link: 'game3',
	},
	{
		name: 'PODZIELNOŚĆ',
		desc: 'sprawdź podzielność',
		link: 'game4',
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
