import Order from "../models/Order.js"
import Book from '../models/Book.js'


const obtenerOrders = async (req, res) => {
  try {
    const { id } = req.params
    const orders = await Order.find({ comprador: id }).populate("books")
    let response = orders

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

const nuevaOrder = async (req, res) => {
  
  const{bookId} = req.body

  const book = await Book.findById(bookId)

  const order = new Order({

    books: book._id
  })
  order.comprador = req.usuario._id
  try {
    const orderAlmacenada = await order.save()
    book.order = book.order.concat(orderAlmacenada._id)
    await book.save()
    res.status(201).json(orderAlmacenada);
  } catch (error) {
    console.log(error)
  }
}

const eliminarOrder = async (req, res) => {
  try {
    const id = req.params.id
    const orderId = await Order.findOneAndDelete({ _id: id })
    res.json({ orderId })
  } catch (error) {
    console.log(error)
  }
}

const detailOrder = async (req, res) => {
  try {
    const { id } = req.params
    const order = await Order.findById({ _id: id }).populate("books").populate("comprador")

    if (!order) {
      const error = new Error('No se encontró la orden')
      return res.status(404).json({ msg: error.message })
    }

    res.json(order)
  } catch (error) {
    console.log(error)
  }
}

export {
  nuevaOrder,
  obtenerOrders,
  eliminarOrder,
  detailOrder
}