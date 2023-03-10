// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/*
 * @title A basic NFT contract with Enumerable extension by openzeppelin
 * @author Patrick Zimmerer
 * @notice This contract is NOT FOR PRODUCTION, just for learning purposes
 * @dev implements ERC721
 */
contract NFTEnumerable is ERC721Enumerable {
    /* State Variables */
    uint256 public tokenSupply = 1;
    uint256 public constant MAX_SUPPLY = 21;
    uint256 public constant PRICE = 0.0001 ether;

    /* Owner */
    address private immutable deployer;

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {
        deployer = _msgSender();
    }

    /*
     * @title Basic minting function
     * @notice every user can mint as many NFT until the maxSupply is reached
     * @dev calls the _safeMint method to avoid sending NFTs to non ERC721Receiver contracts
     */
    function mint(address _to) external payable {
        uint256 _tokenSupply = tokenSupply; // added local variable to reduce gas cost (amount of READs)
        require(_tokenSupply < MAX_SUPPLY, "Max Supply reached.");
        require(msg.value == PRICE, "Not enough ETH sent.");
        unchecked {
            tokenSupply = _tokenSupply + 1; // added unchecked block since overflow check gets handled by require MAX_SUPPLY
        }
        _safeMint(_to, _tokenSupply);
    }

    function viewBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function withdraw() external {
        require(
            msg.sender == deployer,
            "Only the deployer is allowed to do that"
        );
        payable(deployer).transfer(address(this).balance);
    }

    /* View / Pure functions */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://QmeabjnV1H8ZhoztgTHAyQhNfJfQuo8yCvLimEaJfwFPo2/";
    }
}
