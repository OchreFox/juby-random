const championSource =
  "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json";
const moons = ["full moon", "half moon", "quarter moon", "new moon"];
const lanes = ["frozen", "pushing", "even"];
const options = ["freeze", "shove", "slow push", "dive"];

const getChampions = async () => {
  const response = await fetch(championSource);
  const data = await response.json();
  // Return only the champion names and remove the "None" champion
  return data
    .filter((champion) => champion.name !== "None")
    .map((champion) => champion.name);
};

async function main() {
  const champions = await getChampions();
  const juby = `Hey Mcbaze, if I'm playing ${
    champions[Math.floor(Math.random() * champions.length)]
  } against ${
    champions[Math.floor(Math.random() * champions.length)]
  } and the lane is ${
    lanes[Math.floor(Math.random() * lanes.length)]
  } and it's a ${
    moons[Math.floor(Math.random() * moons.length)]
  }, should I be looking to ${
    options[Math.floor(Math.random() * options.length)]
  }?`;
  console.log(juby);
}

main();
