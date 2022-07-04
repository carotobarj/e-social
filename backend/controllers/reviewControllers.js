import Review from "../models/Review.js"
import Order from "../models/Order.js"


const nuevaReview = async (req, res) => {

  const { id } = req.params
  const {vendedor} = req.body

  const user = await Order.findById(id)

  const newReview = await new Review({
    orden: id,
    vendedor,
    description: req.body.description,
    score: req.body.score
  })
  newReview.comprador = req.usuario._id
  try {
    const review = await newReview.save()
    user.reviews = user.reviews.concat(review._id)
    await user.save()
  
    res.status(201).json(review);
  } catch (error) {
    console.log(error)
  }
}

const obtenerReview = async (req, res) => {
  try {
    const { id } = req.params
    const review = await Review.find({ vendedor: id })
    let response = review

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}

const obtenerReviewAdmin = async (req, res) => {
  try {
    const review = await Review.find().populate('orden').populate('vendedor').populate('comprador')
    res.json(review)
  } catch (error) {
    console.log(error)
  }
}


export {
  nuevaReview,
  obtenerReview,
  obtenerReviewAdmin
}