const { expect } = require('chai');
const { ethers } = require('hardhat');
const { BigNumber } = require('ethers');
const { parseEther } = require('ethers/lib/utils');

describe('NFTEnumerable', () => {
	let nftEnumerable;
	let deployer;
	let account1;

	const NAME = 'TestNFT';
	const SYMBOL = 'TNF';

	const BIG_0 = BigNumber.from('0');
	const BIG_1 = BigNumber.from('1');
	const PRICE = ethers.utils.parseEther('0.0001');
	const TINY_AMOUNT_OF_ETH = ethers.utils.parseEther('0.0000001');
	beforeEach(async () => {
		[deployer, account1] = await ethers.getSigners();

		const NFTEnumerableFactory = await ethers.getContractFactory('NFTEnumerable');
		nftEnumerable = await NFTEnumerableFactory.deploy(NAME, SYMBOL);
		await nftEnumerable.deployed();
	});
	describe('constructor', () => {
		it('should deploy to an address', async () => {
			expect(await nftEnumerable.address).to.not.be.null;
			expect(await nftEnumerable.address).to.be.ok;
		});
		it('should set the name, symbol and deployer when deployed', async () => {
			expect(await nftEnumerable.name()).to.equal(NAME);
			expect(await nftEnumerable.symbol()).to.equal(SYMBOL);
		});
	});
	describe('mint', () => {
		it('should mint an nft to a given address and increase the tokenSupply', async () => {
			const tx = await nftEnumerable.mint(account1.address, { value: PRICE });
			await tx.wait();
			let userBalance = await nftEnumerable.balanceOf(account1.address);
			expect(userBalance).eq(BIG_1);

			const tx2 = await nftEnumerable.mint(account1.address, { value: PRICE });
			await tx2.wait();
			userBalance = await nftEnumerable.balanceOf(account1.address);
			expect(userBalance).eq(BigNumber.from('2'));
			expect(await nftEnumerable.tokenSupply()).eq(BigNumber.from('3'));
		});
		it('should revert the 21. mint since MAX_SUPPLY is reached', async () => {
			let i = 0;
			while (i < 20) {
				let tx = await nftEnumerable.mint(account1.address, { value: PRICE });
				await tx.wait();
				i++;
			}
			expect(await nftEnumerable.tokenSupply()).eq(BigNumber.from('21'));
			await expect(nftEnumerable.mint(account1.address, { value: PRICE })).to.be.revertedWith(
				'Max Supply reached.'
			);
		});
		it('should revert since the value sent is not correct', async () => {
			await expect(
				nftEnumerable.mint(account1.address, {
					value: PRICE.sub(TINY_AMOUNT_OF_ETH),
				})
			).to.be.revertedWith('Not enough ETH sent.');
		});
		it('should revert since the address sent to is not an ERC721Receiver', async () => {
			await expect(
				nftEnumerable.mint(nftEnumerable.address, {
					value: PRICE,
				})
			).to.be.revertedWith('ERC721: transfer to non ERC721Receiver implementer');
		});
	});
	describe('_baseURI', () => {
		it('should return the correct base URI when called through ERC721s tokenURI', async () => {
			const tx = await nftEnumerable.mint(account1.address, { value: PRICE });
			await tx.wait();
			const baseURI = await nftEnumerable.tokenURI(BIG_1);
			expect(baseURI).eq(
				`ipfs://QmeabjnV1H8ZhoztgTHAyQhNfJfQuo8yCvLimEaJfwFPo2/${BigNumber.from('1')}`
			);
		});
		it('should revert since tokenId has not been minted yet', async () => {
			await expect(nftEnumerable.tokenURI(BIG_1)).to.be.revertedWith('ERC721: invalid token ID');
		});
	});
	describe('viewBalance', () => {
		it('should return the correct balance of the contract before and after minting an NFT', async () => {
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
	describe('withdraw', () => {
		it('should allow the owner to withdraw the balance of the contract', async () => {
			const startingBalance = await ethers.provider.getBalance(deployer.address);
			// mint 10 NFTs to increase balance of contract
			let i = 0;
			while (i < 10) {
				let tx = await nftEnumerable.connect(account1).mint(account1.address, { value: PRICE });
				await tx.wait();
				i++;
			}
			const withdrawTx = await nftEnumerable.withdraw();
			withdrawTx.wait();
			expect(await ethers.provider.getBalance(nftEnumerable.address)).to.deep.equal(BIG_0);
			expect(await ethers.provider.getBalance(deployer.address)).gt(startingBalance);
		});
		it('should revert the ownerWithdraw since caller is not owner', async () => {
			await expect(nftEnumerable.connect(account1).withdraw()).to.be.revertedWith(
				'Only the deployer is allowed to do that'
			);
		});
	});
});
