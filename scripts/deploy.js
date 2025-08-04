// scripts/deploy.js
const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  const Color = await ethers.getContractFactory("Color");
  const color = await Color.deploy();

  await color.waitForDeployment(); // ✅ new method
  const address = await color.getAddress();
  await color.mint("#1fab89");
  await color.mint("#ff8080");
  await color.mint("#ffba92");
  await color.mint("#cbf1d6");
  console.log("Token deployed to:", address); // ✅ new way to get address

  // Get the current network ID
  const network = await ethers.provider.getNetwork();
  const chainId = network.chainId.toString();
  // Load existing addresses file (if any)
  const addressesPath = path.join(
    __dirname,
    "..",
    "src",
    "abis",
    "addresses.json"
  );
  let addresses = {};
  if (fs.existsSync(addressesPath)) {
    addresses = JSON.parse(fs.readFileSync(addressesPath));
  }
  // Update the address
  addresses[chainId] = {
    ...(addresses[chainId] || {}),
    Color: address,
  };

  // Save it
  fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
