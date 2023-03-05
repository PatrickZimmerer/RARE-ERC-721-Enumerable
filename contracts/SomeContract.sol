// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

/*
 * @title A basic NFT contract with Enumerable extension by openzeppelin
 * @author Patrick Zimmerer
 * @notice This contract is NOT FOR PRODUCTION, just for learning purposes
 * @dev implements ERC721
 */
contract SomeContract is ERC721 {
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
}
