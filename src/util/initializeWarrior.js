const Warrior = require("../model/warrior.model");
const warriors = require("../db/warriors.json");

const weapons = require("../db/weapons.json");

const newWarriors = [];

const initializeWarriors = () => {
  for (let i = 0; i < warriors.length; i++) {
    const warrior = {
      name: warriors[i].name,
      strength: warriors[i].strength,
      gold: warriors[i].gold,
      weapon: null,
    };

    newWarriors.push(warrior);
  }

  //TODO: Asegurar que ningun arma se repita

  newWarriors.forEach((warrior) => {
    const randomWeapon = assignRandomWeapon();
    if (warrior.strength >= randomWeapon.minStrength) {
      warrior.weapon = randomWeapon;
      removeWeapon(randomWeapon);
    }
  });

  return newWarriors;
};

function assignRandomWeapon() {
  const randomWeapon = weapons[Math.floor(Math.random() * weapons.length)];
  return randomWeapon;
}

function removeWeapon(deleteWeapon) {
  for (let i = 0; i < weapons.length; i++) {
    if (weapons[i].name === deleteWeapon.name) {
      weapons.splice(0, i);
    }
  }
}

module.exports = { initializeWarriors, newWarriors };
