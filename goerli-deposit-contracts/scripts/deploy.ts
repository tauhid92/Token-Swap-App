import { ethers } from "hardhat";

async function main() {
  const depositFactory = await ethers.getContractFactory(
    "DepositGoerliAccount"
  );
  const deposit = await depositFactory.deploy(20);

  await deposit.deployed();

  console.log("DepositGoerliAccount deployed to:", deposit.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
