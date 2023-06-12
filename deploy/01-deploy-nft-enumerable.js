const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { log } = deployments;

	const name = 'NFTEnumerable';
	const symbol = 'NFE';

	const arguments = [name, symbol];

	const NftEnumerable = await ethers.getContractFactory('NFTEnumerable');
	const nftEnumerable = await upgrades.deployProxy(NftEnumerable, arguments, {
		initializer: 'initialize',
	});

	// only verify the code when not on development chains as hardhat
	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		log('Verifying...');
		await verify(nftEnumerable.address, arguments);
	}
	log('nftEnumerable deployed successfully at:', nftEnumerable.address);
	log('-----------------------------------------');

	let addressMap = require('../shared-data.js');
	addressMap.nftEnumerableAddress = nftEnumerable.address;
};

module.exports.tags = ['all', 'nftEnumerable'];
