const validarLogin = require('../../src/ValidacionesCN/validarlogin.js');

console.log('Prueba 1: El usuario inicia sesion');
describe("Validación Login", () => {
  it("Permitir iniciar sesion ", () => {
    const login= {
      usuario: '',
      contraseña: ''
    };

    const resultado = validarLogin(login);
    expect(resultado.valido).toBeFalse();
    expect(resultado.mensaje).toContain("campos requeridos");
  }); 
});