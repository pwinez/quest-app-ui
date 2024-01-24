import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import User from './components/User/User';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users/:userId" element={<User />}  />
      <Route path="/auth" element={localStorage.getItem("currentUser") ? <Navigate to="/" /> : <Auth />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
