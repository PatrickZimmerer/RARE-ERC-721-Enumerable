const { ethers, upgrades } = require('hardhat');

const proxyAddress = '0xBb7cD79Db92E95860F75B1753811b752FAFA78a5'; // put in proxy address here
async function main() {
	const NftEnumerableV2 = await ethers.getContractFactory('NFTEnumerableV2');
	const nftEnumerableV2 = await upgrades.upgradeProxy(proxyAddress, NftEnumerableV2);
	console.log('nftEnumerableV2 upgraded successfully at:', nftEnumerableV2.address);
}

main();
