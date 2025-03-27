// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Declaración del componente TablaProveedor que recibe props
const TablaProveedor = ({ proveedores, cargando, error }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando proveedor...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID_Proveedor</th>
          <th>Proveedor</th>
          <th>Telefono</th>
          <th>Correo</th>
          <th>Direccion</th>
        </tr>
      </thead>
      <tbody>
        {proveedores && proveedores.map((proveedor) => ( // Verifica que proveedores no sea null antes de mapear
          <tr key={proveedor.ID_Proveedores}>
            <td>{proveedor.ID_Proveedores}</td>
            <td>{proveedor.NombreProveedor}</td>
            <td>{proveedor.Telefono}</td>
            <td>{proveedor.Correo}</td  >
            <td>{proveedor.Direccion}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

// Exportación del componente
export default TablaProveedor;