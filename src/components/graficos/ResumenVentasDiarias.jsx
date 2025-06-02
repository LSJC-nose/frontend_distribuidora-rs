import {Card } from "react-bootstrap";
import {Line } from'react-chartjs-2';
import Chart from 'chart.js/auto';

const ResumenVentasDiarias = ({dias, totales_por_dia }) => {
  const data = {
    labels: dias,
    datasets: [
      {
        label: 'Total Ventas por Día',
        data: totales_por_dia,
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Azul claro (mismo color que usaste)
        borderColor: 'rgba(54, 162, 235, 1)', // Azul oscuro
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
          text: 'Total Ventas (USD)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Día',
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
        <Card.Title>Ventas por Día</Card.Title>
        <Line data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default ResumenVentasDiarias; 