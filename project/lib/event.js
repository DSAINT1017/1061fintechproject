const web3 = require('./web3.js')
const contract = require('./contract.js')

function watchEventsContribute(address){

    let project = new web3.eth.Contract(contract.project.abi, address);

    project.events.Contribute({
        fromBlock: 0
    })
    .on('data', function(event){
        console.log(event);
    })
    
}

function watchEventsExpense(address){

    let project = new web3.eth.Expense(contract.project.abi, address);

    project.events.Expense({
        fromBlock: 0
    })
    .on('data', function(event){
        console.log(event);
    })
    
}