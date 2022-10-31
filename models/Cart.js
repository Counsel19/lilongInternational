import mongoose from "mongoose";

const CartSchema = mongoose.Schema(
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

export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);
