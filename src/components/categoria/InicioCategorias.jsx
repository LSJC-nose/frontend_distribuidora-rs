// Importaciones necesarias para el componente visual
import React from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Paginacion from "../ordenamiento/Paginacion";

// Declaración del componente TablaCategorias que recibe props
const TablaCategorias = ({ categorias,
   cargando,
    error ,
    totalElementos,
    elementosPorPagina,
    paginaActual,
    establecerPaginaActual
  }) => {
  // Renderizado condicional según el estado recibido por props
  if (cargando) {
    return <div>Cargando categorías...</div>; // Muestra mensaje mientras carga
  }
  if (error) {
    return <div>Error: {error}</div>;         // Muestra error si ocurre
  }

  // Renderizado de la tabla con los datos recibidos
  return (
    <>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>ID Categoría</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id_categoria}>
            <td>{categoria.ID_Categoria}</td>
            <td>{categoria.NombreCategoria}</td>
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
export default TablaCategorias;