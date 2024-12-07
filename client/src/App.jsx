// App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import NavigationBar from './components/NavigationBar';
import { Card, CardContent } from './components/ui/card';
import Buy from './components/Buy';
import Sell from './components/Sell';
import './App.css';
import abi from './contractJson/market.json';

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState('Not connected');
  const [error, setError] = useState('');

  useEffect(() => {
    const initializeContract = async () => {
      const contractAddress = '0x14Dc05dd26d4091761DD616B3fE040fEFF00e683';
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;

        if (!ethereum) {
          setError("Please install MetaMask!");
          return;
        }

        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setState({ provider, signer, contract });

        ethereum.on("accountsChanged", (accounts) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          } else {
            setAccount('Not connected');
          }
        });
      } catch (error) {
        console.error("Error initializing contract:", error);
        setError("Failed to connect to the contract. Check console for details.");
      }
    };

    initializeContract();
  }, []);

  return (
    <Router>
      <NavigationBar />
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto p-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h2 className="text-2xl font-bold mb-2">Connected Account</h2>
              <p className="text-gray-600">{account}</p>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
          </Card>
          <Routes>
            <Route path="/buy" element={<Buy contract={state.contract} />} />
            <Route path="/sell" element={<Sell contract={state.contract} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;