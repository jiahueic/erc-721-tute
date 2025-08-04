import React, { Component } from "react";
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
  mint = (color) => {
    console.log(color);
    this.state.colorContract.methods
      .mint(color)
      .send({ from: this.state.account })
      .once("receipt", (receipt) => {
        this.setState({ colors: [...this.state.colors, color] });
      });
  };
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
    const total = await contract.methods.totalSupply().call();
    this.setState({ totalMinted: total });
    // Load Colors
    for (var i = 1; i <= total; i++) {
      var color = await contract.methods.colors(i - 1).call();
      this.setState({ colors: [...this.state.colors, color] });
    }
    console.log("Colours: ", this.state.colors);
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
                {/* Your content here */}
                <h1> Issue Token</h1>
                <form
                  onSubmit={(event) => {
                    // prevent page change
                    event.preventDefault();
                    const color = this.color.value;
                    this.mint(color);
                  }}
                >
                  <input
                    type="text"
                    className="form-control mb-1 placeholder="
                    placeholder="e.g. #FFFFFF"
                    ref={(input) => {
                      this.color = input;
                    }}
                  ></input>
                  <input
                    type="submit"
                    className="btn btn-block btn-primary"
                    value="MINT"
                  ></input>
                </form>
              </div>
            </main>
          </div>
          <hr></hr>
          <div className="row text-center">
            {this.state.colors.map((color, key) => {
              return (
                <div key={key} className="col-md-3 mb-3">
                  <div
                    className="token"
                    style={{ backgroundColor: color }}
                  ></div>
                  <div>{color}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
