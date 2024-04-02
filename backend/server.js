// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '7899',
  database: 'task_manager',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Route for fetching tasks
app.get('/tasks', (req, res) => {
  const query = 'SELECT * FROM tasks';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(results);
  });
});

// Route for fetching task details by ID
app.get('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const query = 'SELECT * FROM tasks WHERE id = ?';
  connection.query(query, [taskId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    if (results.length === 0) {
      // Task with the given ID does not exist
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    // Task found, return task details
    res.json(results[0]);
  });
});

// Route for creating a new task
app.post('/tasks', (req, res) => {
  // Updated route
  const { title, description, priority, status } = req.body;
  const query =
    'INSERT INTO tasks (title, description, priority, status) VALUES (?, ?, ?, ?)';
  connection.query(
    query,
    [title, description, priority, status],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(201).json({
        message: 'Task created successfully',
        taskId: results.insertId,
      });
    }
  );
});

// Route for updating an existing task
app.put('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const { title, description, priority, status } = req.body;
  const query =
    'UPDATE tasks SET title = ?, description = ?, priority = ?, status = ? WHERE id = ?';
  connection.query(
    query,
    [title, description, priority, status, taskId],
    (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
      res.status(200).json({ message: 'Task updated successfully' });
    }
  );
});

// Route for deleting a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const query = 'DELETE FROM tasks WHERE id = ?';
  connection.query(query, [taskId], (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
