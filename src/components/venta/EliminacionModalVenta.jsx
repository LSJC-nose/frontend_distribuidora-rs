// components/ventas/ModalEliminacionVenta.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionVenta = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  eliminarVenta,
}) => {
  return (
    <Modal show={mostrarModalEliminacion} onHide={() => setMostrarModalEliminacion(false)}>
      <Modal.Header style={{ background: "#0d7878",
        opacity: 0.9
       }}  closeButton>
        <Modal.Title style={{color:"#fff"}}>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body
      style={{  background: "#f0f7f7",
          opacity: 0.9, 
      }}
      >
        ¿Estás seguro de que deseas eliminar esta venta?
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
                width: "29%",
                padding: "5px 10px",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
        variant="secondary" onClick={() => setMostrarModalEliminacion(false)}>
          Cancelar
        </Button>
        <Button
         style={{
                background: "linear-gradient(90deg, rgb(207, 116, 116), rgb(182, 51, 47))",
                border: "none",
                borderRadius: "50px",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: "600",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                width: "29%",
                padding: "5px 10px",
                fontSize: "17px",
              }}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = "0 0 15px rgba(168, 14, 14, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = "none";
              }}
        variant="danger" onClick={eliminarVenta}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionVenta;
