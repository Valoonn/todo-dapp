import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getContract } from '../utils/web3Config';
import { useUser } from './UserContext';
import toast from 'react-hot-toast';

const TodoListContext = createContext();

export const TodoListProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [deletedTasks, setDeletedTasks] = useState(undefined);
  const [selectedTask, setSelectedTask] = useState(undefined);
  const [newTask, setNewTask] = useState(false);
  const {
    user,
    authenticateUser,
    isWrongNetwork,
    handleNetworkSwitch
  } = useUser();
  const [contract, setContract] = useState(null);

  const loadTasks = useCallback(async (setToLastest = false) => {
    try {
      if (isWrongNetwork) {
        console.log("Wrong network.");
        setTasks([]);
        return;
      }

      const taskIds = await contract.getMyTasks();
      setTasks(new Array(taskIds.length).fill(undefined));

      const tasksPromises = taskIds.map(id => contract.getTask(id));

      for (let i = 0; i < taskIds.length; i++) {
        const task = await tasksPromises[i];
        const formattedTask = {
          id: Number(task.id),
          title: task.title,
          content: task.content,
          completed: task.completed,
          isActive: task.isActive,
          owner: task.owner,
          isPendingCompleted: false
        };

        setTasks(tasks => {
          const newTasks = [...tasks];
          newTasks[i] = formattedTask;
          return newTasks;
        });

        if (setToLastest && i === taskIds.length - 1) {
          setSelectedTask(formattedTask);
        }
      }
    } catch (error) {
      console.log("Error loading tasks:", error);
      toast.error("Error loading tasks");
    }
  }, [contract, isWrongNetwork]);


  const loadDeletedTasks = useCallback(async () => {
    try {
      if (isWrongNetwork) {
        console.log("Wrong network.");
        setDeletedTasks([]);
        return;
      }
      const taskIds = await contract.getMyDeletedTasks();
      const tasksPromises = taskIds.map(id => contract.getTask(id));
      const fetchedTasks = await Promise.all(tasksPromises);

      const formattedTasks = fetchedTasks.map(task => ({
        id: Number(task.id),
        title: task.title,
        content: task.content,
        completed: task.completed,
        isActive: task.isActive,
        owner: task.owner,
        isPendingCompleted: false
      }));

      setDeletedTasks(formattedTasks);
    } catch (error) {
      console.log("Error loading deleted tasks:", error);
      toast.error("Error loading deleted tasks");
    }
  }, [contract, isWrongNetwork]);


  const createTask = async (title, content) => {
    try {
      setTasks([...tasks, {
        id: tasks.length + 1,
        title,
        content,
        completed: false,
        isActive: true,
        owner: user.address,
        isPendingCompleted: true
      }]);
      const hash = await contract.createTask(title, content);
      return hash;
    } catch (error) {
      console.error("Error creating task:", error);
      throw error;
    }
  };

  const setIsPendingCompleted = (id, status) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          isPendingCompleted: status
        };
      }
      return task;
    }));
  }


  const toggleCompleted = async (id) => {
    try {
      const hash = await contract.toggleCompleted(id);
      return hash;
    } catch (error) {
      console.error("Error toggling task completion:", error);
      setIsPendingCompleted(id, false);
      throw error;
    }
  };

  const deleteTask = async (id) => {
    try {
      const hash = await contract.deleteTask(id);
      return hash;
    } catch (error) {
      console.error("Error deleting task:", error);
      throw error;
    }
  }

  useEffect(() => {
    const loadContract = async () => {
      if (user && !contract) {
        try {
          const loadedContract = await getContract();
          setContract(loadedContract);
        } catch (error) {
          console.error("Error loading contract:", error);
          toast.error("Error loading contract");
        }
      } else {
        setTasks([]);
        setDeletedTasks([]);
      }
    };

    loadContract();
  }, [user, contract]);

  useEffect(() => {
    if (contract && user) {
      setTasks(undefined);
      setDeletedTasks(undefined);

      loadTasks();
      loadDeletedTasks();
    }
    if (!user) setSelectedTask(null);
  }, [contract, loadTasks, loadDeletedTasks, user]);

  return (
    <TodoListContext.Provider value={{
      tasks,
      deletedTasks,
      loadTasks,
      createTask,
      toggleCompleted,
      selectedTask,
      setSelectedTask,
      setIsPendingCompleted,
      deleteTask,
      setNewTask,
      newTask
    }}>
      {children}
    </TodoListContext.Provider>
  );
};

export const useTodoList = () => useContext(TodoListContext);
