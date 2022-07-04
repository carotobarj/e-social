import express from "express";
import {
    googleLogin,
    registrar,
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
    usuario,
    traerUsuarios,
    obtenerOrdersUsuarios,
    cambiarImage,
    deleteUsuario,
    getUsersList,
    deleteUser,
    changeName,
    makeAdminAnUser
} from "../controllers/usuarioControllers.js";
import checkAdmin from "../middleware/checkAdmin.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

//Autenticacion, Registro y Confirmacion de Usuarios
router.post('/google', googleLogin);
router.post('/', registrar); //registrar usuarios
router.post('/login', autenticar); //login de usuarios
router.get('/confirmar/:token', confirmar); //comfirmar usuario por token
router.post('/olvide-password', olvidePassword); //poder renovar password
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword); //modificar y guardar password

router.get('/perfil', checkAuth, perfil); //Ingresar al perfil solo si es el usuario
router.get("/traer-usuarios", traerUsuarios);
router.get("/traer-orders", obtenerOrdersUsuarios);
router.get("/actual", checkAuth, usuario);
router.put("/imagen", checkAuth, cambiarImage);//Cambiar imagen de perfil



//ADMIN
router
  .route("/list")
  .get(checkAdmin, getUsersList)
  
router
  .route("/update")
  .put(makeAdminAnUser)

router //delete user admin
.route('/delete/:id')
.delete(deleteUsuario);

router  //delete user
.route('/deleteUser/:id')
.delete(deleteUser);

router //update nombre
.route('/updateNombre/:id')
.put(changeName);
export default router;
