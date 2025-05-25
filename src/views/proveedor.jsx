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
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorEditado, setProveedorEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
   const [nuevoProveedor, setNuevoProveedor] = useState({
      NombreProveedor: '',
      Telefono: '',
      Correo: '',
      Direccion: ''
    });
    

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
    establecerPaginaActual(1); // Reiniciar a página 1
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

   // Manejo la inserción de una nueva categoría
   const agregarProveedor = async () => {

    if (!nuevoProveedor.NombreProveedor || !nuevoProveedor.Telefono || !nuevoProveedor.Correo  || !nuevoProveedor.Direccion) {
    setErrorCarga("Por favor, completa todos los campos antes de guardar.");
    return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproveedor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProveedor),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el proveedor');
      }

      await obtenerProveedor(); // Refresca toda la lista desde el servidor
      setNuevoProveedor({ 
        NombreProveedor: '',
        Telefono: '',
        Correo: '',
        Direccion: '',
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProveedor(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProveedorEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  //Actualizar cliente
  const actualizarProveedor = async () => {
    if (!proveedorEditado?.NombreProveedor || !proveedorEditado?.Telefono 
      || !proveedorEditado?.Correo  || !proveedorEditado?.Direccion  ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarproveedor/${proveedorEditado.ID_Proveedores}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NombreProveedor: proveedorEditado.NombreProveedor,
          Telefono: proveedorEditado.Telefono,
          Correo: proveedorEditado.Correo,
          Direccion: proveedorEditado.Direccion
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar los proveedores');
      }

      await obtenerProveedor();
      setMostrarModalEdicion(false);
      setProveedorEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };


  const abrirModalEdicion = (cliente) => {
    setProveedorEditado(cliente);
    setMostrarModalEdicion(true);
  };


  const eliminarProveedor = async () => {
    if (!proveedorAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproveedor/${proveedorAEliminar.ID_Proveedores}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el proveedor');
      }

      await obtenerProveedor(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setProveedorAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setMostrarModalEliminacion(true);
  };



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
          totalElementos={listaProveedor.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />


        <ModalRegistroProveedor
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoProveedor={nuevoProveedor}
          manejarCambioInput={manejarCambioInput}
          agregarProveedor={agregarProveedor}
          errorCarga={errorCarga}
        />

        <ModalEdicionProveedor
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          proveedorEditado={proveedorEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarProveedor={actualizarProveedor}
          errorCarga={errorCarga}
        />

        <ModalEliminacionProveedor
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarProveedor={eliminarProveedor}
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