const { newWarriors } = require("../util/initializeWarrior");
const {
  trainingDay,
  checkIfTrainingDayHasChangeAndUpdateIt,
} = require("../util/training.day");
const { showAttributes, trainingMessageResult } = require("../util/messages");

function training() {
  console.log(
    `=== ROUND ${trainingDay.round} - ${trainingDay.month} ${trainingDay.day}, ${trainingDay.hour}:00 hours ===`,
  );

  let warrior = newWarriors[Math.floor(Math.random() * newWarriors.length)];

  if (warrior.weapon === null) {
    console.log(`${warrior.name} has no weapon assigned and cannot train`);
    trainingDay.round += 1;
    return;
  } else if (warrior.weapon.durability <= 0) {
    console.log(
      `${warrior.name} has no durability in the weapon and cannot train`,
    );
    trainingDay.round += 1;
    return;
  } else if (warrior.gold <= 0) {
    console.log(`${warrior.name} cannot train because they have no gold left`);
    trainingDay.round += 1;
    return;
  }

  const trainingCost = Math.ceil(warrior.weapon.cost / 10);

  warrior.gold -= trainingCost;

  showAttributes(warrior);

  console.log(`Cost of training this round: ${trainingCost}`);

  trainingDay.hour += 2;

  const beforeQuality = warrior.weapon.quality;

  calculateQuality(warrior);

  if (warrior.weapon.quality < 0) {
    warrior.weapon.durability += warrior.weapon.quality;
  }

  trainingMessageResult(warrior, beforeQuality);

  trainingDay.round += 1;

  checkIfTrainingDayHasChangeAndUpdateIt();
}

function rollDice() {
  let roll = Math.floor(Math.random() * 5);

  roll -= 2;

  return roll;
}

function calculateQuality(warrior) {
  const result = rollDice();
  let currentDurability = 0;

  warrior.weapon.quality += result;

  if (result === -1) {
    currentDurability = Math.floor(
      (warrior.weapon.durability * 0.2) / warrior.weapon.durability,
    );

    if (currentDurability > 0) {
      warrior.weapon.durability -= currentDurability;
    }
  } else if (result === 3) {
    warrior.weapon.durability += result; //ajustar
  } else {
    currentDurability = Math.floor(
      (warrior.weapon.durability * 0.1) / warrior.weapon.durability,
    );

    warrior.weapon.durability -= currentDurability;
  }
}

module.exports = { training };
