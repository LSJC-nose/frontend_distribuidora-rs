import React from "react";
import { Table, Button, Image } from "react-bootstrap";

const InicioProductos = ({ productos, cargando, error, abrirModalEdicion, abrirModalEliminacion, generarPDFDetalleProducto }) => {
  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (productos.length === 0) return <p className="text-warning">No hay productos registrados.</p>;

  return (
    <>
      <Table  className="bi bi-secondary table-striped table-primary">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Categoria</th>
            <th>Precio Compra</th>
            <th>Precio Venta</th>
            <th>Descripción</th>
            <th>Imagenes</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.ID_Producto}>
              <td>{producto.ID_Producto}</td>
              <td>{producto.nombreProducto}</td>
              <td>{producto.Stock}</td>
              <td>{producto.NombreCategoria}</td>
              <td>{producto.PrecioCompra}</td>
              <td>{producto.PrecioVenta}</td>
              <td>{producto.Descripcion}</td>
              <td>
                {producto.UbicacionFotografia ? (
                  <img
                    src={`data:image/png;base64,${producto.UbicacionFotografia}`}
                    alt={producto.nombreProducto}
                    style={{ maxWidth: '100px' }}
                  />
                ) : (
                  'Sin imagen'
                )}
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => generarPDFDetalleProducto(producto)}
                >
                  <i className="bi bi-file-pdf"></i>
                </Button>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(producto)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => abrirModalEliminacion(producto)}
                >
                  <i className="bi bi-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default InicioProductos;