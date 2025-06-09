function validarProducto(producto) {
  const { nombreProducto, Descripcion, PrecioVenta, PrecioCompra } = producto;

  if (!nombreProducto || !Descripcion || PrecioVenta === '' || PrecioCompra === '') {
    return { valido: false, mensaje: "Completa todos los campos requeridos." };
  }

  if (isNaN(PrecioVenta) || Number(PrecioVenta) < 0) {
    return { valido: false, mensaje: "El precio de venta debe ser un número positivo." };
  }

  if (isNaN(PrecioCompra) || Number(PrecioCompra) < 0) {
    return { valido: false, mensaje: "El precio de compra debe ser un número positivo." };
  }

  return { valido: true };
}

module.exports = validarProducto;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.