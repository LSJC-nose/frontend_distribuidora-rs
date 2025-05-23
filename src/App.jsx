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
import Compras from "./views/compra_factura";
import Catalogo from "./views/CatalogoProductos";
import Dashboard from "./views/Dashboard";

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
          <Route path="/compra_factura" element={<Compras />} />
          <Route path="/CatalogoProductos" element={<Catalogo />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
