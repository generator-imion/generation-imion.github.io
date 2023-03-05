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

const getFilteredSurname = (max, gender, SURNAMES) => {
	let surname = '';

	for (var i = 0; i < getRandomInt(1, max); i++) {
		let current = randomInList(SURNAMES);

		if (current.endsWith('scy')) {
			if (gender == 'female') current = current.slice(0, -3) + 'ka';
			if (gender == 'male') current = current.slice(0, -3) + 'ki';
		} else if (current.endsWith('i') && gender == 'female') {
			current = current.slice(0, -1) + 'a';
		} else if (current.endsWith('wie')) {
			current = current.slice(0, -3);
		}

		surname += `${current} `;
	}

	return surname;
};

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

		let surname = getFilteredSurname(maxSurnames, my_gender, SURNAMES);
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
