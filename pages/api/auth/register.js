import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { serialize } from "cookie"
import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { firstname, lastname, email, password } = req.body;

      if (!firstname || !lastname || !password || !email) {
        throw new UnAuthenticatedError("Please provide all fields");
      }

      const emailAlreadyExist = await User.findOne({ email });

      if (emailAlreadyExist) {
        throw new UnAuthenticatedError("Email Already in use");
      }

      const user = await User.create(req.body);

      const { accessToken, refreshToken } = await user.createJWT();
      user.password = undefined;

      const serializedToken = serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        maxAge: process.env.JWT_MAX_AGE,
        path: "/",
      });
      const serializedRefreshToken = serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV != "development",
        maxAge: 2592000,
        path: "/",
      });

      res.setHeader("Set-Cookie", serializedToken, serializedRefreshToken);
    

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
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
