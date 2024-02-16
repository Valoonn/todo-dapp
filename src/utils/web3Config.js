import { ethers } from 'ethers';
import abi from './todoContractAbi.json';

const contractAddress = "0x45C334d4271a77581600008B1c6B945BC5a111bC";

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
