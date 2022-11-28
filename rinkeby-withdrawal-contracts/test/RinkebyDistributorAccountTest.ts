import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("Rinkeby Distributor Contract", () => {
  async function deployRinkebyDistributorFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const ONE_GWEI = 1_000_000_000;
    const balance = ONE_GWEI;
    const RinkebyDistributor = await ethers.getContractFactory(
      "RinkebyDistributorAccount"
    );
    const rinkeby = await RinkebyDistributor.deploy({
      value: balance,
    });
    await rinkeby.deployed();
    return { rinkeby, balance, owner, otherAccount };
  }
  describe("Ownership", () => {
    it("should show the correct owner", async () => {
      const { rinkeby, owner } = await loadFixture(
        deployRinkebyDistributorFixture
      );

      assert.equal(await rinkeby.owner(), owner.address);
    });
    it("should only let owner pause the contract", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await expect(
        rinkeby
          .connect(otherAccount)
          .pauseContract(
            "RinkebyDistributorAccount: The contract is temporarily paused"
          )
      ).to.be.revertedWith("RinkebyDistributorAccount: You are not the owner.");
      await rinkeby
        .connect(owner)
        .pauseContract(
          "RinkebyDistributorAccount: The contract is temporarily paused"
        );
      await expect(
        rinkeby.connect(owner).transferRinkebyEth(otherAccount.address, 1)
      ).to.be.revertedWith(
        "RinkebyDistributorAccount: The contract is temporarily paused"
      );
    });
    it("should let owner resume the contract", async () => {
      const { rinkeby, owner } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await rinkeby
        .connect(owner)
        .pauseContract(
          "RinkebyDistributorAccount: The contract is temporarily paused"
        );
      assert.equal(await rinkeby.paused(), true);
      await rinkeby.connect(owner).resumeContract();
      assert.equal(await rinkeby.paused(), false);
    });
  });

  describe("Limits and balances", () => {
    it("should show the exact balance at the inititialization", async () => {
      const { rinkeby } = await loadFixture(deployRinkebyDistributorFixture);
      const testValue = ethers.BigNumber.from("1000000000");
      const balance = await rinkeby.balance();
      await expect(balance.eq(testValue)).to.be.true;
    });

    it("should show the correct balance after transaction", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await rinkeby
        .connect(owner)
        .transferRinkebyEth(otherAccount.address, "500000000");
      const testValue = ethers.BigNumber.from("500000000");
      const balance = await rinkeby.balance();
      await expect(balance.eq(testValue)).to.be.true;
    });
  });

  describe("Pause", () => {
    it("should be paused when balance hits zero", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await rinkeby
        .connect(owner)
        .transferRinkebyEth(otherAccount.address, "1000000000");
      assert.equal(await rinkeby.paused(), true);
    });
    it("should resume when owner decides to resume it", async () => {
      const { rinkeby, owner } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await rinkeby
        .connect(owner)
        .pauseContract(
          "RinkebyDistributorAccount: The contract is temporarily paused"
        );
      assert.equal(await rinkeby.paused(), true);
      await rinkeby.connect(owner).resumeContract();
      assert.equal(await rinkeby.paused(), false);
    });
  });

  describe("Events", () => {
    it("should emit token transfer event for the right address with right amount", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await expect(
        rinkeby
          .connect(owner)
          .transferRinkebyEth(otherAccount.address, "500000000")
      )
        .to.emit(rinkeby, "tokenTransferred")
        .withArgs(otherAccount.address, 500000000);
    });
    it("should emit created event with right balance", async () => {
      const { rinkeby } = await loadFixture(deployRinkebyDistributorFixture);

      const event = rinkeby.filters.created("created", 1000000000);
      const logsForm = await rinkeby.queryFilter(event, -10, "latest");

      expect(logsForm).to.be.not.empty;
      assert.equal(logsForm[0].event, "created");
    });
  });

  describe("Transfer", () => {
    it("should only let owner transfer the tokens", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await expect(
        rinkeby
          .connect(owner)
          .transferRinkebyEth(otherAccount.address, "200000000")
      )
        .to.emit(rinkeby, "tokenTransferred")
        .withArgs(otherAccount.address, 200000000);
      await expect(
        rinkeby
          .connect(otherAccount)
          .transferRinkebyEth(otherAccount.address, "200000000")
      ).to.be.revertedWith("RinkebyDistributorAccount: You are not the owner.");
    });
    it("should revert if amount is higher than the balance", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await expect(
        rinkeby
          .connect(owner)
          .transferRinkebyEth(otherAccount.address, "2000000000")
      ).to.be.revertedWith(
        "RinkebyDistributorAccount: The transfer amount requested is higher than the current balance. Or it is below minimum transfer amount"
      );
    });
    it("should revert if amount to be transferred is equal to zero", async () => {
      const { rinkeby, owner, otherAccount } = await loadFixture(
        deployRinkebyDistributorFixture
      );
      await expect(
        rinkeby.connect(owner).transferRinkebyEth(otherAccount.address, "0")
      ).to.be.revertedWith(
        "RinkebyDistributorAccount: The transfer amount requested is higher than the current balance. Or it is below minimum transfer amount"
      );
    });
  });
});
