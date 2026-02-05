const { newWarriors } = require("../util/initializeWarrior");

function checkIfAllWarriorsCantTrain(task, saveTask) {
  const invalidWarriors = [];

  for (let i = 0; i < newWarriors.length; i++) {
    if (!invalidWarriors.includes(newWarriors)) {
      if (newWarriors[i].weapon === null) {
        invalidWarriors.push(newWarriors[i]);
      } else if (newWarriors[i].gold <= 0) {
        invalidWarriors.push(newWarriors[i]);
      } else if (newWarriors[i].weapon.durability <= 0) {
        invalidWarriors.push(newWarriors[i]);
      }
    }
  }

  if (invalidWarriors.length === newWarriors.length) {
    console.log("\nAll warriors have finished training. Stop all crons");
    task.stop();
    saveTask.stop();
  }
}

module.exports = { checkIfAllWarriorsCantTrain };
