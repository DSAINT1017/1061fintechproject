pragma solidity ^0.4.19;

import "MyToken.sol";

contract Project{
    
    address owner;
    address official;
    string name;
    
    Token t;
    Token pt;
    
    event Expense(string name, address from, address to, string title, uint256 amount);
    event Contribute(string name, address from, uint256 amount);
    
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
        Contribute(name, addr, amount);
    }
    function expense(uint256 amount, string _title) isOwner public{
        t.transfer(official, amount);
        Expense(name, msg.sender, official, _title, amount);
    }
    
    function getToken() public constant returns(Token){
        return pt;
    }
    
    function getName() public constant returns(string){
        return name;
    }
}