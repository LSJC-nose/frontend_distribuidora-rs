// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaVentas from '../components/venta/TablaVenta'; // Importa el componente de tabla
import { Container, Button, Row, Col } from "react-bootstrap";
import ModalDetallesVenta from '../components/detalles_ventas/ModalDetallesVenta';
import ModalEliminacionVenta from '../components/venta/EliminacionModalVenta';
import ModalRegistroVenta from '../components/venta/ModalRegistroVenta';
import ModalActualizacionVenta from '../components/venta/ModalActualizacionVenta';

// Declaración del componente Ventas
const Ventas = () => {
  // Estados para manejar los datos, carga y errores
  const [listaVentas, setListaVentas] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);     // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null); // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false); // Estado para el modal
  const [detallesVenta, setDetallesVenta] = useState([]); // Estado para los detalles
  const [cargandoDetalles, setCargandoDetalles] = useState(false); // Estado de carga de detalles
  const [errorDetalles, setErrorDetalles] = useState(null); // Estado de error de detalles
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [nuevaVenta, setNuevaVenta] = useState({
   id_cliente: '',
    fecha_venta: new Date(),
    total_venta: 0
  });
  const [detallesNuevos, setDetallesNuevos] = useState([]);
  const [mostrarModalActualizacion, setMostrarModalActualizacion] = useState(false);
  const [ventaAEditar, setVentaAEditar] = useState(null);
  const [detallesEditados, setDetallesEditados] = useState([]);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [ventaAEliminar, setVentaAEliminar] = useState(null);
  
  
  // Lógica de obtención de datos con useEffect
  useEffect(() => {

    obtenerVentas();  
    obtenerClientes();
    obtenerProductos();          // Ejecuta la función al montar el componente
  }, []);  
  
   const obtenerVentas = async () => {
      try {
        const respuesta = await fetch('http://localhost:3000/api/obtenerventas'); // Ruta ajustada para obtener ventas
        if (!respuesta.ok) {
          throw new Error('Error al cargar las ventas');
        }
        const datos = await respuesta.json();
        setListaVentas(datos);    // Actualiza el estado con los datos
        setCargando(false);       // Indica que la carga terminó
      } catch (error) {
        setErrorCarga(error.message); // Guarda el mensaje de error
        setCargando(false);       // Termina la carga aunque haya error
      }
    };// Array vacío para que solo se ejecute una vez

  // Función para obtener detalles de una venta
  const obtenerDetalles = async (id_venta) => {
    setCargandoDetalles(true);
    setErrorDetalles(null);
    try {
      const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${id_venta}`); // Ajusta la ruta para obtener detalles
      if (!respuesta.ok) {
        throw new Error('Error al cargar los detalles de la venta');
      }
      const datos = await respuesta.json();
      setDetallesVenta(datos);
      setCargandoDetalles(false);
      setMostrarModal(true); // Abre el modal
    } catch (error) {
      setErrorDetalles(error.message);
      setCargandoDetalles(false);
    }
  };

  

  const eliminarVenta = async () => {
    if (!ventaAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarventa/${ventaAEliminar.id_venta}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la venta');
      }
      
      setMostrarModalEliminacion(false);
      await obtenerVentas();
      setVentaAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (venta) => {
    setVentaAEliminar(venta);
    setMostrarModalEliminacion(true);
  };

  const agregarDetalle = (detalle) => {
    setDetallesNuevos(prev => [...prev, detalle]);
    setNuevaVenta(prev => ({
      ...prev,
      total_venta: prev.total_venta + (detalle.Cantidad * detalle.PrecioVenta)
    }));
  };

  const agregarVenta = async () => {
    if (!nuevaVenta.id_cliente || !nuevaVenta.fecha_venta || detallesNuevos.length === 0) {
      setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
      return;
    }

    try {
      const ventaData = {   
        id_cliente: nuevaVenta.id_cliente,
        fecha_venta: nuevaVenta.fecha_venta.toISOString(),
        total_venta: detallesNuevos.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
        detalles: detallesNuevos
      };

      const respuesta = await fetch('http://localhost:3000/api/registrarventas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ventaData)
      });

      if (!respuesta.ok) throw new Error('Error al registrar la venta');

      await obtenerVentas();
      setNuevaVenta({ id_cliente: '', fecha_venta: new Date(), total_venta: 0 });
      setDetallesNuevos([]);
      setMostrarModalRegistro(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/cliente'); // Asegúrate de que esta ruta sea correcta
      if (!respuesta.ok) throw new Error('Error al cargar los clientes');
      const datos = await respuesta.json();
      setClientes(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos'); // Asegúrate de que esta ruta sea correcta
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setProductos(datos);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalActualizacion = async (venta) => {
  setCargandoDetalles(true);
  try {
    const respuestaventa = await fetch(`http://localhost:3000/api/obtenerventaporid/${venta.id_venta}`);
    if (!respuestaventa.ok) throw new Error('Error al cargar la venta');
    const datosventa = await respuestaventa.json();

    
    const datoscompletos = {
      NumeroFactura: datosventa.id_venta,
      id_cliente: datosventa.id_cliente,
      fecha_venta: datosventa.fecha_venta,
      total_venta: datosventa.total_venta,
      Nombre: venta.Nombre,
      Apellido: venta.Apellido  
    };
    
    setVentaAEditar(datoscompletos);

    const respuesta = await fetch(`http://localhost:3000/api/obtenerdetallesventa/${venta.id_venta}`);
    if (!respuesta.ok) throw new Error('Error al cargar los detalles de la venta');
    const datos = await respuesta.json();
    setDetallesEditados(datos);

    setCargandoDetalles(false);
    setMostrarModalActualizacion(true);
  } catch (error) {
    setErrorDetalles(error.message);
    setCargandoDetalles(false);
  }
};

