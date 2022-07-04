import getBookById from '../helpers/getBookById.js'
import Book from '../models/Book.js'

const projection = { createdAt: 0, updatedAt: 0, __v: 0, avaliable: 0 }

const obtenerBooks = async (req, res) => {
  let response
  try {
    // booksByQuery
    if (req.query.name) {
      const { name } = req.query
      const bookQuery = await Book.find({ 'nombre': { $regex: `^.*${name}.*`, $options: 'i' } }, { projection }).populate('creador')
      response = bookQuery
      // booksByCategory
    } else {
      const { category } = req.query
      if (category) {
        const categoryResponse = await Book.find({ category: { $in: [`${category}`] } }, { projection }).populate('creador')
        response = categoryResponse
      } else {
        const books = await Book.find({}, { projection }).populate('order').populate('creador')
        response = books
      }
    }
    res.json(response)
  } catch (error) {
    console.log(error, "🔴")
  }
}

const nuevoBook = async (req, res) => {
  const book = new Book(req.body)
  book.creador = req.usuario._id

  try {
    const bookAlmacenado = await book.save()
    res.status(201).json(bookAlmacenado)
  } catch (error) {
    console.log(error)
  }
}

const detailBook = async (req, res) => {
  try {
    const { id } = req.params || req.body
    if (id?.length === 24) {
      const book = await Book.findById(id, projection)
      if (book === null) {
        res.json({ msgError: "el libro no existe" }).status(404)
      } else {
        res.json(book)
      }
    } else {
      res.json({ msgError: "ID debe tener 24 caracteres." }).status(400)
    }

  } catch (error) {
    console.log(error)
  }
}

const editarBook = async (req, res) => {
  const id = req.params.id
  const data = req.body

  try {
    const bookEditado = await Book.findByIdAndUpdate(
      { _id: id },
      data,
      { new: true }
    )

    if (!bookEditado) {
      const error = new Error("No encontrado el libro");
      return res.status(404).json({ msg: error.message });
    }

    res.json(bookEditado)

  } catch (error) {
    console.log(error)
  }
}

const eliminarBook = async (req, res) => {
  try {
    const id = req.params.id
    const bookId = await Book.findOneAndDelete({ _id: id })
    res.json({ bookId })
  } catch (error) {
    console.log(error)
  }
}

export {
  obtenerBooks,
  detailBook,
  nuevoBook,
  editarBook,
  eliminarBook,
  projection
}
