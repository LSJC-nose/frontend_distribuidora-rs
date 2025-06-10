const compracliente = require('../../src/ValidacionesCN/compracliente.js');

describe("Validar Compra Cliente", () => {
  console.log("Test 1 - Cantidad 0:");
  it("Debe rechazar cantidad igual a 0", () => {
    const compraCliente = { cantidad: 0, precioVenta: 120 };
    const resultado = compracliente(compraCliente);
    
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("entero positivo");
  });

 console.log("Test 2 - Datos válidos:");
  it("Debe aceptar datos válidos", () => {
    const compraCliente = { cantidad: 1, precioVenta: 120 };
    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("válida");
  });

  console.log("Test 3 - Cantidad negativa:");
  it("Debe rechazar cantidad negativa", () => {
    const compraCliente = { cantidad: -1, precioVenta: 100 };
    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("entero positivo");
  });

  console.log("Test 4 - Falta precioVenta:");
  it("Debe rechazar si falta precioVenta", () => {
    const compraCliente = { cantidad: 5 };
    const resultado = compracliente(compraCliente);
    
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

   console.log("Test 5 - Falta cantidad:");
  it("Debe rechazar si falta cantidad", () => {
    const compraCliente = { precioVenta: 50 };
    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  console.log("Test 6 - PrecioVenta negativo:");
  it("Debe rechazar precioVenta negativo", () => {
    const compraCliente = { cantidad: 2, precioVenta: -10 };
    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("número positivo");
  });
});