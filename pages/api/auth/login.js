import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { serialize } from "cookie";

import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { google } = query;

      let user;

      if (google) {
        const { email } = req.body;

        user = await User.findOne({ email });

        if (!user) {
          throw new Error("No User with this Email");
        }

      } else {
        const { email, password } = req.body;

        if (!email || !password) {
          throw new UnAuthenticatedError("Please Provide all Values");
        }

        user = await User.findOne({ email }).select("+password");
        if (!user) {
          throw new UnAuthenticatedError("Invalid Credentials");
        }
  
        const isPasswordCorrect = await user.comparePassword(password);
  
        if (!isPasswordCorrect) {
          throw new UnAuthenticatedError("Invalid Credentials");
        }
  
      }
      
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

      res.setHeader("Set-Cookie", [serializedToken, serializedRefreshToken]);
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
