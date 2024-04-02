import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

function TaskDisplayPage() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  useEffect(() => {
    // Fetch tasks from backend API
    axios
      .get('http://localhost:3000/tasks')
      .then((response) => {
        setTasks(response.data);
        setFilteredTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  const handleDelete = (id) => {
    // Send delete request to the backend
    axios
      .delete(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        console.log('Task deleted successfully:', response.data);
        // Update the tasks state by removing the deleted task
        setTasks(tasks.filter((task) => task.id !== id));
        // Update the filteredTasks state to reflect the changes
        setFilteredTasks(filteredTasks.filter((task) => task.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleFilterByStatus = (status) => {
    setStatusFilter(status);
    if (status === 'All') {
      filterTasks(tasks, priorityFilter);
    } else {
      filterTasks(
        tasks.filter((task) => task.status === status),
        priorityFilter
      );
    }
  };

  const handleFilterByPriority = (priority) => {
    setPriorityFilter(priority);
    if (priority === 'All') {
      filterTasks(tasks, statusFilter);
    } else {
      filterTasks(
        tasks.filter((task) => task.priority === priority),
        statusFilter
      );
    }
  };

  const filterTasks = (tasks, status) => {
    if (status === 'All') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.status === status));
    }
  };

  return (
    <div className="displayPage">
      <div className="page_title">
        <h1>Task List</h1>
      </div>
      <div className="add_task">
        <span className="add_title">Add task</span>
        <Link to="/create" className="link-button">
          Add Task
        </Link>
      </div>
      <div className="filters">
        <div>
          <label htmlFor="statusFilter">Filter by Status: </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => handleFilterByStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        <div>
          <label htmlFor="priorityFilter">Filter by Priority: </label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => handleFilterByPriority(e.target.value)}
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <div className="table_data">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <div>
                    <Link to={`/update/${task.id}`} className="link-button">
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskDisplayPage;
