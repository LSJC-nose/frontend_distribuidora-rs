import React from "react";
import { Table, Button } from "react-bootstrap";

const InicioProveedores = ({
  proveedores,
  cargando,
  error,
  abrirModalEdicion,
  abrirModalEliminacion
}) => {
  if (cargando) return <p>Cargando proveedores...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.ID_Proveedores}>
              <td>{proveedor.ID_Proveedores}</td>
              <td>{proveedor.NombreProveedor}</td>
              <td>{proveedor.Telefono}</td>
              <td>{proveedor.Correo}</td>
              <td>{proveedor.Direccion}</td>
              <td>
                <Button
                  variant="outline-warning"
                  size="sm"
                  className="me-2"
                  onClick={() => abrirModalEdicion(proveedor)}
                >
                  <i className="bi bi-pencil"></i>
                </Button>

               <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => abrirModalEliminacion(proveedor)}
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

export default InicioProveedores;
