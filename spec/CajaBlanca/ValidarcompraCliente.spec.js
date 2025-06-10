const compracliente = require('../../src/ValidacionesCN/compracliente.js');

console.log('Prueba 1: Compra cliente con datos inválidos');
describe("Validar Compra Cliente - Datos Inválidos", () => {
  it("Agregar un registro de compra por un cliente con datos inválidos", () => {
    const compraCliente = {
      cantidad: 0, // Valor inválido para provocar fallo
      precioVenta: 120
    };

    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("Agrega compra cliente");
  });
});

console.log('Prueba 2: Compra cliente con datos válidos');
describe("Validar Compra Cliente - Datos Válidos", () => {
  it("Agregar un registro de compra por un cliente con datos válidos", () => {
    const compraCliente = {
      cantidad: 1,
      precioVenta: 120
    };

    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("Compra cliente válida");
  });
});

console.log('Prueba 3: Selección de productos con cantidad inválida');
describe("Validar Compra Cliente - Selección con Cantidad Inválida", () => {
  it("Validar selección de productos con cantidad inválida", () => {
    const compraCliente = {
      cantidad: -1, // Cantidad negativa, inválida
      precioVenta: 100
    };

    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("Agrega compra cliente con cantidad y precio válidos");
  });
});

console.log('Prueba 4: Agregación de cantidad de productos');
describe("Validar Compra Cliente - Agregación de Cantidad", () => {
  it("Validar agregación de cantidad de productos", () => {
    const compraCliente = {
      cantidad: 5, // Cantidad válida
      precioVenta: 50
    };

    const resultado = compracliente(compraCliente);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("Compra cliente válida");
  });
});