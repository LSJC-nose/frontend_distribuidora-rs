import React, { useState, useEffect } from 'react';
import TablaCompras from '../components/compra_factura/InicioCompraFactura';
import ModalActualizacionCompra from '../components/compra_factura/ModalActualizacionCompra';
import ModalDetallesCompra from '../components/detalles_compras/ModalDetallesCompra';
import ModalEliminacionCompra from '../components/compra_factura/ModalEliminacionCompra';
import ModalRegistroCompra from '../components/compra_factura/ModalRegistroCompra';
import { Container, Button, Row, Col } from 'react-bootstrap';
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";

const Compras = () => {
  const [listaCompras, setListaCompras] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [detallesCompra, setDetallesCompra] = useState([]);
  const [cargandoDetalles, setCargandoDetalles] = useState(false);
  const [errorDetalles, setErrorDetalles] = useState(null);
   const [ventasFiltradas, setVentasFiltradas] = useState([]);
   const [paginaActual, establecerPaginaActual] = useState(1);
   const elementosPorPagina = 5; // Número de elementos por página
     const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [compraAEliminar, setCompraAEliminar] = useState(null);

  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaCompra, setNuevaCompra] = useState({
    ID_Proveedores: '',
    fecha_compra: new Date(),
    total_compra: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);

  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [compraAEditar, setCompraAEditar] = useState(null);
  const [detallesEditados, setDetallesEditados] = useState([]);

  const obtenerCompras = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/obtenercompras');
      if (!respuesta.ok) throw new Error('Error al cargar las compras');
      const datos = await respuesta.json();
      setListaCompras(datos);
        setComprasFiltradas(datos);   // Actualiza el estado con los datos
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  const obtenerProveedor = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/Proveedor');
      if (!respuesta.ok) throw new Error('Error al cargar los empleados');
      const datos = await respuesta.json();
      setProveedores(datos);
     
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerCompras();
    obtenerProveedor();
    obtenerProductos();
  }, []);

  const obtenerDetalles = async (ID_CompraFactura) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompras/${ID_CompraFactura}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles de la compra');
      const datos = await respuesta.json();
      setDetallesCompra(datos);
      setCargandoDetalles(false);
      setMostrarModal(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const eliminarCompra = async () => {
    if (!compraAEliminar) return;
    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcompra/${compraAEliminar.ID_CompraFactura}`, {
        method: 'DELETE',
      });
      if (!respuesta.ok) throw new Error('Error al eliminar la compra');
      setMostrarModalEliminacion(false);
      await obtenerCompras();
      setCompraAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (compra) => {
    setCompraAEliminar(compra);
    setMostrarModalEliminacion(true);
  };

  const agregarDetalle = (detalle) => {
    setDetallesNuevos(prev => [...prev, detalle]);
    setNuevaCompra(prev => ({
      ...prev,
      total_compra: prev.total_compra + (detalle.Cantidad * detalle.PrecioCompra)
    }));
  };

  const agregarCompra = async () => {

    try {
      const compraData = {
        ID_Proveedores: nuevaCompra.ID_Proveedores,
        fecha_compra: nuevaCompra.fecha_compra.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_compra: detallesNuevos.reduce((sum, d) => sum + (d.Cantidad * d.PrecioCompra), 0),
        detalles: detallesNuevos
      };
      const respuesta = await fetch('http://localhost:3000/api/registrarcompras', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compraData)
      });
      if (!respuesta.ok) throw new Error('Error al registrar la compra');
      await obtenerCompras();
      setNuevaCompra({ ID_Proveedores: '', fecha_compra: new Date(), total_compra: 0 });
      setDetallesNuevos([]);
      setMostrarModalRegistro(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalActualizacion = async (compra) => {
    setCargandoDetalles(true);
    try {
      const respuestacompra = await fetch(`http://localhost:3000/api/obtenercompraporid/${compra.ID_CompraFactura}`);
      if (!respuestacompra.ok) throw new Error('Error al cargar la compra');
      const datoscompra = await respuestacompra.json();

      const datoscompletos = {
        ID_CompraFactura: datoscompra.ID_CompraFactura,
        ID_Proveedores: datoscompra.ID_Proveedores,
        fecha_compra: datoscompra.fecha_compra,
        total_compra: datoscompra.total_compra,
        NombreProveedor: compra.NombreProveedor
      };

      setCompraAEditar(datoscompletos);

      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallescompras/${compra.ID_CompraFactura}`);
      if (!respuesta.ok) throw new Error('Error al cargar los detalles de la compra');
      const datos = await respuesta.json();
      setDetallesEditados(datos);

      setCargandoDetalles(false);
      setMostrarModalActualizacion(true);
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  const actualizarCompra = async (compraActualizada, detalles) => {
    if (!compraActualizada.ID_Proveedores || !compraActualizada.fecha_compra || detalles.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }
    try {
      const compraData = {
        ID_CompraFactura: compraActualizada.ID_CompraFactura,
        ID_Proveedores: compraActualizada.ID_Proveedores,
        fecha_compra: compraActualizada.fecha_compra.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
        total_compra: detalles.reduce((sum, d) => sum + (d.Cantidad * d.PrecioCompra), 0),
        detalles
      };
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcompra/${compraActualizada.ID_CompraFactura}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify(compraData)
      });
      if (!respuesta.ok) throw new Error('Error al actualizar la compra');
      await obtenerCompras();
      setMostrarModalActualizacion(false);
      setCompraAEditar(null);
      setDetallesEditados([]);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

    // Calcular elementos paginados
const comprasPaginadas = comprasFiltradas.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);

  const manejarCambioBusqueda = (e) => {
    establecerPaginaActual(1); // Reiniciar a página 1
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtradas = listaCompras.filter(
      (compras) =>
        compras.NombreProveedor.toLowerCase().includes(texto) 
    );
    setComprasFiltradas(filtradas);
  };



  return (
    <Container className="mt-5">
      <br />
      <h4>Compras con Detalles</h4>
       <Row>
    <Col lg={2} md={4} sm={4} xs={5}>
      <Button className='bi bi-bag-plus-fill' variant="secondary" onClick={() =>
         setMostrarModalRegistro(true)} style={{ width: "50%",fontSize: "18px", margin: 0}}>
      </Button>
    </Col>
    <Col lg={5} md={8} sm={8} xs={7}>
      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
      />
    </Col>
  </Row>  
      <br />
      <TablaCompras
        compras={comprasPaginadas} 
        
          totalElementos={listaCompras.length} // Total de elementos
        cargando={cargando}
        error={errorCarga}
        obtenerDetalles={obtenerDetalles}
        abrirModalEliminacion={abrirModalEliminacion}
        abrirModalActualizacion={abrirModalActualizacion}
         elementosPorPagina={elementosPorPagina} // Elementos por página
    paginaActual={paginaActual} // Página actual
    establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
      />
      <ModalDetallesCompra
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        detalles={detallesCompra}
        cargandoDetalles={cargandoDetalles}
        errorDetalles={errorDetalles}
      />
      <ModalEliminacionCompra
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarCompra={eliminarCompra}
      />
      <ModalRegistroCompra
        mostrarModal={mostrarModalRegistro}
        setMostrarModal={setMostrarModalRegistro}
        nuevaCompra={nuevaCompra}
        setNuevaCompra={setNuevaCompra}
        detallesCompra={detallesNuevos}
        setDetallesCompra={setDetallesNuevos}
        agregarDetalle={agregarDetalle}
        agregarCompra={agregarCompra}
        errorCarga={errorCarga}
        proveedores={proveedores}
        productos={productos}
      />
      <ModalActualizacionCompra
        mostrarModal={mostrarModalActualizacion}
        setMostrarModal={setMostrarModalActualizacion}
        compra={compraAEditar}
        detallesCompra={detallesEditados}
        setDetallesCompra={setDetallesEditados}
        actualizarCompra={actualizarCompra}
        errorCarga={errorCarga}
        proveedores={proveedores}
        productos={productos}
      />
    </Container>
  );
};

export default Compras;