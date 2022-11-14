import hre from "hardhat";
import { expect, assert } from "chai";

describe(`Deposit Goerli Ether`, () => {
  it(`The one who deploys contract should be the owner`, async () => {
    let [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Deposit = await hre.ethers.getContractFactory("DepositGoerliAccount");
    const deposit = await Deposit.deploy(10);
    await deposit.deployed();

    assert.equal(await deposit.owner(), owner.address);
  });

  it(`should revert if the balance limit has reached`, async () => {
    let [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Deposit = await hre.ethers.getContractFactory("DepositGoerliAccount");
    const deposit = await Deposit.deploy(10);
    await deposit.deployed();

    await expect(
      deposit.connect(addr1).depositGoerliEth({
        value: hre.ethers.utils.parseEther("11.0"),
      })
    ).to.be.revertedWith(
      "DepositGoerliAccount: The deposit amount is lower or higher than the limit."
    );
  });

  it(`should emit deposit event with proper arguements if withtin limit`, async () => {
    let [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Deposit = await hre.ethers.getContractFactory("DepositGoerliAccount");
    const deposit = await Deposit.deploy(10);
    await deposit.deployed();

    await expect(
      deposit.connect(addr1).depositGoerliEth({
        value: hre.ethers.utils.parseEther("8.0"),
      })
    )
      .to.emit(deposit, "DepositEvent")
      .withArgs(addr1.address, 8.0);
  });

  it(`should revert if contract is paused by owner`, async () => {
    let [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Deposit = await hre.ethers.getContractFactory("DepositGoerliAccount");
    const deposit = await Deposit.deploy(10);
    await deposit.deployed();

    await deposit.connect(owner).pauseContract();

    await expect(
      deposit.connect(addr1).depositGoerliEth({
        value: hre.ethers.utils.parseEther("8.0"),
      })
    ).to.be.revertedWith(
      "DepositGoerliAccount: Contract is Paused now. Please try again later."
    );
  });

  it(`should revert if other than owner tries to pause it`, async () => {
    let [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Deposit = await hre.ethers.getContractFactory("DepositGoerliAccount");
    const deposit = await Deposit.deploy(10);
    await deposit.deployed();

    await expect(deposit.connect(addr1).pauseContract()).to.be.revertedWith(
      "DepositGoerliAccount: You are not the owner."
    );
  });
});
