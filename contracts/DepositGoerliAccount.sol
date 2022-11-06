// SPDX-License-Identifier: MIT
pragma solidity >=0.6.00;

contract DepositGoerliAccount {
    address owner;

    event DepositEvent(
        bytes pubkey,
        bytes withdrawal_credentials,
        bytes amount,
        bytes signature,
        bytes index
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }
    modifier hasBalance(uint256 amount) {
        require(address(this).balance >= amount);
        _;
    }

    function depositGoerli(
        bytes calldata pubkey,
        bytes calldata withdrawal_credentials,
        bytes calldata signature,
        bytes32 deposit_data_root
    ) external payable {}
}
