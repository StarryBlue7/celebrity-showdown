const { Fame } = require('../models');
var { getPeople } = require('./fame-api');

// Map people array to expected values of fame array
async function createPeople() {
    // Get the array of people from the CelebrityBucks api call
    const people = await getPeople();
    // Map the contents of the people array objects to the expected values of Fame objects
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
    
    // Cycle through the celebrities array and create a Fame record for each object
    var fameData = celebrities.map(async (celebrity) => {
        return await Fame.create(celebrity)
    });
    // Return the fameData array only after information has been added to it (promise complete)
    fameData = await Promise.all(fameData);
    console.log("Fame data creation", fameData);
    return fameData;
}

async function updatePeople() {
    // Get the array of people from the CelebrityBucks api call
    const people = await getPeople();
    // Map the contents of the people array objects to the expected values of Fame objects
    const celebrities = people.map(celebrity => {
        const newCeleb = {
            id: parseInt(celebrity.celebId),
            name: celebrity.name,
            power: celebrity.price,
        }
        return newCeleb;
    });
    // Updating fame table function
    let fameData = await Fame.bulkCreate(celebrities, {
        updateOnDuplicate: ["id"],
        individualHooks: true,
        returning: true,
    })

    // Return the fameData array only after information has been added to it (promise complete)
    fameData = await Promise.all(fameData);
    console.log("Fame data creation", fameData);
}

    // Export for use
module.exports = { createPeople, updatePeople };