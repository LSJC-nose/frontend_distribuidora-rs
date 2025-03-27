import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Inicio from "./views/Inicio";
import Encabezado from "./components/encabezado/Encabezado";
import Categorias from "./views/categoria";
import Productos from "./views/producto";
import './App.css';
import Proveedor from "./views/proveedor";
import Ventas from "./views/venta_factura"
import Cliente from "./views/cliente";

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
          <Route path="/proveedor" element={<Proveedor />} />
          <Route path="/venta_factura" element={<Ventas />} />
          <Route path="/cliente" element={<Cliente />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
