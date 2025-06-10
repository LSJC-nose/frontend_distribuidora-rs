const { eliminarProducto } = require('../../src/ValidacionesCN/eliminarProducto.js');

describe("Validación de eliminación de producto", () => {
  console.log('Paso 1-2: Hacer clic en el apartado de productos y botón de eliminar producto (simulado)');

  console.log('Caso 1: Eliminar un producto existente');
  it("Permite eliminar un producto existente", () => {
    const producto = { idProducto: 1 };
    const resultado = eliminarProducto(producto);
    expect(resultado.valido).toBeTruthy();
    expect(resultado.mensaje).toBe("Producto eliminado exitosamente.");
  });

  console.log('Caso 2: Intentar eliminar un producto inexistente');
  it("No permite eliminar un producto inexistente", () => {
    const producto = { idProducto: 999 }; // ID no válido
    const resultado = eliminarProducto(producto);
    expect(resultado.valido).toBeFalsy();
    expect(resultado.mensaje).toBe("El producto no existe.");
  });
  
});