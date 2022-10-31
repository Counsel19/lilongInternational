import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { serialize } from "cookie";

export default async function handler(req, res) {
  try {
    await dbConnect();

    const serialized = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV != "development",
      maxAge: 1,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
  } catch (error) {
    HandleError(error, req, res);
  }
}
