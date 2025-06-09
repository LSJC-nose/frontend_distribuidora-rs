import React, { useState, useEffect } from 'react';
import InicioProductos from '../components/producto/InicioProductos';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ModalRegistroProducto from '../components/producto/ModalRegistroProducto';
import ModalEdicionProducto from '../components/producto/ModalEdicionProducto';
import ModalEliminacionProducto from '../components/producto/ModalEliminacionProducto';
import ModalError from '../components/errorModal/ModalError';
import Paginacion from '../components/ordenamiento/Paginacion';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { MdAdd } from 'react-icons/md';

const Producto = () => {
  const [listaProducto, setListaProducto] = useState([]);
  const [listaCategorias, setListaCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [errorCarga, setErrorCarga] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoEditado, setProductoEditado] = useState(null);
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [mostrarModalEliminacion, setMostrarModalEliminacion] = useState(false);
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [nuevoProducto, setNuevoProducto] = useState({
    nombreProducto: '',
    Descripcion: '',
    PrecioCompra: '',
    PrecioVenta: '',
    Stock: '',
    ID_Categoria: '',
    UbicacionFotografia: ''
  });
  const [paginaActual, establecerPaginaActual] = useState(1);
  const elementosPorPagina = 4;
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState('');

  useEffect(() => {
    obtenerProducto();
    obtenerCategorias();
  }, []);

  const obtenerProducto = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos');
      if (!respuesta.ok) throw new Error('Error al cargar los productos');
      const datos = await respuesta.json();
      setListaProducto(datos);
      setProductosFiltrados(datos);
      setCargando(false);
    } catch (error) {
      setMensajeError(error.message);
      setMostrarModalError(true);
      setCargando(false);
    }
  };

  const obtenerCategorias = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/categorias');
      if (!respuesta.ok) throw new Error('Error al cargar las categorías');
      const datos = await respuesta.json();
      setListaCategorias(datos);
    } catch (error) {
      setMensajeError(error.message);
      setMostrarModalError(true);
    }
  };

  const manejarCambioBusqueda = (e) => {
    establecerPaginaActual(1);
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);
    const filtradas = listaProducto.filter(
      (producto) =>
        producto.nombreProducto.toLowerCase().includes(texto) ||
        producto.Descripcion.toLowerCase().includes(texto) ||
        producto.PrecioCompra.toString().includes(texto) ||
        producto.PrecioVenta.toString().includes(texto)
    );
    setProductosFiltrados(filtradas);
  };

  const generarPDFProductos = () => {
    try {
      if (!productosFiltrados || productosFiltrados.length === 0) {
        setMensajeError('No hay productos para generar el PDF.');
        setMostrarModalError(true);
        return;
      }
      const doc = new jsPDF();
      doc.setFillColor(0, 51, 102);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.text('Reporte de Productos', 105, 25, null, null, 'center');

      const encabezados = [['ID', 'Nombre', 'Stock', 'Precio Compra', 'Precio Venta', 'Descripción', 'Categoría']];
      const datos = productosFiltrados.map(producto => [
        producto.ID_Producto || 'N/A',
        producto.nombreProducto || 'N/A',
        producto.Stock || 'N/A',
        producto.PrecioCompra || 'N/A',
        producto.PrecioVenta || 'N/A',
        producto.Descripcion || 'N/A',
        producto.ID_Categoria || 'N/A'
      ]);

      autoTable(doc, {
        head: encabezados,
        body: datos,
        startY: 50,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] },
        margin: { top: 50 }
      });

      const fecha = new Date().toISOString().slice(0, 10);
      doc.save(`Productos_${fecha}.pdf`);
    } catch (error) {
      setMensajeError('Error al generar el PDF: ' + error.message);
      setMostrarModalError(true);
    }
  };

  const generarPDFDetalleProducto = (producto) => {
    try {
      if (!producto) {
        setMensajeError('No se proporcionó un producto válido.');
        setMostrarModalError(true);
        return;
      }
      const doc = new jsPDF();
      doc.setFillColor(0, 51, 102);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.text(`Detalle de Producto: ${producto.nombreProducto || 'N/A'}`, 105, 25, null, null, 'center');

      if (producto.UbicacionFotografia) {
        try {
          doc.addImage(`data:image/png;base64,${producto.UbicacionFotografia}`, 'PNG', 10, 50, 50, 50);
        } catch (error) {
          console.error('Error al agregar la imagen:', error);
        }
      }

      const datos = [
        ['ID', producto.ID_Producto || 'N/A'],
        ['Nombre', producto.nombreProducto || 'N/A'],
        ['Stock', producto.Stock || 'N/A'],
        ['Precio Compra', producto.PrecioCompra || 'N/A'],
        ['Precio Venta', producto.PrecioVenta || 'N/A'],
        ['Descripción', producto.Descripcion || 'N/A'],
        ['Categoría', producto.ID_Categoria || 'N/A']
      ];

      autoTable(doc, {
        body: datos,
        startY: producto.UbicacionFotografia ? 110 : 50,
        theme: 'grid',
        styles: { fontSize: 10, cellPadding: 2 },
        headStyles: { fillColor: [0, 51, 102], textColor: [255, 255, 255] }
      });

      const fecha = new Date().toISOString().slice(0, 10);
      doc.save(`Producto_${producto.nombreProducto || 'SinNombre'}_${fecha}.pdf`);
    } catch (error) {
      setMensajeError('Error al generar el PDF de detalle: ' + error.message);
      setMostrarModalError(true);
    }
  };

  const exportarExcelProductos = () => {
    try {
      if (!productosFiltrados || productosFiltrados.length === 0) {
        setMensajeError('No hay productos para generar el Excel.');
        setMostrarModalError(true);
        return;
      }
      const datos = productosFiltrados.map(producto => ({
        ID: producto.ID_Producto || 'N/A',
        Nombre: producto.nombreProducto || 'N/A',
        Stock: producto.Stock || 'N/A',
        'Precio Compra': producto.PrecioCompra || 'N/A',
        'Precio Venta': producto.PrecioVenta || 'N/A',
        Descripción: producto.Descripcion || 'N/A',
        Categoría: producto.ID_Categoria || 'N/A'
      }));

      const worksheet = XLSX.utils.json_to_sheet(datos);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Productos');

      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const nombreArchivo = `Productos_${new Date().toISOString().slice(0, 10)}.xlsx`;
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      saveAs(blob, nombreArchivo);
    } catch (error) {
      setMensajeError('Error al generar el Excel: ' + error.message);
      setMostrarModalError(true);
    }
  };

  const productosPaginados = productosFiltrados.slice(
    (paginaActual - 1) * elementosPorPagina,
    paginaActual * elementosPorPagina
  );

  const agregarProducto = async () => {
    if (
      !nuevoProducto.nombreProducto ||
      !nuevoProducto.Descripcion ||
      !nuevoProducto.PrecioCompra ||
      !nuevoProducto.PrecioVenta ||
      !nuevoProducto.Stock ||
      !nuevoProducto.ID_Categoria
    ) {
      setMensajeError('Por favor, completa todos los campos antes de guardar.');
      setMostrarModalError(true);
      return;
    }

    try {
      const respuesta = await fetch('http://localhost:3000/api/registrarproducto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });

      if (!respuesta.ok) {
        throw new Error('Error al agregar el producto');
      }

      await obtenerProducto();
      setNuevoProducto({
        nombreProducto: '',
        Descripcion: '',
        PrecioCompra: '',
        PrecioVenta: '',
        Stock: '',
        ID_Categoria: '',
        UbicacionFotografia: ''
      });
      setMostrarModal(false);
      setErrorCarga(null);
    } catch (error) {
      setMensajeError(error.message);
      setMostrarModalError(true);
    }
  };

  const manejarCambioInput = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarCambioInputEdicion = (e) => {
    const { name, value } = e.target;
    setProductoEditado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const actualizarProducto = async () => {
    if (
      !productoEditado?.nombreProducto ||
      !productoEditado?.PrecioCompra ||
      !productoEditado?.PrecioVenta ||
      !productoEditado?.Stock ||
      !productoEditado?.ID_Categoria
    ) {
      setMensajeError('Por favor, completa todos los campos antes de guardar.');
      setMostrarModalError(true);
      return;
    }

    try {
      const respuesta = await fetch(`http://localhost:3000/api/actualizarproductos/${productoEditado.ID_Producto}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreProducto: productoEditado.nombreProducto,
          Stock: productoEditado.Stock,
          ID_Categoria: productoEditado.ID_Categoria,
          PrecioCompra: productoEditado.PrecioCompra,
          PrecioVenta: productoEditado.PrecioVenta,
          Descripcion: productoEditado.Descripcion,
          UbicacionFotografia: productoEditado.UbicacionFotografia
        }),
      });

      if (!respuesta.ok) {
        throw new Error('Error al actualizar el producto');
      }

      // Actualizar localmente la lista de productos
      const updatedProductos = listaProducto.map((prod) =>
        prod.ID_Producto === productoEditado.ID_Producto ? productoEditado : prod
      );
      setListaProducto(updatedProductos);

      // Actualizar productos filtrados con el mismo criterio de búsqueda
      const filtradas = updatedProductos.filter(
        (producto) =>
          producto.nombreProducto.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
          producto.Descripcion.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
          producto.PrecioCompra.toString().includes(textoBusqueda) ||
          producto.PrecioVenta.toString().includes(textoBusqueda)
      );
      setProductosFiltrados(filtradas);

      // Calcular la nueva página del producto actualizado
      const index = filtradas.findIndex((prod) => prod.ID_Producto === productoEditado.ID_Producto);
      if (index !== -1) {
        const newPage = Math.ceil((index + 1) / elementosPorPagina);
        establecerPaginaActual(newPage);
      } else {
        // Si el producto ya no coincide con el filtro, volver a la primera página
        establecerPaginaActual(1);
      }

      setMostrarModalEdicion(false);
      setProductoEditado(null);
      setErrorCarga(null);
    } catch (error) {
      setMensajeError(error.message);
      setMostrarModalError(true);
    }
  };

  const abrirModalEdicion = (producto) => {
    setProductoEditado(producto);
    setMostrarModalEdicion(true);
  };

  const eliminarProducto = async () => {
    if (!productoAEliminar) return;

    try {
      const respuesta = await fetch(`http://localhost:3000/api/eliminarproducto/${productoAEliminar.ID_Producto}`, {
        method: 'DELETE',
      });

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el producto');
      }

      await obtenerProducto();
      setMostrarModalEliminacion(false);
      establecerPaginaActual(1);
      setProductoAEliminar(null);
      setErrorCarga(null);
    } catch (error) {
      setMensajeError(error.message);
      setMostrarModalError(true);
    }
  };

  const abrirModalEliminacion = (producto) => {
    setProductoAEliminar(producto);
    setMostrarModalEliminacion(true);
  };

  return (
    <Container className="mt-5">
      <hr />
      <h4 className="text-dark">Productos</h4>
      <Row className="d-flex align-items-center" style={{ gap: '5px' }}>
        <Col xs={3} sm={2} md={2} lg={1} className="p-0">
          <Button
            className="bi bi-box-seam-fill"
            variant="secondary"
            onClick={() => setMostrarModal(true)}
            style={{
              background: 'linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))',
              border: 'none',
              borderRadius: '50px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '600',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              width: '100%',
              padding: '5px 10px',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 15px rgba(94, 39, 131, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          >
            <MdAdd size={16} />
          </Button>
        </Col>
        <Col xs={3} sm={2} md={2} lg={1} className="p-0">
          <Button
            className="bi bi-filetype-pdf"
            variant="secondary"
            onClick={generarPDFProductos}
            style={{
              background: 'linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))',
              border: 'none',
              borderRadius: '50px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '600',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              width: '100%',
              padding: '5px 10px',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 15px rgba(94, 39, 131, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
        </Col>
        <Col xs={3} sm={2} md={2} lg={1} className="p-0">
          <Button
            className="bi bi-file-earmark-excel"
            variant="secondary"
            onClick={exportarExcelProductos}
            style={{
              background: 'linear-gradient(90deg, rgb(193, 143, 206), rgb(28, 118, 136))',
              border: 'none',
              borderRadius: '50px',
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: '600',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              width: '100%',
              padding: '5px 10px',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 0 15px rgba(94, 39, 131, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none';
            }}
          />
        </Col>
      </Row>
      <hr />
      <Col lg={6} md={8} sm={8} xs={7}>
        <CuadroBusquedas
          textoBusqueda={textoBusqueda}
          manejarCambioBusqueda={manejarCambioBusqueda}
        />
      </Col>
      <InicioProductos
        productos={productosPaginados}
        cargando={cargando}
        error={errorCarga}
        abrirModalEdicion={abrirModalEdicion}
        abrirModalEliminacion={abrirModalEliminacion}
        generarPDFDetalleProducto={generarPDFDetalleProducto}
      />
      <ModalRegistroProducto
        mostrarModal={mostrarModal}
        setMostrarModal={setMostrarModal}
        nuevoProducto={nuevoProducto}
        manejarCambioInput={manejarCambioInput}
        agregarProducto={agregarProducto}
        errorCarga={errorCarga}
        categorias={listaCategorias}
      />
      <ModalEdicionProducto
        mostrarModalEdicion={mostrarModalEdicion}
        setMostrarModalEdicion={setMostrarModalEdicion}
        productoEditado={productoEditado}
        manejarCambioInputEdicion={manejarCambioInputEdicion}
        actualizarProducto={actualizarProducto}
        errorCarga={errorCarga}
        listaCategorias={listaCategorias}
      />
      <ModalEliminacionProducto
        mostrarModalEliminacion={mostrarModalEliminacion}
        setMostrarModalEliminacion={setMostrarModalEliminacion}
        eliminarProducto={eliminarProducto}
      />
      <ModalError
        mostrarModalError={mostrarModalError}
        setMostrarModalError={setMostrarModalError}
        mensajeError={mensajeError}
      />
      <Paginacion
        elementosPorPagina={elementosPorPagina}
        totalElementos={productosFiltrados.length}
        paginaActual={paginaActual}
        establecerPaginaActual={establecerPaginaActual}
      />
    </Container>
  );
};

export default Producto;