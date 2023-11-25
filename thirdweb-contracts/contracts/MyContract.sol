// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract MyContract is ERC721Base {
    address payable public owner;
    address payable public beneficiary;

    constructor(address payable _beneficiary) ERC721Base("MyNFT", "MNFT") {
        owner = payable(msg.sender);
        beneficiary = _beneficiary;
    }

    function auctionEnd() public payable {
        require(msg.sender == owner, "Only the owner can end the auction.");
        uint256 balance = address(this).balance;
        uint256 half = balance / 2;
        owner.transfer(half);
        beneficiary.transfer(half);
    }
}
