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
	let string = '';
	for (var i = 0; i < amount; i++) {
		string += randomInList(list) + ' ';
	}

	return string.slice(0, -1);
}

// Surname generator, female filter
function getRandomFemaleSurname(maxAmount, SURNAMES) {
	let surname_string = getStringFromListItems(SURNAMES, maxAmount);

	let surnames = surname_string.split(' ');
	let new_surnames = '';
	surnames.forEach((surname) => {
		let new_surname = surname;
		if (surname.endsWith('i')) new_surname = surname.slice(0, -1) + 'a';

		new_surnames += new_surname + ' ';
	});

	return new_surnames.slice(0, -1);
}

// Generate random name
const generate = (
	gender,
	maxNames,
	maxSurnames,
	amount,
	MALE_NAMES,
	FEMALE_NAMES,
	SURNAMES
) => {
	let results = '';
	for (var i = 0; i < amount; i++) {
		let my_gender = gender;
		console.log(
			`generating with gender ${gender}, max names ${maxNames} and max surnames ${maxSurnames}`
		);

		let name;
		if (gender == 'both') my_gender = randomInList(['male', 'female']);

		if (my_gender == 'male')
			name = getStringFromListItems(MALE_NAMES, maxNames);
		if (my_gender == 'female')
			name = getStringFromListItems(FEMALE_NAMES, maxNames);
		let surname;

		if (my_gender == 'male')
			surname = getStringFromListItems(SURNAMES, maxNames);
		if (my_gender == 'female')
			surname = getRandomFemaleSurname(maxNames, SURNAMES);

		const final = `${name} ${surname}||`;
		if (final != '||') results += final;
	}

	console.log('worker finished');
	postMessage(results.slice(0, -2));
};

self.onmessage = (msg) => {
	const data = msg.data.split('||');
	console.log('worker got data');

	let gender = data[0];
	let maxNames = data[1];
	let maxSurnames = data[2];
	let amount = data[3];
	let SURNAMES = data[4].split(',');
	let FEMALE_NAMES = data[5].split(',');
	let MALE_NAMES = data[6].split(',');
	generate(
		gender,
		maxNames,
		maxSurnames,
		amount,
		MALE_NAMES,
		FEMALE_NAMES,
		SURNAMES
	);
};
