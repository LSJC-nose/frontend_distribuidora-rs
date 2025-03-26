// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaProducto que recibe props
const TablaProducto = ({ productos, cargando, error }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando producto...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Producto</th>
          <th>Stock</th>
          <th>ID categoria</th>
          <th>PrecioCompra</th>
          <th>PrecioVenta</th>
          <th>Producto</th>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.ID_Producto}>
            <td>{producto.ID_Producto}</td>
            <td>{producto.Stock}</td>
            <td>{producto.ID_Categoria}</td>
            <td>{producto.PrecioCompra}</td>
            <td>{producto.PrecioVenta}</td>
            <td>{producto.nombreProducto}</td>
            <td>{producto.Descripcion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaProducto;