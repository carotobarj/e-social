import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import booksRoutes from './routes/booksRoutes.js';
import categoriesRoutes from './routes/categoriesRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';
import usuarioCreadorRoutes from './routes/usuarioCreadorRoutes.js';
import renderQARoutes from './routes/renderQARoutes.js';
import reviewRoutes from './routes/reviewRoutes.js'
//---- ruta para payment
import paymentsIntent from './routes/paymentsIntent.js'
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config();
conectarDB();
app.use(express.json());
app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

//cors
app.use(
  cors({
    origin: '*',
    credentials: true,
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'authorization',
    ],
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routing
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/usuarioCreador", usuarioCreadorRoutes);
app.use("/api/qa" , renderQARoutes)
app.use("/api/review", reviewRoutes)
//----Rutas para payment
app.use(express.static("public"));

app.use("/api/create-payment-intent", paymentsIntent)

const PORT = process.env.PORT || 3001;
const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
});

//socket io

import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 10000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  //definir la conexion
  //on define que es lo que pasa cuando el evento ocurre
  socket.on("Actualizar", (room) => {
    socket.join(room);
  });
  socket.on("renderHome", () => {
    socket.to(`${process.env.FRONTEND_URL}/`).emit("homeUpdate");
  });

  //chat
  socket.on('chat', (mensaje) => {
    io.emit("chatmensaje", mensaje);
  })
  /*fin chat*/


  socket.on("Settings", (room) => {
    socket.join(room);
  });
  socket.on("updateSettings", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/user/setting`)
      .emit("userSettings");
  });

  socket.on("Navegar", (room) => {
    socket.join(room);
  });
});
