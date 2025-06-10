const validarLogin = require('../../src/ValidacionesCN/validarLogin');

describe("Validación de login", () => {
  console.log('Prueba 1: validación de campos vacíos');
  it("No debe permitir login con campos vacíos", () => {
    const credenciales = {
      usuario: '',
      password: ''
    };

    const resultado = validarLogin(credenciales);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("obligatorios");
  });

  console.log('Prueba 2: validación de longitud del usuario');
  it("No debe permitir usuarios muy cortos o muy largos", () => {
    const credencialesCorto = {
      usuario: 'abc',
      password: 'password123'
    };
    const credencialesLargo = {
      usuario: 'usuario'.repeat(10),
      password: 'password123'
    };

    expect(validarLogin(credencialesCorto).valido).toBe(false);
    expect(validarLogin(credencialesLargo).valido).toBe(false);
  });

  console.log('Prueba 3: validación de formato del usuario');
  it("No debe permitir usuarios con caracteres especiales", () => {
    const credenciales = {
      usuario: 'usuario@123',
      password: 'password123'
    };

    const resultado = validarLogin(credenciales);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("solo puede contener letras");
  });

  console.log('Prueba 4: validación de longitud de la contraseña');
  it("No debe permitir contraseñas muy cortas o muy largas", () => {
    const credenciales = {
      usuario: 'usuario123',
      password: '12345'
    };

    const resultado = validarLogin(credenciales);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("contraseña debe tener");
  });

  console.log('Prueba 5: validación de formato de la contraseña');
  it("No debe permitir contraseñas sin letras o números", () => {
    const credenciales = {
      usuario: 'usuario123',
      password: 'abcdef'
    };

    const resultado = validarLogin(credenciales);
    expect(resultado.valido).toBe(false);
    expect(resultado.mensaje).toContain("debe contener al menos una letra y un número");
  });

  console.log('Prueba 6: credenciales válidas');
  it("Debe permitir login con credenciales válidas", () => {
    const credenciales = {
      usuario: 'usuario123',
      password: 'password123'
    };

    const resultado = validarLogin(credenciales);
    expect(resultado.valido).toBe(true);
    expect(resultado.mensaje).toContain("válidas");
  });
});