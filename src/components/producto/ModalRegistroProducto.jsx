import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
  errorCarga, 
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProducto">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="nombreProducto"
              value={nuevoProducto.nombreProducto}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombre del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcionProducto">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={nuevoProducto.Descripcion}
              onChange={manejarCambioInput}
              placeholder="Ingresa la descripción"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrecioCompra">
            <Form.Label>Precio de Compra</Form.Label>
            <Form.Control
              type="number"
              name="PrecioCompra"
              value={nuevoProducto.PrecioCompra}
              onChange={manejarCambioInput}
              placeholder="Ingresa el precio de compra"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPrecioVenta">
            <Form.Label>Precio de Venta</Form.Label>
            <Form.Control
              type="number"
              name="PrecioVenta"
              value={nuevoProducto.PrecioVenta}
              onChange={manejarCambioInput}
              placeholder="Ingresa el precio de venta"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formStock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="Stock"
              value={nuevoProducto.Stock}
              onChange={manejarCambioInput}
              placeholder="Ingresa el stock"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formIDCategoria">
            <Form.Label>ID de Categoría</Form.Label>
            <Form.Control
              type="number"
              name="ID_Categoria"
              value={nuevoProducto.ID_Categoria}
              onChange={manejarCambioInput}
              placeholder="Ingresa el ID de categoría"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUbicacionFotografia">
            <Form.Label>Ubicación de Fotografía</Form.Label>
            <Form.Control
              type="text"
              name="UbicacionFotografia"
              value={nuevoProducto.UbicacionFotografia}
              onChange={manejarCambioInput}
              placeholder="Ingresa la ubicación de la fotografía"
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
        <Button variant="primary" onClick={agregarProducto}>
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;