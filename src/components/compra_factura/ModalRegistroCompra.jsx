import { useState, useEffect } from 'react';
import { Modal, Form, Button, Table, Row, Col, FormControl } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ModalError from '../errorModal/ModalError';

const GradientButton = ({ children, onClick, variant, style, width = "100%", ...props }) => (
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
      width,
      padding: "5px 10px",
      fontSize: "17px",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
    }}
    onMouseLeave施
    onMouseLeave={(e) => {
      e.target.style.boxShadow = "none";
    }}
    variant={variant}
    onClick={onClick}
    {...props}
  >
    {children}
  </Button>
);

const ModalRegistroCompra = ({
  mostrarModal,
  setMostrarModal,
  nuevaCompra,
  setNuevaCompra,
  detallesCompra,
  setDetallesCompra,
  agregarDetalle,
  agregarCompra,
  errorCarga,
  proveedores,
  productos,
}) => {
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ ID_Producto: '', Cantidad: '', PrecioCompra: '' });
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarModalError, setMostrarModalError] = useState(false);

  // Calcular total de la compra
  const totalCompra = detallesCompra.reduce((sum, detalle) => sum + (detalle.Cantidad * detalle.PrecioCompra), 0);

  // Actualizar total_compra cuando cambian los detalles
  useEffect(() => {
    setNuevaCompra(prev => ({ ...prev, total_compra: totalCompra }));
  }, [detallesCompra, setNuevaCompra]);

  const cargarProveedor = (inputValue, callback) => {
    const filtrados = proveedores.filter(proveedor =>
      proveedor.NombreProveedor.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(proveedor => ({
      value: proveedor.ID_Proveedores,
      label: proveedor.NombreProveedor,
    })));
  };

  const cargarProductos = (inputValue, callback) => {
    const filtrados = productos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(producto => ({
      value: producto.ID_Producto,
      label: producto.nombreProducto,
      precio: producto.PrecioCompra,
    })));
  };

  const manejarCambioProveedor = (seleccionado) => {
    setProveedorSeleccionado(seleccionado);
    setNuevaCompra(prev => ({ ...prev, ID_Proveedores: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      ID_Producto: seleccionado ? seleccionado.value : '',
      PrecioCompra: seleccionado ? seleccionado.precio : '',
    }));
  };

  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.ID_Producto || !nuevoDetalle.Cantidad || nuevoDetalle.Cantidad <= 0 || !productoSeleccionado) {
      setMensajeError('Por favor, selecciona un producto y una cantidad válida.');
      setMostrarModalError(true);
      return;
    }

    agregarDetalle({
      ID_Producto: nuevoDetalle.ID_Producto,
      nombreProducto: productoSeleccionado.label,
      Cantidad: parseInt(nuevoDetalle.Cantidad),
      PrecioCompra: parseFloat(nuevoDetalle.PrecioCompra),
    });

    setNuevoDetalle({ ID_Producto: '', Cantidad: '', PrecioCompra: '' });
    setProductoSeleccionado(null);
  };

  const manejarCrearCompra = () => {
    if (!nuevaCompra.ID_Proveedores) {
      setMensajeError('Por favor, selecciona un proveedor.');
      setMostrarModalError(true);
      return;
    }
    if (detallesCompra.length === 0) {
      setMensajeError('Debes agregar al menos un detalle de compra.');
      setMostrarModalError(true);
      return;
    }
    agregarCompra();
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} fullscreen={true}>
      <Modal.Header style={{ background: '#0d7878', opacity: 0.9 }} closeButton>
        <Modal.Title style={{ color: '#fff' }}>Registrar Nueva Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: '#f0f7f7', opacity: 0.9 }}>
        <Form>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formProveedor">
                <Form.Label>Proveedor</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarProveedor}
                  onChange={manejarCambioProveedor}
                  value={proveedorSeleccionado}
                  placeholder="Buscar proveedor..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formFechaCompra">
                <Form.Label>Fecha de Compra</Form.Label>
                <br />
                <DatePicker
                  selected={nuevaCompra.fecha_compra instanceof Date ? nuevaCompra.fecha_compra : new Date()}
                  onChange={(date) => setNuevaCompra(prev => ({ ...prev, fecha_compra: date }))}
                  className="form-control"
                  dateFormat="dd/MM/yyyy HH:mm"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <hr />
          <h5>Agregar Detalle de Compra</h5>
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
                  name="PrecioCompra"
                  value={nuevoDetalle.PrecioCompra}
                  onChange={manejarCambioDetalle}
                  placeholder="Precio"
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={5} sm={4} md={2} lg={2} className="d-flex align-items-center mt-3">
              <GradientButton variant="success" onClick={manejarAgregarDetalle}>
                Agregar Producto
              </GradientButton>
            </Col>
          </Row>
          {detallesCompra.length > 0 && (
            <>
              <h5 className="mt-4">Detalles Agregados</h5>
              <Table className="table-striped table-primary" striped bordered hover>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {detallesCompra.map((detalle, index) => (
                    <tr key={index}>
                      <td>{detalle.nombreProducto}</td>
                      <td>{detalle.Cantidad}</td>
                      <td>{detalle.PrecioCompra.toFixed(2)}</td>
                      <td>{(detalle.Cantidad * detalle.PrecioCompra).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td>
                      <strong>{totalCompra.toFixed(2)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </>
          )}
          <ModalError
            mostrarModalError={mostrarModalError}
            setMostrarModalError={setMostrarModalError}
            mensajeError={mensajeError}
          />
          {errorCarga && <div className="text-danger mt-2">{errorCarga}</div>}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: '#c7d7f0' }}>
        <GradientButton variant="secondary" width="13%" onClick={() => setMostrarModal(false)}>
          Cancelar
        </GradientButton>
        <GradientButton variant="primary" width="13%" onClick={manejarCrearCompra}>
          Crear Compra
        </GradientButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroCompra;