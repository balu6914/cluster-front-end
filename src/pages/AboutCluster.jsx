//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 


// <== IMPORTANT LIBRARIES ==>
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { AiOutlineCloudDownload, AiOutlineCloudUpload } from 'react-icons/ai';
import { MdOutlineSecurity } from 'react-icons/md';
import { SiJupyter, SiPytorch, SiVisualstudio } from 'react-icons/si';
import { TbWorldBolt } from 'react-icons/tb';

export default function AboutCluster() {
    const [runningTime, setRunningTime] = useState("1hr 43 m 32s");
    const [clusterID, setClusterID] = useState("527517db-e52c-41b2-a0bc-d788b7b6221c");
    const [computeRemaining, setComputeRemaining] = useState("21m");
    const [clusterStart, setClusterStart] = useState("01/03/24 10:56:23");
    const [clusterEnd, setClusterEnd] = useState("$0.00");
    const [paid, setPaid] = useState("$12.41");
    const [refunded, setRefunded] = useState("$0.00");
    const [downloadSpeed, setDownloadSpeed] = useState("0.4GB/s");
    const [uploadSpeed, setUploadSpeed] = useState("3.1GB/s");
    const [locationPing, setLocationPing] = useState("10.32GB/s");
    const [location, setLocation] = useState("Germany");
    const [gpuUnits, setGpuUnits] = useState("x2 Units");
    const [gpuType, setGpuType] = useState("GeForce RTX 3070 Ti");

    return (
        <motion.div style={{ transition: '2s ease' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className='GA_bgD_DIV'>
                <img className='GA_bgD' src='./assets/bg_design.svg' alt="Background Design"></img>
            </div>

            <div style={{ margin: 'auto', width: '90%', marginTop: '7rem' }}>
                <h2>Running for : {runningTime}</h2>
                <h3 className='clusterIDContainer'>ClusterID : <span style={{ color: '#29b2f8', fontWeight: '500' }}>{clusterID}</span></h3>
                <h2 style={{ margin: '1rem 0', marginTop: '2rem', fontWeight: '100', color: 'grey', fontSize: '1rem' }}>Compute Remaining: <span style={{ color: '#29b2f8', fontWeight: '500' }}>{computeRemaining}</span></h2>
            </div>

            <div className='AC_progressBarContainer'>
                <div className='AC_progressBar'></div>
            </div>

            <div className='AC_1x4'>
                {[{ title: "Cluster Started", value: clusterStart }, { title: "Cluster End", value: clusterEnd }, { title: "Paid", value: paid }, { title: "Refunded", value: refunded }].map((item, index) => (
                    <div key={index} className='AC_1x4_item'>
                        <h1>{item.title}</h1>
                        <h2>{item.value}</h2>
                    </div>
                ))}
            </div>

            <div className='AC_1x3'>
                {[{
                    title: "Connectivity Tier", buttons: [
                        { icon: <AiOutlineCloudDownload size={18} />, label: "Download Speed", value: downloadSpeed },
                        { icon: <AiOutlineCloudUpload size={18} />, label: "Upload Speed", value: uploadSpeed }]
                }, {
                    title: "Cluster Purpose", buttons: [{ icon: <SiPytorch />, label: "Pytorch" }]
                }, {
                    title: "Security Compliance", buttons: [{ icon: <MdOutlineSecurity />, label: "End-to-End-Encrypted" }]
                }].map((item, index) => (
                    <div key={index} className='AC_1x3_item'>
                        <h1>{item.title}</h1>
                        {item.buttons.map((btn, idx) => (
                            <button key={idx}>
                                <span style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
                                        <span>{btn.icon}</span> {btn.label}
                                    </span>
                                    {btn.value && <h2 style={{ margin: 0, fontSize: '0.8rem' }}>{btn.value}</h2>}
                                </span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>

            <div className='AC_1x3'>
                {[{
                    title: "Location Ping", value: locationPing, button: { icon: <TbWorldBolt />, label: location }
                }, {
                    title: "Development Environment", buttons: [
                        { icon: <SiVisualstudio size={18} />, label: "Visual Studio", value: "Open" },
                        { icon: <SiJupyter size={18} />, label: "Jupyter Notebook", value: "Open" }]
                }, {
                    title: "Cluster GPU", value: gpuUnits, button: { label: gpuType }
                }].map((item, index) => (
                    <div key={index} className='AC_1x3_item'>
                        <h1>{item.title}</h1>
                        <h2 className='gGreen' style={{ margin: 0 }}>{item.value}</h2>
                        {item.button && (
                            <button>
                                <span>{item.button.icon}</span> {item.button.label}
                            </button>
                        )}
                        {item.buttons && item.buttons.map((btn, idx) => (
                            <button key={idx}>
                                <span style={{ display: 'flex', justifyContent: 'space-between', width: '90%', margin: 'auto', alignItems: 'center' }}>
                                    <span style={{ display: 'flex', justifyContent: 'flex-start', gap: '1rem' }}>
                                        <span>{btn.icon}</span> {btn.label}
                                    </span>
                                    {btn.value && <h2 style={{ margin: 0, fontSize: '0.8rem' }}>{btn.value}</h2>}
                                </span>
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
