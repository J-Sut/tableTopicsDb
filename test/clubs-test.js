function seedTopicData(){
	console.info('seeding topic data');
	let seedData = [];

	for (let i=0; i<10; i++){
		seedData.push(generateUserData());
	}

	let _users;
	return User.insertMany(seedData)
		.then(users => {
			_users = users;
			seedData = [];
			for (let i=0; i<10; i++){
				seedData.push(generateTopicData(users[i]));
			}
			return Topic.insertMany(seedData);
		})
		.then(clubs => {
			clubs.forEach(club, index => Club
					.findByIdAndUpdate(club._id, {$addToSet:{members: _users[index]}}))
		})
		.catch(err => console.log(err));
}; 