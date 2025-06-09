function validarlogin(login) {
  const { usuario, contraseña } = login;

  if (!usuario || !contraseña === '' || login === '') {
    return { valido: false, mensaje: "Completa todos los campos requeridos." };
  }
  return { valido: true };
}

module.exports = validarlogin;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.