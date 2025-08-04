# References

```sh
https://erc721.org/
https://youtu.be/YPbgjPPC1d0
https://github.com/jiahueic/erc-20-tutorial/tree/main
https://web3js.readthedocs.io/en/v1.10.0/getting-started.html
https://web3js.readthedocs.io/en/v1.10.0/web3-eth-contract.html
https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-call
https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
```

# Initialize proj struct

```sh
git clone https://github.com/dappuniversity/starter_kit nft
```

# Start frontend

```sh
npm run start
```

# Notes

### Data Location

Strings (like arrays and structs) are complex types in Solidity. For such types, you must specify the data location when used as function parameters or return types — either:

memory – temporary, modifiable copy during the function.

calldata – temporary, read-only (usually used in external functions).

storage – persistent on-chain data (typically used for state variables).

### 🔒 require() in Solidity

require() is used to check conditions before running code. If the condition fails, it stops the transaction and shows an error message.

Example:

```sh
require(msg.sender == owner, "Only owner can call this");
```

This helps prevent invalid inputs, protect functions, and keep contracts safe.

### loadWeb3

```sh
async loadWeb3() {
```

👶 “Hey computer, I want to do some work that might take time (like asking MetaMask to connect), and I’ll use the word await later. So I say async.”

```sh
if (window.ethereum) {
```

🔍 “Does the browser (window) have a toy called Ethereum? This means: Is MetaMask installed?”

```sh
App.web3Provider = window.ethereum;
```

🧩 “Cool! Let’s remember that MetaMask connection and save it in our App under web3Provider.”

```sh
window.web3 = new Web3(window.ethereum);
```

🔌 “Now let’s make a new connection cable to Ethereum using MetaMask! We call it web3 so we can use it to talk to the blockchain.”

```sh
try {
```

🧪 “Let’s try doing something that might work… but might also go wrong.”

```sh
await window.ethereum.request({ method: "eth_requestAccounts" });
```

🙋‍♂️ “Hey MetaMask! Can you please let me use some accounts (wallets)? I’m politely asking with a special method.”

```sh
console.log("MetaMask connected.");
```

✅ “If the user says yes, we cheerfully say: Yay! MetaMask is connected!”

```sh
} catch (error) {
```

🚨 “But what if something goes wrong? Like the user says ‘No!’ or MetaMask has a problem?”

```sh
console.error("User denied account access", error);
```

📢 “We’ll tell the computer nerds exactly what went wrong.”

````sh
alert("Please allow MetaMask connection to use the app.");
```sh
📣 “And we’ll show a big pop-up to the user that says: Hey, please click ‘Allow’ in MetaMask!”

```sh
} else if (window.web3) {
````

📦 “Hmm… If MetaMask isn’t there, is this an old browser that has an older Web3 already built in?”

```sh
App.web3Provider = window.web3.currentProvider;
```

📼 “Let’s grab that old Web3 toy’s connection and save it.”

```sh
window.web3 = new Web3(window.web3.currentProvider);
```

🛠️ “Build a new Web3 connection using the old one.”

```sh
console.log("Legacy dapp browser detected.");
```

🕰️ “Tell the developer: ‘Hey, we’re using an old-school browser for dapps.’”

```sh
} else {
```

🚫 “If none of the above is true…”

```sh
alert("Non-Ethereum browser detected. Please install MetaMask!");
```

👎 “Tell the user: You can’t play with our blockchain toys unless you install MetaMask!”

### React 101

componentDidMount() is a React lifecycle method used in class components.

It runs once, right after the component is added to the screen (DOM).

Think of it as:
🛎️ “The component is now visible. Go ahead and fetch data, set things up, or interact with the outside world!”

constructor() ➡️ render() ➡️ componentDidMount()

### Web3 Contract 101

🟢 .call() — Read-only operations
Used for view or pure functions (that do not change state).

Free (no gas, no transaction).

Executed locally on your node (no mining).

Returns a result immediately.

```sh
const name = await contract.methods.name().call();
```

✅ Use .call() when:

- Reading token balances, owner addresses, mappings

- Querying constant values

- You don’t want to change the blockchain

🔴 .send() — State-changing operations

- Used for functions that modify contract state (e.g. mint(), transfer(), setSomething()).

- Costs gas.

- Creates a transaction that gets mined.

- Requires a connected wallet (e.g. MetaMask) and user signature.

```sh
await contract.methods.mint("#FF5733").send({ from: account });
```

✅ Use .send() when:

- Minting or transferring tokens

- Updating variables in storage

- Writing data on-chain
