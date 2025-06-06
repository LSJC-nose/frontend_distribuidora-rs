import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { useRef } from "react";
import { Card, Button } from "react-bootstrap";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ProductosBajoStock = ({ productos }) => {
  const chartRef = useRef(null);

  const data = {
    labels: productos.map((producto) => producto.nombreProducto || 'Sin nombre'),
    datasets: [
      {
        label: 'Stock',
        data: productos.map((producto) => producto.Stock || 0),
        backgroundColor: 'rgba(231, 216, 0, 0.6)',
        borderColor: 'rgba(255, 192, 203, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad de Stock' },
      },
      x: {
        title: { display: true, text: 'Producto' },
      },
    },
    plugins: { legend: { display: true, position: 'top' } },
  };

  const generarPDF = () => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFillColor(28, 41, 51);
    doc.rect(0, 0, doc.internal.pageSize.getWidth(), 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.text("Reporte de Productos con Bajo Stock", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });

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
      const columnas = ["Producto", "Stock"];
      const filas = productos.map((producto) => [
        producto.nombreProducto || 'Sin nombre',
        producto.Stock || 0,
      ]);

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
      const nombreArchivo = `ProductosBajoStock_${dia}${mes}${anio}.pdf`;

      // Descargar el PDF
      doc.save(nombreArchivo);
    }, 1000);
  };

  if (!productos || productos.length === 0) {
    return (
      <Card>
        <Card.Body>
          <Card.Title>Productos con Bajo Stock</Card.Title>
          <p>No hay datos disponibles para mostrar.</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Productos con Bajo Stock</Card.Title>
        <Bar ref={chartRef} data={data} options={options} />
        <Button className="btn btn-primary mt-3" onClick={generarPDF}>
          Generar Reporte <i className="bi bi-download"></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductosBajoStock;