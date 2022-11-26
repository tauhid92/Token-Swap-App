// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract RinkebyDistributorAccount {
    address public owner;
    bool public paused;
    uint public balance;

    constructor() payable {
        owner = msg.sender;
        balance = msg.value / 1 ether;
    }

    event tokenTransferred(address indexed recipient, bytes indexed amount);

    event created(string message, bytes indexed balance);

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "RinkebyDistributorAccount: You are not the owner."
        );
        _;
    }

    modifier notPaused() {
        require(
            paused == false,
            "RinkebyDistributorAccount: Contract is Paused now. Please try again later."
        );
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

    function pauseContract() public onlyOwner {
        paused = true;
    }

    function resumeContract() public onlyOwner {
        paused = false;
    }

    function transferRinkebyEth(
        address payable _recipient,
        uint amount
    ) public onlyOwner withinBalance(amount) notPaused {
        _recipient.transfer(amount * 1 ether);
        balance -= amount;

        emit tokenTransferred(_recipient, abi.encodePacked(amount));

        if (balance == 0) pauseContract();
    }

    function withdrawAllMoney(address payable _to) public onlyOwner notPaused {
        _to.transfer(address(this).balance);
        balance = 0;
    }

    function withdrawAmount(
        address payable _to,
        uint amount
    ) public onlyOwner notPaused {
        _to.transfer(amount * 1 ether);
        balance -= amount * 1 ether;
    }

    function destroySmartContract(address payable _to) public onlyOwner {
        selfdestruct(_to);
    }
}
