
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Servicios from "./views/servicios";
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />

      </Routes>
    </Router>
  );
};

export default App;