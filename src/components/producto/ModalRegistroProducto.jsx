import React, { useState } from "react";
import { Modal, Form, Button, Row, Col, FormControl } from "react-bootstrap";
import AsyncSelect from 'react-select/async';

const ModalRegistroProducto = ({
  mostrarModal,
  setMostrarModal,
  nuevoProducto,
  setNuevoProducto,
  agregarProducto,
  errorCarga,
  categorias,
  catalogos
}) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [catalogoSeleccionado, setCatalogoSeleccionado] = useState(null);

  // Cargar opciones para AsyncSelect
  const cargarCategorias = (inputValue, callback) => {
    const filtradas = categorias.filter(categoria =>
      categoria.nombre_categoria.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtradas.map(categoria => ({
      value: categoria.ID_Categoria,
      label: categoria.nombre_categoria
    })));
  };

  const cargarCatalogos = (inputValue, callback) => {
    const filtradas = catalogos.filter(catalogo =>
      catalogo.nombre_catalogo.toLowerCase().includes(inputValue.toLowerCase())
    );
    callback(filtradas.map(catalogo => ({
      value: catalogo.ID_Catalogo,
      label: catalogo.nombre_catalogo
    })));
  };

  // Manejar cambios en los selectores
  const manejarCambioCategoria = (seleccionado) => {
    setCategoriaSeleccionada(seleccionado);
    setNuevoProducto(prev => ({ ...prev, ID_Categoria: seleccionado ? seleccionado.value : '' }));
  };

  const manejarCambioCatalogo = (seleccionado) => {
    setCatalogoSeleccionado(seleccionado);
    setNuevoProducto(prev => ({ ...prev, ID_Catalogo: seleccionado ? seleccionado.value : '' }));
  };

  // Manejar cambios en los inputs
  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={mostrarModal} onHide={() => setMostrarModal(false)} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title>Registrar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorCarga && <p className="text-danger">{errorCarga}</p>}
        <Form>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Producto</Form.Label>
                <FormControl type="text" name="nombreProducto" value={nuevoProducto.nombreProducto} onChange={manejarCambioInput} placeholder="Ejemplo: Laptop Lenovo" required />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <FormControl type="number" name="Stock" value={nuevoProducto.Stock} onChange={manejarCambioInput} placeholder="Cantidad disponible" required />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio de Compra</Form.Label>
                <FormControl type="number" step="0.01" name="PrecioCompra" value={nuevoProducto.PrecioCompra} onChange={manejarCambioInput} placeholder="Precio de adquisición" required />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Precio de Venta</Form.Label>
                <FormControl type="number" step="0.01" name="PrecioVenta" value={nuevoProducto.PrecioVenta} onChange={manejarCambioInput} placeholder="Precio de comercialización" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <FormControl type="text" name="Descripcion" value={nuevoProducto.Descripcion} onChange={manejarCambioInput} placeholder="Ejemplo: Laptop con procesador Intel i7" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ubicación de Fotografía</Form.Label>
            <FormControl type="text" name="UbicacionFotografia" value={nuevoProducto.UbicacionFotografia} onChange={manejarCambioInput} placeholder="URL de la imagen del producto" required />
          </Form.Group>
          <Row>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarCategorias}
                  onChange={manejarCambioCategoria}
                  value={categoriaSeleccionada}
                  placeholder="Buscar categoría..."
                  isClearable
                />
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={6} lg={6}>
              <Form.Group className="mb-3">
                <Form.Label>Catálogo</Form.Label>
                <AsyncSelect
                  cacheOptions
                  defaultOptions
                  loadOptions={cargarCatalogos}
                  onChange={manejarCambioCatalogo}
                  value={catalogoSeleccionado}
                  placeholder="Buscar catálogo..."
                  isClearable
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setMostrarModal(false)}>Cancelar</Button>
        <Button variant="primary" onClick={agregarProducto}>Guardar Producto</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalRegistroProducto;
