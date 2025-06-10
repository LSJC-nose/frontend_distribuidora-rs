import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ModalEdicionProducto = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  productoEditado,
  manejarCambioInputEdicion,
  actualizarProducto,
  errorCarga,
  listaCategorias,
}) => {
  const validarNumeros = (e) => {
    const charCode = e.which ? e.which : e.keyCode;
    if (
      (charCode < 48 || charCode > 57) &&
      charCode !== 8 &&
      charCode !== 46 &&
      charCode !== 9 &&
      charCode !== 190 && // Punto decimal
      charCode !== 110 // Punto decimal (numpad)
    ) {
      e.preventDefault();
    }
  };

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


  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header
        style={{ background: "#0d7878", opacity: 0.9 }}
        closeButton
      >
        <Modal.Title style={{ color: "#fff" }}>Editar Producto</Modal.Title>
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
              value={productoEditado?.nombreProducto || ""}
              onKeyDown={validarLetras}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre del producto"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescripcion">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              name="Descripcion"
              value={productoEditado?.Descripcion || ""}
              onKeyDown={validarLetras}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la descripción"
              required
            />
          </Form.Group>

          {/* Grouped PrecioCompra, PrecioVenta, and Stock in a single row */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="formPrecioCompra">
                <Form.Label>Precio de Compra</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="PrecioCompra"
                  value={productoEditado?.PrecioCompra || ""}
                  onChange={manejarCambioInputEdicion}
                  placeholder="Compra"
                  onKeyPress={validarNumeros}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formPrecioVenta">
                <Form.Label>Precio de Venta</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="PrecioVenta"
                  value={productoEditado?.PrecioVenta || ""}
                  onChange={manejarCambioInputEdicion}
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
                  value={productoEditado?.Stock || ""}
                  onChange={manejarCambioInputEdicion}
                  placeholder="Stock"
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formCategoriaProducto">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="ID_Categoria"
              value={productoEditado?.ID_Categoria || ""}
              onChange={manejarCambioInputEdicion}
              required
            >
              <option value="">Selecciona una categoría</option>
              {listaCategorias.map((categoria) => (
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
            {productoEditado?.imagen && (
              <div>
                <img
                  src={`data:image/png;base64,${productoEditado.UbicacionFotografia}`}
                  alt="Imagen actual"
                  style={{ maxWidth: "100px", marginBottom: "10px" }}
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

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
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
          onClick={() => setMostrarModalEdicion(false)}
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
          onClick={actualizarProducto}
        >
          Actualizar Producto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProducto;