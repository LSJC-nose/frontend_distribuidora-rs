// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaVentas = ({ ventas, cargando, error }) => {
  if (cargando) {
    return <div>Cargando ventas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Venta</th>
          <th>ID Detalle</th>
          <th>Fecha Venta</th>
          <th>Cliente</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Venta</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={`${venta.NumeroFactura}-${venta.ID_Detalle}`}> {/* Clave única combinada */}
            <td>{venta.NumeroFactura}</td>
            <td>{venta.ID_Detalle}</td>
            <td>{venta.ID_Tiempo}</td>
            <td>{venta.nombreCliente}</td>
            <td>{venta.nombreProducto}</td>
            <td>{venta.Cantidad}</td>
            <td>C$ {venta.PrecioVenta}</td>
            <td>C$ {venta.subtotal.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaVentas;