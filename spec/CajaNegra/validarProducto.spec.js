const validarProducto = require('../../src/ValidacionesCN/validarproducto.js');  

describe("Validación de producto", () => {
  console.log('Prueba 1: El producto no se registra con campos vacíos');
  it("No permite guardar con campos vacíos", () => {
    const producto = {
      nombreProducto: '',
      Descripcion: '',
      PrecioVenta: undefined,
      PrecioCompra: undefined
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("campos requeridos");
  }); 

  console.log('Prueba 2: El precio venta del producto no puede ser negativo');
  it("Debe rechazar precio venta negativo", () => {
    const producto = {
      nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja deliciosa y jugosa',
      PrecioVenta: -10,
      PrecioCompra: 5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("precio de venta");
  });

  console.log('Prueba 3: El Precio Compra del producto no puede ser negativo');
  it("Debe rechazar precio compra negativo", () => {
    const producto = {
      nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja deliciosa y jugosa',
      PrecioVenta: 10,
      PrecioCompra: -5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("precio de compra");
  });

  console.log('Prueba 4: Producto registrado correctamente');
  it("Agregar producto correctamente", () => {
    const producto = {
      nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja deliciosa y jugosa',
      PrecioVenta: 10,
      PrecioCompra: 5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("correctamente");
  });
});
