import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema(
    {
        comprador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true
          },
        orden: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        vendedor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
            required: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        score: {
            type: Number,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const reviewCreated = mongoose.model("Review", reviewSchema);
export default reviewCreated;
