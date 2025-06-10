function eliminarProducto(producto) {
  console.log('Función eliminarProducto ejecutada con producto:', producto);
  const { idProducto, sesionAdmin = false } = producto;

  // Simular verificación de existencia del producto (por simplicidad, asumimos ID < 100 existe)
  if (idProducto >= 100) {
    return { valido: false, mensaje: "El producto no existe." };
  }

  // Simular eliminación exitosa
  return { valido: true, mensaje: "Producto eliminado exitosamente." };
}

module.exports = { eliminarProducto };