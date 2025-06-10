function actualizarProducto(producto) {
  const { nombreProducto, Descripcion, PrecioVenta, PrecioCompra } = producto;

  // Validar campos vacíos
  if (!nombreProducto || !Descripcion || PrecioVenta === undefined || PrecioCompra === undefined) {
    return { valido: false, mensaje: "Todos los campos son obligatorios para actualizar el producto." };
  }

  // Validar longitud del nombre
  if (nombreProducto.length < 3 || nombreProducto.length > 50) {
    return { valido: false, mensaje: "El nombre del producto debe tener entre 3 y 50 caracteres." };
  }

  // Validar longitud de la descripción
  if (Descripcion.length < 10 || Descripcion.length > 200) {
    return { valido: false, mensaje: "La descripción debe tener entre 10 y 200 caracteres." };
  }

  // Validar formato del nombre
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.\,\"\']+$/;
  if (!nombreRegex.test(nombreProducto)) {
    return { valido: false, mensaje: "El nombre del producto solo puede contener letras, números, espacios y algunos caracteres especiales." };
  }

  // Validar precio de venta
  if (isNaN(PrecioVenta) || PrecioVenta <= 0) {
    return { valido: false, mensaje: "El precio de venta debe ser un número mayor que 0." };
  }

  // Validar precio de compra
  if (isNaN(PrecioCompra) || PrecioCompra <= 0) {
    return { valido: false, mensaje: "El precio de compra debe ser un número mayor que 0." };
  }

  // Validar que el precio de venta sea mayor que el precio de compra
  if (PrecioVenta <= PrecioCompra) {
    return { valido: false, mensaje: "El precio de venta debe ser mayor que el precio de compra." };
  }

  return { valido: true, mensaje: "Producto actualizado correctamente." };
}

module.exports = actualizarProducto;
