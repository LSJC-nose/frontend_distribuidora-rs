import {Line } from'react-chartjs-2';
import Chart from 'chart.js/auto';

import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  const chartRef = useRef(null);

  const generarPDF = () => {
  const doc = new jsPDF();

  // Encabezado
  doc.setFillColor(28, 41, 51);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("Reporte de Ventas Diarias", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

  // Capturar gráfico como imagen con retraso
  setTimeout(() => {
    const chartInstance = chartRef.current;
    const chartCanvas = chartInstance?.canvas;
    const chartImage = chartCanvas?.toDataURL("image/png", 1.0);

    if (chartImage) {
      doc.addImage(chartImage, "PNG", 14, 40, 100, 100);
    } else {
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.text("No hay datos o gráfico disponible.", 14, 40);
    }

    // Tabla de datos
    const columnas = ["Fecha", "Total Ventas"];
    const filas = dias.map((dia, index) => [dia, totales_por_dia[index] || 0]);

    autoTable(doc, {
      head: [columnas],
      body: filas.length ? filas : [["Sin datos", "0"]],
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
    const nombreArchivo = `ResumenVentasDiarias_${dia}${mes}${anio}.pdf`;

    // Descargar el PDF
    doc.save(nombreArchivo);
  }, 1000); // Retraso para asegurar que el gráfico esté renderizado
};

  return (
    <Card>
      <Card.Body>
        <Card.Title>Ventas por Día</Card.Title>
        <Line ref={chartRef} data={data} options={options} />
        <Button className="btn btn-primary mt-3" onClick={generarPDF}>
        Generar Reporte <i className="bi bi-download"></i>
      </Button>
      </Card.Body>
    </Card>
  );
};

export default ResumenVentasDiarias; 