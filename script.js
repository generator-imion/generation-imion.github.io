import { SURNAMES } from './surnames.js';
import { FEMALE_NAMES } from './female_names.js';
import { MALE_NAMES } from './male_names.js';

// Values
let gender = 'both';
let maxNames = 2;
let maxSurnames = 2;
let amount = 10;

const worker = new Worker('worker.js');

let generated = 0;

let mode = 'reset';

// Result textarea binding
let result = document.getElementById('result');
// Amount binding
let generated_amount = document.getElementById('gen_amount');
// File size binding
let file_size = document.getElementById('mb_amount');

//#region Element binding
document.getElementById('gender').onchange = (ev) => {
	gender = ev.target.value;
};

document.getElementById('mode').onchange = (ev) => {
	mode = ev.target.value;
};

document.getElementById('amount').onchange = (ev) => {
	amount = Number(ev.target.value);
};

document.getElementById('namemax').onchange = (ev) => {
	maxNames = Number(ev.target.value);
};

document.getElementById('surnamemax').onchange = (ev) => {
	maxSurnames = Number(ev.target.value);
};
//#endregion

//#region "Generate" button binding
document.getElementById('start').onclick = () => {
	if (mode == 'reset') generated = amount;
	if (mode == 'add') generated += amount;
	generated_amount.innerText = 'Ilość imion: ' + generated;
	file_size.innerText = 'Rozmiar pliku: ' + get_size() / 1000000 + 'mb';

	// generate(gender, maxNames, maxSurnames, mode, amount);
	worker.postMessage(
		`${gender}||${maxNames}||${maxSurnames}||${amount}||${SURNAMES}||${FEMALE_NAMES}||${MALE_NAMES}`
	);
};

//#endregion

//#region Receive from worker
worker.onmessage = (msg) => {
	// if (mode == 'reset') result.innerText = msg.data;
	// if (mode == 'add') result.innerText += msg.data;
	const items = msg.data.split('||');
	// console.log(msg.data);
	// console.log(items);

	if (mode == 'reset') result.textContent = '';
	for (var i = 0; i < items.length; i++) {
		result.textContent += items[i] + '\n';
	}
};
//#endregion

//#region Size & Save to file
const get_size = () => {
	return new Blob([result.textContent], { type: 'text/plain' }).size;
};

document.getElementById('save').onclick = () => {
	var bb = new Blob([result.textContent], { type: 'text/plain' });
	var a = document.createElement('a');
	a.download = 'imiona.txt';
	a.href = window.URL.createObjectURL(bb);
	a.click();
	console.log('downloading');
};
//#endregion
