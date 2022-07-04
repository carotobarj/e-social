import mongoose from "mongoose";

const colectionSchema = mongoose.Schema(
    {
        creator: {
            type: String,
            trim: true,
            required: true,
        },
        name: {
            type: String,
            trim: true,
            unique: true,
            require: true,
        },
    },
    {
        timestamps: true,
    }
);

const Colection = mongoose.model("Coleccion", colectionSchema);
export default Colection;
