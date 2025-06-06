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
  productos
}) => {
  const [ventaActualizada, setVentaActualizada] = useState({
    NumeroFactura: venta?.NumeroFactura || '',
    ID_Cliente: venta?.ID_Cliente || '',
    fecha_venta: venta?.fecha_venta ? new Date(venta.fecha_venta) : new Date(),
    total_venta: venta?.total_venta || 0
  });

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ ID_Producto: '', Cantidad: '', PrecioVenta: '' });
  const [editandoDetalle, setEditandoDetalle] = useState(null);
  

  // Calcular total de la venta
  const totalVenta = detallesVenta.reduce((sum, detalle) => sum + (detalle.Cantidad * detalle.PrecioVenta), 0);

  useEffect(() => {
    if (venta && clientes.length > 0) {
      const cliente = clientes.find(c => c.ID_Cliente === parseInt(venta.ID_Cliente));
      setClienteSeleccionado(cliente ? { value: cliente.ID_Cliente, label: `${cliente.Nombre} ${cliente.Apellido}` } : null);
      setVentaActualizada({
        NumeroFactura: venta.NumeroFactura || '',
        ID_Cliente: venta.ID_Cliente || '',
        fecha_venta: venta?.fecha_venta ? new Date(venta.fecha_venta) : new Date(),
        total_venta: parseFloat(venta.total_venta) || 0
      });
    }
  }, [venta, clientes]);

  // Cargar opciones para AsyncSelect
  const cargarClientes = (inputValue, callback) => {
    const filtrados = clientes.filter(cliente =>
      `${cliente.Nombre} ${cliente.Apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(cliente => ({
      value: cliente.ID_Cliente,
      label: `${cliente.Nombre} ${cliente.Apellido}`
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
    setVentaActualizada(prev => ({ ...prev, ID_Cliente: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioFecha = (fecha) => {
    setVentaActualizada(prev => ({ ...prev, fecha_venta: fecha }));
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      ID_Producto: seleccionado ? seleccionado.value : '',
      PrecioVenta: seleccionado ? seleccionado.precio : ''
    }));
  };

  // Manejar cambios en el detalle
  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  // Agregar detalle a la lista
  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.ID_Producto || !nuevoDetalle.Cantidad || nuevoDetalle.Cantidad <= 0 || !nuevoDetalle.PrecioVenta) {
      alert("Por favor, selecciona un producto, una cantidad válida y verifica el precio.");
      return;
    }

    const producto = productos.find(p => p.ID_Producto === nuevoDetalle.ID_Producto);
    if (producto && nuevoDetalle.Cantidad > producto.Stock) {
      alert(`Stock insuficiente de ${producto.nombreProducto}. Unidades disponibles: ${producto.Stock}`);
      return;
    }

    setDetallesVenta(prev => [...prev, {
      ID_Producto: nuevoDetalle.ID_Producto,
      nombreProducto: productoSeleccionado.label,
      Cantidad: parseInt(nuevoDetalle.Cantidad),
      PrecioVenta: parseFloat(nuevoDetalle.PrecioVenta)
    }]);
    setNuevoDetalle({ ID_Producto: '', Cantidad: '', PrecioVenta: '' });
    setProductoSeleccionado(null);
  };

  // Eliminar detalle
  const eliminarDetalle = (index) => {
    setDetallesVenta(prev => prev.filter((_, i) => i !== index));
  };

   const iniciarEdicionDetalle = (index, detalle) => {
    setEditandoDetalle({ index, detalle });
    setNuevoDetalle({
      ID_Producto: detalle.ID_Producto,
      Cantidad: detalle.Cantidad.toString(),
      PrecioVenta: detalle.PrecioVenta.toString()
    });
    setProductoSeleccionado({
      value: detalle.ID_Producto,
      label: detalle.nombreProducto,
      precio: detalle.PrecioVenta
    });
  };

  const guardarEdicionDetalle = () => {
    if (!editandoDetalle) return;
    if (!nuevoDetalle.ID_Producto || !nuevoDetalle.Cantidad || nuevoDetalle.Cantidad <= 0) {
      alert('Por favor, selecciona un producto y una cantidad válida.');
      return;
    }
    const nuevosDetalles = [...detallesVenta];
    nuevosDetalles[editandoDetalle.index] = {
      ID_Producto: nuevoDetalle.ID_Producto,
      nombreProducto: productoSeleccionado.label,
      Cantidad: parseInt(nuevoDetalle.Cantidad),
      PrecioVenta: parseFloat(nuevoDetalle.PrecioVenta)
    };
    setDetallesVenta(nuevosDetalles);
    setEditandoDetalle(null);
    setNuevoDetalle({ ID_Producto: '', Cantidad: '', PrecioVenta: '' });
    setProductoSeleccionado(null);
  };


  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} fullscreen={true}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formCliente">
                <Form.Label>Cliente</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarClientes}
                  onChange={manejarCambioCliente}
                  value={clienteSeleccionado}
                  placeholder="Buscar cliente..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formFechaVenta">
                <Form.Label>Fecha de Venta</Form.Label>
                <DatePicker
                  selected={ventaActualizada.fecha_venta}
                  onChange={manejarCambioFecha}
                  className="form-control"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeIntervals={15}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
         
          <hr />
          <h5>Agregar Detalle de Venta</h5>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <Form.Group className="mb-3" controlId="formProducto">
                <Form.Label>Producto</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarProductos}
                  onChange={manejarCambioProducto}
                  value={productoSeleccionado}
                  placeholder="Buscar producto..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formCantidad">
                <Form.Label>Cantidad</Form.Label>
                <FormControl
                  type="number"
                  name="Cantidad"
                  value={nuevoDetalle.Cantidad}
                  onChange={manejarCambioDetalle}
                  placeholder="Cantidad"
                  min="1"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={7} sm={8} md={3} lg={3}>
              <Form.Group className="mb-3" controlId="formPrecioUnitario">
                <Form.Label>Precio Unitario</Form.Label>
                <FormControl
                  type="number"
                  name="PrecioVenta"
                  value={nuevoDetalle.PrecioVenta}
                  onChange={manejarCambioDetalle} // Permitir edición manual si es necesario
                  disabled // Opcional: deshabilitar si quieres que sea automático
                  placeholder="Automático"
                />
              </Form.Group>
            </Col>
            <Col xs={5} sm={4} md={2} lg={2} className="d-flex align-items-center mt-3">
            {editandoDetalle ? (
            <Button style={{ width: '100%' }} variant="primary" onClick={guardarEdicionDetalle}>
              Guardar Cambios
            </Button>
            ) : (
             <Button style={{ width: '100%' }} variant="success" onClick={manejarAgregarDetalle}>
                Agregar Producto
             </Button>
                        )}
           </Col>
          </Row>

          
          {detallesVenta.length > 0 && (
            <>
              <h5 className="mt-4">Detalles Agregados</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesVenta.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombreProducto}</td>
                      <td>{detalle.Cantidad}</td>
                      <td>{detalle.PrecioVenta.toFixed(2)}</td>
                      <td>{(detalle.Cantidad * detalle.PrecioVenta).toFixed(2)}</td>
                      <td>
                          <Button variant="warning" size="sm" onClick={() => iniciarEdicionDetalle(index, detalle)} className="me-2">
                          Editar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => eliminarDetalle(index)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="text-end"><strong>Total:</strong></td>
                    <td><strong>{totalVenta.toFixed(2)}</strong></td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}

          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={() => actualizarVenta(ventaActualizada, detallesVenta)}>
          Actualizar Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalActualizacionVenta;