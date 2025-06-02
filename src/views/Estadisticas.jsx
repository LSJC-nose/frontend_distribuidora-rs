import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ResumenVentasDiarias from '../components/graficos/ResumenVentasDiarias';

const Estadisticas = () => {
    const [dias, setDias] = useState([]);
    const [totalesPorDia, setTotalesPorDia] = useState([]);

    useEffect(() => {
      const cargaVentas = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/resumenVentasDiarias");
          const data = await response.json();
          if (data.mensaje) {
            alert(data.mensaje);
            return;
          }
          setDias(data.map(item => item.dia));
          setTotalesPorDia(data.map(item => item.total_ventas));
        } catch (error) {
          console.error('Error al cargar ventas:', error);
          alert('Error al cargar ventas:' + error.message);
        }
      };
      cargaVentas();
    }, []);

    return (
      <Container className="mt-5">
        <br />
        <h4>Estadísticas</h4>
        <Row className="mt-4">
          <Col xs={12} sm={12} md={12} lg={6} className="mb-4">
            <ResumenVentasDiarias dias={dias} totales_por_dia={totalesPorDia} />
          </Col>
        </Row>
      </Container>
    );
};

export default Estadisticas;