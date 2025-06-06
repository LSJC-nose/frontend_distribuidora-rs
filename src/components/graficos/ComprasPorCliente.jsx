import {Bar } from'react-chartjs-2';
import Chart from 'chart.js/auto';

import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


const ComprasPorCliente = ({clientes, cantidades }) => {
  const data = {
    labels: clientes, // Asegúrate de que clientes sea un array
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

const chartRef = useRef(null);

const generarPDF = () => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(28, 41, 51);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Reporte de Compras por Cliente", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

  // Capturar gráfico como imagen
  const chartInstance = chartRef.current;
  const chartCanvas = chartInstance?.canvas;
  const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

  if (chartImage) {
    doc.addImage(chartImage, "PNG", 14, 40, 100, 100);
  } else {
    console.log("No se pudo capturar el gráfico como imagen.");
  }

  // Tabla de datos
  const columnas = ["Cliente", "Compras"];
  const filas = clientes.map((cliente, index) => [cliente, cantidades[index]]);

  autoTable(doc, {
    head: [columnas],
    body: filas,
    startY: 150,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 2 },
    margin: { top: 20, left: 14, right: 14 },
  });

  // Generar un nombre dinámico para el archivo PDF
  const fecha = new Date();
  const dia = String(fecha.getDate()).padStart(2, '0');
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const anio = fecha.getFullYear();
  const nombreArchivo = `ComprasPorCliente_${dia}${mes}${anio}.pdf`;

  // Descargar el PDF
  doc.save(nombreArchivo);
};

  return (
    <Card
    style={{
      background: "linear-gradient(90deg,rgb(218, 239, 241), rgba(201, 236, 243, 0.8))",
    }}
    >
      <Card.Body>
        <Card.Title>Compras por Cliente</Card.Title>
        <Bar ref={chartRef} data={data} options={options} />
        <Button className="btn btn-primary mt-3" onClick={generarPDF}
        style={{
        background: "linear-gradient(90deg,rgb(193, 143, 206),rgb(28, 118, 136))",
        border: "none",
        borderRadius: "50px",
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: "600",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
         }}
        onMouseEnter={(e) => {
        e.target.style.boxShadow = "0 0 15px rgba(94, 39, 131, 0.5)";
         }}
        onMouseLeave={(e) => {
        e.target.style.boxShadow = "none";
         }}               
         >
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
      </Card.Body>
    </Card>
  );
};

export default ComprasPorCliente;