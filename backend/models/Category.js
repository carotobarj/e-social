import mongoose from "mongoose";

const categoriesSchema = mongoose.Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CategoriesCreated = mongoose.model("Category", categoriesSchema);
export default CategoriesCreated;
