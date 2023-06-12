# Week 16 Tasks

## Build a new version of the NFT that adds god mode to the NFT (ability to transfer NFTs between accounts forcefully). Etherscan should show the previous version and the new version

- First version of the Enumerable contract: [V1 Implementation](https://goerli.etherscan.io/address/0xe5b78011b950db72f7f7cd8f8a2a7325b7755d03#code)

- Second version with godModeTransfer for owner: [V2 Implementation](https://goerli.etherscan.io/address/0x4911194bfa9c4aca846f2368392eb586e712794b#code)

## Answer these five questions

### Question 1: The OZ upgrade tool for hardhat defends against 6 kinds of mistakes. What are they and why do they matter?

- Answer:

  - It warns you for unsafe code (code in constructor / state variables that are set on deployment for implementation contracts const & immutables are okay)
  - It provides you an initializer modifier to initialize state variables safely and be only callable once
  - It warns you if you try to deploy an upgrade of the implementation code with state variables in the wrong order (adding new state variables is ok)
  - It warns you when you have a selfdestruct function in the implementatin contract
  - It checks if there is an implementation contract deployed with the same bytecode, and deploy one if not
  - It sets up a proxy admin (if needed)

### Question 2: What is a beacon proxy used for?

- Answer: A beacon proxy is a vital component when upgrading implementation contracts, it gets deployed by the factory on construction. When you pass in the address to the new logic for the implementation contract into the beacons `upgrade()` function you can update multiple implementation contracts at once, since they are all pointing to that beacon and if the beacon gets updated all other implementation contracts will be updated.

### Question 3: Why does the openzeppelin upgradeable tool insert something like `uint256[50] private __gap;` inside the contracts?

- Answer:
  It is used to avoid storage collisions between different versions of a contract, it "reserves" some storage slots for use in future upgrades.

  When you make an upgrade to the contract and add a new state variable, you want to ensure that this new state variable doesn't overwrite the storage of any existing state variables.

  `uint256[50] private __gap;` will create a placeholder for 50 more variables in that might be added in the future

### Question 4: What is the difference between initializing the proxy and initializing the implementation? Do you need to do both? When do they need to be done?

- Answer:
  The proxy contract is responsible for forwarding transactions to the implementation contract. When you deploy the proxy contract, you provide the address of the implementation contract as an argument. This "initializes" the proxy by telling it where to forward transactions.

  The implementation contract contains the actual business logic of your upgradeable contract system. However, because this contract is never actually deployed (it's just used by the proxy), you can't use a constructor to initialize it. Instead, you need to use a separate initialize() function to set any initial state or perform any setup actions.

  Yes you need both, the proxy needs to be initialized so it knows where to delegate calls. The implementation contract needs to be initialized so that its state is set up correctly. Both need to be done on deployment.

### Question 5: What is the use for the [reinitializer](https://github.com/OpenZeppelin/openzeppelin-contracts-upgradeable/blob/master/contracts/proxy/utils/Initializable.sol#L119)? Provide a minimal example of proper use in Solidity

- Answer:
  A reinitializer may be used after the original initialization step. This is essential to configure modules that are added through upgrades and that require initialization. It can only be called when the version also increases, the version can also be increased by more than just one version, setting the version to 255 will prevent any future updates since it is a `uint8` in the OZ implementation.

  For example if you have an implementation contract V1, with storage variabels `uint256 firstValue` which needs to be set on deployment you will use the `initialize()` function to do that, now when you want to upgrade that contract and you also want another state variable that for some reason needs to be initialized, you can do that by adding the `reinitializer` modifiert to your `initialize()` function,

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
