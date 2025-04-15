// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCategoria = ({
  mostrarModal,
  setMostrarModal,
  nuevaCategoria,
  manejarCambioInput,
  agregarCategoria,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Categoría</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCategoria">
            <Form.Label>Nombre de la Categoría</Form.Label>
            <Form.Control
              type="text"
              name="NombreCategoria"
              value={nuevaCategoria.NombreCategoria}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
         
          </Form.Group>
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={agregarCategoria}>
          Guardar Categoría
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCategoria;