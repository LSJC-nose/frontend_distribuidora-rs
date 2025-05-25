import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import logo from "/logo_RS-.png"; // Importación del logo de la ferretería  

const Inicio = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const navegar = useNavigate();

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      navegar("/");
    } else {
      setNombreUsuario(usuarioGuardado);
    }
  }, [navegar]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("contraseña");
    navegar("/");
  };

  const iraservicio= () => {
    navegar("/servicios");
  };

  return (
   
    <Container className="d-flex flex-column align-items-center justify-content-center vh-100">
      <img alt="" src={logo} width="240" height="auto" className="d-inline-block align-top"
                   
                    />  
    <h1 className="titulo text-center">¡Bienvenido, {nombreUsuario}!</h1>
    <h6 className="subtitulo text-center">Sea bienvenido a nuestra pagina</h6>
    <p>Desea salir de nuestro sitio</p>
    <button className="btns" onClick={cerrarSesion}>Cerrar Sesión</button>
  </Container>
  
    
  );
};


export default Inicio;