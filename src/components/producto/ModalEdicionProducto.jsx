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


         <Form.Group className="mb-3" controlId="formImagenProducto">
  <Form.Label>Imagen</Form.Label>
  {productoEditado?.imagen && (
    <div>
      <img
        src={`data:image/png;base64,${productoEditado.UbicacionFotografia}`}
        alt="Imagen actual"
        style={{ maxWidth: '100px', marginBottom: '10px' }}
      />
    </div>
  )}
  <Form.Control
    type="file"
    name="UbicacionFotografia"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          manejarCambioInputEdicion({
            target: { name: 'UbicacionFotografia', value: reader.result.split(',')[1] }
          });
        };
        reader.readAsDataURL(file);
      }
    }}
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