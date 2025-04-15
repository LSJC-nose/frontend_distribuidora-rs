// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaClientes from '../components/cliente/TablaClientes'; // Importa el componente de tabla
import ModalRegistroCliente from '../components/cliente/ModalRegistroCliente';
import { Container,Button,Row, Col} from "react-bootstrap";

// Declaración del componente Clientes
const Clientes = () => {
  // Estados para manejar los datos, carga y errores
  const [listaClientes, setListaClientes] = useState([]); // Almacena los datos de la API
  const [listaTipoCliente, setListaTipoClientes] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true); // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
    Nombre: '',
    Apellido: '',
    ID_tipoCliente: ''
  });

  // Lógica de obtención de datos con useEffect
    // Obtener productos
    const obtenerClientes = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/cliente');
        if (!respuesta.ok) throw new Error('Error al cargar los clientes');
        const datos = await respuesta.json();
        setListaClientes(datos);
        setCargando(false);
      } catch (error) {
        setErrorCarga(error.message);
        setCargando(false);
      }
    };

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

  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h4>Clientes</h4>

      
        <Button variant="primary" onClick={() => setMostrarModal(true)}>
        Nuevo Cliente
      </Button>
      <br/><br/>
   

        {/* Pasa los estados como props al componente TablaClientes */}
        <TablaClientes 
          clientes={listaClientes} 
          cargando={cargando} 
          error={errorCarga} 
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

      </Container>
    </>
  );
};

// Exportación del componente
export default Clientes;
