const sequelize = require('../config/connection');
const { User, Fame, Showdown, Celebrity } = require('../models');

const userData = require('./userData.json');
const showdownData = require('./showdownData.json');
const celebrityData = require('./celebrityData.json');
// const celebrityData = require('./celebrityData.json');
// const seedCelebrities = require('./celebrity-seeds');
// const seedFame = require('./fame-seeds');


const seedDatabase = async () => {

    await sequelize.sync({ force: true });
    
    // Seed user data from json, hashing password values before creating table records
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // await seedFame();


    // Seed celebrity data from json, before creating table records
    for (const celebrity of celebrityData) {
        await Celebrity.create({
            ...celebrity,
            user_id: user[Math.floor(Math.random() * user.length)].id,
            fame_id: fame[Math.floor(Math.random() * fame.length)].id
        });
    }

    for (const showdown of showdownData) {
        const randDefender = Math.floor(Math.random() * fame.length)
        await Showdown.create({
            ...showdown,
            attacker_id: celebrity[Math.floor(Math.random() * celebrity.length)].id,
            defender_id: fame[randDefender].id,
            defender_name: fame[randDefender].name
            });
    }

    process.exit(0);
};

seedDatabase();