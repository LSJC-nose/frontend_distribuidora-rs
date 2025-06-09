function compracliente(compra) {
  const { cantidad, precioVenta } = compra || {};

  if (!cantidad || !precioVenta || precioVenta === '' || cantidad <= 0 || precioVenta <= 0) {
    return { valido: false, mensaje: "Agrega compra cliente con cantidad y precio válidos." };
  }
  return { valido: true, mensaje: "Compra cliente válida." };
}

module.exports = compracliente;