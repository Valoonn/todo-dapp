import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback
} from 'react';
import { ethers } from 'ethers';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [provider, setProvider] = useState(undefined);

  const authenticateUser = useCallback(async () => {
    if (!provider) return;

    try {
      const chainId = await provider.getNetwork();
      if (chainId.chainId !== 80001)
        setIsWrongNetwork(true);

      const accounts = await provider.listAccounts();

      if (accounts.length !== 0)
        setUser({ address: accounts[0] });
      else
        setUser(null);

    } catch (error) {
      console.error("Error authenticating user:", error);
    }
  }, [provider]);

  const login = async () => {
    if (!provider) return;

    try {
      const chainId = await provider.getNetwork();
      if (chainId.chainId !== 80001)
        setIsWrongNetwork(true);

      const accounts = await provider.send("eth_requestAccounts", []);

      setUser({ address: accounts[0] });
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const changeNetwork = async () => {
    if (!provider) return;

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x13881' }],
    }).then(() => { setIsWrongNetwork(false) })
      .catch((error) => {
        console.error("Error changing network:", error);
      });
  };

  const addMumbaiNetwork = async () => {
    if (!provider) return;

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x13881',
          chainName: 'Mumbai Testnet',
          rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
          nativeCurrency: {
            name: 'Matic',
            symbol: 'MATIC',
            decimals: 18
          },
          blockExplorerUrls: ['https://mumbai.polygonscan.com/']
        }
      ]
    }).catch((error) => {
      console.error("Error adding Mumbai network:", error);
    });
  }

  const handleNetworkSwitch = async () => {
    if (isWrongNetwork) {
      try {
        await changeNetwork(); // Attempt to switch
      } catch (switchError) {
        console.log("Switch Error, trying to add the network...");
        try {
          await addMumbaiNetwork(); // Attempt to add if switch fails
        } catch (addError) {
          console.error("Failed to add the network:", addError);
        }
      }
    }
  };

  useEffect(() => {
    if (!provider) return;

    authenticateUser();

    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0)
        setUser({ address: accounts[0] });
      else
        setUser(null);
    });
  }, [authenticateUser, provider]);

  useEffect(() => {
    if (window.ethereum)
      setProvider(new ethers.providers.Web3Provider(window.ethereum));
    else {
      setProvider(null);
      setUser(null);
    }
  }, []);

  return (
    <UserContext.Provider value={{
      user,
      authenticateUser,
      login,
      handleNetworkSwitch,
      isWrongNetwork,
      provider
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
