//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 




// <== IMPORTANT LIBRARIES ==>
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { LuAlertTriangle, LuCheckCircle, LuCheckCircle2, LuCopy, LuHome, LuShieldAlert, LuShieldCheck, LuShieldQuestion, LuTwitch, LuUser, LuWallet } from 'react-icons/lu';
import { FaChevronDown, FaGithub, FaGoogle, FaSteamSymbol } from 'react-icons/fa';
import { BsChevronBarDown, BsDiscord } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";

import { useAccount, useDisconnect } from 'wagmi';


const WalletComponent = ({ accountConnect, isWalletOpen,registrationReq, setIsWalletOpen, setAccountConnect, address, currentUsername, currentUserBalance }) => {
  const walletRef = useRef(null);
  const handleClickOutside = (event) => {
    if (walletRef.current && !walletRef.current.contains(event.target)) {
      setIsWalletOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const formattedAddress = address ? `${address.slice(0, 3)}....${address.slice(-4)}` : '';
  const { disconnect } = useDisconnect();

  return (
    <>
      {accountConnect && isWalletOpen && registrationReq===false && (
        <motion.div
          className="walletContainer"
          initial={{ height: '0px', overflow: 'hidden' }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          ref={walletRef}
          transition={{ duration: 0.2 }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', padding: '0px 5%', alignItems: 'center' }}>
            <h1 className='walletIDcon'>
              {formattedAddress} <span><LuCopy /></span>
            </h1>
            <h1 className='walletIDcon' style={{ cursor: 'pointer' }} onClick={() => { disconnect(); setAccountConnect(false); }}>
              {'Logout'} <span><IoLogOutOutline size={10} /></span>
            </h1>
          </div>
          <h2 style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem', margin: '1.3rem 0', marginBottom: '1.8rem', fontFamily: 'b_reg', fontWeight: 'bold', color: 'white' }}>
            <span style={{ fontSize: '1rem', color: 'gray' }}>$</span>{currentUserBalance} <span><IoMdAddCircleOutline size={35} color='gray' /></span>
          </h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%', padding: '0px 5%', alignItems: 'center', marginBottom: '1rem' }}>
            <h1 style={{ fontSize: '1.2rem', background: 'linear-gradient(45deg, #9a9a9a, #7f7f7f, white)', width: 'max-content', WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text', fontWeight: 'bold', margin: '0 auto' }}>
              {currentUsername}
            </h1>
          </div>
        </motion.div>
      )}
    </>
  );
};



  async function isAccountRegistered(walletAddress) {
      const response = await fetch('https://api.clusterprotocol.io/api/user/isUser', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "userAddress": walletAddress
        })
      });
      
      const data = await response.json();
      if (data.userBool === true) {
        return true;
      } else {
        return false;
      }
    }





// <== NAVBAR COMPONENT ==>
export default function Navbar() {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const [accountConnect, setAccountConnect] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [registrationReq, setRegistrationReq] = useState(false);
  const [inputUsername, setinputUsername] = useState("");
  const [inputName, setinputName] = useState("");
  const [inputSSH, setinputSSH] = useState("");
  const [usernameChosen, setusernameChosen] = useState(false);
  const [usernameAvailable, setusernameAvailable] = useState("");
  const [registrationError, setregistrationError] = useState("");
  const location = useLocation();
  const debounceTimeout = useRef(null);
  const [currentUsername, setCurrentUsername] = useState('@User');
  const [currentUserBalance, setCurrentUserBalance] = useState(0);

  const fetchUsername = async (userAddress) => {
    try {
      const response = await fetch('https://api.clusterprotocol.io/api/user/getUsername', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress }),
      });

      if (!response.ok) {
        console.log('Network response was not ok');
      }

      const data = await response.json();
      setCurrentUsername(data.username);
    } catch (error) {
      console.log('Error fetching username:', error);
    }
  };

  const fetchUserBalance = async (userAddress) => {
    try {
      const response = await fetch('https://api.clusterprotocol.io/api/user/getUsdBalance ', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userAddress }),
      });

      if (!response.ok) {
        console.log('Network response was not ok');
      }

      const data = await response.json();
      setCurrentUserBalance(data.usdBalance);
    }catch (error) {
      console.log('Error fetching username:', error);
    }
  }


  function registerAccount() {
    fetch('https://api.clusterprotocol.io/api/user/register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "userAddress":address,
            "sshKey":inputSSH,
            "name":inputUsername,
         })}
    ).then(
      response => response.json())
      .then(
        data => {
          const success = data.success;
          if (success){
            setRegistrationReq(false);
            setAccountConnect(true);
          }else{
            setregistrationError(data.message);
          }
        }
      )
  }

  useEffect(() => {
    if (accountConnect) {
      fetchUsername(address);
      fetchUserBalance(address);
    }

  }, [accountConnect, address]);
  
  useEffect(() => {
    const checkAccountRegistration = async () => {
      if (address === undefined){
        setAccountConnect(false);
      }
      if (address !== undefined && address.toString().startsWith("0x")) {
        const isRegistered = await isAccountRegistered(address.toString());
        console.log("😅😅isRegistered", isRegistered);
        if (!isRegistered) {
          setinputName("");
          setusernameChosen(false);
          setinputSSH("");
          setinputUsername("");
          setRegistrationReq(true);
          setAccountConnect(true);
        } else {
          setRegistrationReq(false);
          setAccountConnect(true);
          console.log("🫡🫡🍆");
        }
      }
    };
    checkAccountRegistration();
  }, [address]);
  
