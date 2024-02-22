import { ethers } from 'ethers';
import abi from './todoContractAbi.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export const getContract = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      return contract;
    } else {
      console.error("Ethereum wallet extension like MetaMask is required.");
      return null;
    }
  } catch (error) {
    console.error("Error getting contract:", error);
    return null;
  }
};
