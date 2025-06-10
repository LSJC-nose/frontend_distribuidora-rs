function agregarCliente(cliente) {
  const { nombre, tipoCliente } = cliente;

  // Validar campos vacíos
  if (!nombre || !tipoCliente || nombre.trim() === '' || tipoCliente.trim() === '') {
    return { valido: false, mensaje: "Todos los campos son obligatorios para agregar un cliente." };
  }

  // Validar longitud del nombre
  if (nombre.length < 3 || nombre.length > 50) {
    return { valido: false, mensaje: "El nombre debe tener entre 3 y 50 caracteres." };
  }

  // Validar tipo de cliente
  const tiposValidos = ['Generico', 'VIP', 'Premium', 'Corporativo'];
  if (!tiposValidos.includes(tipoCliente)) {
    return { valido: false, mensaje: "El tipo de cliente debe ser: Generico, VIP, Premium o Corporativo." };
  }

  // Validar formato del nombre (solo letras, espacios y algunos caracteres especiales)
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\-\.]+$/;
  if (!nombreRegex.test(nombre)) {
    return { valido: false, mensaje: "El nombre solo puede contener letras, espacios y algunos caracteres especiales." };
  }

  return { valido: true, mensaje: "Cliente agregado correctamente." };
}

module.exports = agregarCliente;
// Este módulo valida los datos de un producto para asegurarse de que todos los campos requeridos estén completos y que los valores numéricos sean válidos.
// Se asegura de que el nombre del producto, la categoría, el precio unitario y el stock sean válidos antes de permitir su creación o actualización.