// import fetch from "node-fetch";
// const getCelebrityData = async () => {

//     const response = await fetch ('/api/celebrity', {
//         method: 'GET', 
//     })
//     const celebrities = response.json()
//     console.log(celebrities)
// }

// getCelebrityData()

class Fighter {
    constructor(name, power, level) {
      // if (!name) {
      //   throw new Error("You are missing the name.");
      // }
      // if (!strength) {
      //   throw new Error("You are missing the strength.");
      // }
      // if (!hitPoints) {
      //   throw new Error("You are missing the hitPoints.");
      // }
      this.name = name;
      this.damage = Math.ceil(.5 * level * Math.log(power) * (Math.random() * (1.15 - .85 + 1) + .85));
      this.hitPoints = level * 20;
    }
  
    // Method which prints all of the stats for a character
    printStats() {
      console.log(`Stats for ${this.name} are as following:`);
      console.log(`Each attack will do ${this.damage} damage.`);
      console.log(`${this.name} has ${this.hitPoints} hit points remaining!`);
      console.log('------------');
    }
  
    // Method which determines whether or not a character's "hitpoints" are less then zero
    // Returns true or false depending upon the outcome
    isAlive() {
      if (this.hitPoints <= 0) {
        console.log(`${this.name} has been defeated!`);
        return false;
      }
      return true;
    }
  
    // Method which takes in a second object and decreases their "hitPoints" by this character's damage
    attack(opponent) {
      console.log(`${this.name} hit ${opponent.name} for ${this.damage}`);
      opponent.hitPoints -= this.damage;
    }
  }
  
function showdown(attackerCeleb, defenderCeleb) {
  // Creates two unique characters using the "character" constructor
  const attacker = new Fighter(attackerCeleb.name, attackerCeleb.power, attackerCeleb.level);
  const defender = new Fighter(defenderCeleb.name, defenderCeleb.power, defenderCeleb.level);
  
  // This keeps track of whose turn it is
  let attackerTurn = true;
  
  attacker.printStats();
  defender.printStats();

  const attackerAvatar = document.getElementById('attacker');
  const defenderAvatar = document.getElementById('defender');
  
  const turnInterval = setInterval(() => {
    // If either character is not alive, end the game
    defenderAvatar.classList.remove("animate__wobble")
    attackerAvatar.classList.remove("animate__wobble")
    if (!attacker.isAlive() || !defender.isAlive()) {
      clearInterval(turnInterval);
      console.log('Game over!');
    } else if (attackerTurn) {
      attacker.attack(defender);
      defenderAvatar.classList.toggle("animate__wobble")
    } else {
      defender.attack(attacker);
      attackerAvatar.classList.toggle("animate__wobble")
    }
  
    // Switch turns
    attackerTurn = !attackerTurn;
  }, 3000);
}

document.getElementById('showdown-btn').addEventListener('click', showdown({name: "Dolly Parton", power: 20000, level: 3}, {name: "Justin Bieber", power: 35000, level: 2}));