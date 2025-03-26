import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import InicioClientes from "./components/cliente/InicioClientes";

import './App.css';

const App = () => {
  return (
    <Router>
      <main className="margen-superior-main">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<InicioClientes />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
