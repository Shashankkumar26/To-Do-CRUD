import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Task.css';
import TaskForm from './TaskForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [isNewTask, setIsNewTask] = useState(false);

  useEffect(() => {
    fetchData();
  }, [showTaskForm]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleUpdate = (taskId) => {
    setSelectedTaskIndex(taskId);
    setShowTaskForm(true);
    setIsNewTask(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchData();
      setTimeout(() => {
        toast.success('Task deleted successfully!');
      }, 0);
      console.log('Task deleted successfully.');
    } catch (error) {
      console.error('Error deleting task:', error);
      setTimeout(() => {
        toast.error('Error deleting task.');
      }, 0);
    }
  };

  const handleAddNewTask = () => {
    setSelectedTaskIndex(null);
    setShowTaskForm(true);
    setIsNewTask(true);
   
  };

  return (
    <>
      <h1>Task List</h1>
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={task._id} className="task-card">
            <div className="title">{task.title}</div>
            <div className="description">{task.description}</div>
            <div className="description-status">{task.status}</div>
            <div className="actions">
              <button onClick={() => handleUpdate(task._id)}>Update</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showTaskForm && (
        <TaskForm
          task={selectedTaskIndex !== null ? tasks.find((task) => task._id === selectedTaskIndex) : null}
          tasks={tasks}
          onClose={() => setShowTaskForm(false)}
          isNewTask={isNewTask}
        />
      )}
      <button onClick={handleAddNewTask}>Add New Task</button>
      <ToastContainer />
    </>
  );
};

export default Task;
