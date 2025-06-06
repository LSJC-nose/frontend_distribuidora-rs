import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const ModalRegistroProveedor = ({
  mostrarModal,
  setMostrarModal,
  nuevoProveedor,
  manejarCambioInput,
  agregarProveedor,
  errorCarga,
}) => {
  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)}>
      <Modal.Header style={{ background: "#0d7878",
        opacity: 0.9
       }} closeButton>
        <Modal.Title style={{color:"#fff"}}>Agregar Nuevo Proveedor</Modal.Title>
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
              value={nuevoProveedor.NombreProveedor}
              onChange={manejarCambioInput}
              placeholder="Ingresa el nombredel proveedor"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTelefonoProveedor">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              name="Telefono"
              value={nuevoProveedor.Telefono}
              onChange={manejarCambioInput}
              placeholder="Ingresa el teléfono"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCorreoProveedor">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="Correo"
              value={nuevoProveedor.Correo}
              onChange={manejarCambioInput}
              placeholder="Ingresa el correo"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDireccionProveedor">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              name="Direccion"
              value={nuevoProveedor.Direccion}
              onChange={manejarCambioInput}
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
        variant="secondary" onClick={() => setMostrarModal(false)}>
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
        variant="primary" onClick={agregarProveedor}>
          Guardar Proveedor
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProveedor;