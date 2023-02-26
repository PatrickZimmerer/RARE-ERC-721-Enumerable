// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

/*
 * @title A basic NFT contract with Enumerable extension by openzeppelin
 * @author Patrick Zimmerer
 * @notice This contract is NOT FOR PRODUCTION, just for learning purposes
 * @dev implements ERC721
 */
contract SearchForPrimes {
    // function balanceOf => (address) gives us the amount a user has
    // function tokenOfOwnerByIndex => (address, index) => gives us the _tokenId
    // => balanceOf gets us the loop length and then just loop over tokenOfOwnerByIndex (balanceOf times)
    // and push to the array for every prime we get back in the loop
}
