# Cluster GPU Market Place Documentation

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Components](#components)
    - [arcanaAuthProvider](#arcanaauthprovider)
    - [Wallet Integration](#wallet-integration)
    - [App.js](#appjs)
    - [NavAndWallet](#navandwallet)
    - [Home Screen](#home-screen)
    - [Create Cluster](#create-cluster)
    - [Active Clusters](#active-clusters)
    - [About Cluster](#about-cluster)
5. [Styling](#styling)
6. [License](#license)

## Introduction

**_Cluster GPU Market Place_** is a web application designed to facilitate the management and utilization of GPU clusters. This documentation provides an overview of the project structure, key components, and their functionalities.


![Banner](https://i.ibb.co/wS8PW2F/Screenshot-2024-06-01-170117.png "GPU Market Place")

## Installation

To get started with the Cluster GPU Market Place, follow these steps:

1. **Install Bun**:
    ```bash
    npm install bun
    ```

2. **Install Project Dependencies**:
    ```bash
    bun install
    ```

3. **Run the Application**:
    ```bash
    npm run start
    ```

## Project Structure

The project is organized as follows:

- **`utils/getArcanaAuth.js`**: Contains the `arcanaAuthProvider` function.
- **`utils/wallet.js`**: Provides functionalities for integrating new wallets.
- **`App.js`**: Manages React routing and includes **wagmi** and **rainbowkit** providers.
- **`NavAndWallet.jsx`**: Contains the navigation bar, wallet connection buttons, and the login screen.
- **`pages/Home.jsx`**: Serves as the home screen, allowing navigation to Cluster, Model, and Datasets services.
- **`pages/CreateCluster.jsx`**: Provides the interface for creating new clusters.
- **`pages/ActiveClusters.jsx`**: Displays all active and destroyed clusters.
- **`pages/AboutCluster.jsx`**: Shows information about a specific cluster.
- **`App.css`**: Contains the global stylesheet for the entire application.

## Components

### arcanaAuthProvider

Located in **`utils/getArcanaAuth.js`**, this component is responsible for handling authentication through the Arcana network. It sets up the necessary authentication provider for the application.

### Wallet Integration

Located in **`utils/wallet.js`**, this module allows for swift integration of new wallets. It provides the necessary functions and configurations to support various wallet services.

### App.js

**`App.js`** is the main file responsible for setting up the application. It includes:

- **🔄 React Routing**: Manages navigation between different components.
- **🔗 Wagmi Provider**: A provider from the **wagmi** library for managing Ethereum-related hooks and utilities.
- **🌈 RainbowKitProvider**: A provider from the **rainbowkit** library for managing wallet connections.

### NavAndWallet

Located in **`NavAndWallet.jsx`**, the NavAndWallet component includes:

- **🗺️ Navigation Links**: Links to various parts of the application.
- **💼 Wallet Connect Button**: Button to connect a wallet.
- **💸 Deposit Button**: Button for depositing funds into the wallet.
- **🔐 LoginScreen**: Embedded within the navbar to handle user login.

### Home Screen

Located in **`Home.jsx`**, the Home Screen component provides navigation to the following services:

- **🔗 Cluster**
- **🔗 Model**
- **🔗 Datasets**

This is the primary landing page for the application.

### Create Cluster

Located in **`CreateCluster.jsx`**, this component provides the user interface for creating a new GPU cluster. It includes forms and inputs necessary for cluster configuration.

### Active Clusters

Located in **`ActiveClusters.jsx`**, this component displays all the active and destroyed clusters. It provides an overview of the current status of each cluster.

### About Cluster

Located in **`AboutCluster.jsx`**, this component displays detailed information about a specific cluster. It includes metrics, usage details, and other relevant data.

## Styling

The global styles for the application are contained in **`App.css`**. This file includes all the CSS rules and styles that define the look and feel of the application.

## License

**_Cluster GPU Market Place_** is licensed under the **GNU General Public License v3.0 (GPL-3.0)**.

```
© 2024 Cluster GPU Market Place
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
```