
# ToDo DApp Project Documentation

## Overview

The ToDo DApp is a decentralized application that allows users to manage their tasks on the Ethereum blockchain, specifically on the Mumbai Testnet. It leverages smart contracts to create, toggle, and delete tasks securely and transparently. This document outlines the project structure, including the frontend React application and the smart contract development.

## Features

- **User Authentication**: Users can log in using their Ethereum wallet (e.g., MetaMask).
- **Task Management**: Users can create new tasks, mark tasks as completed, and delete tasks.
- **Blockchain Integration**: All task operations are performed on the blockchain, ensuring data integrity and security.
- **Responsive Design**: The application is designed to be responsive, providing a seamless experience on both desktop and mobile devices.

## Tech Stack

- **Frontend**: React.js, styled-components for styling, ethers.js for Ethereum blockchain interaction.
- **Smart Contract**: Solidity for Ethereum smart contract, deployed on the Mumbai Testnet.
- **Other Tools**: react-hot-toast for notifications, react-spinners for loading indicators.

## Project Structure

### Frontend

- `App.js`: The main component that wraps other components within `UserProvider` and `TodoListProvider`.
- `context/UserContext.js`: Context for managing user authentication and network switching.
- `context/TodoListContext.js`: Context for managing tasks (create, toggle, delete, and fetch tasks).
- `components/LoginBar.js`: Component for displaying login information and network switching button.
- `components/Sidebar.js`: Sidebar component for displaying tasks and a button to add new tasks.
- `components/Content.js`: Main content area for displaying task details or a form to add a new task.
- `components/Modal.js`: Modal component for displaying transaction information.

### Smart Contract

- `contracts/TodoList.sol`: Solidity smart contract for task management (create, toggle completion, delete tasks).

## Setup and Installation

### Requirements

- Node.js and npm
- Ethereum wallet (e.g., MetaMask) installed in your browser
- An account on the Mumbai Testnet with some test MATIC for transactions

### Steps

1. **Clone the Repository**

   ```
   git clone https://github.com/your-username/todo-dapp.git
   cd todo-dapp
   ```

2. **Install Dependencies**

   ```
   npm install
   ```

3. **Configure Environment**

   - Rename `.env.example` to `.env`.
   - Update the `REACT_APP_CONTRACT_ADDRESS` with your deployed contract address.

4. **Run the Application**

   ```
   npm start
   ```

5. **Interact with the DApp**

   - Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Connect your Ethereum wallet.
   - Start managing your tasks on the blockchain!

## Smart Contract Deployment

1. Compile the smart contract using Hardhat or Truffle.
2. Deploy the smart contract to the Mumbai Testnet.
3. Update the frontend `.env` file with the deployed contract address.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes or improvements.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.