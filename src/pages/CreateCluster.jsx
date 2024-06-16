//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 


// <== CREATE CLUSTER COMPONENT ==>
import { AnimatePresence,motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { LuArrowDown, LuArrowUp, LuCoins, LuCpu, LuNetwork, LuNewspaper } from 'react-icons/lu';

export default function CreateCluster(){
    const [clusterName, setClusterName] = useState('');
    const [selectedDatacenter, setSelectedDatacenter] = useState(null);
    const [selectedSecurity, setSelectedSecurity] = useState('End to End Encrypted');
    const [selectedClusterImage, setSelectedClusterImage] = useState('PyTorch');
    const [selectedGPU, setSelectedGPU] = useState('NVIDIA DGX A100 80GB');
    const [selectedPaymentOption, setSelectedPaymentOption] = useState('Daily');
    const [selectedPaymentLength, setSelectedPaymentLength] = useState(1);
    const [summary, setSummary] = useState({});
    const [gpuList, setGpuList] = useState([]);
    const [filterGpuList, setfilterGpuList] = useState([]);
    const [datacenters, setDatacenters] = useState([]);
    const [gpuBid, setgpuBid] = useState(0);
    const [gpuHours, setgpuHours] = useState(0);
    const [gpuTotalCost, setgpuTotalCost] = useState(0);
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
  

    useEffect(() => {
      setfilterGpuList(selectedDatacenter? gpuList.filter(machine => machine.region === selectedDatacenter): gpuList)
    }, [selectedDatacenter]);

    useEffect(() => {
      if (filterGpuList.length > 0){
        setSelectedGPU(filterGpuList[0].machineId);
      }
    }, [filterGpuList]);

    useEffect(() => {
      if (selectedGPU !== null) {
        const selectedMachine = gpuList.find(machine => machine.machineId === selectedGPU);
        if (selectedMachine) {
          setgpuBid(selectedMachine.bidPrice / 1000000);

        }
      }
    }, [selectedGPU, gpuList]);


    useEffect(() => {
      if (gpuBid !== null) {
        let hours;
        switch (selectedPaymentOption) {
          case 'Daily':
            hours = gpuBid * 24;
            break;
          case 'Weekly':
            hours = gpuBid * 24 * 7;
            break;
          case 'Hourly':
          default:
            hours = gpuBid * 1;
            break;
        }
        setgpuHours(hours * selectedPaymentLength );
        setgpuTotalCost(hours * selectedPaymentLength * gpuBid);
      }
    }, [gpuBid, selectedPaymentOption, selectedPaymentLength]);

    // const datacenters = [
    //   { name: 'Worldwide', img: './icons/worldwide.png' },
    //   { name: 'US West', img: './icons/us.png' },
    //   { name: 'Central Mumbai', img: './icons/india.png' },
    // ];
  
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
  
    // setGpuList([
    //   { name: 'NVIDIA DGX A100 80GB', img: './icons/nvidia.png' },
    //   { name: 'NVIDIA GeForce RTX 3090', img: './icons/nvidia.png' },
    //   { name: 'NVIDIA RTX 3090', img: './icons/nvidia.png' },
    //   { name: 'NVIDIA GeForce RTX 3080', img: './icons/nvidia.png' },
    //   { name: 'NVIDIA GeForce GTX Ray Tracing', img: './icons/nvidia.png' },
    // ]);
  
    const paymentOptions = [
      { name: 'Hourly' },
      { name: 'Daily' },
      { name: 'Weekly' },
    ];

    useEffect(() => {
      const fetchAvailableMachines = async () => {
        const response = await fetch('https://api.clusterprotocol.io/api/machine/available');
        const data = await response.json();
        const machines = data.message.map(machine => ({ ...machine, img: './icons/nvidia.png' }));
        setGpuList(machines);
        const uniqueRegions = [...new Set(machines.map(machine => machine.region))];
        const regionsWithImages = uniqueRegions.map(region => ({
          region,
          img: './icons/worldwide.png' 
        }));
  
        setDatacenters(regionsWithImages);
        if (regionsWithImages.length > 0){
          setSelectedDatacenter(regionsWithImages[0].region);
          setSelectedGPU(machines[0].machineId);
        }
      };
    
      fetchAvailableMachines();
    }, []);
    
    return (
      <motion.div style={{transition:'3s ease'}} initial={{opacity:0, transform:'scale(0.3)'}} animate={{opacity:1, transform:'scale(1)'}} exit={{opacity:0,transform:'scale(2)'}} >
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
            <div className="  NC_2x4_item">
            <h3>Location of Datacenter</h3>
            <div className="NC_2x4_itemDiv">
              {datacenters.map((datacenter, index) => (
                <motion.button
                  key={index}
                  className={`NC_2x4-button ${selectedDatacenter === datacenter.region ? 'selected' : ''}`}
                  onClick={() => setSelectedDatacenter(datacenter.region)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={datacenter.img} style={{ borderRadius: '0' }} alt={datacenter.region} className="NC_2x4-button-image" />
                  {datacenter.region}
                </motion.button>
              ))}
            </div>
          </div>
            <div className="NC_2x4_item">
              <h3>Security</h3>    <div className="NC_2x4_itemDiv">
              {securityOptions.map((option, index) => (
                <motion.button
                  key={index}
                  className={`NC_2x4-button ${selectedSecurity === option.name ? 'selected' : ''}`}
                  onClick={() => setSelectedSecurity(option.name)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }} // Adding delay to stagger animations
                >
                  <img src={option.img} alt={option.name} className="NC_2x4-button-image" />
                  {option.name}
                </motion.button>
              ))}
            </div>
            </div>
            <div className="NC_2x4_item">
              <h3>Cluster Image</h3>
              <div className="NC_2x4_itemDiv">
                {clusterImages.map((image, index) => (
                  <motion.button
                    key={index}
                    className={`NC_2x4-button ${selectedClusterImage === image.name ? 'selected' : ''}`}
                    onClick={() => setSelectedClusterImage(image.name)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }} // Adding delay to stagger animations
                  >
                    <img src={image.img} alt={image.name} className="NC_2x4-button-image" />
                    {image.name}
                  </motion.button>
                ))}
              </div>
            </div>
            <h1 className='NC_2x2_headline' style={{marginTop:'3rem'}}>GPU in {selectedDatacenter}</h1>
            <div className='NC_2x2_GPUDIV'>
            {filterGpuList.map((machine, index) => (
              <motion.button
                key={machine.machineId} // Unique key to ensure re-animation on respawn
                style={{ fontWeight: '' }}
                className={`NC_2x2_GPU-button ${selectedGPU === machine.machineId ? 'selected' : ''}`}
                onClick={() => setSelectedGPU(machine.machineId)}
                whileHover={{ scale: 1.05 }} // Scale up on hover
                whileTap={{ scale: 0.25 }} // Scale down on tap
                initial={{ opacity: 0, y: -30 }} // Initial state before animation
                animate={{ opacity: 1, y: 0 }} // Animate to this state
                exit={{ opacity: 0, y: -10 }} // Exit animation for smooth transition
                transition={{ duration: 0.2 }} // Animation duration
              >
                <img src={machine.img} alt={machine.gpuName} className="NC_2x4-button-image" />
                {machine.gpuName}
                <div style={{ marginTop: '-0.4rem', fontSize: '0.8rem', color: 'gray' }}>
                  {machine.cpuName}
                </div>
                <div className='progressbarContainer'>
                  <div className='progressbar'></div>
                </div>
              </motion.button>
            ))}
          </div>

          </div>
  
          <div className='NC_2x2_item'>
            <h1 className='NC_2x2_headline'> Summary</h1>
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
                  <motion.button
                    key={index}
                    className={`NC_2x4-button ${selectedPaymentOption === option.name ? 'selected' : ''}`}
                    onClick={() => setSelectedPaymentOption(option.name)}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }} 
                  >
                    {option.name}
                  </motion.button>
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
                <h2 style={{ marginLeft: 'auto', fontSize: '1.4rem' }}>{gpuBid}$ / hr </h2>
              </div>
            </div>
  
            {/* <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Hours </h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>15.2$ / hr </h2>
              </div>
            </div> */}
            <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Hours</h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>{gpuHours} hours</h2>
              </div>
            </div>
            <div className="NC_2x4_item" style={{ margin: '-0.7rem 0' }}>
              <h2 style={{ fontSize: '0.8rem', color: 'grey', width: "30%" }}>Total Cost </h2>
              <div className="NC_2x4_itemDiv">
                <h2 style={{ marginLeft: 'auto', fontSize: '0.8rem', color: 'grey' }}>$ {gpuTotalCost} </h2>
              </div>
            </div>
  
            <button className='PayButton'> Pay and Deploy Now</button>
          </div>
        </div>
      </motion.div>
    );
  };
  
  