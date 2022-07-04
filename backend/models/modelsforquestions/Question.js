import mongoose from 'mongoose';

const questionSchema = mongoose.Schema(
  {
    idComprador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    mensaje: {
        type: String,
        required: true,
    },
    book: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
      },
    idVendedor: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      },
      answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Answer'
        }
    ],
  }
)

const QuestionModel = mongoose.model("Question", questionSchema);
export default QuestionModel;

