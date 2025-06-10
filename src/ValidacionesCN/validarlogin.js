function validarLogin(credenciales) {
  const { usuario, password } = credenciales;

  // Validar campos vacíos
  if (!usuario || !password) {
    return { valido: false, mensaje: "El usuario y la contraseña son obligatorios." };
  }

  // Validar longitud del usuario
  if (usuario.length < 4 || usuario.length > 20) {
    return { valido: false, mensaje: "El usuario debe tener entre 4 y 20 caracteres." };
  }

  // Validar formato del usuario (solo letras, números y guiones bajos)
  const usuarioRegex = /^[a-zA-Z0-9_]+$/;
  if (!usuarioRegex.test(usuario)) {
    return { valido: false, mensaje: "El usuario solo puede contener letras, números y guiones bajos." };
  }

  // Validar longitud de la contraseña
  if (password.length < 6 || password.length > 20) {
    return { valido: false, mensaje: "La contraseña debe tener entre 6 y 20 caracteres." };
  }

  // Validar que la contraseña contenga al menos una letra y un número
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]+$/;
  if (!passwordRegex.test(password)) {
    return { valido: false, mensaje: "La contraseña debe contener al menos una letra y un número." };
  }

  return { valido: true, mensaje: "Credenciales válidas." };
}

module.exports = validarLogin;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.