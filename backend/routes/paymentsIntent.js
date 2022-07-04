import express from 'express'
import { paymentIntent } from '../controllers/paymentControllers.js'
import { detailBook } from '../controllers/booksControllers.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router
    .route('/')
        .get(detailBook)
        .post(paymentIntent)
        // .post(checkAuth, paymentIntent)

export default router
