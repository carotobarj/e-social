import Category from '../models/Category.js'
import { projection } from './booksControllers.js'

const getCategory = async (req, res) => {
  const categories = await Category.find(null, projection)
  const mappedCategories = categories.map(e => e.nombre).sort((a, b) => a.localeCompare(b))
  res.json(mappedCategories)
}

const postCategory = async (req, res) => {
  const category = new Category(req.body)
  category.creador = req.usuario._id

  try {
    const categoryAlmacenado = await category.save()
    res.json(categoryAlmacenado)
  } catch (error) {
    console.log(error)
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { nombre } = req.body
    const categoryID = await Category.findOneAndDelete({ nombre })
    res.json({ categoryID })
  } catch (error) {
    console.log(error)
  }
}

export {
  postCategory,
  getCategory,
  deleteCategory
}