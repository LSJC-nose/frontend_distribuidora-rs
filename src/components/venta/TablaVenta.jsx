// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from '../ordenamiento/Paginacion';

const TablaVentas = ({ obtenerDetalles, ventas, cargando, error, 
  abrirModalEliminacion, 
  abrirModalActualizacion ,
  elementosPorPagina,
  totalElementos,
  paginaActual,
  establecerPaginaActual

}) => {
  if (cargando) {
    return <div>Cargando ventas...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Venta</th>
          <th>Fecha Venta</th>
          <th>Cliente</th>
          <th>Total</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={`${venta.id_venta}`}>
            <td>{venta.id_venta}</td>
            <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
            <td>{venta.nombre_cliente}</td>
            <td>C$ {venta.subtotal.toFixed(2)}</td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => obtenerDetalles(venta.id_venta)}
              >
                <i className="bi bi-list-ul"></i>
              </Button>

              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(venta)}
              >
                <i className="bi bi-trash"></i>
              </Button>

              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => abrirModalActualizacion(venta)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
            </td>
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
export default TablaVentas;
