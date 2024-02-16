import React from 'react';
import { UserProvider } from './context/UserContext';
import { TodoListProvider } from './context/TodoListContext';
import LoginBar from './components/LoginBar';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import styled from 'styled-components';
import { colors } from './constant/color';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <UserProvider>
      <TodoListProvider>
        <Page>
          <Container>
            <LoginBar />
            <BodyContainer>
              <Sidebar />
              <Content />
            </BodyContainer>
          </Container>
        </Page>
        <Toaster />
      </TodoListProvider>
    </UserProvider>
  );
}


const Page = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${colors.bg};
`;

const Container = styled.div`
  width: 700px;
  height: 600px;
  background-color: ${colors.appBg};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  height: 100%;
  border-radius: 5px;
  gap: 15px;
  overflow: hidden;
`;


export default App;