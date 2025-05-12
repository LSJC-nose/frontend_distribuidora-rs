import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Table, Container } from 'react-bootstrap';

const ModalDetallesVenta = ({ mostrarModal, setMostrarModal, detalles, cargandoDetalles, errorDetalles }) => {
  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      fullscreen={true}
      aria-labelledby="detalles-venta-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="detalles-venta-modal">Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cargandoDetalles && <div>Cargando detalles...</div>}
        {!cargandoDetalles && !errorDetalles && detalles.length > 0 && (
          <Container>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID Detalle</th>
                  <th>Producto</th>
                  <th>Descripción</th>
                  <th>Cantidad</th>
                  <th>Precio Venta</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {detalles.map((detalle) => (
                  <tr key={detalle.ID_Detalle}>
                    <td>{detalle.ID_Detalle}</td>
                    <td>{detalle.nombreProducto}</td>
                    <td>{detalle.Descripcion}</td>
                    <td>{detalle.Cantidad}</td>
                    <td>C$ {detalle.PrecioVenta.toFixed(2)}</td>
                    <td>C$ {detalle.total_venta.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesVenta;