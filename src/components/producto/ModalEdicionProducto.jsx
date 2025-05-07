import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  productoEditado,
  manejarCambioInputEdicion,
  actualizarProducto,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombreProducto"
              value={productoEditado?.nombreProducto || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="Stock"
              value={productoEditado?.Stock || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrecioCompra">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="PrecioCompra"
              value={productoEditado?.PrecioCompra || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPrecioVenta">
            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              name="PrecioVenta"
              value={productoEditado?.PrecioVenta || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={productoEditado?.Descripcion || ""}
              onChange={manejarCambioInputEdicion}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formUbicacionFotografia">
            <Form.Label>Ubicación de Fotografía</Form.Label>
            <Form.Control
              type="text"
              name="UbicacionFotografia"
              value={productoEditado?.UbicacionFotografia || ""}
              onChange={manejarCambioInputEdicion}
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
        <Button variant="primary" onClick={actualizarProducto}>
          Actualizar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;
