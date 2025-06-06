import { useState } from "react"; // Corrige el import
import { Modal, Form, Button, Table, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ModalError from "../errorModal/ModalError";

// Componente de botón personalizado
const GradientButton = ({ children, onClick, variant, style, ...props }) => (
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
      width: "60%",
      padding: "5px 10px",
      fontSize: "17px",
      ...style,
    }}
    onMouseEnter={(e) => {
      e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
    }}
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
  productos,
}) => {
  const [mensajeError, setMensajeError] = useState('');
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [nuevoDetalle, setNuevoDetalle] = useState({ ID_Producto: '', Cantidad: '', PrecioVenta: '' });

  // Calcular total de la venta
  const totalVenta = detallesVenta.reduce((sum, detalle) => sum + (detalle.Cantidad * detalle.PrecioVenta), 0);

  // Cargar opciones para AsyncSelect
  const cargarClientes = (inputValue, callback) => {
    const filtrados = clientes.filter(cliente =>
      `${cliente.Nombre} ${cliente.Apellido}`.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(cliente => ({
      value: cliente.ID_Cliente,
      label: `${cliente.Nombre} ${cliente.Apellido}`,
    })));
  };

  const cargarProductos = (inputValue, callback) => {
    const filtrados = productos.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtrados.map(producto => ({
      value: producto.ID_Producto,
      label: producto.nombreProducto,
      precio: producto.PrecioVenta,
    })));
  };

  // Manejar cambios en los selectores
  const manejarCambioCliente = (seleccionado) => {
    setClienteSeleccionado(seleccionado);
    setNuevaVenta(prev => ({ ...prev, ID_Cliente: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioProducto = (seleccionado) => {
    setProductoSeleccionado(seleccionado);
    setNuevoDetalle(prev => ({
      ...prev,
      ID_Producto: seleccionado ? seleccionado.value : '',
      PrecioVenta: seleccionado ? seleccionado.precio : '',
    }));
  };

  // Manejar cambios en el detalle
  const manejarCambioDetalle = (e) => {
    const { name, value } = e.target;
    setNuevoDetalle(prev => ({ ...prev, [name]: value }));
  };

  // Agregar detalle a la lista
  const manejarAgregarDetalle = () => {
    if (!nuevoDetalle.ID_Producto || !nuevoDetalle.Cantidad || nuevoDetalle.Cantidad <= 0 || !productoSeleccionado) {
      setMensajeError("Por favor, selecciona un producto y una cantidad válida.");
      setMostrarModalError(true);
      return;
    }

    const producto = productos.find(p => p.ID_Producto === nuevoDetalle.ID_Producto);
    if (producto && nuevoDetalle.Cantidad > producto.Stock) {
      setMensajeError(`Stock insuficiente de ${producto.nombreProducto}. Unidades disponibles: ${producto.Stock}`);
      setMostrarModalError(true);
      return;
    }

    agregarDetalle({
      ID_Producto: nuevoDetalle.ID_Producto,
      nombreProducto: productoSeleccionado.label,
      Cantidad: parseInt(nuevoDetalle.Cantidad),
      PrecioVenta: parseFloat(nuevoDetalle.PrecioVenta),
    });
    setNuevoDetalle({ ID_Producto: '', Cantidad: '', PrecioVenta: '' });
    setProductoSeleccionado(null);
  };

  // Validar antes de crear la venta
  const manejarCrearVenta = () => {
    if (!nuevaVenta.ID_Cliente) {
      setMensajeError("Por favor, selecciona un cliente.");
      setMostrarModalError(true);
      return;
    }
    if (detallesVenta.length === 0) {
      setMensajeError("Debes agregar al menos un detalle de venta.");
      setMostrarModalError(true);
      return;
    }
    agregarVenta();
  };

  return (
    <Modal
      show={mostrarModal}
      onHide={() => setMostrarModal(false)}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header style={{ background: "#0d7878", opacity: 0.9 }} closeButton>
        <Modal.Title style={{ color: "#fff" }}>Registrar Nueva Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ background: "#f0f7f7", opacity: 0.9 }}>
        <Form>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
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
            <Col xs={12} sm={12} md={6} lg={6}>
              <Form.Group className="mb-3" controlId="formFechaVenta">
                <Form.Label>Fecha de Venta</Form.Label>
                <br />
                <DatePicker
                  selected={nuevaVenta.fecha_venta instanceof Date ? nuevaVenta.fecha_venta : new Date()}
                  onChange={(date) => setNuevaVenta(prev => ({ ...prev, fecha_venta: date }))}
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
          <h5>Agregar Detalle de Venta</h5>
          <Row>
            <Col xs={12} sm={12} md={3} lg={5}>
              <Form.Group>
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
            <Col xs={12} sm={12} md={4} lg={2}>
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
            <Col xs={12} sm={12} md={3} lg={2}>
              <Form.Group className="mb-3" controlId="formPrecioUnitario">
                <Form.Label>Precio Unitario</Form.Label>
                <FormControl
                  type="number"
                  name="PrecioVenta"
                  value={nuevoDetalle.PrecioVenta}
                  disabled
                  placeholder="Automático"
                />
              </Form.Group>
            </Col>
            <Col  xs={12}  md={3}  className="d-flex align-items-center mt-3">
              <GradientButton variant="success" onClick={manejarAgregarDetalle}>
                Agregar Producto
              </GradientButton>
            </Col>
          </Row>

          {detallesVenta.length > 0 && (
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
            </>
          )}
          <ModalError
            mostrarModalError={mostrarModalError}
            setMostrarModalError={setMostrarModalError}
            mensajeError={mensajeError}
          />
          {errorCarga && (
            <div className="text-danger mt-2">{errorCarga}</div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer style={{ background: "#c7d7f0" }}>
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
    }}variant="secondary" onClick={() => setMostrarModal(false)}>
          Cancelar
        </Button>
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
      fontSize: "17px"
    }}
    onMouseEnter={(e) => {
      e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
    }}
    onMouseLeave={(e) => {
      e.target.style.boxShadow = "none";
    }}
        variant="primary" onClick={manejarCrearVenta}>
          Crear Venta
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroVenta;