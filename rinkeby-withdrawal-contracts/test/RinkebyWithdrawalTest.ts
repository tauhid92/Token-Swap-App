import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect, assert } from "chai";
import { ethers } from "hardhat";

describe("Ownership", () => {
  it("should show the correct owner", async () => {});
  it("should only let owner pause the contract", async () => {});
  it("should let owner resume the contract", async () => {});
});

describe("Limits and balances", () => {
  it("should show the exact balance at the inititialization", async () => {});
  it("should show the correct balance after transaction", async () => {});
});

describe("Pause", () => {
  it("should be paused when balance hits zero", async () => {});
  it("should be paused when owner decides to pause it", async () => {});
  it("should resume when owner decides to resume it", async () => {});
});

describe("Events", () => {
  it("should emit token transfer event for the right address with right amount", async () => {});
  it("should emit created event with right balance", async () => {});
});

describe("Transfer", () => {
  it("should only let owner transfer the tokens", async () => {});
  it("should transfer only within balance", async () => {});
  it("should revert if amount is higher than the balance", async () => {});
  it("should revert if amount to be transferred is equal to zero", async () => {});
});
