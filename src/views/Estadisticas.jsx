import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResumenVentasDiarias from '../components/graficos/ResumenVentasDiarias';
import ComprasPorCliente from'../components/graficos/ComprasPorCliente';

const Estadisticas = () => {
    const [dias, setDias] = useState([]);
    const [totalesPorDia, setTotalesPorDia] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [cantidades, setCantidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargaVentas = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:3000/api/resumenVentasDiarias');
                const data = await response.json();
                if (!Array.isArray(data)) {
                    throw new Error(data.mensaje || 'Datos inválidos recibidos del servidor');
                }
                // Formatear las fechas a un formato más corto (DD-MM)
                const fechasFormateadas = data.map(item => {
                    const fecha = new Date(item.dia);
                    return `${fecha.getDate().toString().padStart(2, '0')}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
                });
                setDias(fechasFormateadas);
                setTotalesPorDia(data.map(item => item.total_ventas));
            } catch (error) {
                console.error('Error al cargar ventas:', error);
                setError('Error al cargar ventas: ' + error.message);
            } finally {
                setLoading(false);
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

        cargaVentas();
        cargaComprasPorCliente();
    }, []);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container className="mt-5">
            <br />
            <h4>Estadísticas</h4>
            <Row className="mt-4">
                <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
                    <ResumenVentasDiarias dias={dias} totales_por_dia={totalesPorDia} />
                </Col>
                <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
                    <ComprasPorCliente clientes={clientes} cantidades={cantidades} />
                </Col>
            </Row>
        </Container>
    );
};

export default Estadisticas;