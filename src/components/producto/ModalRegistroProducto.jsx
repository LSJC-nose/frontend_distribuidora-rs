import React from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  manejarCambioInput,
  agregarProducto,
  errorCarga,
  categorias,
}) => {
  // Validation functions remain unchanged
  const validarLetras = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode < 65 || charCode > 90) &&
      (charCode < 97 || charCode > 122) &&
      charCode !== 8 &&
      charCode !== 46 &&
      charCode !== 9
    ) {
      e.preventDefault();
    }
  };

  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode < 48 || charCode > 57) &&
      charCode !== 8 &&
      charCode !== 46 &&
      charCode !== 9
    ) {
      e.preventDefault();
    }
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header
        style={{ background: "#0d7878", opacity: 0.9 }}
        closeButton
      >
        <Modal.Title style={{ color: "#fff" }}>
          Agregar Nuevo Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          background: "#f0f7f7",
          opacity: 0.9,
        }}
      >
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

          {/* Grouped PrecioCompra, PrecioVenta, and Stock in a single row */}
          <Row className="mb-2">
            <Col xs={12} md={4}>
              <Form.Group controlId="formPrecioCompra">
                <Form.Label>Precio de Compra</Form.Label>
                <Form.Control
                  type="number"
                  name="PrecioCompra"
                  value={nuevoProducto.PrecioCompra}
                  onChange={manejarCambioInput}
                  placeholder="Compra"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formPrecioVenta">
                <Form.Label>Precio de Venta</Form.Label>
                <Form.Control
                  type="number"
                  name="PrecioVenta"
                  value={nuevoProducto.PrecioVenta}
                  onChange={manejarCambioInput}
                  placeholder="Venta"
                  onKeyPress={validarNumeros}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="Stock"
                  value={nuevoProducto.Stock}
                  onChange={manejarCambioInput}
                  placeholder="Stock"
                  onKeyPress={validarNumeros}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formCliente_tipoCliente">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              name="ID_Categoria"
              value={nuevoProducto.ID_Categoria}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Selecciona la categoría</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.ID_Categoria}
                  value={categoria.ID_Categoria}
                >
                  {categoria.NombreCategoria}
                </option>
              ))}
            </Form.Select>
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
                      target: {
                        name: "UbicacionFotografia",
                        value: reader.result.split(",")[1],
                      },
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </Form.Group>

          {errorCarga && <div className="text-danger mt-2">{errorCarga}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: "#c7d7f0" }}>
        <Button
          style={{
            background:
              "linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))",
            border: "none",
            borderRadius: "50px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            width: "45%",
            padding: "5px 10px",
            fontSize: "17px",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "none";
          }}
          variant="secondary"
          onClick={() => setMostrarModal(false)}
        >
          Cancelar
        </Button>
        <Button
          style={{
            background:
              "linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))",
            border: "none",
            borderRadius: "50px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: "600",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease",
            width: "45%",
            padding: "5px 10px",
            fontSize: "17px",
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = "none";
          }}
          variant="primary"
          onClick={agregarProducto}
        >
          Guardar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;