import React, { Component } from "react";
import logo from "../logo.png";
import "./App.css";
import Web3 from "web3";
import Color from "../abis/src/contracts/Color.sol/Color.json";
import Addresses from "../abis/addresses.json";
class App extends Component {
  state = {
    account: "",
    colorContract: null,
    colors: [], // your on-chain array
    totalMinted: 0, // if you’ve added totalSupply()
  };
  async componentDidMount() {
    await this.loadWeb3();
    await this.loadBlockchainData();
  }
  async loadWeb3() {
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      window.web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        console.log("MetaMask connected.");
      } catch (error) {
        console.error("User denied account access", error);
        alert("Please allow MetaMask connection to use the app.");
      }
    } else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
      window.web3 = new Web3(window.web3.currentProvider);
      console.log("Legacy dapp browser detected.");
    } else {
      alert("Non-Ethereum browser detected. Please install MetaMask!");
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({ account: accounts[0] });

    // Use chainId instead of netId
    const chainId = await web3.eth.getChainId();
    console.log("Chain ID:", chainId); // ✅ e.g., 1337 (Ganache), 31337 (Hardhat)

    console.log("Full Addresses object:", Addresses); // Debugging
    const chainKey = chainId.toString();
    const contractData = Addresses[chainKey];
    console.log("contractData:", contractData); // Debugging

    const contractAddress = contractData.Color;

    if (!contractAddress) {
      alert("Color contract not deployed to detected chain.");
      return;
    }

    const contract = new web3.eth.Contract(Color.abi, contractAddress);
    this.setState({ colorContract: contract });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Color Tokens
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>Dapp University Starter Kit</h1>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN{" "}
                  <u>
                    <b>NOW! </b>
                  </u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
