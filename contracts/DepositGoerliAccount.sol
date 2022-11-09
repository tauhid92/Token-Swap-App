// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17.0;
contract DepositGoerliAccount {
    address public owner;

    event DepositEvent(
        bytes pubkey,
        bytes amount
    );

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }


    
    function depositGoerli(bytes calldata pubkey) payable external {
        require(pubkey.length == 48, "DepositContract: invalid pubkey length");

        // Check deposit amount
        require(msg.value >= 0.01 ether, "DepositContract: deposit value too low");

        uint deposit_amount = msg.value / 1 gwei;
        require(deposit_amount <= type(uint64).max, "DepositContract: deposit value too high");

        
        emit DepositEvent(
            pubkey,
            abi.encodePacked(deposit_amount)
        );
    }
}
