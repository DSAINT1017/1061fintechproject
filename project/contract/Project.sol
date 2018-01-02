pragma solidity ^0.4.19;

import "MyToken.sol";

contract Project{
    
    address owner;
    string name;
    
    Token t;
    Token pt;
    
    event Expense(address from, address to, string title);
    event Distribute(address from, uint256 amount);
    
    modifier isOwner(){
        if(owner == msg.sender)
        _;
    }
    
    function Project(string _name, uint256 amount, address m) public {
        t = Token(m);
        pt = new Token(amount, _name, 0, "project");
        name = _name;
        owner = msg.sender;
    }
    
    function distribute(address addr, uint256 amount) isOwner public{
        pt.transfer(addr, amount);
        Distribute(addr, amount);
    }
    function expense(uint256 amount, string _title) isOwner public{
        pt.transfer(0x00a329c0648769A73afAc7F9381E08FB43dBEA72, amount); //平台帳號
        Expense(msg.sender,0x00a329c0648769A73afAc7F9381E08FB43dBEA72 , _title); //平台帳號
    }
    
    function getToken() public constant returns(Token p){
        return pt;
    }
    
    function getName() public constant returns(string name){
        return name;
    }
}