import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import About from "./pages/About";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";

import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';


function App() {
  return (
    <>
    
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/about" element={<About/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/event/:id" element={<EventPage/>} />
    </Routes>

    </Router>
   
    </>
  );
}

export default App;
