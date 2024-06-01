//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 


// <== CREATE CLUSTER COMPONENT ==>
import { AnimatePresence,motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { LuArrowDown, LuArrowUp, LuCoins, LuCpu, LuNetwork, LuNewspaper } from 'react-icons/lu';

export default function CreateCluster(){
    const [clusterName, setClusterName] = useState('Cluster-GPU xy21bd');
    const [selectedDatacenter, setSelectedDatacenter] = useState(null);
    const [selectedSecurity, setSelectedSecurity] = useState('End to End Encrypted');
    const [selectedClusterImage, setSelectedClusterImage] = useState('PyTorch');
    const [selectedGPU, setSelectedGPU] = useState('NVIDIA DGX A100 80GB');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('Daily');
    const [selectedPaymentLength, setSelectedPaymentLength] = useState(2);
    const [summary, setSummary] = useState({});
  
    useEffect(() => {
      setSummary({
        clusterName,
        selectedDatacenter,
        selectedSecurity,
        selectedClusterImage,
        selectedGPU,
        selectedPaymentOption,
        selectedPaymentLength,
      });
    }, [clusterName, selectedDatacenter, selectedSecurity, selectedClusterImage, selectedGPU, selectedPaymentOption, selectedPaymentLength]);
  
    const datacenters = [
      { name: 'Worldwide', img: './icons/worldwide.png' },
      { name: 'US West', img: './icons/us.png' },
      { name: 'Central Mumbai', img: './icons/india.png' },
    ];
  
    const securityOptions = [
      { name: 'SOC2/HPAA', img: './icons/end-to-end-encrypted-image.png' },
      { name: 'End to End Encrypted', img: './icons/end-to-end-encrypted-image.png' }
    ];
  
    const clusterImages = [
      { name: 'Ray App', img: './icons/ray-app-image.png' },
      { name: 'PyTorch', img: './icons/pytorch-image.png' },
      { name: 'Kubernetes', img: './icons/kubernetes-image.png' },
      { name: 'Unreal', img: './icons/unreal-engine-image.png' },
      { name: 'Unity', img: './icons/unity-image.png' }
    ];
  
    const gpuList = [
      { name: 'NVIDIA DGX A100 80GB', img: './icons/nvidia.png' },
      { name: 'NVIDIA GeForce RTX 3090', img: './icons/nvidia.png' },
      { name: 'NVIDIA RTX 3090', img: './icons/nvidia.png' },
      { name: 'NVIDIA GeForce RTX 3080', img: './icons/nvidia.png' },
      { name: 'NVIDIA GeForce GTX Ray Tracing', img: './icons/nvidia.png' },
    ];
  
    const paymentOptions = [
      { name: 'Hourly' },
      { name: 'Daily' },
      { name: 'Weekly' },
    ];
  
    return (
      <motion.div style={{transition:'2s ease'}} initial={{opacity:0, transform:'scale(0.3)'}} animate={{opacity:1, transform:'scale(1)'}} exit={{opacity:0,transform:'scale(2)'}} >
        <div className='GA_bgD_DIV'>
          <img className='GA_bgD' src='./assets/bg_design.svg' alt="Background Design"></img>
        </div>
      
        <div className='NC_2x2'> 
          <div className='NC_2x2_item'>
            <h1 className='NC_2x2_headline'><span><LuNetwork size={25} style={{ translate: '0 3px' }} /></span> Create New Cluster</h1>
            <div className="NC_2x4_item">
              <h3>Name of Cluster</h3>
              <input 
                type="text" 
                placeholder="Enter Cluster Name" 
                value={clusterName} 
                onChange={(e) => setClusterName(e.target.value)} 
              />
            </div>
            <div className="NC_2x4_item">
              <h3>Location of Datacenter</h3>
              <div className="NC_2x4_itemDiv">
                {datacenters.map((datacenter, index) => (
                  <button
                    key={index}
                    className={`NC_2x4-button ${selectedDatacenter === datacenter.name ? 'selected' : ''}`}
                    onClick={() => setSelectedDatacenter(datacenter.name)}
                  >
                    <img src={datacenter.img} style={{ borderRadius: '0' }} alt={datacenter.name} className="NC_2x4-button-image" />
                    {datacenter.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="NC_2x4_item">
              <h3>Security</h3>
              <div className="NC_2x4_itemDiv">
                {securityOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`NC_2x4-button ${selectedSecurity === option.name ? 'selected' : ''}`}
                    onClick={() => setSelectedSecurity(option.name)}
                  >
                    <img src={option.img} alt={option.name} className="NC_2x4-button-image" />
                    {option.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="NC_2x4_item">
              <h3>Cluster Image</h3>
              <div className="NC_2x4_itemDiv">
                {clusterImages.map((image, index) => (
                  <button
                    key={index}
                    className={`NC_2x4-button ${selectedClusterImage === image.name ? 'selected' : ''}`}
                    onClick={() => setSelectedClusterImage(image.name)}
                  >
                    <img src={image.img} alt={image.name} className="NC_2x4-button-image" />
                    {image.name}
                  </button>
                ))}
              </div>
            </div>
            <h1 className='NC_2x2_headline' style={{marginTop:'3rem'}}><span><LuCpu size={25} style={{ translate: '0 3px' }} /></span> Select Your GPU</h1>
            <div className='NC_2x2_GPUDIV'>
              {gpuList.map((image, index) => (
                <button
                  key={index}
                  className={`NC_2x2_GPU-button ${selectedGPU === image.name ? 'selected' : ''}`}
                  onClick={() => setSelectedGPU(image.name)}
                >
                  <img src={image.img} alt={image.name} className="NC_2x4-button-image" />
                  {image.name}
                  <div className='progressbarContainer'>
                    <div className='progressbar'></div>
                  </div>
                </button>
              ))}
            </div>
          </div>
  
          <div className='NC_2x2_item'>
            <h1 className='NC_2x2_headline'><span><LuNewspaper  size={25} style={{ translate: '0 3px' }} /></span> Summary</h1>
            <div className="NC_2x4_item">
              <div className="NC_2x4_itemDiv" style={{width:'100%' ,marginTop:'-1rem', marginBottom:'2rem'}}>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Name:</strong> {summary.clusterName}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Datacenter:</strong> {summary.selectedDatacenter}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Security:</strong> {summary.selectedSecurity}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Cluster Image:</strong> {summary.selectedClusterImage}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>GPU:</strong> {summary.selectedGPU}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Payment Option:</strong> {summary.selectedPaymentOption}</button>
                  <button className='NC_2x4-button SUMMARYADDON'><strong>Payment Length:</strong> {summary.selectedPaymentLength}</button>
              </div>
  
            </div>
  
            <div className="NC_2x4_item">
              <h3>Payment</h3>
              <div className="NC_2x4_itemDiv">
                {paymentOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`NC_2x4-button ${selectedPaymentOption === option.name ? 'selected' : ''}`}
                    onClick={() => setSelectedPaymentOption(option.name)}
                  >
                    {option.name}
                  </button>
                ))}
                <button className='NC_2x4-button' style={{ color: 'rgb(250,250,250)', marginLeft: 'auto', fontWeight: 'bold' }}>
                  <LuArrowDown onClick={() => setSelectedPaymentLength(selectedPaymentLength > 1 ? selectedPaymentLength - 1 : 1)} color='white' /> 
                  {selectedPaymentLength} 
                  <LuArrowUp onClick={() => setSelectedPaymentLength(selectedPaymentLength + 1)} color='white' />
                </button>
              </div>
            </div>
  
            <div className="NC_2x4_item">
              <h3>Average Per Card</h3>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '1.4rem' }}>15.2$ / hr </h2>
              </div>
            </div>
  
            <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Hours </h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>15.2$ / hr </h2>
              </div>
            </div>
            <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Quantity </h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>02</h2>
              </div>
            </div>
            <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Total Cost </h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>$1000 </h2>
              </div>
            </div>
  
            <button className='PayButton'> Pay and Deploy Now</button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  