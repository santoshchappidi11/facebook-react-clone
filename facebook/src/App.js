import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
