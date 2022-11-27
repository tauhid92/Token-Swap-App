// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract RinkebyDistributorAccount {
    address public owner;
    bool public paused;
    uint public balance;
    string pause_reason;

    constructor() payable {
        owner = msg.sender;
        balance = msg.value;
        emit created("created", abi.encodePacked(balance));
    }

    event tokenTransferred(address indexed recipient, bytes indexed amount);

    event created(string indexed message, bytes indexed balance);

    event destroyed(string indexed message);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "RinkebyDistributorAccount: You are not the owner."
        );
        _;
    }

    modifier notPaused() {
        require(paused == false, pause_reason);
        _;
    }

    modifier withinBalance(uint amount) {
        // Check deposit amount
        require(
            amount >= 0 && amount <= balance,
            "RinkebyDistributorAccount: The transfer amount requested is higher than the current balance."
        );
        _;
    }

    function pauseContract(string memory reason) public onlyOwner {
        paused = true;
        pause_reason = reason;
    }

    function resumeContract() public onlyOwner {
        paused = false;
    }

    function transferRinkebyEth(
        address payable _recipient,
        uint amount
    ) public onlyOwner notPaused withinBalance(amount) {
        _recipient.transfer(amount);
        balance -= amount;

        emit tokenTransferred(_recipient, abi.encodePacked(amount));

        if (balance == 0) destroySmartContract(payable(owner));
    }

    function withdrawAllMoney(address payable _to) public onlyOwner notPaused {
        _to.transfer(address(this).balance);
        balance = 0;
    }

    function withdrawAmount(
        address payable _to,
        uint amount
    ) public onlyOwner notPaused {
        _to.transfer(amount);
        balance -= amount;
    }

    function destroySmartContract(address payable _to) public onlyOwner {
        pauseContract("The contract is not being used anymore");
        // selfdestruct(_to);
        if (balance > 0) withdrawAmount(_to, balance);
        emit destroyed("The contract is destroyed");
    }
}
