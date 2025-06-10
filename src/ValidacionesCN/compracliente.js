function compracliente(compra) {
  const { cantidad, precioVenta } = compra;

  // Validar campos vacíos
  if (cantidad === undefined || precioVenta === undefined) {
    return { valido: false, mensaje: "La cantidad y el precio de venta son obligatorios." };
  }

  // Validar que la cantidad sea un número entero positivo
  if (!Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) {
    return { valido: false, mensaje: "La cantidad debe ser un número entero positivo." };
  }

  // Validar que el precio de venta sea un número positivo
  if (isNaN(precioVenta) || Number(precioVenta) <= 0) {
    return { valido: false, mensaje: "El precio de venta debe ser un número positivo." };
  }

  // Validar que la cantidad no exceda un límite razonable
  if (Number(cantidad) > 1000) {
    return { valido: false, mensaje: "La cantidad no puede exceder 1000 unidades." };
  }

  // Validar que el precio de venta no exceda un límite razonable
  if (Number(precioVenta) > 1000000) {
    return { valido: false, mensaje: "El precio de venta no puede exceder 1,000,000." };
  }

  return { valido: true, mensaje: "Compra cliente válida." };
}

module.exports = compracliente;
