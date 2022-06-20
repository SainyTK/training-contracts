import { ethers } from "hardhat";

async function main() {
  const CryptoKitty = await ethers.getContractFactory("CryptoKitty");
  const cryptoKitty = await CryptoKitty.deploy();

  const ZombieFeeding = await ethers.getContractFactory("ZombieFeeding");
  const zombieFeeding = await ZombieFeeding.deploy(cryptoKitty.address);

  await cryptoKitty.deployed();
  await zombieFeeding.deployed();

  console.log("Cryptokitty deployed to:", cryptoKitty.address);
  console.log("Zombie feeding deployed to:", zombieFeeding.address);

  const receipt1 = await zombieFeeding
    .createRandomZombie("TK")
    .then((tx) => tx.wait());
  const newZombieEvent = receipt1.events?.find((e) => e.event === "NewZombie");
  let id = 0;
  if (newZombieEvent && newZombieEvent.args) {
    id = Number(newZombieEvent.args.zombieId.toString());
    console.log("First zombie: ", newZombieEvent.args);
  }

  const dna = Math.floor(Math.random());
  const receipt2 = await zombieFeeding
    .feedAndMultiply(id, dna)
    .then((tx) => tx.wait());

  const newZombieEvent2 = receipt2.events?.find((e) => e.event === "NewZombie");
  if (newZombieEvent2 && newZombieEvent2.args) {
    id = Number(newZombieEvent2.args.zombieId.toString());
    console.log("Second zombie: ", newZombieEvent2.args);
  }

  const kittyId = Math.floor(Math.random());
  const receipt3 = await zombieFeeding
    .feedOnKitty(id, kittyId)
    .then((tx) => tx.wait());

  const newZombieEvent3 = receipt3.events?.find((e) => e.event === "NewZombie");
  if (newZombieEvent3 && newZombieEvent3.args) {
    id = Number(newZombieEvent3.args.zombieId.toString());
    console.log("Third zombie: ", newZombieEvent3.args);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
