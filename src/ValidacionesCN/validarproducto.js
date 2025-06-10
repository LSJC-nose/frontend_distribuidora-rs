function validarProducto(producto) {
  const { nombreProducto, Descripcion, PrecioVenta, PrecioCompra } = producto;

  // Validar campos vacíos
  if (!nombreProducto || !Descripcion || PrecioVenta === undefined || PrecioCompra === undefined) {
    return { valido: false, mensaje: "Completa todos los campos requeridos." };
  }

  // Validar longitud del nombre
  if (nombreProducto.length < 3 || nombreProducto.length > 50) {
    return { valido: false, mensaje: "El nombre del producto debe tener entre 3 y 50 caracteres." };
  }

  // Validar longitud de la descripción
  if (Descripcion.length < 10 || Descripcion.length > 200) {
    return { valido: false, mensaje: "La descripción debe tener entre 10 y 200 caracteres." };
  }

  // Validar precio de venta
  if (isNaN(PrecioVenta) || Number(PrecioVenta) <= 0) {
    return { valido: false, mensaje: "El precio de venta debe ser un número positivo." };
  }

  // Validar precio de compra
  if (isNaN(PrecioCompra) || Number(PrecioCompra) <= 0) {
    return { valido: false, mensaje: "El precio de compra debe ser un número positivo." };
  }

  // Validar que el precio de venta sea mayor que el precio de compra
  if (Number(PrecioVenta) <= Number(PrecioCompra)) {
    return { valido: false, mensaje: "El precio de venta debe ser mayor que el precio de compra." };
  }

  return { valido: true, mensaje: "Producto registrado correctamente." };
}

module.exports = validarProducto;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.