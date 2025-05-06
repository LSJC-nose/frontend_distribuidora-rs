import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProveedor = ({
  mostrarModal,
  setMostrarModal,
  nuevoProveedor,
  manejarCambioInput,
  agregarProveedor,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProveedor">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="NombreProveedor"
              value={nuevoProveedor.NombreProveedor}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefonoProveedor">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoProveedor.Telefono}
              onChange={manejarCambioInput}
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCorreoProveedor">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Correo"
              value={nuevoProveedor.Correo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccionProveedor">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={nuevoProveedor.Direccion}
              onChange={manejarCambioInput}
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
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarProveedor}>
          Guardar Proveedor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProveedor;
