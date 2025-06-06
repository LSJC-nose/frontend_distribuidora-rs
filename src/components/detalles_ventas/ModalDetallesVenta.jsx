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
      <Modal.Header 
      style={{ background: "#0d7878",
        opacity: 0.9
       }} 
      closeButton>
        <Modal.Title
        style={{ color: "#fff" }}
        id="detalles-venta-modal">Detalles de la Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body
      style={{  background: "#f0f7f7",
          opacity: 0.9, 
      }}
      >
        {cargandoDetalles && <div>Cargando detalles...</div>}
        {!cargandoDetalles && !errorDetalles && detalles.length > 0 && (
          <Container>
            <Table className="bi bi-secondary table-striped table-primary" striped bordered hover responsive>
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
                width: "13%",
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
          Cerrar Detalle
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDetallesVenta;