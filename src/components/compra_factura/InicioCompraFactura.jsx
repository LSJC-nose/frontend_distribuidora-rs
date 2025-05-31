// Importaciones necesarias para el componente visual
import React from 'react';
import { Table, Button   } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from '../ordenamiento/Paginacion';

const TablaCompra = ({ compras, 
                       cargando, 
                       error,
                       obtenerDetalles,
                       abrirModalActualizacion,
                       abrirModalEliminacion,
                       elementosPorPagina,
                       totalElementos,
                       paginaActual,
                       establecerPaginaActual
                      }) => {
  if (cargando) {
    return <div>Cargando compras...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;     // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (<>
    <Table striped bordered hover responsive>
     <thead>
          <tr>
            <th>ID Compra</th>
            <th>Fecha Compra</th>
            <th>Proveedor</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <tr key={`${compra.ID_CompraFactura}`}>
              <td>{compra.ID_CompraFactura}</td>
              <td>{compra.fecha_compra}</td>
              <td>{compra.NombreProveedor}</td>
              <td>C$ {compra.total_compra}</td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                className="me-2"
                onClick={() => obtenerDetalles(compra.ID_CompraFactura)}
              >
                <i className="bi bi-list-ul"></i>
              </Button>
              <Button
                variant="outline-warning"
                size="sm"
                className="me-2"
                onClick={() => abrirModalActualizacion(compra)}
              >
                <i className="bi bi-pencil"></i>
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => abrirModalEliminacion(compra)}
              >
                <i className="bi bi-trash"></i>
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
export default TablaCompra;