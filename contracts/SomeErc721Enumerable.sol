pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

/*
 * @title A basic NFT contract with Enumerable extension by openzeppelin
 * @author Patrick Zimmerer
 * @notice This contract is NOT FOR PRODUCTION, just for learning purposes
 * @dev implements ERC721
 */
// SPDX-License-Identifier: MIT
contract SomeErc721Enumerable is ERC721Enumerable {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}
}
