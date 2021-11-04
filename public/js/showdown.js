class Fighter {
    constructor(name, power, level) {
        this.name = name;
        this.level = level;
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

function setFighter(event) {
    event.preventDefault();
    const currentName = document.getElementById('attacker-name');
    const currentImg = document.getElementById('attacker')
    const currentLevel = document.getElementById('attacker-level');
    const currentPower = document.getElementById('attacker-power');

    if (event.target.classList.contains('select-fighter')) {
        const selectedFighter = {
            id: event.target.getAttribute('data-id'),
            name: event.target.getAttribute('data-name'),
            power: event.target.getAttribute('data-power'),
            fame_id: event.target.getAttribute('data-fame_id'),
            level: event.target.getAttribute('data-level'),
            xp: event.target.getAttribute('data-xp')
        }
        currentName.innerText = selectedFighter.name;
        currentImg.setAttribute('src', `https://celebritybucks.com/images/celebs/full/${selectedFighter.fame_id}.jpg`);
        currentLevel.innerText = 'Lv: ' + selectedFighter.level;
        currentPower.innerText = 'Pwr: ' + selectedFighter.power;
    }   
}

document.getElementById('showdown-btn').addEventListener('click', function (event) {
    event.preventDefault()
    showdown({ name: "Dolly Parton", power: 200000, level: 6 }, { name: "Justin Bieber", power: 350000, level: 5 }
    ), false
});

document.querySelectorAll('.select-fighter').forEach(button => {
    button.addEventListener('click', setFighter)
})