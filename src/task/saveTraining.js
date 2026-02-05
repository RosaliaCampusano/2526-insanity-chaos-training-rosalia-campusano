const { trainingDay } = require("../util/training.day");
const { newWarriors } = require("../util/initializeWarrior");
const Training = require("../model/trainings.model");

async function saveTraining() {
  const warriors = [];

  for (let i = 0; i < newWarriors.length; i++) {
    let stateType = "";
    let weaponName = "";
    let durability = -1;

    if (
      newWarriors[i].weapon === null ||
      newWarriors[i].gold <= 0 ||
      newWarriors[i].weapon.durability <= 0
    ) {
      stateType = "finished";
    } else {
      stateType = "training";
    }

    if (newWarriors[i].weapon !== null) {
      weaponName = newWarriors[i].weapon.name;
      durability = newWarriors[i].weapon.durability;
    }

    const warrior = {
      name: newWarriors[i].name,
      weaponName: weaponName,
      durability: durability,
      gold: newWarriors[i].gold,
      state: stateType,
    };

    warriors.push(warrior);
  }

  const training = {
    epicDate: `${trainingDay.month} ${trainingDay.day}, ${trainingDay.hour}:00 hours`,
    warriors: warriors,
  };

  await new Training(training).save();

  console.log(
    `Training state saved in BD at ${trainingDay.month} ${trainingDay.day}, ${trainingDay.hour}:00 hours`,
  );
}

module.exports = { saveTraining };
