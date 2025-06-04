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

  const validarLetras = (e) => {
  const charCode = e.which ? e.which : e.keyCode;

  // Permitir solo letras (A-Z, a-z)
  if (
    (charCode < 65 || charCode > 90) && // Letras mayúsculas
    (charCode < 97 || charCode > 122) && // Letras minúsculas
    charCode !== 8 && // Retroceso
    charCode !== 46 && // Borrar
    charCode !== 9 // Tab
  ) {
    e.preventDefault(); // Evita que se escriba el carácter
  }
};

const validacionFormulario = () => {
  return (
    nuevoCliente.primer_nombre.trim() !== "" &&
    nuevoCliente.segundo_nombre.trim() !== "" &&
    nuevoCliente.primer_apellido.trim() !== "" &&
    nuevoCliente.segundo_apellido.trim() !== "" &&
    nuevoCliente.celular.trim() !== "" &&
    nuevoCliente.direccion.trim() !== "" &&
    nuevoCliente.cedula.trim() !== ""
  );
};

const validarNumeros = (e) => {
  const charCode = e.which ? e.which : e.keyCode;
  // Permitir solo números (0-9), retroceso, borrar y Tab
  if (
    (charCode < 48 || charCode > 57) && // Números (0-9)
    charCode !== 8 && // Retroceso
    charCode != 46 && // Borrar
    charCode !== 9 // Tab
  ) {
    e.preventDefault(); // Evita que se escriba el carácter
  }
};


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

         <Form.Group className="mb-3" controlId="formImagenProducto">
  <Form.Label>Imagen</Form.Label>
  <Form.Control
    type="file"
    name="UbicacionFotografia"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          manejarCambioInput({
            target: { name: 'UbicacionFotografia', value: reader.result.split(',')[1] } // Extrae solo la parte Base64
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