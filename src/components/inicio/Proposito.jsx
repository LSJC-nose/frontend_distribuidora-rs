
import React from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';
import Portada from "../../assets/logo_RS-.png"; // Importación de la imagen de portada 
import 'bootstrap-icons/font/bootstrap-icons.css';


const Proposito = () => {
  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">

        {/* Objetivos */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-bullseye" style={{ fontSize: "2rem", color: "#dc3545" }}></i>
          <h5>Objetivos</h5>
          <p>Desarrollar una estrategia de inteligencia de negocio en la microempresa Rivas  Suarez, para la gestión de productos del inventario.</p>
        </Col>

        {/* Misión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-flag-fill" style={{ fontSize: "2rem", color: "#0d6efd" }}></i>
          <h5>Misión</h5>
          <p>Brindar productos de calidad a precios accesibles, facilitando el abastecimiento de pequeños comercios y clientes individuales mediante una gestión eficiente y confiable del inventario.</p>
        </Col>

        {/* Visión */}
        <Col sm={12} lg={4} className="text-center">
          <i className="bi bi-eye-fill" style={{ fontSize: "2rem", color: "#198754" }}></i>
          <h5>Visión</h5>
          <p>Ser una distribuidora líder , reconocida por su innovación, servicio personalizado y capacidad de adaptación a las necesidades del mercado, impulsando el crecimiento de nuestros clientes en cada temporada.</p>
        </Col>

      </Row>
    </Container>
  );
};

export default Proposito;