// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DappToken {
    string public name = "Steinnegen";

    string public symbol = "STEIN";

    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint _value);

    mapping(address => uint256) public balanceOf;

    constructor(uint256 _initialSupply) {
        totalSupply = _initialSupply;
        balanceOf[msg.sender] = _initialSupply;
    }

    //Creating Transfer form methods
    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceOf[msg.sender] >= _value);

        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        emit Transfer(msg.sender, _to, _value);

        return true;
    }
}
