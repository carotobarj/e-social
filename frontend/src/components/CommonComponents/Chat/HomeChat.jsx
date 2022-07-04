import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usuarioActual } from "../../../redux/actions/actionUser.js";
import Chat from "../Chat/Chat.jsx";
import NavBar from "../NavBar/NavBar.jsx";

import io from "socket.io-client";
let socket;

function homeChat() {

  const dispatch = useDispatch();
  const params = window.location.href;
  const [screen, setScreen] = useState(window.innerWidth);
  const usuario = useSelector((state) => state.usuarioActual);


  useEffect(() => {
    dispatch(usuarioActual());
    function handleResize() {
      setScreen(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    socket = io(import.meta.env.VITE_BACKEND_URL);
    socket.emit("Actualizar", params);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    //recibir la respuesta del back
    socket.on("homeUpdate", () => {
      return () => {
        socket.of()
      }
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="bienvenido">
        <h2 className="tituloBienvenido"> Normas de convivencia</h2>
        <p className="reglas">
          Sin toxicidad, no toleramos ningún tipo de abuso verbal, falta de respeto, acoso o discriminación. 
          </p>
          <p className="reglas">Su incumplimiento supone la expulsión inmediata.</p>
          <p className="reglas">Sin SPAM. Aquí estamos para compartir contenido, divertirnos, aprender y crecer juntos.
         </p>
      </div>
      <div className="contentChat">
        {socket ? (
          <div className="contChat">
            <Chat usuario={usuario} socket={socket} />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  )
}

export default homeChat
