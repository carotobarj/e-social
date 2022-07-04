import express from 'express'
import {
    deleteCategory,
    getCategory,
    postCategory
} from '../controllers/categoriesControllers.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
    .route('/')
    .get(getCategory)
    .post(checkAuth, postCategory)
    .delete(checkAuth, deleteCategory)

export default router