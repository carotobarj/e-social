import mongoose from 'mongoose';

const orderSchema = mongoose.Schema(
  {
    comprador: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    books: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Books'
      },
      reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
  }
)

const OrderCreated = mongoose.model("Order", orderSchema);
export default OrderCreated;

