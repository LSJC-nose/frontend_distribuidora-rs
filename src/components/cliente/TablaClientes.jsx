// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from "../ordenamiento/Paginacion";

// Declaración del componente TablaClientes que recibe props
const TablaClientes = ({ clientes,
   cargando,
    error ,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual
  }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando clientes...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>; // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Cliente</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>TipoCliente</th>
        </tr>
      </thead>
      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.ID_Cliente}>
            <td>{cliente.ID_Cliente}</td>
            <td>{cliente.Nombre}</td>
            <td>{cliente.Apellido}</td>
            <td>{cliente.ID_tipoCliente}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    
    <Paginacion
  elementosPorPagina={elementosPorPagina}
  totalElementos={totalElementos}
  paginaActual={paginaActual}
  establecerPaginaActual={establecerPaginaActual}
/>
    </>
  );
};

// Exportación del componente
export default TablaClientes;