import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import Paginacion from '../components/ordenamiento/Paginacion';
import { Zoom } from "react-awesome-reveal";

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  // Paginación
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4;

  useEffect(() => {
    const obtenerYFiltrarProductos = async () => {
      // Si la lista de productos está vacía, intenta obtenerlos
      if (listaProductos.length === 0) {
        try {
          const respuesta = await fetch('http://localhost:3000/api/productos');
          if (!respuesta.ok) throw new Error('Error al cargar los productos');
          const datos = await respuesta.json();
          setListaProductos(datos);
          setProductosFiltrados(datos); // Muestra todos los productos inicialmente
          setCargando(false);
        } catch (error) {
          setErrorCarga(error.message);
          setCargando(false);
          return; // Sale de la función si hay un error de carga
        }
      }

      // Reinicia la página a 1 cada vez que cambia el texto de búsqueda
      establecerPaginaActual(1);

      // Lógica de filtrado
      if (textoBusqueda.trim() === "") {
        setProductosFiltrados(listaProductos);
      } else {
        const texto = textoBusqueda.toLowerCase();
        const filtradas = listaProductos.filter((producto) =>
          producto.nombreProducto.toLowerCase().includes(texto) ||
          producto.Descripcion.toLowerCase().includes(texto) ||
          producto.PrecioCompra.toString().includes(texto) ||
          producto.PrecioVenta.toString().includes(texto)
        );
        setProductosFiltrados(filtradas);
      }
    };

    obtenerYFiltrarProductos();
  }, [textoBusqueda, listaProductos]); // Dependencias: re-ejecuta cuando cambia el texto de búsqueda o la lista de productos

  const manejarCambioBusqueda = (e) => {
    setTextoBusqueda(e.target.value);
  };

  // Calcular los productos a mostrar en esta página
  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (
    <Container className="mt-5">
      <h2>Catálogo de Productos</h2>

      <Row className="mb-4">
        <Col lg={5} md={8} sm={8} xs={12}>
          <CuadroBusquedas
            textoBusqueda={textoBusqueda}
            manejarCambioBusqueda={manejarCambioBusqueda}
          />
        </Col>
      </Row>

      <Row>
        {productosPaginados.map((producto, indice) => (
          <Tarjeta
            key={producto.ID_Producto}
            indice={indice}
            nombreProducto={producto.nombreProducto}
            Descripcion={producto.Descripcion}
            PrecioVenta={producto.PrecioVenta}
            Stock={producto.Stock}
            ID_Categoria={producto.ID_Categoria}
            UbicacionFotografia={producto.UbicacionFotografia}
          />
        ))}
      </Row>
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={productosFiltrados.length}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </Container>
  );
};

export default CatalogoProductos;