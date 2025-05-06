// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import InicioProductos from '../components/producto/InicioProductos';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';
import Paginacion from '../components/ordenamiento/Paginacion';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

const Producto = () => {
  // Estados para manejar los datos, carga y errores
  const [listaProducto, setListaProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // Estados para búsqueda y paginación
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Estados para producto
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    Stock: '',
    PrecioCompra: '',
    PrecioVenta: '',
    Descripcion: '',
    UbicacionFotografia: '',
    ID_Categoria: '',
    ID_Catalogo: ''
  });

  const [productoEditado, setProductoEditado] = useState({
    nombreProducto: '',
    Stock: '',
    PrecioCompra: '',
    PrecioVenta: '',
    Descripcion: '',
    UbicacionFotografia: '',
    ID_Categoria: '',
    ID_Catalogo: ''
  });
  
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  // Estados para modales
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // Obtener productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');

      const datos = await respuesta.json();
      setListaProducto(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Manejo de búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = listaProducto.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(texto) ||
        producto.Descripcion.toLowerCase().includes(texto)
    );

    setProductosFiltrados(filtrados);
  };

  // Cálculo de paginación
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Productos</h4>
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Producto
            </Button>
          </Col>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>
        <br/><br/>

        <InicioProductos
          productos={productosPaginados}
          cargando={cargando}
          error={errorCarga}
          abrirModalEdicion={(producto) => {
            setProductoEditado(producto);
            setMostrarModalEdicion(true);
          }}
          abrirModalEliminacion={(producto) => {
            setProductoAEliminar(producto);
            setMostrarModalEliminacion(true);
          }}
        />

            <ModalRegistroProducto
              mostrarModal={mostrarModal}
              setMostrarModal={setMostrarModal}
              nuevoProducto={nuevoProducto} 
              setNuevoProducto={setNuevoProducto} 
              agregarProducto={obtenerProductos}
              errorCarga={errorCarga}
            />

        <ModalEdicionProducto
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          productoEditado={productoEditado}
          manejarCambioInputEdicion={(e) =>
            setProductoEditado({ ...productoEditado, [e.target.name]: e.target.value })
          }
          actualizarProducto={obtenerProductos}
          errorCarga={errorCarga}
        />

        <ModalEliminacionProducto
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProducto={obtenerProductos}
        />

        <Paginacion
          elementosPorPagina={elementosPorPagina}
          totalElementos={productosFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
      </Container>
    </>
  );
};

export default Producto;
