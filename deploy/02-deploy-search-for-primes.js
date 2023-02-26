const { network } = require('hardhat');
const { developmentChains } = require('../helper-hardhat-config');
const { verify } = require('../utils/verify');

module.exports = async function ({ getNamedAccounts, deployments }) {
	const { deploy, log } = deployments;
	const { deployer } = await getNamedAccounts();

	let addressMap = require('../shared-data.js');

	// contract to search gets set when deployed
	let contractToSearch = addressMap.nftEnumerableAddress;

	const arguments = [contractToSearch];

	const searchForPrimes = await deploy('SearchForPrimes', {
		from: deployer,
		args: arguments,
		logs: true,
		waitConfirmations: network.config.blockConfirmations || 1,
	});

	// only verify the code when not on development chains as hardhat
	if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
		log('Verifying...');
		await verify(searchForPrimes.address, arguments);
	}
	log('searchForPrimes deployed successfully at:', searchForPrimes.address);
	log('-----------------------------------------');

	addressMap.searchForPrimesAddress = searchForPrimes.address;

	log('All contracts deployed successfully ');
	log('-----------------------------------------');
	console.log('contract addresses are', addressMap);
};

module.exports.tags = ['all', 'searchForPrimes'];
