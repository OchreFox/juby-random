const championSource =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
const moons = ["full moon", "half moon", "quarter moon", "new moon"];
const laneStates = ["frozen", "slow pushing", "even"];
const matchupOptions = ["freeze", "shove", "slow push", "dive"];
const lanes = ["top", "mid", "bot", "jungle"];
const championRangeTypes = ["melee", "ranged"];
const macroDecisions = [
  "take tower",
  "take dragon",
  "take herald",
  "take baron",
  "take inhib",
  "ward",
  "roam",
  "invade",
  "gank",
  "counter gank",
  "counter jungle",
  "take scuttle",
  "tp",
  "split push",
  "group",
  "team fight",
  "poke",
  "engage",
  "disengage",
  "peel",
  "flank",
  "take red",
  "take blue",
  "take krugs",
  "take gromp",
  "take wolves",
  "take raptors",
  "take golems",
  "take enemy red",
  "take enemy blue",
  "push",
  "recall",
];
const currentLaneStates = [
  "im up 1 kill",
  "im up 2 kills",
  "im up 3 kills",
  "im up 1 level",
  "im up 2 levels",
  "im up 3 levels",
  "im up cs",
  "im down cs",
  "i have prio",
  "i have no prio",
  "i have vision",
  "i have flash",
  "i have ignite",
  "i have tp",
  "i have ult",
  "im full hp",
  "im half hp",
  "im low hp",
];
const enemyLaneStates = [
  "enemy is full hp",
  "enemy is half hp",
  "enemy is low hp",
  "enemy is up 1 kill",
  "enemy is up 2 kills",
  "enemy is up 3 kills",
  "enemy is up 1 level",
  "enemy is up 2 levels",
  "enemy is up 3 levels",
  "enemy has no flash",
  "enemy has no ignite",
  "enemy has no tp",
  "enemy has no ult",
  "enemy has no vision",
  "enemy has prio",
  "enemy has no prio",
  "enemy has no vision",
  "enemy is missing",
  "enemy is pushing",
  "enemy is freezing",
  "enemy is slow pushing",
  "enemy is crashing wave",
  "enemy is under tower",
  "enemy is roaming",
  "enemy is recalling",
  "enemy is taking tower",
  "enemy is taking dragon",
  "enemy is taking herald",
  "enemy is taking baron",
  "enemy is taking inhib",
  "enemy is split pushing",
];

const getRandomPatchVersion = () => {
  const currentYear = new Date().getFullYear().toString().slice(-2);
  const season = currentYear - 10;
  // Max patch is current month * 2
  const maxPatch = new Date().getMonth() * 2;
  // Min patch is 1
  const minPatch = 1;
  // Random patch between min and max
  const randomPatch = Math.floor(
    Math.random() * (maxPatch - minPatch) + minPatch
  );
  return `season ${season} patch ${season}.${randomPatch}`;
};

const getChampions = async () => {
  const response = await fetch(championSource);
  const data = await response.json();
  // Return only the champion names and remove the "None" champion
  return data
    .filter((champion) => champion.name !== "None")
    .map((champion) => champion.name);
};

async function randomMatchup() {
  const champions = await getChampions();
  const juby = `Hey Mcbaze, if I'm playing ${
    champions[Math.floor(Math.random() * champions.length)]
  } against ${
    champions[Math.floor(Math.random() * champions.length)]
  } and the lane is ${
    laneStates[Math.floor(Math.random() * laneStates.length)]
  } and it's a ${
    moons[Math.floor(Math.random() * moons.length)]
  }, should I be looking to ${
    matchupOptions[Math.floor(Math.random() * matchupOptions.length)]
  }?`;
  return juby;
}

async function randomMacroDecision() {
  const randomLane = lanes[Math.floor(Math.random() * lanes.length)];
  const randomSide = ["blue", "red"][Math.floor(Math.random() * 2)];
  const randomChampionRangeType1 =
    championRangeTypes[Math.floor(Math.random() * championRangeTypes.length)];
  const randomChampionRangeType2 =
    championRangeTypes[Math.floor(Math.random() * championRangeTypes.length)];
  const currentLaneState =
    currentLaneStates[Math.floor(Math.random() * currentLaneStates.length)];
  const enemyLaneState =
    enemyLaneStates[Math.floor(Math.random() * enemyLaneStates.length)];
  const macroDecision1 =
    macroDecisions[Math.floor(Math.random() * macroDecisions.length)];
  const macroDecision2 =
    macroDecisions[Math.floor(Math.random() * macroDecisions.length)];
  const randomPatchVersion = getRandomPatchVersion();

  const juby = `Hey Mcbaze, if ${currentLaneState} as a ${randomChampionRangeType1} ${randomLane} into ${randomChampionRangeType2} in ${randomSide} side, and the ${enemyLaneState}, should I ${macroDecision1} or ${macroDecision2}? Assuming we're in ${randomPatchVersion}`;
  return juby;
}

async function juby() {
  const juby1 = await randomMatchup();
  const juby2 = await randomMacroDecision();
  const diceRoll = Math.floor(Math.random() * 2);
  switch (diceRoll) {
    case 0:
    default:
      return juby1;
    case 1:
      return juby2;
  }
}

module.exports = juby;
