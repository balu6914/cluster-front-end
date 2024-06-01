//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 




// <== IMPORTANT LIBRARIES ==>
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LuCopy, LuHome, LuTwitch, LuWallet } from 'react-icons/lu';
import { FaGithub, FaGoogle, FaSteamSymbol } from 'react-icons/fa';
import { BsDiscord } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';


const WalletComponent = ({ accountConnect, isWalletOpen, address }) => {
  const formattedAddress = address ? `${address.slice(0,3)}....${address.slice(-4)}` : '';
  return (
    <>
      {accountConnect && isWalletOpen && (
        <motion.div
          className="walletContainer"
          initial={{ height:'0px', overflow:'hidden' }} 
          animate={{ height:'inherit'}} 
          exit={{ height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h1>Wallet</h1>
          <h1 className='walletIDcon'>
            {formattedAddress} <span><LuCopy /></span>
          </h1>
          <h2>$15.21</h2>
          <button>Deposit</button>
        </motion.div>
      )}
    </>
  );
};


// <== NAVBAR COMPONENT ==>
export default function Navbar() {
  const { address } = useAccount();
  const [accountConnect, setAccountConnect] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (address !== undefined && address.toString().startsWith("0x")) {
      setAccountConnect(true);
    } else {
      console.log(address, "not connected");
      setAccountConnect(false);
    }
  }, [address]);

  return (
    <>
      {!accountConnect && <div className='lockerBlur'></div>}
      <div className={accountConnect ? 'Navbar' : "Navbar navbarLocker"}>
        <Link to={'/home'}><img style={{ height: '2.5rem' }} src='./assets/clusterProtocol.webp' alt="Cluster Protocol" /></Link>
        <div className='NavbarLinks'>
          <Link to="/home">
            <h2 className={location.pathname === '/home' ? 'gPurple' : ''}>Home</h2>
          </Link>
          <Link to="/newcluster">
            <h2 className={location.pathname === '/newcluster' ? 'gPurple' : ''}>New Cluster</h2>
          </Link>
          <Link to="/activeclusters">
            <h2 className={location.pathname === '/activeclusters' ? 'gPurple' : ''}>Active Cluster</h2>
          </Link>
          <Link to="/dataset">
            <h2 className={location.pathname === '/dataset' ? 'gPurple' : ''}>Dataset</h2>
          </Link>
          <Link to="/clusterarena">
            <h2 className={location.pathname === '/clusterarena' ? 'gPurple' : ''}>Cluster Arena</h2>
          </Link>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          {accountConnect && 
            <div className='walletButtonCon' onClick={() => setIsWalletOpen(!isWalletOpen)}>
              <LuWallet /> 
              <h2 style={{ fontSize: '1rem' }} >Wallet</h2>
            </div>
          }
          <WalletComponent accountConnect={accountConnect} isWalletOpen={isWalletOpen} address={address} />
          {/* {accountConnect && <h2 className='hideDesktop' style={{ fontSize: '1.4rem', margin: 0 }}><LuHome /></h2>} */}
          {accountConnect &&
            <div className='WLTConnectbtn'>
              <ConnectButton accountStatus={{ smallScreen: 'avatar' }} chainStatus={{ smallScreen: "none", largeScreen: "none" }} showBalance={{ smallScreen: false, largeScreen: false }} label="Sign in" />
            </div>
          }
          {!accountConnect &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem 0', margin: '1rem 0', alignItems: 'center' }}>
              <h1 className='loginSubheader'>Sign in With Favourite Social Account</h1>
              <div className='WLTConnectbtnLoginSocialContainer'>
                <div className='WLTConnectbtnLoginSocial'><FaSteamSymbol size={20} /></div>
                <div className='WLTConnectbtnLoginSocial'><LuTwitch size={20} /></div>
                <div className='WLTConnectbtnLoginSocial'><FaGoogle size={20} /></div>
                <div className='WLTConnectbtnLoginSocial'><FaGithub size={20} /></div>
              </div>
              <div className='WLTConnectbtnLogin'>
                <ConnectButton accountStatus={{ smallScreen: 'avatar', largeScreen: 'avatar' }} showBalance={false} label="Sign in with Wallet / Social" />
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
