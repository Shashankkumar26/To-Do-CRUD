import React, { useState } from 'react';
import '../style/Form.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskForm = ({ task, tasks, onClose, isNewTask }) => {
  const [formData, setFormData] = useState({
    title: task !== null ? task.title : '',
    description: task !== null ? task.description : '',
    status: task !== null ? task.status : 'pending',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isNewTask) {
        await axios.post('/add', formData);
        console.log('Task added successfully.');
        toast.success('Task added successfully!');
      } else {
        await axios.put(`/tasks/${task._id}`, formData);
        console.log('Task updated successfully.');
        toast.success('Task updated successfully!');
      }
      onClose();
    } catch (error) {
      console.error('Error updating/adding task:', error);
      toast.error('Error updating/adding task.');
    }
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <button className="close-button" onClick={onClose}>
          <i className="ri-close-fill"></i>
        </button>
        <h2>{isNewTask ? 'Add New Task' : 'Update Task'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              placeholder="Description"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="working">Working</option>
              <option value="complete">Complete</option>
            </select>
          </div>
          <button type="submit">{isNewTask ? 'Add' : 'Update'}</button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
