import { SURNAMES } from './surnames.js';
import { MALE_NAMES } from './male_names.js';
import { FEMALE_NAMES } from './female_names.js';

// Get random item from list
function randomInList(list) {
	return list[Math.floor(Math.random() * list.length)];
}

// Get random value in range
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Pick items from list randomly and make a string from them
function getStringFromListItems(list, maxAmount) {
	const amount = getRandomInt(1, maxAmount);
	console.log(amount);
	let string = '';
	for (var i = 0; i < amount; i++) {
		string += randomInList(list) + ' ';
	}

	return string.slice(0, -1);
}

// Surname generator, female filter
function getRandomFemaleSurname(maxAmount) {
	let surname_string = getStringFromListItems(SURNAMES, maxAmount);

	let surnames = surname_string.split(' ');
	let new_surnames = '';
	surnames.forEach((surname) => {
		let new_surname = surname;
		if (surname.endsWith('i')) new_surname = surname.slice(0, -1) + 'a';
		console.log(new_surname + '   sssssssssss');

		new_surnames += new_surname + ' ';
	});

	return new_surnames.slice(0, -1);
}

let result = document.getElementById('result');

// Generate random name
const generate = (gender, maxNames, maxSurnames, mode, amount) => {
	let results = '';
	for (var i = 0; i < amount; i++) {
		console.log(
			`generating with gender ${gender}, max names ${maxNames} and max surnames ${maxSurnames}`
		);

		let name;
		if (gender == 'both') gender = randomInList(['male', 'female']);

		if (gender == 'male') name = getStringFromListItems(MALE_NAMES, maxNames);
		if (gender == 'female')
			name = getStringFromListItems(FEMALE_NAMES, maxNames);
		let surname;

		if (gender == 'male') surname = getStringFromListItems(SURNAMES, maxNames);
		if (gender == 'female') surname = getRandomFemaleSurname(maxNames);

		results += `${name} ${surname}\n`;
	}

	if (mode == 'reset') result.textContent = results;
	else result.textContent += results;
};

let gender = 'both';
let maxNames = 2;
let maxSurnames = 2;
let amount = 10;

let mode = 'reset';

// Value binding stuff
document.getElementById('gender').onchange = (ev) => {
	gender = ev.target.value;
};

document.getElementById('mode').onchange = (ev) => {
	mode = ev.target.value;
};

document.getElementById('amount').onchange = (ev) => {
	amount = ev.target.value;
};

document.getElementById('namemax').onchange = (ev) => {
	maxNames = ev.target.value;
};

document.getElementById('surnamemax').onchange = (ev) => {
	maxSurnames = ev.target.value;
};

// Start button bind
document.getElementById('start').onclick = () => {
	generate(gender, maxNames, maxSurnames, mode, amount);
};

document.getElementById('save').onclick = () => {
	var bb = new Blob([result.textContent], { type: 'text/plain' });
	var a = document.createElement('a');
	a.download = 'imiona.txt';
	a.href = window.URL.createObjectURL(bb);
	a.click();
};
