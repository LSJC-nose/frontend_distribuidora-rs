const validarLogin = require('../../src/ValidacionesCN/validarlogin.js');

console.log('Prueba 1: El usuario inicia sesion');
describe("Validación Login", () => {
  it("Permitir iniciar sesion ", () => {
    const login = {
      usuario: '',
      contraseña: ''
    };

    const resultado = validarLogin(login);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("campos requeridos");
  });
});

console.log('Prueba 2: El usuario intenta con contraseña incorrecta');
describe("Validación Login - Contraseña Incorrecta", () => {
  it("Rechazar login con contraseña incorrecta", () => {
    const login = {
      usuario: 'usuario1',
      contraseña: '1234' // Suponiendo que la contraseña correcta debería ser diferente
    };

    const resultado = validarLogin(login);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("contraseña incorrecta");
  });
});

console.log('Prueba 3: El usuario intenta con datos nulos');
describe("Validación Login - Datos Nulos", () => {
  it("Rechazar login con datos nulos", () => {
    const login = {
      usuario: null,
      contraseña: null
    };

    const resultado = validarLogin(login);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("campos requeridos");
  });
});

console.log('Prueba 4: El usuario inicia sesion con datos válidos');
describe("Validación Login - Datos Válidos", () => {
  it("Permitir login con datos válidos", () => {
    const login = {
      usuario: 'usuario1',
      contraseña: 'contraseña123' // Suponiendo que esta es una contraseña válida
    };

    const resultado = validarLogin(login);
    expect(resultado.valido).toBeTrue();
    expect(resultado.mensaje).toContain("inicio de sesión exitoso");
  });
});