const actualizarVenta = async (ventaActualizada, detalles) => {

  if (!ventaActualizada.ID_Cliente  || !ventaActualizada.fecha_venta || detalles.length === 0) {
    setErrorCarga("Por favor, completa todos los campos y agrega al menos un detalle.");
    return;
  }
  try {      
    const ventaData = {
      id_venta: ventaActualizada.id_venta,
      id_cliente: ventaActualizada.id_cliente,
      id_empleado: ventaActualizada.id_empleado,
      fecha_venta: ventaActualizada.fecha_venta.toLocaleString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(',', ' '),
      total_venta: detalles.reduce((sum, d) => sum + (d.cantidad * d.precio_unitario), 0),
      detalles
    };
    console.log(`Enviando ID venta: ${ventaActualizada.id_venta}`, JSON.stringify(ventaData));
    const respuesta = await fetch(`http://localhost:3000/api/actualizarventa/${ventaActualizada.id_venta}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ventaData)
    });
    if (!respuesta.ok) throw new Error('Error al actualizar la venta');
    await obtenerVentas();
    setMostrarModalActualizacion(false);
    setVentaAEditar(null);
    setDetallesEditados([]);
    setErrorCarga(null);
  } catch (error) {
    setErrorCarga(error.message);
  }
};


  // Renderizado de la vista
  return (
    <>
    
      <Container className="mt-5" >
  <p>d</p>
        <Row>
          <Col lg={2} md={4} sm={4} xs={5}>
            <Button variant="primary" onClick={() => setMostrarModalRegistro(true)} style={{ width: "100%" }}>
              Nueva Venta
            </Button>
          </Col>
        </Row>
        <br />

        {/* Pasa los estados como props al componente TablaVentas */}
        <TablaVentas
          ventas={listaVentas}
          cargando={cargando}
          error={errorCarga}
          obtenerDetalles={obtenerDetalles} // Pasar la función
          abrirModalEliminacion={abrirModalEliminacion}
          abrirModalActualizacion={abrirModalActualizacion}
        />

        <ModalDetallesVenta
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          detalles={detallesVenta}
          cargandoDetalles={cargandoDetalles}
          errorDetalles={errorDetalles}
        />

        <ModalEliminacionVenta
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarVenta={eliminarVenta}
        />

        <ModalRegistroVenta
          mostrarModal={mostrarModalRegistro}
          setMostrarModal={setMostrarModalRegistro}
          nuevaVenta={nuevaVenta}
          setNuevaVenta={setNuevaVenta}
          detallesVenta={detallesNuevos}
          setDetallesVenta={setDetallesNuevos}
          agregarDetalle={agregarDetalle}
          agregarVenta={agregarVenta}
          errorCarga={errorCarga}
          clientes={clientes}
          productos={productos}
        />

        <ModalActualizacionVenta
          mostrarModal={mostrarModalActualizacion}
          setMostrarModal={setMostrarModalActualizacion}
          venta={ventaAEditar}
          detallesVenta={detallesEditados}
          setDetallesVenta={setDetallesEditados}
          actualizarVenta={actualizarVenta}
          errorCarga={errorCarga}
          clientes={clientes}
          productos={productos}
        />
      </Container>
    </>
  );
};

// Exportación del componente
export default Ventas;
