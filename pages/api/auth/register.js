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
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !password || !email) {
        throw new Error("Please provide all fields");
      }

      const emailAlreadyExist = await User.findOne({ email });

      if (emailAlreadyExist) {
        throw new Error("Email Already in use");
      }

      const user = await User.create(req.body);

      const token = user.createJWT();

      const serialized = serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        maxAge: process.env.JWT_MAX_AGE,
        path: "/"
      })

      res.setHeader("Set-Cookie", serialized);

      res.status(StatusCodes.CREATED).json({
        user: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          country: user.country,
          state: user.state,
          phone: user.phone,
          deliveryAddress: user.deliveryAddress,
        },
        token,
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
