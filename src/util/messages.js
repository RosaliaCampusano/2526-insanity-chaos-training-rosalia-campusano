function showAttributes(warrior) {
  console.log(`Warrior: ${warrior.name}`);
  console.log(`Strength: ${warrior.strength}`);
  console.log(`Gold: ${warrior.gold}`);
  console.log(`Weapon: ${warrior.weapon.name}`);
  console.log(`Type: ${warrior.weapon.type}`);
  console.log(`Quality: ${warrior.weapon.quality}`);
  console.log(`Durability: ${warrior.weapon.durability}`);
  console.log();
}

function trainingMessageResult(warrior, beforeQuality) {
  console.log("\nAfter training:");
  console.log(`Quality: ${beforeQuality} -> ${warrior.weapon.quality}`);
  console.log(`Durability: ${warrior.weapon.durability}`);
  console.log(`Gold remaining: ${warrior.gold}`);
  console.log();
}

module.exports = {
  showAttributes,
  trainingMessageResult,
};
