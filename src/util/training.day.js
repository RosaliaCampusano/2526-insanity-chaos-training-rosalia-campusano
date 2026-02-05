const epicMonths = require("../db/epicMonths.json");

let trainingDay = {
  month: epicMonths[0],
  day: 30,
  hour: 13,
  round: 1,
};

function checkIfTrainingDayHasChangeAndUpdateIt() {
  if (trainingDay.hour < 24) {
    return;
  }
  trainingDay.hour = trainingDay.hour -= 24;
  trainingDay.day = trainingDay.day + 1;

  if (trainingDay.day > 30) {
    trainingDay.month = epicMonths.find((month) => month !== trainingDay.month);
    trainingDay.day = 1;
  }
}

module.exports = { trainingDay, checkIfTrainingDayHasChangeAndUpdateIt };
