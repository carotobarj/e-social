import React, { useEffect, useRef, useState } from "react";

export default function Chat({ usuario, socket }) {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState([]);

  const insultos = [
    "puto",
    "pUt0",
    "PUTO",
    "PUT0",
    "hijodeperra",
    "perra",
    "culia",
    "hijodeputa",
    "puta",
    "negro",
    "mierda",
    "trola",
    "put@",
    "gay",
    "g@ay",
    "bobo",
    "boba",
    "idiota",
    "tonto",
    "tonta",
    "tont@",
    "hueca",
    "hueco",
    "macaco",
    "nashe",
    "concha",
    "pito",
    "fuck",
    "fucking",
    "brasuca",
    "culiado",
    "huecudo",
    "pijudo",
    "bugs",
    "bag",
    "trolo",
    "pingo",
    "orto",
    "poronga",
    "culiao",
    "culiau",
    "negros",
    "estupido",
    "estupidos",
    "pelotudito",
    "cachondo",
    "cachonda",
    "mogolico",
    "mogolica",
    "porongo",
    "reconcha",
    "pija",
    "laconcha",
  ];

  function handleNone() {
    let chat = document.querySelector("#chat");
    if (chat.className.match(/(?:^|\s)displayNone(?!\S)/)) {
      chat.classList.remove("displayNone");
      chat.classList.add("displayBlock");
    } else {
      chat.classList.remove("displayBlock");
      chat.classList.add("displayNone");
    }
  }

  useEffect(() => {
    socket.on("chatmensaje", (msg) => {
      setMensajes([...mensajes, msg]);
    });
    return () => {
      socket.off();
    };
  }, [mensajes]);

  function handleSubmit(e) {
    e.preventDefault();
    if (mensaje === "" || mensaje.trim().length === 0) return null;
    if (mensaje.length > 200) return null;
    const palabras = mensaje
      .split(" ")
      .map((e) => (insultos.includes(e.toLowerCase()) ? "****" : e));

    socket.emit("chat", { usuario: usuario.nombre, msg: palabras.join(" ") });
    setMensaje("");
  }
  function handleNone() {
    let chat = document.querySelector("#chat");

    if (chat.className.match(/(?:^|\s)displayNone(?!\S)/)) {
      chat.classList.remove("displayNone");
      chat.classList.add("displayBlock");
    } else {
      chat.classList.remove("displayBlock");
      chat.classList.add("displayNone");
    }
  }

  useEffect(() => {
    socket.on("chatmensaje", (msg) => {
      setMensajes([...mensajes, msg]);
    });
    return () => {
      socket.off();
    };
  }, [mensajes]);

  const scrolChat = useRef(null);
  useEffect(() => {
    scrolChat.current.scrollIntoView({ behavior: "smooth" });
  });


  return (
    <div className="chat-window">
      <div id="ulChat" className="ulChat">
        {mensajes.length !== 0 ? (
          mensajes?.map((e, i) => {
            return (
              <li className="cadaMensaje" key={i}>
                <span
                  className={e.usuario === usuario.nombre ? "span" : "otro"}
                >
                  {e.usuario}:
                </span>{" "}
                <p className="msj"> {e.msg}{" "}</p>
              </li>
            );
          })
        ) : (
          <small className="inicialMsg"> Escriba el primer mensaje </small>
        )}
        <div ref={scrolChat}></div>
      </div>

      <form className="chatform" onSubmit={(e) => handleSubmit(e)} action="">
        <input
          value={mensaje}
          className="inputChat"
          onChange={(e) => setMensaje(e.target.value)}
          type="text"
          placeholder="Escribe acá"
        />
        <button className="buChat" type="submit">
          ENVIAR
        </button>
      </form>

    </div>
  );
}

