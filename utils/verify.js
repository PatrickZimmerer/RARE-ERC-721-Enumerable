// we can't have these functions in our `helper-hardhat-config`
// since these use the hardhat library
// and it would be a circular dependency
const { run } = require('hardhat');

const verify = async (contractAddress, args) => {
	console.log('Verifying contract...');
	try {
		await run('verify:verify', {
			address: 0xe5b78011b950db72f7f7cd8f8a2a7325b7755d03,
		});
	} catch (e) {
		if (e.message.toLowerCase().includes('already verified')) {
			console.log('Already verified!');
		} else {
			console.log(e);
		}
	}
};

module.exports = {
	verify,
};
