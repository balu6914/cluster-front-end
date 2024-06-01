//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 


// <=== IMPORTANT LIBRARIES ===>
// React and React Router for building UI and managing routes
import React ,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// RainbowKit for UI components and theming
import { getDefaultWallets, getDefaultConfig, darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

// Wagmi for blockchain functionality
import { configureChains, createConfig, useAccount, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base, zora, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

// Local utility and component imports
import { connectors } from "./utils/wallet";
import { ArcanaConnector } from "@arcana/auth-wagmi";

//Importing Pages
import Home from './pages/Home';
import CreateCluster from './pages/CreateCluster';
import ActiveClusters from './pages/ActiveClusters';
import AboutCluster from './pages/AboutCluster';
import Navbar from './NavAndWallet';

// Framer Motion for animation
import { AnimatePresence } from 'framer-motion';

// Import CSS file
import './App.css';

// <=== CONFIGURATION ===>

// Configure blockchain chains and providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base, zora, goerli],
  [publicProvider()]
);

// Create Wagmi configuration object
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: connectors(chains),
  publicClient,
  webSocketPublicClient,
});

// <=== COMPONENTS AND ROUTING ===>

// Define a component that wraps Routes with location tracking for animations
const RoutesWithLocation = () => {

  // Checking if Account Connected
  const [accountConnect, setAccountConnect] = useState(false);
  const { address } = useAccount();
  useEffect(() => {
    if (address !== undefined && address.toString().startsWith("0x")) {
      setAccountConnect(true);
      }
    else {
      console.log(address, "not connected");
      setAccountConnect(false);
      }}, [address]);
        
  // Get the current location
  const location = useLocation();

  // Render Routes with location tracking and animations
  return (
    <AnimatePresence mode="wait" initial={false}>
      { accountConnect &&
      <Routes location={location} key={location.pathname}>

          <Route path='/' element={<Home />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/NewCluster' element={<CreateCluster />} />
        <Route path='/activeclusters' element={<ActiveClusters/>} />
        <Route path='/aboutcluster' element={<AboutCluster/>} />
      </Routes>
        }
    </AnimatePresence>
  );
};

// Main App component
const App = () => {
  return (
    // Provide Wagmi configuration and RainbowKit provider
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} theme={darkTheme({ 
        accentColor: '#9f61ff', 
        accentColorForeground: 'white', 
        borderRadius: 'medium', 
        fontStack: "poppins", 
        overlayBlur: 'small', 
      })}>
        {/* Use React Router for navigation */}
        <Router>
          {/* Include Navbar component */}
          <Navbar />
          {/* Render Routes with location tracking */}
          <RoutesWithLocation />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default App;
