import mongoose from 'mongoose'

const booksSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      trim: true,
      required: true
    },
    autor: {
      type: String,
      trim: true,
      required: true
    },
    idioma: {
      type: String,
      trim: true,
      required: true
    },
    editorial: {
      type: String,
      trim: true
    },
    edicion: {
      type: Number,
      trim: true
    },
    tapa: {
      type: String,
      trim: true
    },
    publicado: {
      type: Number,
    },
    cant_pags: {
      type: Number,
    },
    colection: {
      type: mongoose.Schema.Types.String,
      ref: 'Coleccion'
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      trim: true,
      required: true
    },
    ilustrado: {
      type: Boolean,
      default: false,
    },
    category: [
      {
        type: mongoose.Schema.Types.String,
        required: true,
        ref: 'Usuario'
      },
    ],
    creador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    userLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      }
    ],
    avaliable: {
      type: Boolean,
      default: true,
    },
    order: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
      }
    ]
  },
  {
    timestamps: true,
  }
)

const BooksCreated = mongoose.model("Books", booksSchema)
export default BooksCreated
