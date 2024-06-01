//  *@ CLUSTER PROTOCOL - GPU MARKETPLACE
//  *GNU General Public License v3.0
//  *Copyright (C) 2024 



import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { getAuthProvider } from "./getArcanaAuth";
import { ArcanaConnector } from "@arcana/auth-wagmi";
import { rainbowWallet, coinbaseWallet, walletConnectWallet, metaMaskWallet, phantomWallet, braveWallet } from '@rainbow-me/rainbowkit/wallets';
import { okxWallet } from '@rainbow-me/rainbowkit/wallets';

export const ArcanaRainbowConnector = ({ chains }) => {
  return {
    id: "arcana-auth",
    name: "Cluster Protocol",
    iconUrl: 'https://pbs.twimg.com/profile_images/1746246376756039680/qg_oAWkf_400x400.jpg',
    headerUrl:'https://pbs.twimg.com/profile_images/1746246376756039680/qg_oAWkf_400x400.jpg',
    iconBackground: "#101010",
    createConnector: () => {
      const connector = new ArcanaConnector({
        chains,
        options: {
          auth: getAuthProvider()
        }
      });
      return {
        connector
      };
    }
  };
};



const projectId = "1143da99165dceec4520c204481f3d72";
const connectors = (chains) =>
  connectorsForWallets(
  [
    {
      groupName: 'Social Login',
      wallets: [ArcanaRainbowConnector({ chains })]
    },
  {
    groupName: 'Recommended By Cluster Protocol',
    wallets: [metaMaskWallet({ chains,projectId }), walletConnectWallet({ chains,projectId }),okxWallet({ chains,projectId })]
  },
  
]

);

export { connectors };
