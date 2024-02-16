import React, { useState } from 'react';
import { useTodoList } from '../context/TodoListContext';
import { getContract } from '../utils/web3Config';

const TaskForm = () => {
  const [content, setContent] = useState('');
  const { loadTasks } = useTodoList();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contract = await getContract();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await contract.methods.createTask(content).send({ from: accounts[0] });
    setContent('');
    loadTasks();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a new task"
      />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;
