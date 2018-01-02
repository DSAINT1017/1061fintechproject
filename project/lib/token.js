const owner;

//發行平台代幣 (發行者ethereum帳號, 代幣名稱)
function issueToken(address, name){
    owner = address;
}


//提出計畫 (募資者ethereum帳號, 計畫名稱, 目標金額)
function createProject(address, name, amount){

}

//捐款 (捐款者ethereum帳號, 捐款數量)
function contribute(address, amount){

}

//計畫支出 (支出金額, 項目名稱)
function expense(amount, title){

}

module.exports = {
    issueToken : issueToken,
    contribute : contribute,
    createProject : createProject,
    expense : expense
}
