const sequelize = require('../config/connection');
const { User, Fame, Showdown, Celebrity } = require('../models');

const userData = require('./userData.json');
const { createPeople } = require('./fame-seeds');
const showdownData = require('./showdownData.json');
const celebrityData = require('./celebrityData.json');

const seedDatabase = async () => {

    await sequelize.sync({ force: true });
    
    // Seed user data from json, hashing password values before creating table records
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Seed fame data from celebritybucks api
    const fame = await createPeople();
    //+ if fame.length is 0, stop

    // Seed celebrity data from json, before creating table records
    var celebrities = [];
    for (const celebrity of celebrityData) {
        const newCeleb = 
        await Celebrity.create({
            ...celebrity,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            fame_id: fame[Math.floor(Math.random() * fame.length)].id
        });
        celebrities.push(newCeleb);
    } 

    for (const showdown of showdownData) {
        const randDefender = Math.floor(Math.random() * fame.length);
        console.log(randDefender, fame[randDefender].id, fame[randDefender].name);
        await Showdown.create({
            ...showdown,
            attacker_id: celebrities[Math.floor(Math.random() * celebrities.length)].id,
            defender_id: fame[randDefender].id,
            defender_name: fame[randDefender].name
            });
    }

    process.exit(0);
};

seedDatabase();