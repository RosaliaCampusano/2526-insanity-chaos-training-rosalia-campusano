const mongoose = require("mongoose");
const express = require("express");
const app = express();
require("dotenv").config();
const cron = require("node-cron");
const { initializeWarriors } = require("./util/initializeWarrior");
const { training } = require("./task/training");
const { saveTraining } = require("./task/saveTraining");
const { checkIfAllWarriorsCantTrain } = require("./task/stop.cron");

const CRON_4_SECONDS_EXPRESSION = "*/4 * * * * *";
const CRON_30_SECONDS_EXPRESSION = "*/30 * * * * *";

(async () => {
  await mongoose.connect(process.env.MONGO_CONNECTION);
  const port = +(process.env.PORT || 3000);
  app.listen(port, () => {});
})();

const warriors = initializeWarriors();

welcomeMessages(warriors);

function welcomeMessages(warriors) {
  console.log("\nWELCOME TO THE TRAINING GROUNDS!!!");
  console.log("----------------------------------");

  for (let i = 0; i < warriors.length; i++) {
    if (warriors[i].weapon !== null) {
      console.log(
        `${warriors[i].name} has selected the weapon "${warriors[i].weapon.name}"`,
      );
    } else {
      console.log(`${warriors[i].name} has no valid weapons to wield!`);
    }
  }
  console.log();
}

const task = cron.schedule(CRON_4_SECONDS_EXPRESSION, training);
const saveTask = cron.schedule(CRON_30_SECONDS_EXPRESSION, saveTraining);

checkIfAllWarriorsCantTrain(task, saveTask);
