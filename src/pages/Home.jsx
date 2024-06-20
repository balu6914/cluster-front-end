//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 



// <== HOME COMPONENT ==>
import React from 'react';
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default  function Home(){
  return (
    <AnimatePresence>
        <div style={{ transition: '2s ease' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>

        {/* Background image container */}
        <div className='GA_bgD_DIV'>
          <img className='GA_bgD' src='./assets/bg_design.svg' alt="Background Design"></img>
        </div>
        
        {/* Home options container */}
        <div className="HomeOptionsContainer">
          {/* Option 1: Deploy Cluster */}
          <motion.div className="HomeOption" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1>Deploy Cluster</h1>
            <p>Deploy a Decentralized Ray Cluster Protocol</p>
            <Link to={'/newcluster'}>
              <button>Deploy</button>
            </Link>
          </motion.div>

          {/* Option 2: Cluster Models (Coming Soon) */}
          <motion.div className="HomeOption" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1>Cluster Models</h1>
            <p>Deploy any AI model on Cluster Protocol</p>
            <button style={{backgroundImage: 'linear-gradient(45deg, rgb(0 0 0), #0e2835e0, #000000)', boxShadow: '0 0 3rem #284f5d'}}>
              Coming Soon
            </button>
            </motion.div>

          {/* Option 3: Datasets (Coming Soon) */}
          <motion.div className="HomeOption" 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h1>Datasets</h1>
            <p>Deploy any Dataset on Cluster Protocol</p>
            <button style={{backgroundImage: 'linear-gradient(45deg, rgb(0 0 0), #0e2835e0, #000000)', boxShadow: '0 0 3rem #284f5d'}}>
              Coming Soon
            </button>
        </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};


