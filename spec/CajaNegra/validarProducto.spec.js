const validarProducto = require('../../src/ValidacionesCN/validarproducto');

console.log('Prueba 1: El producto no se registra con campos vacíos');
describe("Validación de producto", () => {
  it("No permite guardar con campos vacíos", () => {
    const producto = {
      nombre_producto: '',
      id_categoria: '',
      precio_unitario: '',
      stock: ''
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("campos requeridos");
  }); 

console.log('Prueba 2: El precio del producto no puede ser negativo');
  it("Debe rechazar precio negativo", () => {
    const producto = {
      nombre_producto: 'Martillo',
      id_categoria: '1',
      precio_unitario: -10,
      stock: 5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("precio");
  });

console.log('Prueba 3: El stock debe ser mayor a 0 para guardar el producto');
  it("No permite stock menor que cero", () => {
    const producto = {
      nombre_producto: 'Martillo',
      id_categoria: '1',
      precio_unitario: 10,
      stock: -5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("stock");
    /*expect(resultado.mensaje).toBe("El stock debe ser número positivo");*/
  });

console.log('Prueba 4: Producto registrado correctamente');
  it("Agregar producto correctamente", () => {
    const producto = {
      nombre_producto: 'Martillo',
      id_categoria: '1',
      precio_unitario: 10,
      stock: 5
    };

    const resultado = validarProducto(producto);
    expect(resultado.valido).toBeTrue();
  });
});
    