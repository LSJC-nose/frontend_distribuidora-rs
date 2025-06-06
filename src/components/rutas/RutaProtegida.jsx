import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ vista }) => {
const estaLogueado = !!localStorage.getItem('usuario') && !!localStorage.getItem('contraseña');

console.log("Usuario autenticación:", estaLogueado);


  return estaLogueado ? vista : <Navigate to="/" replace />;
};

export default RutaProtegida;