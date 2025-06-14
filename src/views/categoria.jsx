
// Importaciones necesarias para la vista
import React, { useState, useEffect } from 'react';
import TablaCategorias from '../components/categoria/InicioCategorias'; // Importa el componente de tabla
import { Container, Button, Row, Col } from "react-bootstrap";
import CuadroBusquedas from "../components/busquedas/CuadroBusquedas";
import ModalRegistroCategoria from '../components/categoria/ModalRegistroCategoria';
import ModalEliminacionCategoria from '../components/categoria/ModalEliminacionCategoria';
import ModalEdicionCategoria from '../components/categoria/ModalActualizacionCategoria';
import ModalError from '../components/errorModal/ModalError';


// Declaración del componente Categorias
const Categorias = () => {
  // Estados para manejar los datos, carga y errores
  const [listaCategorias, setListaCategorias] = useState([]); // Almacena los datos de la API
  const [cargando, setCargando] = useState(true);            // Controla el estado de carga
  const [errorCarga, setErrorCarga] = useState(null);
  const [mensajeError, setMensajeError] = useState('');  
  const [mostrarModalError, setMostrarModalError] = useState(false);      // Maneja errores de la petición
  const [mostrarModal, setMostrarModal] = useState(false);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState({
    nombre_categoria: '',
    descripcion_categoria: ''
  });
  
const [paginaActual, establecerPaginaActual] = useState(1);
const elementosPorPagina = 5; // Número de elementos por página
const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
const [categoriaEditada, setCategoriaEditada] = useState(null);
const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);


  const obtenerCategorias = async () => { // Método renombrado a español
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) {
        throw new Error('Error al cargar las categorías');
      }
      const datos = await respuesta.json();
      setListaCategorias(datos); 
      setCategoriasFiltradas(datos);   // Actualiza el estado con los datos
      setCargando(false);           // Indica que la carga terminó
    } catch (error) {
      setMensajeError(error.message); // Guarda el mensaje de error
      setCargando(false);           // Termina la carga aunque haya error
    }
  };


  // Lógica de obtención de datos con useEffect
  useEffect(() => {
    obtenerCategorias();            // Ejecuta la función al montar el componente
  }, []);                           // Array vacío para que solo se ejecute una vez


  // Maneja los cambios en los inputs del modal
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevaCategoria(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioBusqueda = (e) => {
    establecerPaginaActual(1); // Reiniciar a página 1
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    
    const filtradas = listaCategorias.filter(
      (categoria) =>
        categoria.NombreCategoria.toLowerCase().includes(texto) 
    );
    setCategoriasFiltradas(filtradas);
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setCategoriaEditada(prev => ({
      ...prev,
      [name]: value
    }));
  };


  // Calcular elementos paginados
const categoriasPaginadas = categoriasFiltradas.slice(
  (paginaActual - 1) * elementosPorPagina,
  paginaActual * elementosPorPagina
);


  // Manejo la inserción de una nueva categoría
  const agregarCategoria = async () => {

    if (
      !nuevaCategoria.NombreCategoria 
    ) {

    setMensajeError("Por favor, completa todos los campos antes de guardar .");
     setMostrarModalError(true);
    return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarcategorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevaCategoria),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar la categoría');
      }

      await obtenerCategorias(); // Refresca toda la lista desde el servidor
      setNuevaCategoria({ NombreCategoria: ''});
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const eliminarCategoria = async () => {
    if (!categoriaAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarcategoria/${categoriaAEliminar.ID_Categoria}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar la categoría');
      }

      await obtenerCategorias(); // Refresca la lista
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1); // Regresa a la primera página
      setCategoriaAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEliminacion = (categoria) => {
    setCategoriaAEliminar(categoria);
    setMostrarModalEliminacion(true);
  };

  //Actualizar categoria
  const actualizarCategoria = async () => {
    if (!categoriaEditada?.NombreCategoria) {
      setMensajeError("Por favor, completa todos los campos antes de guardar.");
      setMostrarModalError(true);
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarcategoria/${categoriaEditada.ID_Categoria}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          NombreCategoria: categoriaEditada.NombreCategoria
        
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar la categoría');
      }

      await obtenerCategorias();
      setMostrarModalEdicion(false);
      setCategoriaEditada(null);
      setErrorCarga(null);
    } catch (error) {
      setErrorCarga(error.message);
    }
  };

  const abrirModalEdicion = (categoria) => {
    setCategoriaEditada(categoria);
    setMostrarModalEdicion(true);
  };





  // Renderizado de la vista
  return (
    <>
      <Container className="mt-5">
        <br />
        <h2>Categorías</h2>

         <Row>
    <Col lg={2} md={4} sm={4} xs={5}>
      <Button className='bi bi-list-ul' variant="primary" 
      onClick={() => setMostrarModal(true)} 
      style={{
                background: "linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))",
                border: "none",
                borderRadius: "50px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "600",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                width: "100%",
                padding: "5px 10px",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
      >
      </Button>
    </Col>
    <Col lg={5} md={8} sm={8} xs={7}>
      <CuadroBusquedas
        textoBusqueda={textoBusqueda}
        manejarCambioBusqueda={manejarCambioBusqueda}
      />
    </Col>
  </Row>  


        {/* Pasa los estados como props al componente TablaCategorias */}
        <TablaCategorias x
          categorias={categoriasPaginadas} 
          cargando={cargando} 
          error={errorCarga} 
          totalElementos={listaCategorias.length} // Total de elementos
    elementosPorPagina={elementosPorPagina} // Elementos por página
    paginaActual={paginaActual} // Página actual
    establecerPaginaActual={establecerPaginaActual} // Método para cambiar página
    abrirModalEliminacion={abrirModalEliminacion} // Método para abrir modal de eliminación
    abrirModalEdicion={abrirModalEdicion} // Método para abrir modal de edición

        />

<ModalRegistroCategoria
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevaCategoria={nuevaCategoria}
          manejarCambioInput={manejarCambioInput}
          agregarCategoria={agregarCategoria}
          errorCarga={errorCarga}
        />

<ModalEliminacionCategoria
          mostrarModalEliminacion={mostrarModalEliminacion}
          setMostrarModalEliminacion={setMostrarModalEliminacion}
          eliminarCategoria={eliminarCategoria}
        />

<ModalEdicionCategoria
          mostrarModalEdicion={mostrarModalEdicion}
          setMostrarModalEdicion={setMostrarModalEdicion}
          categoriaEditada={categoriaEditada}
          manejarCambioInputEdicion={manejarCambioInputEdicion}
          actualizarCategoria={actualizarCategoria}
          errorCarga={errorCarga}
        />

<ModalError
        mostrarModalError={mostrarModalError}
        setMostrarModalError={setMostrarModalError}
        mensajeError={mensajeError}
      />


      </Container>
    </>
  );
};

// Exportación del componente
export default Categorias;