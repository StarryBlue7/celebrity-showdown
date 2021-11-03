const { Fame } = require('../models');
var { getPeople } = require('../api');
// const { placeholder } = require('sequelize/types/lib/operators');

// function to map people array to expected values of fame array
// Get the people array from the axios api request
async function createPeople() {
    const people = await getPeople();
    const celebrities = people.map(celebrity => {
        const newCeleb = {
            id: parseInt(celebrity.celebId),
            name: celebrity.name,
            power: celebrity.price,
        }
        return newCeleb;
    });
    console.log("celebrities below");
    console.log(celebrities);
    // return celebrities;
    // const jsonString = JSON.stringify(celebrities);
    // Fame.bulkCreate(jsonString, {
    //     returning: true
    // });
    var fameData = [];
    celebrities.forEach(async (celebrity) => {
        const person = await Fame.create(celebrity)
        fameData.push(person);
    });
    return fameData;
}

module.exports = { createPeople };