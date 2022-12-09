const { ethers } = require("ethers");
const goerli_abi = require("./abi/DepositGoerliAccount.json");
const rinkeby_abi = require("./abi/RinkebyDistributorAccount.json")

async function main() {

    console.log("Program Started: Listening for transactions...");

    const goerli_address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const goerli_provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const goerli_contract = new ethers.Contract(goerli_address, goerli_abi, goerli_provider);

    const rinkeby_address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const rinkeby_provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:51234/");
    const rinkeby_contract = new ethers.Contract(rinkeby_address, rinkeby_abi, rinkeby_provider);

    goerli_contract.on("DepositEvent", (from, value, event) => {
        let info = {
            from: from,
            valueInEther: value.toString(),
            data: event
        }
        console.log(JSON.stringify(info, null, 4));
    });

    // provider.once("block", () => {
    //     factoryContract.on('TokenCreated', newToken);
    // });
}

main();
