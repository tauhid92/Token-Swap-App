// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17.0;
contract DepositGoerliAccount {
    address public owner;
    bool public paused;

    event DepositEvent(
        address sender,
        bytes amount
    );

    constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    modifier notPaused(){
        require(paused == false, "Contract Paused");
        _;
    }

    function setPaused(bool _paused) public onlyOwner{
        paused = _paused;
    }
   
    function depositGoerli() payable external {
        // require(pubkey.length == 48, "DepositContract: invalid pubkey length");

        // Check deposit amount
        require(msg.value >= 0.01 ether, "DepositContract: deposit value too low");

        uint deposit_amount = msg.value / 1 gwei;
        require(deposit_amount <= type(uint64).max, "DepositContract: deposit value too high");
      
        emit DepositEvent(
            msg.sender,
            abi.encodePacked(deposit_amount)
        );
    }

    function withdrawAllMoney(address payable _to) public onlyOwner notPaused{     
        _to.transfer(address(this).balance);
    }
    
    function destroySmartContract(address payable _to) public onlyOwner{      
        selfdestruct(_to);
    }
    
}
