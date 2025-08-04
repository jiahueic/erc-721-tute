require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: false,
        // runs: 200, // Optional: uncomment if needed later
      },
    },
  },
  paths: {
    sources: "./src/contracts", // Where your Solidity contracts live
    artifacts: "./src/abis", // Where compiled ABIs + bytecode go
  },
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache GUI default
      chainId: 1337, // Optional: use Ganache's chainId (confirm in GUI)
    },
  },
};
