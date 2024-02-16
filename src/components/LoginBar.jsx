import React from 'react';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';
import { colors } from '../constant/color';
import { Title, Button, Body } from '../style/Texts';
import BeatLoader from "react-spinners/BeatLoader";

const LoginBar = () => {
  const {
    user,
    login,
    isWrongNetwork,
    handleNetworkSwitch,
    provider
  } = useUser();

  const shortenAddress = (address) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  }

  return (
    <LoginContainer>
      <Title>ToDo DApp</Title>
      {user !== null ? (
        <LoginInfo>
          {isWrongNetwork && (
            <Button
              onClick={handleNetworkSwitch}
              $bgcolor={colors.primary}
              $hoverbgcolor={colors.primaryHover}
            >Change Network</Button>
          )}
          <AddressContainer>
            {user ?
              <Body>{shortenAddress(user.address)}</Body>
              : <BeatLoader color={colors.appBg} size={10} />}
          </AddressContainer>
        </LoginInfo>
      ) : (
        provider ? (
          <LoginInfo>
            <Button
              onClick={login}
              $bgcolor={colors.primary}
              $hoverbgcolor={colors.primaryHover}
            >Login</Button>
          </LoginInfo>
        ) : (
          <Alterdiv>
            <Body>Install MetaMask</Body>
          </Alterdiv>
        )
      )}
    </LoginContainer>
  );
};


const LoginContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: ${colors.containerBg};
  border-radius: 15px;
`;

const LoginInfo = styled.div`
  display: flex;
  gap: 10px;
  height: 100%;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Alterdiv = styled.div`
  background-color: ${colors.dangerBg};
  padding: 10px;
  border-radius: 5px;
`;


const AddressContainer = styled.div`
  min-width: 100px;
  background-color: ${colors.subContainerBg};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;


export default LoginBar;
