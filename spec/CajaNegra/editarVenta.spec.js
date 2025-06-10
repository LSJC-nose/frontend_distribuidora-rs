const { editarVenta } = require('../../src/ValidacionesCN/editarVenta.js');

describe("Validación de edición de venta", () => {
  console.log('Paso 1-2: Hacer clic en el apartado de ventas y botón de editar una venta (simulado)');

  console.log('Caso 1: Editar una venta con datos completos');
  it("Permite editar una venta con datos completos", () => {
    const venta = {
      idVenta: 1,
      nombreProducto: "Laptop HP",
      cantidad: 5,
      precio: 1200.75,
      fecha: "2025-06-09"
    };
    const resultado = editarVenta(venta);
    expect(resultado.valido).toBeTruthy();
  });

  console.log('Caso 2: Editar una venta con campos vacíos');
  it("No permite editar una venta con campos vacíos", () => {
    const venta = {
      idVenta: 1,
      nombreProducto: "",
      cantidad: 0,
      precio: 0,
      fecha: ""
    };
    const resultado = editarVenta(venta);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("Completa todos los campos requeridos.");
  });

  console.log('Caso 3: Editar una venta con cantidad negativa');
  it("No permite editar una venta con cantidad negativa", () => {
    const venta = {
      idVenta: 1,
      nombreProducto: "Laptop HP",
      cantidad: -2,
      precio: 1200.75,
      fecha: "2025-06-09"
    };
    const resultado = editarVenta(venta);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("La cantidad no puede ser negativa.");
  });

  console.log('Caso 4: Editar una venta con precio negativo');
  it("No permite editar una venta con precio negativo", () => {
    const venta = {
      idVenta: 1,
      nombreProducto: "Laptop HP",
      cantidad: 5,
      precio: -1200.75,
      fecha: "2025-06-09"
    };
    const resultado = editarVenta(venta);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("El precio no puede ser negativo.");
  });
});