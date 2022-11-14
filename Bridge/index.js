const { ethers } = require("ethers");
const abi = require("./abi/DepositGoerliAccount.json");


async function main() {
    const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545/");

    const contract = new ethers.Contract(address, abi, provider);

    contract.on("DepositEvent", (from, value, event) => {
        let info = {
            from: from,
            valueInEther: value,
            data: event
        }
        console.log(JSON.stringify(info, null, 4));
    });
}

main();