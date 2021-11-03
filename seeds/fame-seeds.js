const { Fame } = require('../models');
var people = require('../api');

// function to map people array to expected values of fame array
console.log(people.getPeople);



const seedFame = Fame.bulkCreate(fameData, {
    returning: true
});

module.exports = seedFame;

// File Structure
// controllers
//    api
//       userRoutes.js
//       showdownRoutes.js
//    index.js
// api
//    something where the fetch call lives

// notes
// hit a function that fetches the data from celebritybucks
// json object -> create a record for each object, then map the attributes of each object to expected values of the objects in the