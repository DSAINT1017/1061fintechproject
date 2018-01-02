pragma solidity^0.4.19;

contract Token {
    
    address owner;
    uint256 public totalSupply;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);

    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    
    string public name;
    uint8 public decimals;
    string public symbol;
    string public version = 'NCCU0.1';
    
    function Token(
        uint256 _initialAmount,
        string _tokenName,
        uint8 _decimalUnits,
        string _tokenSymbol
        ) public {
        balances[tx.origin] = _initialAmount;
        totalSupply = _initialAmount;
        name = _tokenName;
        decimals = _decimalUnits;
        symbol = _tokenSymbol;
        owner = tx.origin;
    }
    
    modifier isOwner(){
        if(owner == tx.origin)
        _;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        if (balances[tx.origin] >= _value && _value > 0) {
            balances[tx.origin] -= _value;
            balances[_to] += _value;
            Transfer(tx.origin, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if (balances[_from] >= _value && allowed[_from][tx.origin] >= _value && _value > 0) {
            balances[_to] += _value;
            balances[_from] -= _value;
            allowed[_from][msg.sender] -= _value;
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }
    
    function allocate(address addr, uint256 amount) isOwner public returns (bool success){
        balances[addr] += amount;
        totalSupply += amount;
        return success;
    }
    
    function getTotalSupply() public constant returns (uint256 supply) {
        return totalSupply;
    }
    
    function balanceOf(address _owner) public constant returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowed[tx.origin][_spender] = _value;
        Approval(msg.sender, _spender, _value);
        return true;
    }

    function allowance(address _owner, address _spender) public constant returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }
    
}