const web3 = require('./web3.js')
const contract = require('./contract.js')

let owner;
let token_address;
let project_owner;
let project_address;

//發行平台代幣 (發行者ethereum帳號)
function issueToken(address){
    let token = new web3.eth.Contract(contract.token.abi);
    owner = address;
    return token.deploy({
        data: contract.token.bytecode,
        arguments: [0, 'MyToken', 0, 'Token']
    })
    .send({
        from: owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
    .then(function(newContractInstance){
        token_address = newContractInstance.options.address;
    })

}


//提出計畫 (募資者ethereum帳號, 計畫名稱, 目標金額)
function createProject(address, name, amount){

    let project = new web3.eth.Contract(contract.project.abi);
    project_owner = address;
    return project.deploy({
        data: contract.project.bytecode,
        arguments: [name, amount, token_address]
    })
    .send({
        from: project_owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
    .then(function(newContractInstance){
        //console.log(newContractInstance)
        project_address = newContractInstance.options.address;
    })

}

//捐款 (捐款者ethereum帳號, 捐款數量)
function contribute(u_address, amount){

    let token = new web3.eth.Contract(contract.token.abi, token_address);
    let project = new web3.eth.Contract(contract.project.abi, project_address);

    web3.eth.sendTransaction({
        from: owner,
        to: project_owner,
        value: '1000000000000000000'
    })
    token.methods.allocate(u_address, amount).send({
        from: owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
    token.methods.transfer(project_owner, amount).send({
        from: owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
    project.methods.contribute(u_address, amount).send({
        from: project_owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
}

//計畫支出 (支出金額, 項目名稱)
function expense(amount, title){

    let project = new web3.eth.Contract(contract.project.abi, project_address);

    project.methods.expense(amount, title).send({
        from: project_owner,
        gas: '0x47e7c4',
        gasPrice: '0x1'
    })
    
}
function watchEventsContribute(address){

    let project = new web3.eth.Contract(contract.project.abi, project_address);
    return project.getPastEvents('Contribute', {
        fromBlock: 0,
        toBlock: 'latest'
    })
}

function watchEventsExpense(address){

    let project = new web3.eth.Contract(contract.project.abi, project_address);
    return project.getPastEvents('Expense', {
        fromBlock: 0,
        toBlock: 'latest'
    })
}

module.exports = {
    issueToken : issueToken,
    contribute : contribute,
    createProject : createProject,
    expense : expense,
    watchEventsContribute : watchEventsContribute,
    watchEventsExpense, watchEventsExpense
}
