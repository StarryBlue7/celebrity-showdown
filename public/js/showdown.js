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
        this.level = level;
        // this.damage = Math.ceil(.5 * Math.sqrt(level) * Math.log(power) * (Math.random() * (1.15 - .85 + 1) + .85));
        this.power = power;
        this.hitPoints = level * 20 + 75;
    }
    calcDamage() {
        const damage = Math.ceil(.75 * Math.sqrt(this.level) * Math.log(this.power) * (Math.random() * (1.15 - .85 + 1) + .85));
        return damage
    }
        
    
    // Method which prints all of the stats for a character
    printStats() {
        console.log(`Stats for ${this.name} are as following:`);
        console.log(`${this.name} has ${this.hitPoints} hit points remaining!`);
        console.log('------------');
    }

    currentHp() {
        return this.hitPoints;
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
        const damage = this.calcDamage() 
        console.log(`${this.name} hit ${opponent.name} for ${damage}`);
        opponent.hitPoints -= damage;
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


    const attackerHpBar = document.getElementById('attackerBar')
    const defenderHpBar = document.getElementById('defenderBar')

    const attackerMaxHp = attacker.currentHp()
    const defenderMaxHp = defender.currentHp()

    const turnInterval = setInterval(() => {
        // If either character is not alive, end the game
        defenderAvatar.classList.remove("animate__wobble")
        attackerAvatar.classList.remove("animate__wobble")
        if (!attacker.isAlive() || !defender.isAlive()) {
            clearInterval(turnInterval);
            console.log('Game over!');
        } else if (attackerTurn) {
            attacker.attack(defender);
            defenderAvatar.classList.toggle("animate__wobble");
            if (defender.currentHp() < 0) {
                defender.hitPoints = 0;
            }
            const defenderLife = Math.floor(defender.currentHp() / defenderMaxHp * 100 )
            defenderHpBar.style.width = defenderLife + "%";
            console.log(defenderLife)
        } else {
            defender.attack(attacker);
            if (attacker.currentHp() < 0) {
                attacker.hitPoints = 0;
            }
            attackerAvatar.classList.toggle("animate__wobble")
            const attackerLife = Math.floor(attacker.currentHp() / attackerMaxHp * 100)
            attackerHpBar.style.width = attackerLife + "%";
            console.log(attackerLife)
        }

        // Switch turns
        attackerTurn = !attackerTurn;
    }, 1500);
}


document.getElementById('showdown-btn').addEventListener('click', function (event) {
    event.preventDefault()
    showdown({ name: "Dolly Parton", power: 200000, level: 6 }, { name: "Justin Bieber", power: 350000, level: 5 })
        , false
});

