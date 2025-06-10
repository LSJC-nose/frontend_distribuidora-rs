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
      style={{ background: "#0d7878",
        opacity: 0.9
       }}
      closeButton>
        <Modal.Title style={{color:"#fff"}}>Agregar Nuevos Clientes</Modal.Title>
      </Modal.Header>
      <Modal.Body
       style={{  background: "#f0f7f7",
          opacity: 0.9, 
      }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="formNombreCliente">
            <Form.Label>Nombre del cliente</Form.Label>
            <Form.Control
              type="text"
              name="Nombre"
              value={nuevoCliente.Nombre}
              onKeyDown={validarLetras}
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
              onKeyDown={validarLetras}
              onChange={manejarCambioInput}
              placeholder="Ingresa el apellido (máx. 20 caracteres)"
              maxLength={50}  
              required
            />

            
            <Form.Group className="mb-3" controlId="formCliente_tipoCliente">
            <Form.Label>Tipo Cliente</Form.Label>
            <Form.Select
              name="ID_TipoCliente"
              value={nuevoCliente.ID_TipoCliente}
              onChange={manejarCambioInput}
              required
            >
              <option value="">Selecciona el tipo de cliente</option>
              {tipoClientes.map((tipoCliente) => (
                <option key={tipoCliente.ID_TipoCliente} value={tipoCliente.ID_TipoCliente}>
                  {tipoCliente.tipoCliente}
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
        variant="secondary" onClick={() => {
          setMostrarModal(false);
        }}>
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
        variant="primary" onClick={agregarCliente}>
          Guardar Cliente
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCliente;