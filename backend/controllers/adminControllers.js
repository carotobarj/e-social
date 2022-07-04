import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";





const admin = async (req, res) => {

    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
        const error = new Error("Username does not exist");
        return res.status(404).json({ msg: error.message });
    }
    
    if (!usuario.moderador) {
        const error = new Error("Your account has not been admin");
        return res.status(403).json({ msg: error.message });
    }

}


export {
    admin,
}