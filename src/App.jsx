import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import InicioClientes from "./components/cliente/InicioClientes";
import Categorias from "./views/categoria";
import Productos from "./views/producto";

import './App.css';

const App = () => {
  return (
    <Router>
      <main className="margen-superior-main">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/categoria" element={<Categorias />} />
          <Route path="/producto" element={<Productos />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
