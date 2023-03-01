// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

/*
 * @title A basic NFT contract that can search ERC721Enumerable contracts for Primes
 * @author Patrick Zimmerer
 * @notice This contract is NOT FOR PRODUCTION, just for learning purposes
 * @dev implements Ownable, IERC271Enumerable and Math library from openzeppelin
 */
contract SearchForPrimes is Ownable {
    using Math for uint256;
    IERC721Enumerable public contractToSearch;

    constructor(address _contractToSearch) {
        require(
            ERC165(_contractToSearch).supportsInterface(
                type(IERC721Enumerable).interfaceId
            ),
            "Contract is not ERC721Enumerable"
        );
        contractToSearch = IERC721Enumerable(_contractToSearch);
    }

    /*
     * @title Search the amount of tokens which have an id that are a prime number
     * @notice gets the total amount of tokens first and then loops for amountOfTokens times
     * @notice we could also push the tokenIds into an array to have a list of which tokenIds are the primes
     */
    function searchForPrimes(address _owner) external view returns (uint256) {
        uint256 amountOfTokens = contractToSearch.balanceOf(_owner);
        uint256 amountOfPrimes;
        for (uint256 i = 0; i < amountOfTokens; i++) {
            uint256 tokenId = contractToSearch.tokenOfOwnerByIndex(_owner, i);
            if (isPrimeNumber(tokenId)) {
                amountOfPrimes++;
            }
        }
        return amountOfPrimes;
    }

    /*
     * @title This changes the contract which this contract is communicating to / searching
     * @notice sets the new contractToSearch variable which can be only done by the owner
     * @notice input must implement ERC721Enumerable which is checked by using ERC165
     */
    function setContractToSearch(address _contractToSearch) external onlyOwner {
        require(
            ERC165(_contractToSearch).supportsInterface(
                type(IERC721Enumerable).interfaceId
            ),
            "Contract is not ERC721Enumerable"
        );
        contractToSearch = IERC721Enumerable(_contractToSearch);
    }

    /*
     * @title determines if a number is a prime number
     * @dev uses the Math library from Openzeppelin
     */
    function isPrimeNumber(uint256 _number) internal pure returns (bool) {
        if (_number <= 1) {
            return false;
        }
        for (uint256 i = 3; i <= Math.sqrt(_number); i = i + 2) {
            if (_number % i == 0) {
                return false;
            }
        }
        return true;
    }

    /*
     * @title just returns the amount of tokens a user has
     * @dev could be made internal aswell but optional
     */
    function balanceOfUser(address _owner) external view returns (uint256) {
        return contractToSearch.balanceOf(_owner);
    }
}
