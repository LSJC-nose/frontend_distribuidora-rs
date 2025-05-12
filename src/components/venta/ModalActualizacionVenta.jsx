import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ModalActualizacionVenta = ({
  mostrarModal,
  setMostrarModal,
  venta,
  detallesVenta,
  setDetallesVenta,
  actualizarVenta,
  errorCarga,
  clientes,
  empleados,
  productos
}) => {
  const [ventaActualizada, setVentaActualizada] = useState({
    id_venta: venta?.id_venta || '',
    ID_Cliente: venta?.ID_Cliente || '',
    fecha_venta: venta?.fecha_venta ? new Date(venta.fecha_venta) : new Date(),
    total_venta: venta?.total_venta || 0
  });

  useEffect(() => {
    if (venta && clientes.length > 0 ) {
      const cliente = clientes.find(c => c.ID_Cliente === parseInt(venta.ID_Cliente));
      if (cliente) {
        setVentaActualizada(prev => ({ ...prev, ID_Cliente: cliente.ID_Cliente }));
      }
    }
  }, [venta, clientes]);

  // Calcular total de la venta
  const totalVenta = detallesVenta.reduce((sum, detalle) => sum + (detalle.Cantidad * detalle.PrecioVenta), 0);

  // Manejo de eventos en selectores
  const manejarCambioCliente = seleccionado => {
    setVentaActualizada(prev => ({ ...prev, ID_Cliente: seleccionado?.value || '' }));
  };


  const manejarCambioFecha = fecha => {
    setVentaActualizada(prev => ({ ...prev, fecha_venta: fecha }));
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Cliente</Form.Label>
                <AsyncSelect defaultOptions loadOptions={(input, cb) => cb(clientes.map(c => ({ value: c.ID_Cliente, label: `${c.Nombre} ${c.Apellido}` })))} onChange={manejarCambioCliente} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Fecha de Venta</Form.Label>
                <DatePicker selected={ventaActualizada.fecha_venta} onChange={manejarCambioFecha} className="form-control" dateFormat="dd/MM/yyyy HH:mm" showTimeSelect timeIntervals={15} />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>Detalles de Venta</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detallesVenta.map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.nombreProducto}</td>
                  <td>{detalle.Cantidad}</td>
                  <td>{detalle.PrecioVenta.toFixed(2)}</td>
                  <td>{(detalle.Cantidad * detalle.PrecioVenta).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                <td><strong>{totalVenta.toFixed(2)}</strong></td>
              </tr>
            </tfoot>
          </Table>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
        <Button variant="primary" onClick={() => actualizarVenta(ventaActualizada, detallesVenta)}>Actualizar Venta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActualizacionVenta;
