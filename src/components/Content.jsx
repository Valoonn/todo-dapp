import React, { useState } from 'react';
import { useTodoList } from '../context/TodoListContext';
import styled from 'styled-components';
import { colors } from '../constant/color';
import { Body, Button, SubTitle, Title } from '../style/Texts';
import { marked } from 'marked';
import toast from 'react-hot-toast';
import InformationModalFunction from './Modal';
import { useUser } from '../context/UserContext';

const Content = () => {
  const { selectedTask, newTask } = useTodoList();

  return (
    <ContentContainer>
      {newTask ? (
        <NewTask />
      ) : (
        <DisplayTask selectedTask={selectedTask} />
      )}
    </ContentContainer>
  );
};


const DisplayTask = ({ selectedTask }) => {
  return (
    <>
      <Header>
        {selectedTask ? (
          <SubTitle>{selectedTask.title}</SubTitle>
        ) : null}
      </Header>
      <BodyContainer>
        {selectedTask ? (
          <MarkdownPreview
            dangerouslySetInnerHTML={{ __html: marked(selectedTask.content) }}
          />
        ) : <NoTaskDiv><Body>No Task selected</Body></NoTaskDiv>
        }
      </BodyContainer>
    </>
  );
}

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const { setNewTask, createTask, loadTasks } = useTodoList();
  const { user, login } = useUser();
  const [displayModal, setDisplayModal] = useState(false);
  const [hash, setHash] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const togglePreview = () => setPreview(!preview);

  const handleCreateTask = async () => {
    try {
      if (!title || !content) {
        toast.error("Title and content are required");
        return;
      }
      if (!user) await login();
      setDisplayModal(true);
      const hash = await createTask(title, content)
      setHash(hash.hash);
      await hash.wait();
      toast.success("Task created successfully");
      setSuccessMsg("Task created successfully");
      await loadTasks(true);
      setNewTask(false);
    } catch (error) {
      console.log("Error creating task:", error);
      setErrorMsg("Error creating task");
    }
  }

  return (
    <>
      <InformationModalFunction
        displayModal={displayModal}
        setDisplayModal={setDisplayModal}
        hash={hash}
        successMsg={successMsg}
        errorMsg={errorMsg}
      />
      {!preview ? (
        <>
          <Header>
            <InvisibleInput // Use the styled Input for consistent styling
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={20}
            />
          </Header>
          <BodyContainer>
            <MarkdownEditor
              placeholder="Write your task content in Markdown..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </BodyContainer>
        </>
      ) : (
        <>
          <Header>
            <SubTitle>{title}</SubTitle>
          </Header>
          <BodyContainer>
            <MarkdownPreview
              dangerouslySetInnerHTML={{ __html: marked(content) }}
            />
          </BodyContainer>
        </>
      )}
      <Footer>
        {!preview ? (
          <>
            <Button
              onClick={() => setNewTask(false)}
              $bgcolor={colors.danger}
              $hoverbgcolor={colors.dangerHover}
            >
              Close
            </Button>
            <Button
              onClick={togglePreview}
              $bgcolor={colors.primary}
              $hoverbgcolor={colors.primaryHover}
            >
              Preview
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={handleCreateTask}
              $bgcolor={colors.primary}
              $hoverbgcolor={colors.primaryHover}
            >
              Create
            </Button>
            <Button
              onClick={() => setPreview(false)}
              $bgcolor={colors.danger}
              $hoverbgcolor={colors.dangerHover}
            >
              Close preview
            </Button>
          </>
        )}
      </Footer>
    </>
  );
}

const Footer = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.subContainerBg};
  border-radius: 0 0 5px 5px;
  padding: 10px;
  gap: 10px;
`;


const MarkdownEditor = styled.textarea`
  flex-grow: 1; // Take available space
  background-color: transparent; // Invisible background
  border: none; // No border
  resize: none; // Prevent resizing
  padding: 1rem;
  font-size: 1rem;
  &:focus {
    outline: none; // No focus outline
  }
    &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.appBg};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.subContainerBg};
  }
  & > *:first-child {
    margin-top: 5px;
  }
  & > *:last-child {
    margin-bottom: 5px;
  }
`;

const MarkdownPreview = styled.div`
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto; // Allow scrolling
`;

const InvisibleInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 1.5rem;
  color: transparent;
  background-color: transparent;
  color: black;
  text-align: center;
  &::placeholder {
    color: lightgray;
  }
  &:focus {
    outline: none;
  }
`;

const ContentContainer = styled.div`
  width: 75%;
  max-width: 75%;
  background-color: ${colors.containerBg};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.subContainerBg};
  border-radius: 5px 5px 0 0;
  padding: 10px;
`;

const BodyContainer = styled.div`
  flex-grow: 1;
  display: flex;
  padding: 15px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${colors.appBg};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${colors.subContainerBg};
  }
`;

const NoTaskDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export default Content;
