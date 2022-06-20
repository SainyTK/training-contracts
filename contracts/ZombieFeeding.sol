pragma solidity 0.8.4;

import "./ZombieFactory.sol";
import "./interfaces/KittyInterface.sol";

contract ZombieFeeding is ZombieFactory {

  address ckAddress;
  KittyInterface kittyContract;

  constructor(address _ckAddress) {
    ckAddress = _ckAddress;
    kittyContract = KittyInterface(ckAddress);
  }

  // Modify function definition here:
  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    // Add an if statement here
    _createZombie("NoName", newDna);
  }

  function feedOnKitty(uint _zombieId, uint _kittyId) public {
    uint kittyDna;
    (,,,,,,,,,kittyDna) = kittyContract.getKitty(_kittyId);
    // And modify function call here:
    feedAndMultiply(_zombieId, kittyDna);
  }

}
