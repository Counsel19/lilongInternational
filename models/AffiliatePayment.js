import mongoose from "mongoose";

const AffiliatePaymentSchema = new mongoose.Schema(
  {
    plan: {
      type: String,
      required: true,
    },
    regStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    accountNumber: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },

    email: {
      type: String,
      required: true,
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
    status: {
      type: String,
      required: true,
    },
    cardType: {
      type: String,
    },
    paymentBank: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.AffiliatePayment ||
  mongoose.model("AffiliatePayment", AffiliatePaymentSchema);
