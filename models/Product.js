import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 200,
      required: [true, "Please provide a product name"],
    },
    category: {
      type: String,
      required: [true, "Please provide a product Category"],
      maxlength: 100,
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
      unique: true,
      required: [true, "Please provide a product link"],
    },
    inStock: {
      type: Boolean,
      defualt: true,
    },
    specification: {
      type: [
        {
          title: {
            type: String,
            required: [true, "Please provide a specification title"],
          },
          details: {
            type: String,
            required: [true, "Please provide a specification description"],
          },
        },
      ],
    },
    features: {
      type: String,
      required: [true, "Please provide features"],
    },
    benefits: {
      type: String,
      required: [true, "Please provide features"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
