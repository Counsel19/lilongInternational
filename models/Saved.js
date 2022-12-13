import mongoose from "mongoose";

const SavedSchema = mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Please Specify a product"],
    },
    quantity: {
      type: Number,
      required: [true, "Please Provide a quantity"],
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
