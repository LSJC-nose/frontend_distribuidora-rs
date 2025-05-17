import React from "react";
import { Col, Card, Badge, Stack } from 'react-bootstrap';
import Paginacion from "../ordenamiento/Paginacion";

const Tarjeta = ({ indice, 
  nnombreProducto, 
  Descripcion,
   PrecioVenta, 
   Stock, ID_Categoria, 
   UbicacionFotografia,
    totalElementos,
   elementosPorPagina,
   paginaActual,
   establecerPaginaActual
  }) => {
  return (
    <>
    <Col lg={3} className="mt-3">
      <Card border="">
        <Card.Img
          variant="top"
          src={`data:image/png;base64,${UbicacionFotografia}`}
        />
        <Card.Body>
          <Card.Title>
            <strong>{nnombreProducto}</strong>
          </Card.Title>
          <Card.Text>{Descripcion || 'Sin descripción'}</Card.Text>
          <Stack direction="horizontal" gap={2}>
            <Badge pill bg="primary">
              <i className="bi-cash"></i> {PrecioVenta.toFixed(2)}
            </Badge>
            <Badge pill bg="secondary">
              <i className="bi-box"></i> Stock: {Stock}
            </Badge>
            <Badge pill bg="info">
              <i className="bi-tag"></i> Categoría: {ID_Categoria}
            </Badge>
          </Stack>
          
        </Card.Body>
      </Card>
    </Col>

</>
  );
};

export default Tarjeta;
