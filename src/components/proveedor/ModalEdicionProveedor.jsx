import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProveedor = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  proveedorEditado,
  manejarCambioInputEdicion,
  actualizarProveedor,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProveedor">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="NombreProveedor"
              value={proveedorEditado?.NombreProveedor || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefonoProveedor">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={proveedorEditado?.Telefono || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCorreoProveedor">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Correo"
              value={proveedorEditado?.Correo || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccionProveedor">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={proveedorEditado?.Direccion || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección"
              required
            />
          </Form.Group>

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={actualizarProveedor}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProveedor;