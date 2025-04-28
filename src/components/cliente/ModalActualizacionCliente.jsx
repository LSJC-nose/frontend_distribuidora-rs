import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionCliente = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  clienteEditado,
  manejarCambioInputEdicion,
  actualizarCliente,
  errorCarga,
  actualizartipoClientes, // Nueva prop para recibir la lista de tipos de cliente
}) => {

  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Cliente</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={clienteEditado?.Nombre || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre (máx. 20 caracteres)"
              maxLength={20}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formApellidocliente">
            <Form.Label>Apellido del cliente</Form.Label>
            <Form.Control
              type="text"
              name="Apellido"
              value={clienteEditado?.Apellido || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={20}
              required
            />
            
          </Form.Group>
          {/* Nuevo campo para seleccionar el tipo de cliente */}
          <Form.Group className="mb-3" controlId="formTipoCliente">
            <Form.Label>Tipo de Cliente</Form.Label>
            <Form.Select
              name="ID_tipoCliente"
              value={clienteEditado?.ID_tipoCliente || ""}
              onChange={manejarCambioInputEdicion}
              required
            >
              <option value="">Selecciona el tipo de cliente</option>
              {actualizartipoClientes.map((tipoCliente) => (
                <option key={tipoCliente.ID_tipoCliente} value={tipoCliente.ID_tipoCliente}>
                  {tipoCliente.TipoCliente}
                </option>
                ))}
            </Form.Select>
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
        <Button variant="primary" onClick={actualizarCliente}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionCliente;