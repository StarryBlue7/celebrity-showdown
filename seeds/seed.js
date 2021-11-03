const sequelize = require('../config/connection');
const { User, Showdown, Celebrity } = require('../models');

const userData = require('./userData.json');
const { createPeople } = require('../controllers/fameData');
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

    // Seed celebrity data from json + values from users array as needed
    var celebrities = [];
    for (const celebrity of celebrityData) {
        const randFame = Math.floor(Math.random() * fame.length);
        const newCeleb = 
        await Celebrity.create({
            ...celebrity,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            fame_id: fame[randFame].id,
            name: fame[randFame].name
        });
        celebrities.push(newCeleb);
    } 

    // Seed showdown data from json + values from fame and celebrities arrays as needed
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