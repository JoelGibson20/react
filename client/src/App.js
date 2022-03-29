import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";
import SITAPreferencesContract from "./contracts/SITApreferences2.json";
import cryptoMethods, {encryptPreferences, decryptPreferences, genKey, testAESjs} from "./crypto-methods";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SITAPreferencesContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SITAPreferencesContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample); // runExample is run here
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => { 
    //console.log(decryptPreferences(encryptPreferences("1234","test"), "test")); // Tests encryption and decryption methods
    const { accounts, contract } = this.state;

    testAESjs();
    //var key = genKey();
    //var encPref = encryptPreferences("1222", key)
    //console.log("encPref = ", encPref);
    //await contract.methods.setPreferences(encPref,key).send({from: accounts[0]});
    //const retrPref = await contract.methods.getPreferences(accounts[0],key).call()
    //console.log("retr pref = ", retrPref);

    //var decPref = decryptPreferences(retrPref,key);
    //console.log("decPref = ", decPref);

    
    
    
    /* await contract.methods.setPreferences("1234","test").send({from: accounts[0]});
    const pref1 = await contract.methods.getPreferences(accounts[0],"test").call()
    console.log("pref1 = ", pref1) //Preferences successfully stored and retrieved */
    

    
    /*
    // Stores a given value, 5 by default.
    await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.get().call();

    // Update state with the result.
    this.setState({ storageValue: response }); */ 
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 42</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
