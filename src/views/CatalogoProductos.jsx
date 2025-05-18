import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Tarjeta from '../components/catalogo/Tarjeta';

const CatalogoProductos = () => {
  const [listaProductos, setListaProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);

  // Obtener productos
  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProductos(datos);
      setCargando(false);
    } catch (error) {
      setErrorCarga(error.message);
      setCargando(false);
    }
  };




  

  useEffect(() => {
    obtenerProductos();
  }, []);

  if (cargando) return <div>Cargando...</div>;
  if (errorCarga) return <div>Error: {errorCarga}</div>;

  return (

    <Container className="mt-5">
        <b>cds</b>
      <h4>Catálogo de Productos</h4>
      <Row>
        {listaProductos.map((producto, indice) => (
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
    </Container>
  );
};

export default CatalogoProductos;