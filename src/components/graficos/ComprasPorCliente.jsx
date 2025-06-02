import {Card } from "react-bootstrap";
import {Bar } from'react-chartjs-2';
import Chart from 'chart.js/auto';

const ComprasPorCliente = ({clientes, cantidades }) => {
  const data = {
    labels: clientes,
    datasets: [
      {
        label: 'Cantidad de Compras por Cliente',
        data: cantidades,
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Rosa claro
        borderColor: 'rgba(255, 99, 132, 1)', // Rosa oscuro
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
          text: 'Cantidad de Compras',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Cliente',
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
        <Card.Title>Compras por Cliente</Card.Title>
        <Bar data={data} options={options} />
      </Card.Body>
    </Card>
  );
};

export default ComprasPorCliente;