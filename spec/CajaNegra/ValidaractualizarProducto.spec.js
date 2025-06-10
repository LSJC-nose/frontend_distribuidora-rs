const actualizarProducto = require('../../src/ValidacionesCN/actualizarProducto.js');

describe("Validación de actualización de producto", () => {
  console.log('Prueba 1: validación de campos vacíos');
  it("No debe permitir actualizar un producto con campos vacíos", () => {
    const producto = {
      nombreProducto: '',
      Descripcion: '',
      PrecioVenta: undefined,
      PrecioCompra: undefined
    };

    const resultado = actualizarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  console.log('Prueba 2: validación de longitud del nombre');
  it("No debe permitir nombres muy cortos o muy largos", () => {
    const productoCorto = {
      nombreProducto: 'Ab',
      Descripcion: 'Descripción del producto',
      PrecioVenta: 100,
      PrecioCompra: 50
    };
    const productoLargo = {
      nombreProducto: 'Producto'.repeat(20),
      Descripcion: 'Descripción del producto',
      PrecioVenta: 100,
      PrecioCompra: 50
    };

    expect(actualizarProducto(productoCorto).valido).toBe(false);
    expect(actualizarProducto(productoLargo).valido).toBe(false);
  });

  console.log('Prueba 3: validación de descripción');
  it("No debe permitir descripciones muy cortas o muy largas", () => {
    const producto = {
      nombreProducto: 'Laptop HP',
      Descripcion: 'Corta',
      PrecioVenta: 1000,
      PrecioCompra: 500
    };

    const resultado = actualizarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("descripción");
  });

  console.log('Prueba 4: validación de precios');
  it("No debe permitir precios inválidos", () => {
    const producto = {
      nombreProducto: 'Laptop HP',
      Descripcion: 'Laptop HP 15 pulgadas, 8GB RAM, 256GB SSD',
      PrecioVenta: -100,
      PrecioCompra: 50
    };

    const resultado = actualizarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("precio de venta");
  });

  console.log('Prueba 5: validación de relación entre precios');
  it("No debe permitir que el precio de venta sea menor o igual al precio de compra", () => {
    const producto = {
      nombreProducto: 'Laptop HP',
      Descripcion: 'Laptop HP 15 pulgadas, 8GB RAM, 256GB SSD',
      PrecioVenta: 400,
      PrecioCompra: 500
    };

    const resultado = actualizarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("precio de venta debe ser mayor");
  });

  console.log('Prueba 6: producto válido');
  it("Debe permitir actualizar un producto con todos los campos válidos", () => {
    const producto = {
      nombreProducto: 'Laptop HP 15 pulgadas',
      Descripcion: 'Laptop HP 15 pulgadas, 8GB RAM, 256GB SSD, procesador Intel Core i5',
      PrecioVenta: 999.99,
      PrecioCompra: 500.50
    };

    const resultado = actualizarProducto(producto);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("correctamente");
  });
}); 