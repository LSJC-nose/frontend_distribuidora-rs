// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import InicioProductos from '../components/producto/InicioProductos';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';
import Paginacion from '../components/ordenamiento/Paginacion';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

// Declaración del componente Producto
const Producto = () => {
  // Estados para manejar los datos, carga y errores
  const [listaProducto, setListaProducto] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    Descripcion: '',
    PrecioCompra: '',
    PrecioVenta: '',
    Stock: '',
    ID_Categoria: '',
    UbicacionFotografia: ''
  });

  // Variables de paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Variables de búsqueda
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Obtención de datos al montar la vista
  useEffect(() => {
    obtenerProducto();
  }, []);

  // Método para obtener productos desde la API
  const obtenerProducto = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');

      const datos = await respuesta.json();
      setListaProducto(datos);
      setProductosFiltrados(datos); // Se actualiza la lista filtrada con los datos obtenidos
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };

  // Método para manejar cambios en la búsqueda
  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = listaProducto.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(texto) ||
        producto.Descripcion.toLowerCase().includes(texto) ||
        producto.PrecioCompra.toString().includes(texto) ||
        producto.PrecioVenta.toString().includes(texto)
    );

    setProductosFiltrados(filtradas);
  };

  // Cálculo de elementos paginados
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  // Manejo la inserción de un nuevo producto
  const agregarProducto = async () => {
    if (!nuevoProducto.nombreProducto || !nuevoProducto.Descripcion || !nuevoProducto.PrecioCompra || !nuevoProducto.PrecioVenta || !nuevoProducto.Stock || !nuevoProducto.ID_Categoria ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el producto');
      }

      await obtenerProducto(); // Refresca toda la lista desde el servidor
      setNuevoProducto({ 
        nombreProducto: '',
        Descripcion: '',
        PrecioCompra: '',
        PrecioVenta: '',
        Stock: '',
        ID_Categoria: '',
        UbicacionFotografia: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Actualizar producto
  const actualizarProducto = async () => {
    if (!productoEditado?.nombreProducto || !productoEditado?.Descripcion 
      || !productoEditado?.PrecioCompra || !productoEditado?.PrecioVenta || !productoEditado?.Stock || !productoEditado?.ID_Categoria ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarproducto/${productoEditado.ID_Producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productoEditado),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el producto');
      }

      await obtenerProducto();
      setMostrarModalEdicion(false);
      setProductoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproducto/${productoAEliminar.ID_Producto}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await obtenerProducto(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

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
          totalElementos={listaProducto.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

        <ModalRegistroProducto
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoProducto={nuevoProducto}
          manejarCambioInput={manejarCambioInput}
          agregarProducto={agregarProducto}
          errorCarga={errorCarga}
        />

        <ModalEdicionProducto
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          productoEditado={productoEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarProducto={actualizarProducto}
          errorCarga={errorCarga}
        />

        <ModalEliminacionProducto
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProducto={eliminarProducto}
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