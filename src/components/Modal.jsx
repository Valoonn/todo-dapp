import React from 'react';
import styled from 'styled-components';
import { colors } from '../constant/color';
import Cross from './Svg/Cross';
import { Body, Button } from '../style/Texts';
import ClockLoader from 'react-spinners/ClockLoader';
import Check from './Svg/Check';

const InformationModalFunction = ({
  displayModal,
  setDisplayModal,
  hash,
  successMsg,
  errorMsg
}) => {
  return (
    <>
      {displayModal && (
        <BackgroundModal>
          <HashInformationModal>
            <ModalHeader>
              <Cross
                onClick={() => setDisplayModal(false)}
                color={colors.appBg}
                $hovercolor={colors.dangerHover}
              />
            </ModalHeader>
            <ModalBody>
              {hash && !successMsg && !errorMsg && (
                <>
                  <Body>Transaction is pending ...</Body>
                  <ClockLoader color="grey" size={20} />
                </>
              )}
              {!hash && !successMsg && !errorMsg && (
                <>
                  <Body>Waiting for requests to be indexed ...</Body>
                  <ClockLoader color="grey" size={20} />
                </>
              )}
              {successMsg && (
                <>
                  <Body>{successMsg}</Body>
                  <Check size="50px"
                    $hovercolor='green'
                    cursor='default'
                  />
                </>
              )}
              {errorMsg && (
                <>
                  <Body>{errorMsg}</Body>
                  <Cross
                    size="50px"
                    color={colors.danger}
                    $hovercolor={colors.danger}
                    cursor='default'
                  />
                </>
              )}
              {hash && (
                <Button
                  $bgcolor={colors.primary}
                  $hoverbgcolor={colors.primaryHover}
                  onClick={() => window.open(`https://mumbai.polygonscan.com/tx/${hash}`)}
                >View on Explorer</Button>
              )}
            </ModalBody>
            <ModalHeader/>
          </HashInformationModal>
        </BackgroundModal>
      )}
    </>
  );
}

const ModalHeader = styled.div`
  display: flex;
  height: 10%;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
`;

const ModalBody = styled.div`
  flex-grow: 1;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const BackgroundModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
`;

const HashInformationModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 300px;
  min-height: 150px;
  transform: translate(-50%, -50%);
  background-color: ${colors.containerBg};
  padding: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`;


export default InformationModalFunction;