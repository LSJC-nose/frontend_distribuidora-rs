function validarProducto(producto) {
  const { nombre_producto, id_categoria, precio_unitario, stock } = producto;

  if (!nombre_producto || !id_categoria || precio_unitario === '' || stock === '') {
    return { valido: false, mensaje: "Completa todos los campos requeridos." };
  }

  if (isNaN(precio_unitario) || Number(precio_unitario) < 0) {
    return { valido: false, mensaje: "El precio debe ser un número positivo." };
  }

  if (isNaN(stock) || Number(stock) < 0) {
    return { valido: false, mensaje: "El stock debe ser un número positivo." };
  }

  return { valido: true };
}

module.exports = validarProducto;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.