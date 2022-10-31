import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a Category name"],
  },
  image: {
    type: String,
  },
  link: {
    type: String,
    required: [true, "please provide a Category slug"],
  },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
