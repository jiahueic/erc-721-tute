// scripts/deploy.js
const { ethers } = require("hardhat");

async function main() {
  const Color = await ethers.getContractFactory("Color");
  const color = await Color.deploy();

  await color.waitForDeployment(); // ✅ new method

  console.log("Token deployed to:", await color.getAddress()); // ✅ new way to get address
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
