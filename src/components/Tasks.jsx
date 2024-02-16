import React from 'react';
import { useTodoList } from '../context/TodoListContext';
import { getContract } from '../utils/web3Config';

const Tasks = () => {
  const { tasks, loadTasks } = useTodoList();

  const handleToggle = async (id) => {
    const contract = await getContract();
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    await contract.methods.toggleCompleted(id).send({ from: accounts[0] });
    loadTasks();
  };

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <span>{task.content}</span>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggle(task.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default Tasks;
