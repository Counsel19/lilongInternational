import mongoose from "mongoose";

const SavedSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: [true, "Please provide a product name"],
    },
    category: {
      type: String,
      required: [true, "Please provide a product Category"],
      maxlength: 50,
    },
    price: {
      type: Number,
      required: [true, "Please provide a product Price"],
    },
    actualPrice: {
      type: Number,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      required: [true, "Please provide a provide product images"],
    },
    link: {
      type: String,
      required: [true, "Please provide a product link"],
    },
    inStock: {
      type: Boolean,
      defualt: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a  user"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Saved ||
  mongoose.model("Saved", SavedSchema);
