import React, { useState } from "react";
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ModalRegistroVenta = ({
  mostrarModal,
  setMostrarModal,
  nuevaVenta,
  setNuevaVenta,
  detallesVenta,
  setDetallesVenta,
  agregarDetalle,
  agregarVenta,
  errorCarga,
  clientes,
  empleados,
  productos
}) => {
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ id_producto: '', cantidad: '', precio_unitario: '' });

  // Calcular total de la venta
  const totalVenta = detallesVenta.reduce((sum, detalle) => sum + (detalle.cantidad * detalle.precio_unitario), 0);

  // Cargar opciones para AsyncSelect
  const cargarClientes = (inputValue, callback) => {
    const filtrados = clientes.filter(cliente =>
      `${cliente.primer_nombre} ${cliente.primer_apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(cliente => ({
      value: cliente.id_cliente,
      label: `${cliente.primer_nombre} ${cliente.primer_apellido}`
    })));
  };

  const cargarEmpleados = (inputValue, callback) => {
    const filtrados = empleados.filter(empleado =>
      `${empleado.primer_nombre} ${empleado.primer_apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(empleado => ({
      value: empleado.id_empleado,
      label: `${empleado.primer_nombre} ${empleado.primer_apellido}`
    })));
  };

  const cargarProductos = (inputValue, callback) => {
    const filtrados = productos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(producto => ({
      value: producto.ID_Producto,
      label: producto.nombreProducto,
      precio: producto.PrecioVenta
    })));
  };

  // Manejar cambios en los selectores
  const manejarCambioCliente = (seleccionado) => {
    setClienteSeleccionado(seleccionado);
    setNuevaVenta(prev => ({ ...prev, id_cliente: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioEmpleado = (seleccionado) => {
    setEmpleadoSeleccionado(seleccionado);
    setNuevaVenta(prev => ({ ...prev, id_empleado: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      id_producto: seleccionado ? seleccionado.value : '',
      precio_unitario: seleccionado ? seleccionado.precio : ''
    }));
  };

  // Manejar cambios en el detalle
  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  // Agregar detalle a la lista
  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.id_producto || !nuevoDetalle.cantidad || nuevoDetalle.cantidad <= 0) {
      alert("Por favor, selecciona un producto y una cantidad válida.");
      return;
    }

    // Verificar stock
    const producto = productos.find(p => p.ID_Producto === nuevoDetalle.id_producto);
    if (producto && nuevoDetalle.cantidad > producto.Stock) {
      alert(`Stock insuficiente de ${producto.nombreProducto}. Unidades disponibles: ${producto.Stock}`);
      return;
    }

    agregarDetalle({
      id_producto: nuevoDetalle.id_producto,
      nombre_producto: productoSeleccionado.label,
      cantidad: parseInt(nuevoDetalle.cantidad),
      precio_unitario: parseFloat(nuevoDetalle.precio_unitario)
    });
    setNuevoDetalle({ id_producto: '', cantidad: '', precio_unitario: '' });
    setProductoSeleccionado(null);
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Cliente</Form.Label>
                <AsyncSelect cacheOptions defaultOptions loadOptions={cargarClientes} onChange={manejarCambioCliente} value={clienteSeleccionado} placeholder="Buscar cliente..." isClearable />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Empleado</Form.Label>
                <AsyncSelect cacheOptions defaultOptions loadOptions={cargarEmpleados} onChange={manejarCambioEmpleado} value={empleadoSeleccionado} placeholder="Buscar empleado..." isClearable />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha de Venta</Form.Label>
                <DatePicker selected={nuevaVenta.fecha_venta} onChange={(date) => setNuevaVenta(prev => ({ ...prev, fecha_venta: date }))} className="form-control" dateFormat="dd/MM/yyyy HH:mm" showTimeSelect timeIntervals={15} required />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>Detalles de Venta</h5>
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Producto</Form.Label>
                <AsyncSelect cacheOptions defaultOptions loadOptions={cargarProductos} onChange={manejarCambioProducto} value={productoSeleccionado} placeholder="Buscar producto..." isClearable />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <FormControl type="number" name="cantidad" value={nuevoDetalle.cantidad} onChange={manejarCambioDetalle} min="1" required />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group className="mb-3">
                <Form.Label>Precio Unitario</Form.Label>
                <FormControl type="number" name="precio_unitario" value={nuevoDetalle.precio_unitario} disabled />
              </Form.Group>
            </Col>
            <Col md={2} className="d-flex align-items-center mt-3">
              <Button variant="success" onClick={manejarAgregarDetalle}>Agregar</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
        <Button variant="primary" onClick={agregarVenta}>Crear Venta</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;
