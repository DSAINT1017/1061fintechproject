const web3 = require('./web3.js')
const contract = require('./contract.js')

let owner;
let token_address;
let project_owner;

//發行平台代幣 (發行者ethereum帳號)
function issueToken(address){
    let token = new web3.eth.Contract(contract.token.abi);
    owner = address;
    token.deploy({
        data: contract.token.bytecode,
        arguments: [0, 'MyToken', 0, 'Token']
    })
    .send({
        from: owner,
        gas: 210000
    })
    .then(function(newContractInstance){
        token_address = newContractInstance.option.address;
    })

}


//提出計畫 (募資者ethereum帳號, 計畫名稱, 目標金額)
function createProject(address, name, amount){

    let project = new web3.eth.Contract(contract.project.abi);
    let address;
    project.deploy({
        data: contract.project.bytecode,
        arguments: [amount, name, 0, 'Project']
    })
    .send({
        from: address,
        gas: 210000
    })
    .then(function(newContractInstance){
        address = newContractInstance.option.address;
    })
    return address;

}

//捐款 (計畫ethereum帳號, 捐款者ethereum帳號, 捐款數量)
function contribute(p_address, u_address, amount){

    let token = new web3.eth.Contract(contract.token.abi, token_address);
    let project = new web3.eth.Contract(contract.project.abi, p_address);
    let p_owner;
    
    project.methods.getToken().call().then(function(address){
        getProjectOwner(address).then(function(addr){
            p_owner = addr;
        })
    })
    web3.eth.sendTransaction({
        from: owner,
        to: p_owner,
        value: '1000000000000000000'
    })
    token.methods.allocate(address, amount).send({
        from: owner,
        gas: 210000
    })
    token.methods.transfer(p_owner, amount).send({
        from: owner,
        gas: 210000
    })
    project.methods.transfer(u_address, amount).send({
        from: p_owner,
        gas: 210000
    })
}

//計畫支出 (計畫ethereum帳號, 支出金額, 項目名稱)
function expense(address, amount, title){

    let project = new web3.eth.Contract(contract.project.abi, address);
    let p_owner;
    project.methods.getToken().call().then(function(address){
        getProjectOwner(address).then(function(addr){
            p_owner = addr;
        })
    })
    project.methods.expense(amount, title).send({
        from: p_owner,
        gas: 210000 
    })
    
}

//取得Project募資者 (Project Token ethereum帳號)
function getProjectOwner(address){
    let p_token = new web3.eth.Contract(contract.token.abi, address);
    return p_token.methods.getOwner.call();
}

module.exports = {
    issueToken : issueToken,
    contribute : contribute,
    createProject : createProject,
    expense : expense
}
