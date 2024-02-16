import React, { useState } from 'react';
import { useTodoList } from '../context/TodoListContext';
import styled from 'styled-components';
import { colors } from '../constant/color';
import { SubTitle, Body, Checkbox, Button } from '../style/Texts';
import ClockLoader from 'react-spinners/ClockLoader';
import toast from 'react-hot-toast';
import Cross from './Svg/Cross';
import Check from './Svg/Check';
import BeatLoader from "react-spinners/BeatLoader";
import InformationModalFunction from './Modal';

const Sidebar = () => {
  const { tasks, setNewTask } = useTodoList();

  return (
    <SidebarContainer>
      <Header>
        <SubTitle>Tasks</SubTitle>
      </Header>
      {!tasks && (
        <NoTaskDiv>
          <BeatLoader
            color={colors.appBg}
            size={20}
          />
        </NoTaskDiv>
      )}
      {tasks && tasks.length === 0 && (
        <NoTaskDiv>
          <Body>No Task</Body>
        </NoTaskDiv>
      )}
      {tasks && tasks.length > 0 && (
        <TaskListContainer>
          <TaskList>
            {tasks.map((task, index) => {
              if (task) {
                return (
                  <TaskItemFunction
                    key={index}
                    task={task}
                  />
                );
              } else {
                return (
                  <LoadingTask key={index} />
                );
              }
            })}
          </TaskList>
          <AddTaskContainer>
            <Button
              $bgcolor={colors.primary}
              $hoverbgcolor={colors.primaryHover}
              onClick={() => setNewTask(true)}
            >New Task</Button>
          </AddTaskContainer>
        </TaskListContainer>
      )
      }
    </SidebarContainer >
  );
};

const AddTaskContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 5px;
`;

const LoadingTask = styled.div`
  padding: 10px 5px;
  background-color: ${colors.subContainerBg};
  border-radius: 5px;
  height: 40px;
  animation: glow 2s infinite;
  @keyframes glow {
    0% {
      background-color: ${colors.subContainerBg};
    }
    50% {
      background-color: ${colors.appBg};
    }
    100% {
      background-color: ${colors.subContainerBg};
    }
  }
`;

const TaskListContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  margin-bottom: 5px;
`

const TaskItemFunction = ({ task }) => {
  const { setSelectedTask,
    toggleCompleted,
    setIsPendingCompleted,
    loadTasks,
    deleteTask,
  } = useTodoList();
  const [displayModal, setDisplayModal] = useState(false);
  const [hash, setHash] = useState('');
  const [successMsg, setSuccessMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleCheckboxChange = async () => {
    try {
      const isCompleted = !task.completed;

      setDisplayModal(true);
      setIsPendingCompleted(task.id, true);
      const hash = await toggleCompleted(task.id);
      setHash(hash.hash);
      hash.wait().then(() => {
        loadTasks();
        isCompleted ? toast.success("Task completed successfully") :
          toast.success("Task uncompleted successfully");
        isCompleted ? setSuccessMsg("Task completed successfully") :
          setSuccessMsg("Task uncompleted successfully");
      });
    } catch (error) {
      setErrorMsg("Error completing task");
      setIsPendingCompleted(task.id, false);
    }
  }

  const handleRemoveTask = async () => {
    try {
      console.log('remove task')
      setDisplayModal(true);
      setIsPendingCompleted(task.id, true);
      const hash = await deleteTask(task.id);
      setHash(hash.hash);
      hash.wait().then(() => {
        loadTasks();
        toast.success("Task removed successfully");
        setSuccessMsg("Task removed successfully");
      });
    } catch (error) {
      setErrorMsg("Error removing task");
      setIsPendingCompleted(task.id, false);
    }
  }

  const handleCloseModal = () => {
    setDisplayModal(false);
    setHash('');
    setSuccessMsg(null);
    setErrorMsg(null);
  }


  return (
    <>
      <TaskItem>
        <InformationModalFunction
          displayModal={displayModal}
          setDisplayModal={handleCloseModal}
          hash={hash}
          successMsg={successMsg}
          errorMsg={errorMsg}
        />
        <Body style={{ cursor: 'pointer' }} onClick={() => setSelectedTask(task)}
        >{task.id}# {task.title}</Body>
        {task.isPendingCompleted ?
          <ClockLoader
            color="grey"
            size={20}
            onClick={() => setDisplayModal(!displayModal)}
          /> :
          <ItemOptions>
            <Checkbox
              checked={task.completed}
              onChange={() => handleCheckboxChange()}
            />
            <Cross
              onClick={() => handleRemoveTask()}
              color={colors.border}
              $hovercolor={colors.dangerHover}
              width='3'
            />
          </ItemOptions>
        }
      </TaskItem>
    </>
  );
}

const ItemOptions = styled.div`
  display: flex;
  align-items: center;
`;

const SidebarContainer = styled.div`
  width: 25%;
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

const NoTaskDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  border-radius: 15px;
`;

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  padding: 0 5px;
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

const TaskItem = styled.div`
  padding: 10px 5px;
  height: 40px;
  background-color: ${colors.subContainerBg};
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;


export default Sidebar;
