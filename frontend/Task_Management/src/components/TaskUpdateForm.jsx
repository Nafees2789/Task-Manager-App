import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Import Link from react-router-dom
import axios from 'axios';
import '../App.css';

function TaskUpdateForm() {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: '',
    status: '',
  });
  const [updateMessage, setUpdateMessage] = useState(null); // State variable for update success message

  useEffect(() => {
    // Fetch task data for the specified ID
    axios
      .get(`http://localhost:3000/tasks/${id}`)
      .then((response) => {
        setTask(response.data); // Set task state with fetched data
      })
      .catch((error) => {
        console.error('Error fetching task:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send updated task data to the backend
    axios
      .put(`http://localhost:3000/tasks/${id}`, task)
      .then((response) => {
        console.log('Task updated successfully:', response.data);
        setUpdateMessage('Data updated successfully'); // Set update success message
        // Remove the message after 5 seconds
        setTimeout(() => {
          setUpdateMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.error('Error updating task:', error);
        // Handle error, display error message, etc.
      });
  };

  // Render form only when task data is fetched
  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Update Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Priority:
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
        <br />
        <label>
          Status:
          <select name="status" value={task.status} onChange={handleChange}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </label>
        <br />
        <button type="submit" className="link-button">
          Update
        </button>
        <Link to="/" className="link-button">
          Back
        </Link>{' '}
        {/* Back button using Link */}
        {/* Back button using Link */}
      </form>
      {updateMessage && <p>{updateMessage}</p>}{' '}
      {/* Display update success message */}
    </div>
  );
}

export default TaskUpdateForm;
