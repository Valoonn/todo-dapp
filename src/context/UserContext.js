import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback
} from 'react';
import { ethers } from 'ethers';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);

  const provider = useMemo(() => new ethers.providers.Web3Provider(window.ethereum), []);

  const authenticateUser = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await provider.listAccounts();
        const chainId = await provider.getNetwork();
        if (chainId.chainId !== 80001) setIsWrongNetwork(true);
        if (accounts.length !== 0) {
          setUser({ address: accounts[0] });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error authenticating user:", error);
      }
    } else {
      console.error("Ethereum wallet extension like MetaMask is required.");
    }
  }, [provider]);

  const login = async () => {
    console.log("On login function ")

    if (typeof window.ethereum !== 'undefined') {
      try {
        console.log("On login function ")
        const accounts = await provider.send("eth_requestAccounts", []);
        const chainId = await provider.getNetwork();
        if (chainId.chainId !== 80001) setIsWrongNetwork(true);
        setUser({ address: accounts[0] });
      } catch (error) {
        console.log("Error logging in user:", error);
      }
    } else {
      console.log("Ethereum wallet extension like MetaMask is required.");
    }
  };

  const changeNetwork = () => {
    if (window.ethereum) {
      window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }],
      }).then(() => {
        setIsWrongNetwork(false);
      }).catch((error) => {
        console.error("Error changing network:", error);
      });
    }
  };

  useEffect(() => {
    authenticateUser();

    window.ethereum.on('accountsChanged', (accounts) => {
      console.log("accountsChanged", accounts)
      if (accounts.length > 0) {
        setUser({ address: accounts[0] });
      } else {
        setUser(null);
      }
    });
  }, [authenticateUser]);

  return (
    <UserContext.Provider value={{
      user,
      authenticateUser,
      login,
      changeNetwork,
      isWrongNetwork
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
