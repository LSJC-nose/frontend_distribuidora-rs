const validarAgregarVenta = require('../../src/ValidacionesCN/validaragregarventa');

describe("Validación de agregar venta", () => {
  console.log('Prueba 1: validación de campos vacíos');
  it("No debe permitir agregar una venta con campos vacíos", () => {
    const venta = {
      Cantidad: undefined,
      PrecioCompra: undefined
    };

    const resultado = validarAgregarVenta(venta);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  console.log('Prueba 2: validación de cantidad');
  it("No debe permitir cantidades inválidas", () => {
    const venta = {
      Cantidad: -5,
      PrecioCompra: 100
    };

    const resultado = validarAgregarVenta(venta);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("cantidad");
  });

  console.log('Prueba 3: validación de precio de compra');
  it("No debe permitir precios de compra inválidos", () => {
    const venta = {
      Cantidad: 10,
      PrecioCompra: -100
    };

    const resultado = validarAgregarVenta(venta);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("precio de compra");
  });

  console.log('Prueba 4: validación de límite de cantidad');
  it("No debe permitir cantidades que excedan el límite", () => {
    const venta = {
      Cantidad: 1500,
      PrecioCompra: 100
    };

    const resultado = validarAgregarVenta(venta);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("1000 unidades");
  });

  console.log('Prueba 5: venta válida');
  it("Debe permitir agregar una venta con datos válidos", () => {
    const venta = {
      Cantidad: 10,
      PrecioCompra: 100
    };

    const resultado = validarAgregarVenta(venta);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("correctamente");
  });
}); 