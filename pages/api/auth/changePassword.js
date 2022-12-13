import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { jwtVerify } from "jose";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import UnAuthorizedError from "../../../errors/unauthorized";
import bcrypt from "bcryptjs";
import BadRequestError from "../../../errors/bad-request";
import cookie from "cookie";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { userId } = query;
      const { newPassword, currentPassword } = req.body;
      console.log(newPassword, "newPassword");
      if (!userId) {
        throw new UnAuthorizedError("Please provide user identity");
      }

      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const secret = process.env.JWT_SECRET;
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );
      if (payload.userId !== userId) {
        throw new UnAuthorizedError("you are not Authorized!");
      }

      const isPasswordCorrect = user.comparePassword(currentPassword);

      if (!isPasswordCorrect) {
        throw new BadRequestError("Wrong Password!");
      }

      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(newPassword, salt);

      await User.findByIdAndUpdate(
        userId,
        { password: newHash },
        {
          new: true,
        }
      );

      res.status(StatusCodes.OK).json({ msg: "Password Reset Successfull" });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
