import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please provide firstname"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "Please provide lastname"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: String,
    required: [true, "Please provide A Phone "],
  },
  country: {
    type: String,
    trim: true,
    required: [true, "Please provide country"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    trim: true,
    required: [true, "Please provide state"],
  },
  deliveryAddress: {
    type: String,
    trim: true,
    required: [true, "Please provide delivery address"],
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTExpire: {
    type: Date,
  },
});

//Mongoose document middleware for the "save" hook
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//Instance method to create JWT
UserSchema.methods.createJWT = async function () {
  const payload = { userId: this._id, isAdmin: this.isAdmin };

  const accessToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(process.env.JWT_LIFETIME)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));

  const refreshToken = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(process.env.JWT_REFRESH_LIFETIME)
    .sign(new TextEncoder().encode(process.env.JWT_REFRESH_SECRET));

  return { accessToken, refreshToken };
};

//Instance method to create JWT
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

UserSchema.methods.getResetPasswordToken = async function () {};

export default mongoose.models.User || mongoose.model("User", UserSchema);
