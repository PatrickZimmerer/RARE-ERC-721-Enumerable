# Week 16 Answer these five questions

- Question 1: The OZ upgrade tool for hardhat defends against 6 kinds of mistakes. What are they and why do they matter?
- Answer:
  => It warns you for unsafe code (code in constructor / state variables that are set on deployment for implementation contracts const & immutables are okay)
  => It provides you an initializer modifier to initialize state variables safely and be only callable once
  => It warns you if you try to deploy an upgrade of the implementation code with state variables in the wrong order (adding new state variables is ok)
  => It warns you when you have a selfdestruct function in the implementatin contract
  => It checks if there is an implementation contract deployed with the same bytecode, and deploy one if not
  => It sets up a proxy admin (if needed)

- Question 2: What is a beacon proxy used for?
- Answer: A beacon proxy is a vital component in the Ethereum upgrade, facilitating the transition from the current Ethereum network to the new version. It serves as an interface between the existing Ethereum network and the upgraded beacon chain. The beacon proxy ensures a smooth transfer of assets and information during the transition period, allowing smart contracts and decentralized applications to interact with the upgraded network. By providing compatibility and communication protocols, the beacon proxy enables seamless integration of the existing Ethereum network with the upgraded consensus mechanism.

- Question 3: Why does the openzeppelin upgradeable tool insert something like `uint256[50] private __gap;` inside the contracts? To see it, create an upgradeable smart contract that has a parent contract and look in the parent.
- Answer:

- Question 4: What is the difference between initializing the proxy and initializing the implementation? Do you need to do both? When do they need to be done?
- Answer:

- Question 5: What is the use for the reinitializer?(<https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/utils/Initializable.sol#L119>) Provide a minimal example of proper use in Solidity
- Answer:

## Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```
