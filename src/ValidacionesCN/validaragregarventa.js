function validarAgregarVenta(venta) {
    const { Cantidad, PrecioCompra } = venta;
  
    // Validar campos vacíos
    if (Cantidad === undefined || PrecioCompra === undefined) {
      return { valido: false, mensaje: "Todos los campos son obligatorios para agregar la venta." };
    }
  
    // Validar que la cantidad sea un número entero positivo
    if (!Number.isInteger(Number(Cantidad)) || Number(Cantidad) <= 0) {
      return { valido: false, mensaje: "La cantidad debe ser un número entero positivo." };
    }
  
    // Validar que el precio de compra sea un número positivo
    if (isNaN(PrecioCompra) || Number(PrecioCompra) <= 0) {
      return { valido: false, mensaje: "El precio de compra debe ser un número positivo." };
    }
  
    // Validar que la cantidad no exceda un límite razonable
    if (Number(Cantidad) > 1000) {
      return { valido: false, mensaje: "La cantidad no puede exceder 1000 unidades." };
    }
  
    return { valido: true, mensaje: "Venta agregada correctamente." };
  }
  
  module.exports = validarAgregarVenta;
