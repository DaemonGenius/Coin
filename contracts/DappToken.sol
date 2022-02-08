// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DappToken {

    string public name = "Steinnegen";

    string public symbol = "STEIN";

    uint256 public totalSupply;
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    constructor(uint _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }



    //Creating Transfer form methods
}
