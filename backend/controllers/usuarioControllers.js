import Usuario from "../models/Usuario.js";
import Order from "../models/Order.js"
import { generarId } from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { emailRegistro, emailOlvidePassword } from "../helpers/emails.js";
import { uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.CLIENT_ID);

const googleLogin = async (req, res) => {
    const { idToken } = req.body;
    try {
      client
        .verifyIdToken({
          idToken,
          audience: process.env.CLIENT_ID,
        })
        .then((response) => {
          const { email_verified, picture, given_name, email } = response.payload;
          if (email_verified) {
            Usuario.findOne({ email }).exec((err, user) => {
              if (err) {
                return res.status(400).json({ error: "Something went wrong " });
              } else {
                if (user) {
                  const token = generarJWT(user._id);
                  const { _id, nombre, email } = user;
                  res.json({
                    _id: _id,
                    nombre: nombre,
                    email: email,
                    token: token,
                  });
                } else {
                  let nuevoUsuario = new Usuario({
                    nombre: given_name,
                    email,
                    image: { public_id: "", url: picture },
                  });
                  nuevoUsuario.confirmado = true;
                  nuevoUsuario.save();
                  const token = generarJWT(nuevoUsuario._id);
                  res.json({
                    _id: nuevoUsuario._id,
                    nombre: nuevoUsuario.given_name,
                    email: nuevoUsuario.email,
                    token: token,
                  });
                }
              }
            });
          }
        });
    const usuario = new Usuario({});
    } catch (error) {
        console.log(error);
    }
};

const registrar = async (req, res) => {
    //Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error('User already registered');
        return res.status(400).json({ msg: error.message });
    }

    try {
        const usuario = new Usuario({
            ...req.body,
            image: { public_id: "", url: "" },
        });
        usuario.token = generarId(); //id hasheado
        await usuario.save()

        emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token,
        });

        res
            .status(200)
            .send("User created, check your email to confirm your account");
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {

    const { email, password } = req.body;

    //Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }

    //Comprobar si el usuario esta confirmado 
    if (!usuario.confirmado) {
        const error = new Error("Your account has not been confirmed");
        return res.status(403).json({ msg: error.message });
    }

    //Comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            image: usuario.image,
            token: generarJWT(usuario._id), //mandar el id por JWT
        });
    } else {
        const error = new Error("The Password is Incorrect");
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token });
    if (!usuarioConfirmar) {
        const error = new Error("Invalid Token");
        return res.status(403).json({ msg: error.message });
    }
    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = "";
        await usuarioConfirmar.save();
        res.json({ msg: "User Confirmed Successfully" });

    } catch (error) {
        console.log(error)
    }
};

const olvidePassword = async (req, res) => {
    const { email } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }
    try {
        usuario.token = generarId();
        await usuario.save();

        emailOlvidePassword({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token,
        });

        res.json({ msg: 'We have sent an email with the instructions' });
    } catch (error) {
        console.log(error)

    }
};

const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token });

    if (tokenValido) {
        res.json({ msg: 'Valid token and the User exists' })
    } else {
        const error = new Error("Invalid token");
        return res.status(404).json({ msg: error.message });
    }
};

const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token });

    if (usuario) {
        usuario.password = password;
        usuario.token = '';
        try {
            await usuario.save();
            res.json({ msg: "Password Modified Successfully" });
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error("Invalid Token");
        return res.status(404).json({ msg: error.message });
    }
}

const perfil = async (req, res) => {
    const usuario = await Usuario.findOne({ nombre: req.usuario.nombre }).select(
        "-password -email -confirmado -createdAt -updatedAt -__v"
    );
    res.json(usuario);
}

const usuario = async (req, res) => {
    try {
        const user = await Usuario.findOne({ nombre: req.usuario.nombre })
            .select(" -moderador -password -confirmado  -createdAt -updatedAt -__v ");
        return res.send(user);
    } catch (e) {
        return res.status(400).json({ msg: "Error" });
    }
};

const traerUsuarios = async (req, res) => {
    //traigo todos los user y los mapeo para que solo me muestre el ID, Nombre, Imagen y Libros
    await Usuario.find({}).then((results) => {
        let userMapeado = results.map((el) => {
            return {
                id: el.id,
                name: el.nombre,
                image: el.image,
                books: el.books,
                moderador: el.moderador
            };
        });
        return res.json(userMapeado);
    });
};

const obtenerOrdersUsuarios = async (req, res) => {
    try {
      const orders = await Order.find().populate("books").populate("comprador")
      let response = orders
  
      res.json(response)
    } catch (error) {
      console.log(error)
    }
  }

const cambiarImage = async (req, res) => {
    const nombre = req.usuario.nombre;
    const formatos = ["png", "jpg", "webp", "gif"];
    if (
        !formatos.includes(
            req.files.image.name.split(".")[
            req.files.image.name.split(".").length - 1
            ]
        )
    ) {
        return res
            .status(400)
            .send({ msg: "Invalid image format (jpg, png, webp or gif)" });
    }
    try {
        if (req.files.image) {
            const user = await Usuario.findOne({ nombre });
            const response = await uploadImage(req.files.image.tempFilePath);
            await fs.remove(req.files.image.tempFilePath);

            const image = {
                url: response.secure_url,
                public_id: response.public_id,
            };

            user.image = image;
            await user.save();
            return res.json({ msg: "Image updated" });
        }
    } catch (e) {
        return res.status(400).json({ msg: "Error" });
    }
};

const deleteUsuario = async (req, res) => {  //admin
    try {
        const id = req.params.id
        const deletedUser = await Usuario.findOneAndDelete({ _id: id})
        res.json(deletedUser)
    } catch (error) {
        console.log(error)
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const deletedUser = await Usuario.findOneAndDelete({ _id: id})
        res.json(deletedUser)
    } catch (error) {
        console.log(error)
    }
}
const changeName = async (req, res) => {
    try {
        const id = req.params.id
        const nombre = req.body
        const editarNombre = await Usuario.findOneAndUpdate(
            { _id: id},
            nombre
            )
        res.json(editarNombre)
    } catch (error) {
        console.log(error)
    }
}
const getUsersList = async (req, res) => {
    // const {id} = req.body
    try {   
        // const user = await Usuario.findById({_id: id}).select(
        //     "-password -confirmado -token -createdAt -updatedAt -__v"
        //     );
        // console.log("usuario pa veeeeeer",user)

        // if (user.moderador) {
        //     // const users = await Usuario.findById(usuario._id)
        //     // //   const users = await Usuario.findByUsers(user._id)
        //        user ? res.status(200).json({ data: user }) : res.status(400).json({ error: 'no podes realizar esta acción' })
        //     } else {
        //        res.status(400).json({ error: 'No sos administrador' })
        //  }

    } catch (error) {
        console.log(error)    
    }
  }

const makeAdminAnUser = async (req, res) => {
    const id = req.body.id
    const moderador = req.body.moderador
    try {
        const usuario = await Usuario.findByIdAndUpdate(
            { _id: id},
            {moderador: moderador},
            {new: true}
        )

        if(!usuario){
            const error = new Error ("No se encontró el usuario.")
            return res.status(404).json({msg: error.message})
        }
        res.json(usuario)
    } catch (error) {
        console.log(error)
    }
}


export {
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
    googleLogin,
    deleteUsuario,
    getUsersList,
    deleteUser,
    changeName,
    makeAdminAnUser
};