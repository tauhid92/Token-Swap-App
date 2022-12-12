const { ethers } = require("ethers");
const goerli_abi = require("./abi/DepositGoerliAccount.json");
const rinkeby_abi = require("./abi/RinkebyDistributorAccount.json")

async function main() {

    console.log("Program Started: Listening for transactions...");

    const goerli_address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const goerli_provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
    const goerli_contract = new ethers.Contract(goerli_address, goerli_abi, goerli_provider);

    const rinkeby_address = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
    const rinkeby_provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:51234/");
    const rinkeby_contract = new ethers.Contract(rinkeby_address, rinkeby_abi, rinkeby_provider);

    const rinkeby_owner_private_key = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const walletRinkeby = new ethers.Wallet(rinkeby_owner_private_key, rinkeby_provider);
    const contractWithSigner = rinkeby_contract.connect(walletRinkeby);

    goerli_contract.on("DepositEvent", (from, value, event) => {
        let info = {
            from: from,
            valueInEther: value.toString(),
            data: event
        }
        console.log(JSON.stringify(info, null, 4));

        const emit_address = event.args[0];
        const emit_value = event.args[1].toString();

        console.log(`address: ${emit_address}`);
        console.log(`value: ${emit_value}`);
        try {
            contractWithSigner.transferRinkebyEth(emit_address, emit_value);
        } catch (err) { console.log(err); }
    });
    //TODO: Add the the rinkeby transferred listener 
    // TODO: Add goerli paused or destroyed listener
    // TODO: Add rinkeby destroyed event listener
}

main();
