import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { serialize } from "cookie"

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Please Provide all Values");
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        throw new Error("Invalid Credentials");
      }

      const isPasswordCorrect = await user.comparePassword(password);

      if (!isPasswordCorrect) {
        throw new Error("Invalid Credentials");
      }
      const token = await user.createJWT();
      user.password = undefined;

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        maxAge: process.env.JWT_MAX_AGE,
        path: "/"
      })

      res.setHeader("Set-Cookie", serialized);
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
