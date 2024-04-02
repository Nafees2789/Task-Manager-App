import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Update import statement

import TaskDisplayPage from './components/TaskDisplayPage';
import TaskCreationForm from './components/TaskCreationForm';
import TaskUpdateForm from './components/TaskUpdateForm';
import './App.css';

function App() {
  return (
    <>
      <nav className="navbar">
        <span className="title">Task Manager APP</span>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TaskDisplayPage />} />{' '}
          {/* Update element prop */}
          <Route path="/create" element={<TaskCreationForm />} />{' '}
          {/* Update element prop */}
          <Route path="/update/:id" element={<TaskUpdateForm />} />{' '}
          {/* Update element prop */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
