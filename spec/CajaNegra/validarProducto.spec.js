const validarProducto = require('../../src/ValidacionesCN/validarproducto');

console.log('Prueba 1: El producto no se registra con campos vacíos');
describe("Validación de producto", () => {
  it("No permite guardar con campos vacíos", () => {
    const producto = {
      nombreProducto: '',
      Descripcion: '',
      PrecioVenta: '',
      PrecioCompra: ''
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("campos requeridos");
  }); 

console.log('Prueba 2: El precio venta del producto no puede ser negativo');
  it("Debe rechazar precio venta negativo", () => {
    const producto = {
      nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja',
      PrecioVenta: -10,
      PrecioCompra: 10
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("precio venta");
  });

console.log('Prueba 3: El Precio Compra del producto no puede ser negativo');
  it("Debe rechazar precio compra negativo", () => {
    const producto = {
       nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja',
      PrecioVenta: 10,
      PrecioCompra: -10
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("precio compra");
    /*expect(resultado.mensaje).toBe("El stock debe ser número positivo");*/
  });

console.log('Prueba 4: Producto registrado correctamente');
  it("Agregar producto correctamente", () => {
    const producto = {
      nombreProducto: 'Manzana',
      Descripcion: 'Manzana roja',
      PrecioVenta: 10,
      PrecioCompra: 10
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeTrue();
  });
});
