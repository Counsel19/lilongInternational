import mongoose from "mongoose";

const ProductPaymentSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    productsData: {
      type: [
        {
          id: {
            type: String,
          },
          quantity: {
            type: Number,
          },
          price: {
            type: Number,
          },
          image: {
            type: String,
          },
          name: {
            type: String,
          },
        },
      ],
      required: [true, "Please provide a  product"],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    bank: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
    transactionId: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
      enum: ["processing", "dispatched", "delivered"],
      default: "processing",
    },
    status: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
    },
    deliveryAddress: {
      type: String,
      required: [true, "Please provide a delivery address"],
    },
    countryCode: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.ProductPayment ||
  mongoose.model("ProductPayment", ProductPaymentSchema);
