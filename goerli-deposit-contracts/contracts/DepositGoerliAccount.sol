// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17 .0;

contract DepositGoerliAccount {
    address public owner;
    bool public paused;
    uint public limit;
    uint public balance;

    event DepositEvent(address indexed sender, uint amount);

    constructor(uint _limit) {
        owner = msg.sender;
        limit = _limit;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "DepositGoerliAccount: You are not the owner."
        );
        _;
    }

    modifier notPaused() {
        require(
            paused == false,
            "DepositGoerliAccount: Contract is Paused now. Please try again later."
        );
        _;
    }

    modifier balanceLimitNotReached() {
        require(
            balance / 1 ether < limit,
            "DepositGoerliAccount: The contract is holding the maximum tokens it can hold."
        );
        _;
    }

    modifier withinLimit() {
        // Check deposit amount
        require(
            msg.value >= 0.01 ether && msg.value / 1 ether <= limit,
            "DepositGoerliAccount: The deposit amount is lower or higher than the limit."
        );
        _;
    }

    function pauseContract() public onlyOwner {
        paused = true;
    }

    function resumeContract() public onlyOwner {
        paused = false;
    }

    function depositGoerliEth(
        address rinkebyAddress
    ) external payable balanceLimitNotReached notPaused withinLimit {
        balance += msg.value;

        emit DepositEvent(rinkebyAddress, msg.value);
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
