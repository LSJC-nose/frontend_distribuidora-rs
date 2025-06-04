import { Card } from "react-bootstrap";
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import ProductosBajoStockData from './productosBajoStockData';

const ProductosBajoStock = ({ productos }) => {
  // Actualizar los datos dinámicamente con los productos recibidos
  const data = {
    labels: productos.map((producto) => producto.nombreProducto),
    datasets: [
      {
        label: 'Stock',
        data: productos.map((producto) => producto.Stock),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cantidad en Stock',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Producto',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>Productos con muy bajo stock</Card.Title>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default ProductosBajoStock;