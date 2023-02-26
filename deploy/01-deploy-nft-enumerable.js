const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();

	const name = 'NFTEnumerable';
	const symbol = 'NFE';

	const arguments = [name, symbol];

	const nftEnumerable = await deploy('NFTEnumerable', {
		from: deployer,
		args: arguments,
		logs: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

	// only verify the code when not on development chains as hardhat
	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		log('Verifying...');
		await verify(nftEnumerable.address, arguments);
	}
	log('nftEnumerable deployed successfully at:', nftEnumerable.address);
	log('-----------------------------------------');

	let addressMap = require('../shared-data.js');
	addressMap.nftEnumerableContractAddress = nftEnumerable.address;
};

module.exports.tags = ['all', 'nftEnumerable'];
