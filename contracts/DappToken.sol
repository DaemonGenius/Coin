// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract DappToken {
    string public name = "Steinnegen";

    string public symbol = "STEIN";

    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address _spender, uint256 _value);

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

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

    // Creating a Delegated Transfers

    // Create Approval
    function approve(address _spender, uint256 _value)
        public
        returns (bool success)
    {
        // allowance
        allowance[msg.sender][_spender] = _value;
        //approval
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Create Transfer event

    function transferFrom(
        address _from,
        address _to,
        uint256 _value
    ) public returns (bool success) {
        require(_value <= balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);

        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        
        allowance[_from][msg.sender] -= _value;

        emit Transfer(_from, _to, _value);


        return true;
    }
}
