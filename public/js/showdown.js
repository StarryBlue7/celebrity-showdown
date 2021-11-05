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
        return this.hitPoints >= 0 ? this.hitPoints : 0;
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
        return damage;
    }
}

// Showdown fight
function showdown() {
    const showdownBtn = document.getElementById('showdown-btn');

    // Create fighters from celeb data
    const attacker = new Fighter(
        showdownBtn.getAttribute('data-atk-name'), 
        parseInt(showdownBtn.getAttribute('data-atk-pwr')), 
        parseInt(showdownBtn.getAttribute('data-atk-lv'))
    );
    attacker['id'] = parseInt(showdownBtn.getAttribute('data-atk-id'));
    attacker['XP'] = parseInt(showdownBtn.getAttribute('data-atk-xp'));

    const defender = new Fighter(
        showdownBtn.getAttribute('data-def-name'), 
        parseInt(showdownBtn.getAttribute('data-def-pwr')), 
        parseInt(showdownBtn.getAttribute('data-def-lv'))
    );
    defender['id'] = parseInt(showdownBtn.getAttribute('data-def-id'));
    
    // Hide start button, show swords
    const swords = document.getElementById('swords');
    showdownBtn.style.display = 'none';
    swords.style.display = 'block';

    let fightSound = [
        new Audio("audio/sword1.wav"),
        new Audio("audio/sword2.wav"),
        new Audio("audio/sword3.wav")
    ];
    let startSound = new Audio("audio/start.wav");
    let winSound = new Audio("audio/win.wav");
    let loseSound = new Audio("audio/lose.wav");
    
    attacker.printStats();
    defender.printStats();

    const attackerAvatar = document.getElementById('attacker');
    const defenderAvatar = document.getElementById('defender');
    const attackerHpBar = document.getElementById('attackerBar')
    const defenderHpBar = document.getElementById('defenderBar')

    const attackerMaxHp = attacker.currentHp()
    const defenderMaxHp = defender.currentHp()
    
    // Turn tracker
    let attackerTurn = true;
    startSound.play();

    const turnInterval = setInterval(() => {
        // If either character is not alive, end the game
        defenderAvatar.classList.remove("animate__wobble", "animate__heartBeat")
        attackerAvatar.classList.remove("animate__wobble", "animate__heartBeat")
        if (!attacker.isAlive()) {
            clearInterval(turnInterval);
            loseSound.play();
            showdownResults(attacker, defender, false);
            console.log(`${defender.name} wins!`);
        } else if (!defender.isAlive()) {
            clearInterval(turnInterval);
            winSound.play();
            showdownResults(attacker, defender, true);
            console.log(`${attacker.name} wins!`);
        } else if (attackerTurn) {
            const attack = attacker.attack(defender);
            defenderAvatar.classList.toggle("animate__heartBeat");
            attackerAvatar.classList.toggle("animate__wobble")
            const defenderLife = Math.floor(defender.currentHp() / defenderMaxHp * 100 )
            defenderHpBar.style.width = defenderLife + "%";
            fightSound[attack % 3].play();
            console.log(defenderLife)
        } else {
            const defend = defender.attack(attacker);
            defenderAvatar.classList.toggle("animate__wobble");
            attackerAvatar.classList.toggle("animate__heartBeat")
            const attackerLife = Math.floor(attacker.currentHp() / attackerMaxHp * 100)
            attackerHpBar.style.width = attackerLife + "%";
            fightSound[defend % 3].play();
            console.log(attackerLife)
        }
        // Switch turns
        attackerTurn = !attackerTurn;
    }, 1500);
}

// Change fighter based on roster cards
function setFighter(event) {
    event.preventDefault();
    const currentName = document.getElementById('attacker-name');
    const currentImg = document.getElementById('attacker')
    const currentLevel = document.getElementById('attacker-level');
    const currentPower = document.getElementById('attacker-power');
    const showdownBtn = document.getElementById('showdown-btn')

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

        showdownBtn.setAttribute('data-atk-name', selectedFighter.name);
        showdownBtn.setAttribute('data-atk-id', selectedFighter.id);
        showdownBtn.setAttribute('data-atk-pwr', selectedFighter.power);
        showdownBtn.setAttribute('data-atk-lv', selectedFighter.level);
    }   
}

// Submit showdown results to db, update celebrity stats
async function showdownResults(attacker, defender, isWin) {
    const results = {
        attacker_id: attacker.id,
        defender_name: defender.name,
        defender_id: defender.id,
        attacker_win: isWin
    }
    console.log(results)
    const newShowdown = await fetch('/api/showdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(results)
    });

    if (newShowdown.ok) {
        console.log("Showdown results added successfully")
    } else {
        console.log("Couldn't add showdown results");
    }
    
    // Update celebrity stats
    const newStats = calcNewStats(attacker, defender, isWin);
    console.log(newStats)
    
    const celebUpdate = await fetch(('/api/celebrities/'+ attacker.id), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            level: newStats.newLevel,
            XP: newStats.newXP
        })
    });

    if (celebUpdate.ok) {
        console.log("Celebrity updated successfully")
    } else {
        console.log("Couldn't update celebrity");
    }
}

// Calculate new level and XP after showdown
function calcNewStats(attacker, defender, isWin) {
    let newLevel = attacker.level;
    let newXP = attacker.XP;
    console.log(newXP);
    if (isWin) {
        newXP += Math.ceil(30 * (defender.level / attacker.level));
    } else {
        newXP += 5;
    }
    console.log(newXP);
    // Level up at 50XP
    while (newXP >= 50) {
        newXP -= 50;
        newLevel++;
    }
    console.log(newXP);
    // Level cap at Lv. 10
    if (newLevel > 10) {
        newLevel = 10;
        newXP = 0;
    }
    console.log(newXP);
    return {newLevel, newXP}
}

document.getElementById('showdown-btn').addEventListener('click', function (event) {
    event.preventDefault();
    showdown(), false
});

document.querySelectorAll('.select-fighter').forEach(button => {
    button.addEventListener('click', setFighter)
})