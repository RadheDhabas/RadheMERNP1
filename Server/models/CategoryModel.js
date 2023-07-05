import mongoose from "mongoose";

const {Schema} = mongoose;
const CategorySchema = new Schema({
    name: {
        type: String,
        // required: true,
        // unique: true,
      },
      slug: {
        type: String,
        lowercase: true,
      },
})

const Category = mongoose.model('Category',CategorySchema)
export default Category