//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 



// <== IMPORTANT LIBRARIES ==>
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

// Define the ClusterItem component
function ClusterItem({ status, title, subtitle, isActive }) {
  return (
    <div className="A_AC_item" >
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div
          className='ACC_itemStatus'
          style={{ background: isActive ? 'radial-gradient(white,green)' : 'radial-gradient(white,red)' }}
        ></div>
        <h1 className='hideMobile'>{status}</h1>
      </div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
    </div>
  );
}

// Define the ActiveClusters component
export default function ActiveClusters() {
  return (
    <motion.div
      style={{ transition: '2s ease' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='GA_bgD_DIV'>
        <img className='GA_bgD' src='./assets/bg_design.svg' alt="Background Design" />
      </div>
      <div style={{ margin: 'auto', width: '90%', marginTop: '7rem' }}>
        <h1>Active Cluster</h1>

        {/* Render ClusterItem components */}
        <ClusterItem status="Online" title="Business Analyst Cluster" subtitle="GeForce x2" isActive={true} />
        <ClusterItem status="Destroyed" title="LLM Trading Bot" subtitle="GeForce x2" isActive={false} />
      </div>
    </motion.div>
  );
}
