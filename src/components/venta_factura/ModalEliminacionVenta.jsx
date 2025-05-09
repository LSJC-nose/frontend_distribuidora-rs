import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalEliminacionVenta = ({
  mostrarModalEliminacion,
  setMostrarModalEliminacion,
  ventaAEliminar,
  eliminarVenta
}) => {
  return (
    <Modal show={mostrarModalEliminacion} onHide={() => setMostrarModalEliminacion(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ventaAEliminar ? (
          <>
            <p><strong>Cliente:</strong> {ventaAEliminar.nombreCliente}</p>
            <p><strong>Fecha de Venta:</strong> {ventaAEliminar.fechaVenta}</p>
            <p>¿Estás seguro de que deseas eliminar esta venta?</p>
          </>
        ) : (
          <p>Error: No se ha seleccionado una venta.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModalEliminacion(false)}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={() => eliminarVenta(ventaAEliminar.ID_Venta)}>
          Eliminar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEliminacionVenta;
