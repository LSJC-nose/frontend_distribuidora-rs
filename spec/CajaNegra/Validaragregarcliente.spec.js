const agregarCliente = require('../../src/ValidacionesCN/agregarcliente.js');

describe("Validación de cliente", () => {
  console.log('Prueba 1: los clientes no se registran con campos vacíos');
  it("No debe permitir agregar un cliente con campos vacíos", () => {
    const cliente = {
      nombre: '',
      tipoCliente: '',
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  console.log('Prueba 2: validación de longitud del nombre');
  it("No debe permitir nombres muy cortos o muy largos", () => {
    const clienteCorto = {
      nombre: 'Jo',
      tipoCliente: 'Generico',
    };
    const clienteLargo = {
      nombre: 'Juan'.repeat(20),
      tipoCliente: 'Generico',
    };

    expect(agregarCliente(clienteCorto).valido).toBe(false);
    expect(agregarCliente(clienteLargo).valido).toBe(false);
  });

  console.log('Prueba 3: validación de tipo de cliente');
  it("No debe permitir tipos de cliente inválidos", () => {
    const cliente = {
      nombre: 'Juan Perez',
      tipoCliente: 'Invalido',
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("tipo de cliente");
  });

  console.log('Prueba 4: validación de formato del nombre');
  it("No debe permitir nombres con caracteres inválidos", () => {
    const cliente = {
      nombre: 'Juan123',
      tipoCliente: 'Generico',
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("solo puede contener letras");
  });

  console.log('Prueba 5: cliente válido');
  it("Debe permitir agregar un cliente con todos los campos completos y válidos", () => {
    const cliente = {
      nombre: 'Juan Pérez',
      tipoCliente: 'VIP',
    };

    const resultado = agregarCliente(cliente);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("correctamente");
  });
});
