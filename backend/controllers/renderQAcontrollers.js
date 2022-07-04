import Book from "../models/Book.js"
import Answer from "../models/modelsforquestions/Answer.js"
import Question from "../models/modelsforquestions/Question.js"
import Usuario from "../models/Usuario.js"

const postQuestion = async (req, res) => {
  try {
    //id del usuario que pregunta
    const { id } = req.params
    //idBook es el id del libro al que VAMOS  dejar la pregunta. 
    const user = await Usuario.findById(id)

    const newQuestion = new Question({
      idComprador: user._id,
      mensaje: req.body.mensaje,
      book: req.body.book,
      idVendedor: req.body.idVendedor
    })
    const question = await newQuestion.save()
    res.status(201).json(question);
  } catch (error) {
    console.log(error)
  }
}

const postAnswer = async (req, res) => {
  //id del usuario que responde
  const { id } = req.params

  const user = await Question.findById(id)
  // const book = await Book.findById(idBook)

  const newAnswer = await new Answer({
    mensaje: req.body.mensaje,
    book: req.body.book,
    question: user._id,
  })
  newAnswer.idVendedor = req.usuario._id
  try {

    const answer = await newAnswer.save()
    user.answers = user.answers.concat(answer._id)
    await user.save()
    res.status(201).json(answer);
  } catch (error) {
    console.log(error)
  }
}
//-----------------------------------------
//trae todas las respuestas para admin
const getQA = async (req, res) => {
  try {

    const QA = await Answer.find().populate("question")
    let response = QA

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}
//-----------------------------------------
//trae todas las preguntas para admin
const getQuestion = async (req, res) => {
  try {
    const QA = await Question.find()
    let response = QA

    res.json(response)
  } catch (error) {
    console.log(error)
  }
}
//-----------------------------------------
//trae una respuesta por id
const QAIdBook = async (req, res) => {
  const { id } = req.params
  try {
    if (id?.length === 24) {
      const qaId = await Question.find({ book: id }).populate("answers")
      if (qaId === null) {
        res.json({ msgError: "la QA no existen" }).status(404)
      } else {
        res.json(qaId)
      }
    } else {
      res.json({ msgError: "ID debe tener 24 caracteres." }).status(400)
    }

  } catch (error) {
    console.log(error)
  }


}
//elimina respuesta para admin
const eliminarAnswer = async (req, res) => {
  try {
    const id = req.params.id
    const QAId = await Answer.findOneAndDelete({ _id: id })
    res.json({ QAId })
  } catch (error) {
    console.log(error)
  }
}
//elimina pregunta para admin
const eliminarQuestion = async (req, res) => {
  try {
    const id = req.params.id
    const QAId = await Question.findOneAndDelete({ _id: id })
    res.json({ QAId })
  } catch (error) {
    console.log(error)
  }
}
//-----------------------------------------
//trae todas las preguntas como vendedor
const getQuestionsVendedor = async (req, res) => {
  try {
    const id = req.params.id
    const allQuestions = await Question.find({ idVendedor: id }).populate("idComprador").populate("book").populate("answers")
    res.send(allQuestions)
  } catch (error) {
    console.log(error)
  }
}

//trae todas las preguntas como comprador y las rspuestas(si es que respondieron)
const getQuestionsComprador = async (req, res) => {
  try {
    const id = req.params.id
    const allQuestions = await Question.find({ idComprador: id }).populate("idComprador").populate("book").populate("answers").populate("idVendedor")
    res.send(allQuestions)
  } catch (error) {
    console.log(error)
  }
}
//trae todas las preguntas como vendedor
const getAnswersVendedor = async (req, res) => {
  try {
    const id = req.params.id
    const allQuestions = await Answer.find({ idVendedor: id }).populate("book").populate("idVendedor").populate("questions").populate("idComprador")
    res.send(allQuestions)
  } catch (error) {
    console.log(error)
  }
}


export {
  postQuestion,
  postAnswer,
  getQA,
  getQuestion,
  QAIdBook,
  eliminarAnswer,
  getQuestionsVendedor,
  getAnswersVendedor,
  getQuestionsComprador,
  eliminarQuestion
}

