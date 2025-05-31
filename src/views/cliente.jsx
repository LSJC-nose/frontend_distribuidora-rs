// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/cliente/TablaClientes'; // Importa el componente de tabla
import ModalRegistroCliente from '../components/cliente/ModalRegistroCliente';
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import { Container,Button,Row, Col} from "react-bootstrap";
import ModalEliminacionCliente from '../components/cliente/ModalEliminacionCliente';
import ModalEdicionCliente from '../components/cliente/ModalActualizacionCliente';


// Declaración del componente Clientes
const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [listaClientes, setListaClientes] = useState([]); // Almacena los datos de la API
  const [listaTipoCliente, setListaTipoClientes] = useState([]); // Almacena los datos de la API
  const [listaactualizadatipocliente,setListatipoclientes] = useState([]);
  const [cargando, setCargando] = useState(true); // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre: '',
    Apellido: '',
    ID_tipoCliente: ''
  });
    const [clientesFiltradas, setClientesFiltradas] = useState([]);
    const [textoBusqueda, setTextoBusqueda] = useState("");
    const [paginaActual, establecerPaginaActual] = useState(1);
    const elementosPorPagina = 5; // Número de elementos por página
const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
const [clienteAEliminar, setClienteAEliminar] = useState(null);
const [clienteEditado, setClienteEditada] = useState(null);
const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);



  // Lógica de obtención de datos con useEffect
    // Obtener productos
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/cliente');
        if (!respuesta.ok) throw new Error('Error al cargar los clientes');
        const datos = await respuesta.json();
        setListaClientes(datos);
        setClientesFiltradas(datos);
        setCargando(false);
      } catch (error) {
        setErrorCarga(error.message);
        setCargando(false);
      }
    };

    const manejarCambioBusqueda = (e) => {
      const texto = e.target.value.toLowerCase();
      setTextoBusqueda(texto);
      
      const filtradas = listaClientes.filter(
        (cliente) =>
          cliente.Nombre.toLowerCase().includes(texto) || 
        cliente.Apellido.toLowerCase().includes(texto) 
      );
      setClientesFiltradas(filtradas);
    };

    // Calcular elementos paginados
const clientesPaginadas = clientesFiltradas.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);
  

    // Manejo la inserción de una nueva categoría
    const agregarCliente = async () => {
      if (!nuevoCliente.Nombre || !nuevoCliente.Apellido || 
          !nuevoCliente.ID_tipoCliente ) {
        setErrorCarga("Por favor, completa todos los campos requeridos.");
        return;
      }
  
      try {
        const respuesta = await fetch('http://localhost:3000/api/registrarcliente', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevoCliente),
        });
  
        if (!respuesta.ok) throw new Error('Error al agregar el cliente');
  
        await obtenerClientes();
        setNuevoCliente({
         Nombre: '',
          Apellido: '',
          ID_tipoCliente: ''
        });
        setMostrarModal(false);
        setErrorCarga(null);
      } catch (error) {
        setErrorCarga(error.message);
      }
    };
  


      // Obtener cliente para el dropdown
  const obtenertipoCliente = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/tipocliente');
      if (!respuesta.ok) throw new Error('Error al cargar el tipo de cliente');
      const datos = await respuesta.json();
      setListaTipoClientes(datos);
      setListatipoclientes(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  useEffect(() => {
    obtenerClientes();
    obtenertipoCliente();
  }, []);

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoCliente(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setClienteEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const eliminarCliente = async () => {
    if (!clienteAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarclientes/${clienteAEliminar.ID_Cliente}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el cliente');
      }

      await obtenerClientes(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setClienteAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (cliente) => {
    setClienteAEliminar(cliente);
    setMostrarModalEliminacion(true);
  };

  //Actualizar cliente
  const actualizarCliente = async () => {
    if (!clienteEditado?.Nombre || !clienteEditado?.Apellido || !clienteEditado?.ID_tipoCliente  ) {
      setErrorCarga("Por favor, completa todos los campos antes de guardar.");
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcliente/${clienteEditado.ID_Cliente}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nombre: clienteEditado.Nombre,
          Apellido: clienteEditado.Apellido,
          ID_tipoCliente: clienteEditado.ID_tipoCliente
        
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el cliente');
      }

      await obtenerClientes();
      setMostrarModalEdicion(false);
      setClienteEditada(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (cliente) => {
    setClienteEditada(cliente);
    setMostrarModalEdicion(true);
  };




  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h2>Clientes</h2>

        <Row>
    <Col lg={2} md={4} sm={4} xs={5}>
      <Button className='bi bi-person-add' variant="secondary" onClick={() => setMostrarModal(true)} style={{ width: "60%" }}>
       
      </Button>
    </Col>
    <Col lg={5} md={8} sm={8} xs={7}>
      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
      />
    </Col>
  </Row>  

        {/* Pasa los estados como props al componente TablaClientes */}
        <TablaClientes 
        clientes={clientesPaginadas}  
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaClientes.length} // Total de elementos
          elementosPorPagina={elementosPorPagina} // Elementos por página
          paginaActual={paginaActual} // Página actual
          establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
          abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
          abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición
        />

 <ModalRegistroCliente
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoCliente={nuevoCliente}
        manejarCambioInput={manejarCambioInput}
        agregarCliente={agregarCliente}
        errorCarga={errorCarga}
        tipoClientes={listaTipoCliente}
      />

<ModalEliminacionCliente
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCliente={eliminarCliente}
        />

<ModalEdicionCliente
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          clienteEditado={clienteEditado}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarCliente={actualizarCliente}
          errorCarga={errorCarga}
          actualizartipoClientes={listaactualizadatipocliente}
        />


      </Container>
    </>
  );
};

// Exportación del componente
export default Clientes;