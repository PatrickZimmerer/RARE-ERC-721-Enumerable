Mutation testing report:
Number of mutations:    21
Killed:                 17 / 21

Mutations:
Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SomeErc721Enumerable.sol
    Line nr: 15
    Result: Equivalent
    Original line:
             ) ERC721(_name, _symbol) {}

    Mutated line:
             )  {}


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 47
    Result: Killed
    Original line:
                 for (uint256 i = 0; i < amountOfTokens; i++) {

    Mutated line:
                 for (uint256 i = 0; i <= amountOfTokens; i++) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 84
    Result: Killed
    Original line:
                 if (_number <= 1) {

    Mutated line:
                 if (_number < 1) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 88
    Result: Killed
    Original line:
                     if (_number % i == 0) {

    Mutated line:
                     if (_number % i != 0) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 87
    Result: Killed
    Original line:
                 for (uint256 i = 2; i <= Math.sqrt(_number); i++) {

    Mutated line:
                 for (uint256 i = 2; i < Math.sqrt(_number); i++) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 47
    Result: Killed
    Original line:
                 for (uint256 i = 0; i < amountOfTokens; i++) {

    Mutated line:
                 for (uint256 i = 0; i >= amountOfTokens; i++) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 84
    Result: Killed
    Original line:
                 if (_number <= 1) {

    Mutated line:
                 if (_number > 1) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 88
    Result: Killed
    Original line:
                     if (_number % i == 0) {

    Mutated line:
                     if (_number % i != 0) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 87
    Result: Killed
    Original line:
                 for (uint256 i = 2; i <= Math.sqrt(_number); i++) {

    Mutated line:
                 for (uint256 i = 2; i > Math.sqrt(_number); i++) {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 32
    Result: Equivalent
    Original line:
                         type(IERC721Enumerable).interfaceId

    Mutated line:
                         interfaceId


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 64
    Result: Equivalent
    Original line:
                         type(IERC721Enumerable).interfaceId

    Mutated line:
                         interfaceId


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/SearchForPrimes.sol
    Line nr: 61
    Result: Killed
    Original line:
             function setContractToSearch(address _contractToSearch) external onlyOwner {

    Mutated line:
             function setContractToSearch(address _contractToSearch) external  {


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 34
    Result: Killed
    Original line:
                 require(_tokenSupply < MAX_SUPPLY, "Max Supply reached.");

    Mutated line:
                 require(_tokenSupply <= MAX_SUPPLY, "Max Supply reached.");


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 35
    Result: Killed
    Original line:
                 require(msg.value == PRICE, "Not enough ETH sent.");

    Mutated line:
                 require(msg.value != PRICE, "Not enough ETH sent.");


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 48
    Result: Killed
    Original line:
                     msg.sender == deployer,

    Mutated line:
                     msg.sender != deployer,


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 34
    Result: Killed
    Original line:
                 require(_tokenSupply < MAX_SUPPLY, "Max Supply reached.");

    Mutated line:
                 require(_tokenSupply >= MAX_SUPPLY, "Max Supply reached.");


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 35
    Result: Killed
    Original line:
                 require(msg.value == PRICE, "Not enough ETH sent.");

    Mutated line:
                 require(msg.value != PRICE, "Not enough ETH sent.");


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 48
    Result: Killed
    Original line:
                     msg.sender == deployer,

    Mutated line:
                     msg.sender != deployer,


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 37
    Result: Killed
    Original line:
                     tokenSupply = _tokenSupply + 1; // added unchecked block since overflow check gets handled by require MAX_SUPPLY

    Mutated line:
                     tokenSupply = _tokenSupply - 1; // added unchecked block since overflow check gets handled by require MAX_SUPPLY


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 39
    Result: Killed
    Original line:
                 _safeMint(_to, _tokenSupply);

    Mutated line:
                 


Mutation:
    File: /Users/patrickzimmerer/Desktop/Rare/Code/ERC721Enumerable/contracts/NFTEnumerable.sol
    Line nr: 23
    Result: Equivalent
    Original line:
             ) ERC721(_name, _symbol) {

    Mutated line:
             )  {


