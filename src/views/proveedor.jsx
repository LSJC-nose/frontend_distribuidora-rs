// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import InicioProveedores from '../components/proveedor/InicioProveedores';
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalRegistroProveedor from '../components/proveedor/ModalRegistroProveedor';
import ModalEdicionProveedor from '../components/proveedor/ModalEdicionProveedor';
import ModalEliminacionProveedor from '../components/proveedor/ModalEliminacionProveedor';
import Paginacion from '../components/ordenamiento/Paginacion';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';

// Declaración del componente Proveedor
const Proveedor = () => {
  // Estados para manejar los datos, carga y errores
  const [listaProveedor, setListaProveedor] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    NombreProveedor: '',
    Telefono: '',
    Correo: '',
    Direccion: ''
  });

  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorEditado, setProveedorEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);

  // Variables de paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  // Variables de búsqueda
  const [proveedoresFiltrados, setProveedoresFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Obtención de datos al montar la vista
  useEffect(() => {
    obtenerProveedor();
  }, []);

  // Método para obtener proveedores desde la API
  const obtenerProveedor = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/proveedor');
      if (!respuesta.ok) throw new Error('Error al cargar los proveedores');

      const datos = await respuesta.json();
      setListaProveedor(datos);
      setProveedoresFiltrados(datos); // Se actualiza la lista filtrada con los datos obtenidos
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

    const filtradas = listaProveedor.filter(
      (proveedor) =>
        proveedor.NombreProveedor.toLowerCase().includes(texto) ||
        proveedor.Telefono.includes(texto) ||
        proveedor.Correo.toLowerCase().includes(texto) ||
        proveedor.Direccion.toLowerCase().includes(texto)
    );

    setProveedoresFiltrados(filtradas);
  };

  // Cálculo de elementos paginados
  const proveedoresPaginados = proveedoresFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Proveedores</h4>
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModal(true)} style={{ width: "100%" }}>
              Nuevo Proveedor
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

        <InicioProveedores
          proveedores={proveedoresPaginados}
          cargando={cargando}
          error={errorCarga}
          abrirModalEdicion={setMostrarModalEdicion}
          abrirModalEliminacion={setMostrarModalEliminacion}
        />

        <ModalRegistroProveedor
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoProveedor={nuevoProveedor}
          manejarCambioInput={(e) =>
            setNuevoProveedor({ ...nuevoProveedor, [e.target.name]: e.target.value })
          }
          agregarProveedor={obtenerProveedor} 
          errorCarga={errorCarga}
        />

        <ModalEdicionProveedor
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          proveedorEditado={proveedorEditado}
          manejarCambioInputEdicion={(e) =>
            setProveedorEditado({ ...proveedorEditado, [e.target.name]: e.target.value })
          }
          actualizarProveedor={obtenerProveedor}
          errorCarga={errorCarga}
        />

        <ModalEliminacionProveedor
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProveedor={obtenerProveedor}
        />

        <Paginacion
          elementosPorPagina={elementosPorPagina}
          totalElementos={proveedoresFiltrados.length}
          paginaActual={paginaActual}
          establecerPaginaActual={establecerPaginaActual}
        />
      </Container>
    </>
  );
};

export default Proveedor;
