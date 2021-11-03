// Import axios package required for axios request
const axios = require('axios');

async function getPeople() {
    try {
        const options = {
            method: 'GET',
            url: 'https://celebrity-bucks.p.rapidapi.com/export/JSON',
            headers: {
                'x-rapidapi-host': 'celebrity-bucks.p.rapidapi.com',
                'x-rapidapi-key': 'd6fd727a7bmshf5a6d2cfa1dbd87p118e18jsn176e269908ef'
            }
        };
        //response is a json object with 2 objects with celebrities objects
        const people = await axios.request(options).then(function (response) {
            // convert the CelebrityValues object into an array of celebrity objects
            const celebData = response.data.CelebrityValues;
            // convert the BonusBucks object into an array of celebrity objects
            const bonusData = response.data.BonusBucks;
            // concatenate the 2 celebrity arrays
            const data = celebData.concat(bonusData);
            return data;
        })
        // console.log(people);
        // return the array of celebrities
        return people;
    }
    catch (error) {
        console.error(error);
    }
}

// Initialize function
getPeople();

module.exports = { getPeople };