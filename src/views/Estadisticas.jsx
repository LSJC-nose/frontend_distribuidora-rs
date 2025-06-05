import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import ResumenVentasDiarias from '../components/graficos/ResumenVentasDiarias';
import ComprasPorCliente from '../components/graficos/ComprasPorCliente';
import ProductosBajoStock from '../components/graficos/ProductosBajoStock';
import ChatIA from '../components/chat/ChatIA';

const Estadisticas = () => {
  const [dias, setDias] = useState([]);
  const [totalesPorDia, setTotalesPorDia] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cantidades, setCantidades] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [error, setError] = useState(null);
  const [mostrarChatModal, setMostrarChatModal] = useState(false);

  useEffect(() => {
    cargarVentasDiarias();
    cargarComprasPorCliente();
    cargarProductosBajoStock();
  }, []);

  const cargarVentasDiarias = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/resumenVentasDiarias');
      if (!response.ok) throw new Error(`Error HTTP (Ventas Diarias): ${response.status}`);
      const data = await response.json();
      const array = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      if (!array.length) {
        setDias([]);
        setTotalesPorDia([]);
        setError('No hay datos de ventas diarias disponibles');
      } else {
        const valid = array.every(item => item.dia && item.total_ventas != null);
        if (!valid) throw new Error('Estructura inesperada en ventas diarias');
        const fechas = array.map(item => {
          const fecha = new Date(item.dia);
          return `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
        });
        setDias(fechas);
        setTotalesPorDia(array.map(item => Number(item.total_ventas) || 0));
      }
    } catch (err) {
      console.error(err);
      setError(prev => prev ? `${prev}; ${err.message}` : err.message);
      setDias([]);
      setTotalesPorDia([]);
    }
  };

  const cargarComprasPorCliente = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/comprasPorCliente');
      if (!response.ok) throw new Error(`Error HTTP (Compras por Cliente): ${response.status}`);
      const data = await response.json();
      const array = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      if (!array.length) {
        setClientes([]);
        setCantidades([]);
        setError(prev => prev ? `${prev}; No hay datos de compras por cliente` : 'No hay datos de compras por cliente');
      } else {
        const valid = array.every(item => item.nombre && item.apellido && item.compras != null);
        if (!valid) throw new Error('Estructura inesperada en compras por cliente');
        setClientes(array.map(item => `${item.nombre} ${item.apellido}`));
        setCantidades(array.map(item => Number(item.compras) || 0));
      }
    } catch (err) {
      console.error(err);
      setError(prev => prev ? `${prev}; ${err.message}` : err.message);
      setClientes([]);
      setCantidades([]);
    }
  };

  const cargarProductosBajoStock = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productosBajoStock');
      if (!response.ok) throw new Error(`Error HTTP (Productos Bajo Stock): ${response.status}`);
      const data = await response.json();
      const array = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
      if (!array.length) {
        setProductosBajoStock([]);
        setError(prev => prev ? `${prev}; No hay productos con bajo stock` : 'No hay productos con bajo stock');
      } else {
        setProductosBajoStock(array);
      }
    } catch (err) {
      console.error(err);
      setError(prev => prev ? `${prev}; ${err.message}` : err.message);
      setProductosBajoStock([]);
    }
  };

  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Button variant="primary" onClick={() => setMostrarChatModal(true)}>
        Consultar con IA
      </Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      <Row className="mt-4">
        <Col xs={12} md={6} className="mb-4">
          <ResumenVentasDiarias dias={dias} totales_por_dia={totalesPorDia} />
        </Col>
        <Col xs={12} md={6} className="mb-4">
          <ComprasPorCliente clientes={clientes} cantidades={cantidades} />
        </Col>
        <Col xs={12} className="mb-4">
          <ProductosBajoStock productos={productosBajoStock} />
        </Col>
      </Row>
      <ChatIA
        mostrarChatModal={mostrarChatModal}
        setMostrarChatModal={setMostrarChatModal}
      />
    </Container>
  );
};

export default Estadisticas;
