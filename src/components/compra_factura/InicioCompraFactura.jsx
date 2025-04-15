// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const TablaCompra = ({ compras, cargando, error }) => {
  if (cargando) {
    return <div>Cargando compras...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Compra</th>
          <th>ID Detalle</th>
          <th>Fecha Compra</th>
          <th>Proveedor</th>
          <th>Producto</th>
          <th>Cantidad</th>
          <th>Precio Compra</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={`${venta.ID_CompraFactura}-${venta.ID_Compra}`}> {/* Clave única combinada */}
            <td>{compra.NumeroFactura}</td>
            <td>{compra.ID_Compra}</td>
            <td>{compra.ID_Tiempo}</td>
            <td>{compra.nombreProveedor}</td>
            <td>{compra.nombreProducto}</td>
            <td>{compra.Cantidad}</td>
            <td>C$ {compra.Precio}</td>
            <td>C$ {compra.Subtotal.toFixed(2)}</td>
          </tr> 
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaCompra;