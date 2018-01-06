pragma solidity ^0.4.19;

import "MyToken.sol";

contract Project{
    
    address owner;
    address official;
    string name;
    
    Token t;
    Token pt;
    
    event Expense(address from, address to, string title);
    event Contribute(address from, uint256 amount);
    
    modifier isOwner(){
        if(owner == msg.sender)
        _;
    }
    
    function Project(string _name, uint256 amount, address m) public {
        t = Token(m);
        pt = new Token(amount, _name, 0, "project");
        name = _name;
        owner = msg.sender;
        official = t.getOwner();
    }
    
    function contribute(address addr, uint256 amount) isOwner public{
        pt.transfer(addr, amount);
        Contribute(addr, amount);
    }
    function expense(uint256 amount, string _title) isOwner public{
        t.transfer(official, amount);
        Expense(msg.sender, official, _title);
    }
    
    function getToken() public constant returns(Token){
        return pt;
    }
    
    function getName() public constant returns(string){
        return name;
    }
}