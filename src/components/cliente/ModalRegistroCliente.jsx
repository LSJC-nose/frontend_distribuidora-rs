// ModalRegistroCategoria.jsx
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroCliente = ({
  mostrarModal,
  setMostrarModal,
  nuevoCliente,
  manejarCambioInput,
  agregarCliente,
  errorCarga,
  tipoClientes
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevos Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={nuevoCliente.Nombre}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={50}
              required
            />

            
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidoCliente">
            <Form.Label>Apellido del cliente</Form.Label>
            <Form.Control
              type="text"
              name="Apellido"
              value={nuevoCliente.Apellido}
              onChange={manejarCambioInput}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={50}  
              required
            />

            
            <Form.Group className="mb-3" controlId="formCliente_tipoCliente">
            <Form.Label>Tipo Cliente</Form.Label>
            <Form.Select
              name="ID_tipoCliente"
              value={nuevoCliente.ID_tipoCliente}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Selecciona el tipo de cliente</option>
              {tipoClientes.map((tipoCliente) => (
                <option key={tipoCliente.ID_tipoCliente} value={tipoCliente.ID_tipoCliente}>
                  {tipoCliente.TipoCliente}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
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
        <Button variant="primary" onClick={agregarCliente}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;