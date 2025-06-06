import React from "react";
import { Row, Col, Form, Button, Card, Alert, Container } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa"; // Íconos para los inputs
import "../../app.css"; // Asumimos que el CSS personalizado está aquí

const LoginForm = ({ email, password, error, setEmail, setPassword, manejarEnvio }) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
      
        padding: "20px",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={8} md={6} lg={5} xl={4}>
          <Card
            className="p-4 border-0"
            style={{
              borderRadius: "15px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
              background: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <Card.Body>
              <h3 className="text-center mb-4" style={{ color: "#666676", fontWeight: "600" }}>
                Bienvenido
              </h3>
              {error && (
                <Alert variant="danger" className="rounded-pill text-center">
                  {error}
                </Alert>
              )}
              <Form onSubmit={manejarEnvio}>
                <Form.Group className="mb-3" controlId="usuario">
                  <Form.Label className="fw-bold">Usuario</Form.Label>
                  <div className="d-flex align-items-center border rounded-pill px-3">
                    <FaUser className="me-2 text-muted" />
                    <Form.Control
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-0"
                      style={{ background: "transparent", boxShadow: "none" }}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-4" controlId="contraseñaUsuario">
                  <Form.Label className="fw-bold">Contraseña</Form.Label>
                  <div className="d-flex align-items-center border rounded-pill px-3">
                    <FaLock className="me-2 text-muted" />
                    <Form.Control
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-0"
                      style={{ background: "transparent", boxShadow: "none" }}
                    />
                  </div>
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 py-2"
                  style={{
                    background: "linear-gradient(90deg, #00f6ff, #00b4d8)",
                    border: "none",
                    borderRadius: "50px",
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: "600",
                    position: "relative",
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 0 15px rgba(0, 246, 255, 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "none";
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>
                    Iniciar Sesión
                  </span>
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "-100%",
                      width: "100%",
                      height: "100%",
                      background: "rgba(255, 255, 255, 0.2)",
                      transition: "left 0.4s ease",
                    }}
                    className="shine-effect"
                  />
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;