const checkUsernameAvailability = async () => {
  setusernameAvailable("checking");
  const response = await fetch('https://api.clusterprotocol.io/api/user/userNameStatus', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ "userName":inputUsername })
      });
  if (!response.ok) {
      throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.isTaken){
        setusernameAvailable(false);
        return false;
      }else{
        setusernameAvailable(true);
        return true;
      }
  }


async function handleRegistration() {
  if(registrationError!=="Registering Account"){
      
    setregistrationError("Registering Account");
    if(!inputSSH){
      setregistrationError("SSH Key cannot be Empty!");
      return;
    }
    if(!address){
      setregistrationError("Please Connect Your Wallet!");
      return;
    }
    const availableUser = await checkUsernameAvailability();
    if (!availableUser) {
      setregistrationError("Username already taken");
      return;
    }
      registerAccount();
  }
}


useEffect(() => {
  
  if (debounceTimeout.current) {
    setusernameAvailable("checking");
    clearTimeout(debounceTimeout.current);
  }

  if (inputUsername) {
    debounceTimeout.current = setTimeout(() => {
      checkUsernameAvailability();
    }, 1000); 
  }

  return () => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
  };
}, [inputUsername]);


  const iconVariants = {
    hidden: { opacity: 0,scale:0, x: -100 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      scale:1,
      transition: {
        delay: i * 0.1,
        duration: 0.1
      }
    })
  };

  const buttonVariant = {
    hidden: { opacity: 0,scale:0 },
    visible: (i) => ({
      opacity: 1,
      scale:1,
      transition: {
        delay: i * 0.1,
        duration: 0.1
      }
    })
  };
  const slideinVariant = {
    hidden: { opacity: 0,scale:1, y:-20 },
    visible: (i) => ({
      opacity: 0.7,
      scale:1,
      y:0,
      transition: {
        delay: i * 0.1,
        duration: 0.2
      }
    })
  };


  return (
    <>

      {/* NAVBAR SECTION */}
      {(!accountConnect || registrationReq===true) && <div className='lockerBlur'>
        </div>}
        <div className={(accountConnect && registrationReq===false) ? 'Navbar' : "Navbar navbarLocker"}>
        <Link to={'/home'}><img style={{ height: '2.5rem' }} src='./assets/clusterProtocol.webp' className='navbarLockerimage' alt="Cluster Protocol" /></Link>
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
          {accountConnect && address && registrationReq===false && 
            <div style={{display:'flex', gap:'1rem'}}>
              <div className='walletButtonCon' onClick={() => setIsWalletOpen(!isWalletOpen)}>
                {/* <LuUser size={22} />  */}
                <img src='https://png.pngtree.com/png-clipart/20230418/original/pngtree-photorealistic-ai-generated-futuristic-cyborg-or-robot-avatar-png-image_9066102.png' style={{ height: '2rem', width: '2rem', borderRadius:'50%', marginRight:'0.3rem' }} />
                <h2 style={{ fontSize: '1rem' }} >{currentUsername}</h2>
                <FaChevronDown size={13} style={{ marginLeft: '0.5rem', opacity: '0.3' }} />
              </div>

            </div>
          }
          <WalletComponent currentUserBalance={currentUserBalance} registrationReq={registrationReq} setIsWalletOpen={setIsWalletOpen} accountConnect={accountConnect} setAccountConnect={setAccountConnect} isWalletOpen={isWalletOpen} address={address} currentUsername={currentUsername} />
          {accountConnect && registrationReq===false &&
            <div className='WLTConnectbtn'>
              {/* <ConnectButton accountStatus={{ smallScreen: 'none' }} chainStatus={{ smallScreen: "none", largeScreen: "none" }} showBalance={{ smallScreen: false, largeScreen: false }} label="Sign in" /> */}
            </div>
          }

          
          <div>
           
          {(!accountConnect || registrationReq===true) && <video className='signVideo' src='https://cdn.genmo.dev/results/text_to_video_v3/2024-06-16/09/clxhcsmwp00650clb1tv79tut/video.mp4' autoPlay loop muted playsInline />}
          {/* SIGN IN SECTION */}
          {!address  &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem 0', margin: '1rem 0', maxWidth:'22rem', minWidth:'22rem'}}>
              <Link to={'/home'}><img style={{ height: '3.5rem' }} src='./assets/clusterProtocol.webp' alt="Cluster Protocol" /></Link>
              <h1 className='loginSubheader' style={{textAlign:'left'}}>Sign in With Favourite Social Account</h1>

              <div className='WLTConnectbtnLoginSocialContainer'>
                  <motion.div
                    className='WLTConnectbtnLoginSocial'
                    custom={0}
                    initial='hidden'
                    animate='visible'
                    variants={iconVariants}
                    
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaSteamSymbol size={20} />
                  </motion.div>
                  <motion.div
                    className='WLTConnectbtnLoginSocial'
                    custom={1}
                    initial='hidden'
                    animate='visible'
                    variants={iconVariants}
                    whileTap={{ scale: 0.9 }}
                  >
                    <LuTwitch size={20} />
                  </motion.div>
                  <motion.div
                    className='WLTConnectbtnLoginSocial'
                    custom={2}
                    initial='hidden'
                    animate='visible'
                    variants={iconVariants}
                    
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGoogle size={20} />
                  </motion.div>
                  <motion.div
                    className='WLTConnectbtnLoginSocial'
                    custom={3}
                    initial='hidden'
                    animate='visible'
                    variants={iconVariants}
                    
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaGithub size={20} />
                  </motion.div>
                </div>
                
              <motion.div className='WLTConnectbtnLogin'
                    custom={0}
                    initial='hidden'
                    animate='visible'
                    variants={iconVariants}
                    
                    whileTap={{ scale: 0.9 }}
              >
                <ConnectButton accountStatus={{ smallScreen: 'avatar', largeScreen: 'avatar' }} showBalance={false} label="Sign in with Wallet / Social" />
              </motion.div>
            </div>
          }





          {/* REGISTER SECTION */}
          {accountConnect && address && registrationReq===true &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem 0', margin: '1rem 0', maxWidth:'22rem', minWidth:'22rem'}}>
              <Link to={'/home'}><img style={{ height: '3.5rem' }} src='./assets/clusterProtocol.webp' alt="Cluster Protocol" /></Link>
              <h1 className='loginSubheader' style={{fontSize: '1.3rem', textAlign: 'left', width: 'fit-content', fontFamily: '\'b_reg\''}}>Register your Account</h1>
              
            {usernameChosen===false &&
            <>
            <motion.div className="NC_2x4_item" 
              style={{margin:0}}
              custom={0}
              initial='hidden'
              animate='visible'
              variants={iconVariants}
              
              whileTap={{ scale: 0.9 }}
            >
              <h3>User name</h3>
              <input 
                type="text" 
                placeholder="Enter Username" 
                value={inputUsername} 
                pattern="^[a-zA-Z0-9_]+$"
                onChange={(e) => setinputUsername(e.target.value)} 
                />
            </motion.div>
            {usernameAvailable==="checking" && inputUsername!="" &&
            <motion.div style={{display:'flex', alignItems:'center', gap:'1rem', margin:'0.3rem 0',marginBottom:'1rem', opacity:'0.5', color:'white'}}
              custom={1}
              initial='hidden'
              animate='visible'
              variants={slideinVariant}
              whileTap={{ scale: 0.9 }}
            >
              <img src='icons/loader.gif' style={{width:'1.5rem', height:'1.5rem'}} />

              <h5 style={{fontfamily:'Poppins', margin:'0 0', fontWeight:'bold'}}>Checking Availability</h5>
            </motion.div>
            }
            {usernameAvailable===false &&
            <motion.div style={{display:'flex', alignItems:'center', gap:'1rem', margin:'0.3rem 0',marginBottom:'1rem', opacity:'0.5', color:'red'}}
              custom={1}
              initial='hidden'
              animate='visible'
              variants={slideinVariant}
              whileTap={{ scale: 0.9 }}
            >
              <LuShieldAlert size={20}></LuShieldAlert>
              <h5 style={{fontfamily:'Poppins', margin:'0 0', fontWeight:'bold'}}>The Username is already taken!</h5>
            </motion.div>
            }
            {usernameAvailable===true &&
            <motion.div style={{display:'flex', alignItems:'center', gap:'1rem', margin:'0.3rem 0',marginBottom:'1rem', opacity:'0.5', color:'lime'}}
              custom={1}
              initial='hidden'
              animate='visible'
              variants={slideinVariant}
              whileTap={{ scale: 0.9 }}
            >
              <LuShieldCheck size={20}></LuShieldCheck>
              <h5 style={{fontfamily:'Poppins', margin:'0 0', fontWeight:'bold'}}>The Username Available</h5>
            </motion.div>
            }



            <div style={{display:'flex', gap:'1rem'}}>
            <motion.button 
              onClick={() => {disconnect();}}
              className='btn2'
              custom={1}
              initial='hidden'
              animate='visible'
              variants={buttonVariant}
              whileTap={{ scale: 0.9 }}
              >
              Exit
            </motion.button>
            <motion.button 
              onClick={() => {usernameAvailable===true?setusernameChosen(true):setusernameChosen(false);setregistrationError("")}}
              className='btn2'
              custom={1}
              initial='hidden'
              animate='visible'
              variants={buttonVariant}
              whileTap={{ scale: 0.9 }}
              >
              Next
            </motion.button>
            </div>
          </>
          }
           {usernameChosen===true &&
           <>
            <motion.div className='NC_2x4_item' style={{margin:0}}
            custom={1}
            initial='hidden'
            animate='visible'
            variants={iconVariants}
            whileTap={{ scale: 0.9 }}
            >
              <h3>User name</h3>
              <input
                type="text"
                placeholder="Enter Name"
                value={inputUsername}
                style={{pointerEvents:'none', color:'grey'}}
                readOnly={true}
                onClick={() => {setusernameChosen(false)}}
                />
            </motion.div>

            <motion.div className="NC_2x4_item" style={{margin:0}}
                custom={1}
                initial='hidden'
                animate='visible'
                variants={iconVariants}
                whileTap={{ scale: 0.9 }}
            >
              <h3>SSH Key</h3>
              <input 
                type="text" 
                placeholder="Enter SSH Key" 
                value={inputSSH} 
                onChange={(e) => setinputSSH(e.target.value)} 
                />
            </motion.div>
            {registrationError!=="" &&
            <motion.div style={{display:'flex', alignItems:'center', gap:'1rem', margin:'0rem 0',marginBottom:'0rem', opacity:'0.5', color:registrationError!=="Registering Account" ?'red':'white'}}
              custom={1}
              initial='hidden'
              animate='visible'
              variants={slideinVariant}
              whileTap={{ scale: 0.9 }}
            >
              {registrationError!=="Registering Account" ?<LuAlertTriangle size={20}></LuAlertTriangle> : <img src='icons/loader.gif' style={{width:'1.5rem', height:'1.5rem'}} />            }
              <h5 style={{fontfamily:'Poppins', margin:'0 0', fontWeight:'bold'}}>{registrationError}</h5>
            </motion.div>
            }

            <div style={{display:'flex', gap:'1rem'}}>
              <motion.button onClick={() => {setusernameChosen(false)}} className='btn2'
                custom={1}
                initial='hidden'
                animate='visible'
                variants={buttonVariant}
                whileTap={{ scale: 0.9 }}  
              >
                Back
              </motion.button>
              <motion.button onClick={() => {handleRegistration()}} className='btn2'
                custom={1}
                initial='hidden'
                animate='visible'
                variants={buttonVariant}
                whileTap={{ scale: 0.9 }}  
                >
                Register
              </motion.button>
            </div>
            </>
            }
            </div>
          }
          </div>







        </div>
      </div>
    </>
  );
}
