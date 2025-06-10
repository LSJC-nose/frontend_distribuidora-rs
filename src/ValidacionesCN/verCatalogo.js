function verCatalogo(productos) {
  console.log('Función verCatalogo ejecutada con productos:', productos);

  // Validar que haya productos
  if (!productos || productos.length === 0) {
    return { valido: false, mensaje: "No hay productos disponibles para mostrar." };
  }

  // Validar que todos los productos tengan los campos requeridos
  for (let producto of productos) {
    if (!producto.nombreProducto || !producto.precioVenta || !producto.descripcion || !producto.catalogo) {
      return { valido: false, mensaje: "Algunos productos tienen datos incompletos." };
    }
  }

  // Simular visualización exitosa
  return { valido: true };
}

module.exports = { verCatalogo };