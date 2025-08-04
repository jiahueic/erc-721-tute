const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Color contract", function() {
  let Color;
  let color;
  let owner;
  beforeEach(async function() {
    [owner] = await ethers.getSigners();
    // Get contract factory
    Color = await ethers.getContractFactory("Color");

    // Deploy contract
    color = await Color.deploy();
  });
  describe("Deployment", async function() {
    it("should have correct name and symbol", async function() {
      expect(await color.name()).to.equal("Color");
      expect(await color.symbol()).to.equal("COLOR");
    });
  });

  describe("Transactions", async function() {
    it("creates a new token", async () => {
      const tx = await color.mint("#EC058E");
      // SUCCESS
      // Check ownership of token ID 0
      const tokenOwner = await color.ownerOf(0);
      expect(tokenOwner).to.equal(owner.address);
      // Check balance of owner
      const balance = await color.balanceOf(owner.address);
      expect(balance).to.equal(1);

      // FAILURE: cannot mint same colour twice
      await expect(color.mint("#EC058E")).to.be.revertedWith(
        "Color already exists"
      );
    });
  });

  // Add more tests here
});
