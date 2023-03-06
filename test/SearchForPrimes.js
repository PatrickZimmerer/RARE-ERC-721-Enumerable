const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');
const { parseEther } = require('ethers/lib/utils');

describe('SearchForPrimes', () => {
	let searchForPrimes;
	let deployer;
	let account1;
	let nftEnumerable;

	const NAME = 'TestNFT';
	const SYMBOL = 'TNF';

	const BIG_0 = BigNumber.from('0');
	const BIG_1 = BigNumber.from('1');
	const PRICE = ethers.utils.parseEther('0.0001');

	beforeEach(async () => {
		[deployer, account1] = await ethers.getSigners();

		const NFTEnumerableFactory = await ethers.getContractFactory('NFTEnumerable');
		nftEnumerable = await NFTEnumerableFactory.deploy(NAME, SYMBOL);
		await nftEnumerable.deployed();

		const SearchForPrimesContractFactory = await ethers.getContractFactory('SearchForPrimes');
		searchForPrimes = await SearchForPrimesContractFactory.deploy(nftEnumerable.address);
		await searchForPrimes.deployed();
	});
	describe('constructor', () => {
		it('should deploy to an address', async () => {
			expect(await nftEnumerable.address).to.not.be.null;
			expect(await nftEnumerable.address).to.be.ok;
			expect(await searchForPrimes.address).to.not.be.null;
			expect(await searchForPrimes.address).to.be.ok;
		});
		it('should set the contractToSearch when deployed', async () => {
			expect(await nftEnumerable.name()).to.equal(NAME);
			expect(await nftEnumerable.symbol()).to.equal(SYMBOL);
			expect(await searchForPrimes.contractToSearch()).to.equal(nftEnumerable.address);
		});
		it('should not deploy since the contractToSearch is not ERC721Enumerable deployed', async () => {
			const nonERC721EnumerableContract = await ethers.getContractFactory('ERC721');
			const nonERC721EnumerableContractInstance = await nonERC721EnumerableContract.deploy(
				NAME,
				SYMBOL
			);
			const SearchForPrimesContractFactory = await ethers.getContractFactory('SearchForPrimes');

			await expect(
				SearchForPrimesContractFactory.deploy(nonERC721EnumerableContractInstance.address)
			).to.be.revertedWith('Contract is not ERC721Enumerable');
		});
	});
	describe('searchForPrimes', () => {
		it('should return the correct amount of Primes a user has after 4 mints', async () => {
			let i = 0;
			while (i < 4) {
				let tx = await nftEnumerable.mint(deployer.address, { value: PRICE });
				await tx.wait();
				i++;
			}
			let userBalance = await nftEnumerable.balanceOf(deployer.address);
			let userPrimes = await searchForPrimes.getAmountOfPrimes(deployer.address);

			expect(userBalance).eq(BigNumber.from('4'));
			expect(userPrimes).eq(BigNumber.from('2'));
		});
		it('should return the correct amount of Primes a user has after 10 mints', async () => {
			let i = 0;
			while (i < 10) {
				let tx = await nftEnumerable.mint(deployer.address, { value: PRICE });
				await tx.wait();
				i++;
			}
			let userBalance = await searchForPrimes.balanceOfUser(deployer.address);
			let userPrimes = await searchForPrimes.getAmountOfPrimes(deployer.address);

			expect(userBalance).eq(BigNumber.from('10'));
			expect(userPrimes).eq(BigNumber.from('4'));
		});
	});
	describe('setContractToSearch', () => {
		it('should change the address to the given address which is some ERC721Enumerable contract', async () => {
			expect(await searchForPrimes.contractToSearch()).eq(nftEnumerable.address);
			const ERC721EnumerableContract = await ethers.getContractFactory('SomeErc721Enumerable');
			const ERC721EnumerableContractInstance = await ERC721EnumerableContract.deploy(NAME, SYMBOL);
			await searchForPrimes.setContractToSearch(ERC721EnumerableContractInstance.address);

			expect(await searchForPrimes.contractToSearch()).eq(ERC721EnumerableContractInstance.address);
		});
		it('should revert since the given address is not ERC721Enumerable', async () => {
			const nonERC721EnumerableContract = await ethers.getContractFactory('ERC721');
			const nonERC721EnumerableContractInstance = await nonERC721EnumerableContract.deploy(
				NAME,
				SYMBOL
			);

			await expect(
				searchForPrimes.setContractToSearch(nonERC721EnumerableContractInstance.address)
			).to.be.revertedWith('Contract is not ERC721Enumerable');
		});
		it('should revert since the caller is not the owner', async () => {
			await expect(
				searchForPrimes.connect(account1).setContractToSearch(nftEnumerable.address)
			).to.be.revertedWith('Ownable: caller is not the owner');
		});
	});
	describe('balanceOfUser', () => {
		it('should return the correct token balance of the user input before and after minting an NFT', async () => {
			let balance = await ethers.provider.getBalance(nftEnumerable.address);
			let expectedBalance = await nftEnumerable.viewBalance();
			expect(balance).eq(BIG_0);
			expect(balance).eq(expectedBalance);

			let tx = await nftEnumerable.mint(account1.address, { value: PRICE });
			await tx.wait();
			balance = await ethers.provider.getBalance(nftEnumerable.address);
			expectedBalance = await nftEnumerable.viewBalance();
			expect(balance).eq(PRICE);
			expect(balance).eq(expectedBalance);

			tx = await nftEnumerable.mint(account1.address, { value: PRICE });
			await tx.wait();
			balance = await ethers.provider.getBalance(nftEnumerable.address);
			expectedBalance = await nftEnumerable.viewBalance();
			const tokenSupply = await nftEnumerable.tokenSupply();
			expect(balance).eq(PRICE.mul(tokenSupply.sub(BIG_1)));
			expect(balance).eq(expectedBalance);

			tx = await nftEnumerable.withdraw();
			await tx.wait();
			balance = await ethers.provider.getBalance(nftEnumerable.address);
			expectedBalance = await nftEnumerable.viewBalance();
			expect(balance).eq(BIG_0);
			expect(balance).eq(expectedBalance);
		});
	});
});
