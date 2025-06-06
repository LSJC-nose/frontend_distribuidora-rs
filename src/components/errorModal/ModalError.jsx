import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalError = ({ mostrarModalError, setMostrarModalError, mensajeError }) => {
  return (
    <Modal
      show={mostrarModalError}
      onHide={() => setMostrarModalError(false)}
      centered
      size="sm"
    >
      <Modal.Header
        style={{
          background: "#ff3232",
          padding: "0.5rem 1rem",
        }}
        closeButton
      >
        <Modal.Title style={{ fontSize: "1.2rem" }}>Error</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{
          padding: "0.75rem",
          //fontSize: "0.9rem",
        }}
      >
        <p>{mensajeError}</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          padding: "0.5rem",
        }}
      >
        <Button
          variant="secondary"
          onClick={() => setMostrarModalError(false)}
          style={{
            background: 'linear-gradient(90deg, rgb(143, 9, 9), rgb(212, 72, 72))',
            border: 'none',
            borderRadius: '50px',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: '900',
            padding: '0.25rem 0.75rem',
            fontSize: '0.99rem',
          }}
        >
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;