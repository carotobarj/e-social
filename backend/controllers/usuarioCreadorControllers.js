import Book from '../models/Book.js';
import Usuario from '../models/Usuario.js'


const obtenerLibrosUsuarios = async (req, res) => { 

  const { id } = req.params
  try { 
    const booksUsuarios = await Book.find({ creador: id }).populate("creador")
    let response = booksUsuarios
    
    res.send(response)
  } catch (error) {
    console.log(error)
  }
}

const obtenerUsuarioPorId = async (req, res) => {
  const {id} = req.params
  try {
      const user = await Usuario.findById(id)
          .select(" -moderador -password -confirmado  -createdAt -updatedAt -__v ");
      return res.send(user);
  } catch (e) {
      return res.status(400).json({ msg: "Error" });
  }
};




export {
  obtenerLibrosUsuarios,
  obtenerUsuarioPorId
}
