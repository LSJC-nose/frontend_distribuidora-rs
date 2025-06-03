import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ResumenVentasDiarias from '../components/graficos/ResumenVentasDiarias';
import ComprasPorCliente from '../components/graficos/ComprasPorCliente';
import ProductosBajoStock from '../components/graficos/ProductosBajoStock';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Estadisticas = () => {
  // Estado
  const [dias, setDias] = useState([]);
  const [totalesPorDia, setTotalesPorDia] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [cantidades, setCantidades] = useState([]);
  const [productosBajoStock, setProductosBajoStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funciones de carga de datos
  const cargaVentas = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/resumenVentasDiarias');
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error(data.mensaje || 'Datos inválidos recibidos del servidor');
      }
      const fechasFormateadas = data.map(item => {
        const fecha = new Date(item.dia);
        return `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      });
      setDias(fechasFormateadas);
      setTotalesPorDia(data.map(item => item.total_ventas));
    } catch (error) {
      console.error('Error al cargar ventas:', error);
      setError('Error al cargar ventas: ' + error.message);
    }
  };

  const cargaComprasPorCliente = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/comprasPorCliente');
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error(data.mensaje || 'Datos inválidos recibidos del servidor');
      }
      setClientes(data.map(item => item.nombre_cliente));
      setCantidades(data.map(item => item.cantidad_compras));
    } catch (error) {
      console.error('Error al cargar compras por cliente:', error);
      setError('Error al cargar compras por cliente: ' + error.message);
    }
  };

  const cargaProductosBajoStock = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/productosBajoStock');
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error(data.mensaje || 'Datos inválidos recibidos del servidor');
      }
      setProductosBajoStock(data);
    } catch (error) {
      console.error('Error al cargar productos con bajo stock:', error);
      setError('Error al cargar productos con bajo stock: ' + error.message);
    }
  };

  // Efecto para cargar datos
  useEffect(() => {
    cargaVentas();
    cargaComprasPorCliente();
    cargaProductosBajoStock();
    setLoading(false);
  }, []);

  // Datos para el gráfico de ventas
  const chartDataVentas = {
    labels: dias,
    datasets: [{
      label: 'Total Ventas por Día',
      data: totalesPorDia,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  // Datos para el gráfico de compras por cliente
  const chartDataCompras = {
    labels: clientes,
    datasets: [{
      label: 'Cantidad de Compras por Cliente',
      data: cantidades,
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }],
  };

  // Opciones para los gráficos (opcional)
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Renderizado condicional
  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  // Renderizado principal
  return (
    <Container className="mt-5">
      <h4>Estadísticas</h4>
      <Row className="mt-4">
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ResumenVentasDiarias dias={dias} totales_por_dia={totalesPorDia} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
          <ComprasPorCliente clientes={clientes} cantidades={cantidades} />
        </Col>
        <Col xs={12} sm={12} md={12} lg={12} className="mb-4">
          <ProductosBajoStock productos={productosBajoStock} />
        </Col>
      </Row>
    </Container>
  );
};

export default Estadisticas;