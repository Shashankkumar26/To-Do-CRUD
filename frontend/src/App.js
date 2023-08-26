import Navbar from './components/Navbar';
import Task from './components/Task';
import TaskForm from './components/TaskForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

function App() {
  return (
  <>
  <Router>
  <Navbar/>
    <Routes>
           <Route path="/" element={<Task/>}/>
           <Route path="/form" element={<TaskForm/>}/>
    </Routes>
  </Router>

  
  </>
  );
}

export default App;
