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
    id_cliente: venta?.id_cliente || '',
    id_empleado: venta?.id_empleado || '',
    fecha_venta: venta?.fecha_venta ? new Date(venta.fecha_venta) : new Date(),
    total_venta: venta?.total_venta || 0
  });

  useEffect(() => {
    if (venta && clientes.length > 0 && empleados.length > 0) {
      const cliente = clientes.find(c => c.id_cliente === parseInt(venta.id_cliente));
      const empleado = empleados.find(e => e.id_empleado === parseInt(venta.id_empleado));
      if (cliente) {
        setVentaActualizada(prev => ({ ...prev, id_cliente: cliente.id_cliente }));
      }
      if (empleado) {
        setVentaActualizada(prev => ({ ...prev, id_empleado: empleado.id_empleado }));
      }
    }
  }, [venta, clientes, empleados]);

  // Calcular total de la venta
  const totalVenta = detallesVenta.reduce((sum, detalle) => sum + (detalle.cantidad * detalle.precio_unitario), 0);

  // Manejo de eventos en selectores
  const manejarCambioCliente = seleccionado => {
    setVentaActualizada(prev => ({ ...prev, id_cliente: seleccionado?.value || '' }));
  };

  const manejarCambioEmpleado = seleccionado => {
    setVentaActualizada(prev => ({ ...prev, id_empleado: seleccionado?.value || '' }));
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
                <AsyncSelect defaultOptions loadOptions={(input, cb) => cb(clientes.map(c => ({ value: c.id_cliente, label: `${c.primer_nombre} ${c.primer_apellido}` })))} onChange={manejarCambioCliente} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Empleado</Form.Label>
                <AsyncSelect defaultOptions loadOptions={(input, cb) => cb(empleados.map(e => ({ value: e.id_empleado, label: `${e.primer_nombre} ${e.primer_apellido}` })))} onChange={manejarCambioEmpleado} />
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
                  <td>{detalle.nombre_producto}</td>
                  <td>{detalle.cantidad}</td>
                  <td>{detalle.precio_unitario.toFixed(2)}</td>
                  <td>{(detalle.cantidad * detalle.precio_unitario).toFixed(2)}</td>
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
