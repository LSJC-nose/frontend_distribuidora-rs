import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalEdicionProveedor = ({
  mostrarModalEdicion,
  setMostrarModalEdicion,
  proveedorEditado,
  manejarCambioInputEdicion,
  actualizarProveedor,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModalEdicion} onHide={() => setMostrarModalEdicion(false)}>
      <Modal.Header
      style={{ background: "#0d7878",
        opacity: 0.9
       }}
      closeButton>
        <Modal.Title style={{color:"#fff"}}>Editar Proveedor</Modal.Title>
      </Modal.Header>
      <Modal.Body 
      style={{  background: "#f0f7f7",
          opacity: 0.9, 
      }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formNombreProveedor">
            <Form.Label>Nombre del Proveedor</Form.Label>
            <Form.Control
              type="text"
              name="NombreProveedor"
              value={proveedorEditado?.NombreProveedor || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el nombre"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefonoProveedor">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={proveedorEditado?.Telefono || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCorreoProveedor">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Correo"
              value={proveedorEditado?.Correo || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa el correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccionProveedor">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={proveedorEditado?.Direccion || ""}
              onChange={manejarCambioInputEdicion}
              placeholder="Ingresa la dirección"
              required
            />
          </Form.Group>

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{background: "#c7d7f0"}}>
        <Button 
         style={{
                background: "linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))",
                border: "none",
                borderRadius: "50px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "600",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                width: "30%",
                padding: "5px 10px",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}  
        variant="secondary" onClick={() => setMostrarModalEdicion(false)}>
          Cancelar
        </Button>
        <Button 
         style={{
                background: "linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))",
                border: "none",
                borderRadius: "50px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "600",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                width: "40%",
                padding: "5px 10px",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
        variant="primary" onClick={actualizarProveedor}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEdicionProveedor;