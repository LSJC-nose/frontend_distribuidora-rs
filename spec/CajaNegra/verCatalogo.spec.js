const { verCatalogo } = require('../../src/ValidacionesCN/verCatalogo.js');

describe("Validación de visualización del catálogo", () => {
  console.log('Paso 1: Navegar en la vista predeterminada (Catálogo) (simulado)');
  console.log('Paso 2: Verificar los productos disponibles');

  console.log('Caso 1: Ver catálogo con datos completos');
  it("Permite ver el catálogo con datos completos", () => {
    const productos = [
      {
        nombreProducto: "Laptop HP",
        precioVenta: 1200.75,
        descripcion: "Laptop de alta gama",
        catalogo: "Electrónica"
      },
      {
        nombreProducto: "Mouse Logitech",
        precioVenta: 25.50,
        descripcion: "Mouse ergonómico",
        catalogo: "Accesorios"
      }
    ];
    const resultado = verCatalogo(productos);
    expect(resultado.valido).toBeTruthy();
  });

  console.log('Caso 2: Ver catálogo con productos vacíos');
  it("No permite ver el catálogo si no hay productos", () => {
    const productos = [];
    const resultado = verCatalogo(productos);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("No hay productos disponibles para mostrar.");
  });

  console.log('Caso 3: Ver catálogo con datos incompletos');
  it("No permite ver el catálogo si un producto tiene datos incompletos", () => {
    const productos = [
      {
        nombreProducto: "Laptop HP",
        precioVenta: 1200.75,
        descripcion: "", // Dato incompleto
        catalogo: "Electrónica"
      }
    ];
    const resultado = verCatalogo(productos);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("Algunos productos tienen datos incompletos.");
  });
});