import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import cookie from "cookie";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const { accessToken, refreshToken } = cookie.parse(
      req.headers?.cookie || ""
    );

    const serializedToken = cookie.serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      maxAge: 1,
      path: "/",
    });
    const serializedRefreshToken = cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      maxAge: 1,
      path: "/",
    });

    res.setHeader("Set-Cookie", [serializedToken, serializedRefreshToken]);

    res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
  } catch (error) {
    HandleError(error, req, res);
  }
}
