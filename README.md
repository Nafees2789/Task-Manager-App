# Task Management App

## Prerequisites

- React and Node version should be greater than 18.
- MySQL Workbench Community - Version 8.0.36
- MySQL Installer - Version 8.0.36

## Setup Instructions

Do follow the below steps to setup and run the application:

1. **Clone the Repository:**

   - Clone the repository using the following command:

     ```bash
     git clone https://github.com/Nafees2789/Task-Manager-App.git
     ```

2. **Create a Database:**

   - Create a Database in your SQL Database with the following name: `task_manager`

3. **Execute SQL Query:**

   - After creating the database, execute the following SQL query in your SQL Workbench. This will create a `tasks` table in the `task_manager` database:

     ```sql
     USE task_manager;
     CREATE TABLE IF NOT EXISTS tasks (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       priority ENUM('High', 'Medium', 'Low') NOT NULL,
       status ENUM('To Do', 'In Progress', 'Done') NOT NULL
     );
     ```

4. **Configure the `server.js` file:**

   - Modify the `server.js` code file with the appropriate database connection details:

     ```javascript
     const connection = mysql.createConnection({
       host: 'Add your localhost',
       user: 'Add user',
       password: 'Add your password',
       database: 'task_manager',
     });
     ```

5. **Install Backend Dependencies:**

   - After completing the above steps, navigate to the `backend` folder and install the dependencies with the following command:

     ```bash
     npm i
     ```

     Example Directory:

     ```bash
     cd Task-Manager-App/backend
     npm i
     ```

6. **Install Frontend Dependencies:**

   - Navigate to the `frontend` folder and install the dependencies with the following command:

     ```bash
     npm i
     ```

     Example Directory:

     ```bash
     cd Task-Manager-App/frontend
     npm i
     ```

7. **Start Backend Server:**

   - After completing the above steps, start the backend server. Navigate to the `backend` folder and run the following command:

     ```bash
     npm i
     ```

     Example Directory:

     ```bash
     cd Task-Manager-App/backend
     npm run server
     ```

8. **Start Frontend Server:**

   - Open a new terminal window and navigate to the `frontend` folder. Then, run the following command to start the frontend server:

     ```bash
     npm run dev
     ```

     Example Directory:

     ```bash
     cd Task-Manager-App/frontend
     npm run dev
     ```
