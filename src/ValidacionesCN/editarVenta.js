function editarVenta(venta) {
  console.log('Función editarVenta ejecutada con venta:', venta);
  const { idVenta, nombreProducto, cantidad, precio, fecha } = venta;

  // Validar que todos los campos existan
  if (!idVenta || !nombreProducto || !cantidad || !precio || !fecha) {
    return { valido: false, mensaje: "Completa todos los campos requeridos." };
  }

  // Validar valores numéricos
  if (cantidad < 0) {
    return { valido: false, mensaje: "La cantidad no puede ser negativa." };
  }

  if (precio < 0) {
    return { valido: false, mensaje: "El precio no puede ser negativo." };
  }

  // Simular actualización exitosa
  return { valido: true };
}

module.exports = { editarVenta };