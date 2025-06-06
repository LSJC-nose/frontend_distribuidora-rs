import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
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
import Estadisticas from "./views/Estadisticas";
import RutaProtegida from "./components/rutas/RutaProtegida";
import PiePagina from "./components/infopie/PiePagina";

const App = () => {
  return (
    <Router>
       <div className="App-wrapper">
      <main className="margen-superior-main content">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/inicio" element={<RutaProtegida vista={<Inicio/>}/>} />
          <Route path="/categoria" element={<RutaProtegida vista={<Categorias />}/>} />
          <Route path="/producto" element={<RutaProtegida vista={<Productos />}/>} />
          <Route path="/proveedor" element={<RutaProtegida vista={<Proveedor />}/>} />
          <Route path="/venta_factura" element={<RutaProtegida vista={<Ventas />}/>} />
          <Route path="/cliente" element={<RutaProtegida vista={<Cliente />}/>} />
          <Route path="/compra_factura" element={<RutaProtegida vista={<Compras />}/>} />
          <Route path="/CatalogoProductos" element={<RutaProtegida vista={<Catalogo />}/>} />
          <Route path="/Dashboard" element={<RutaProtegida vista={<Dashboard />}/>} />
          <Route path="/estadisticas" element={<RutaProtegida vista={<Estadisticas />}/>} />
        </Routes>
      </main>
      <PiePagina />
        </div>
    </Router>
  );
};

export default App;
