import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { serialize } from "cookie";
import { jwtVerify } from "jose";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { refreshToken: refreshJwt } = cookie.parse(
        req.headers?.cookie || ""
      );
      if (!refreshJwt) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        refreshJwt,
        new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)
      );
      const user = await User.findOne({ _id: payload.userId }).select(
        "+password"
      );

      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
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

      res.setHeader("Set-Cookie", serializedToken, serializedRefreshToken);
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
