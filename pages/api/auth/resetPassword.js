import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { jwtVerify } from "jose";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import UnAuthorizedError from "../../../errors/unauthorized";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { userId, token } = query;

      if (!userId || !token) {
        throw new UnAuthorizedError("Not Allowed");
      }

      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const secret = process.env.JWT_SECRET + user.password;

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
      );

      res.writeHead(301, {
        Location: `http://localhost:3000/reset-password/?userId=${userId}&token=${token}`,
      });
      res.end();
    }

    if (method === "POST") {
      const { userId, token } = query;
      const { password } = req.body;
     
      if (!userId || !token) {
        throw new UnAuthorizedError("you are not Authorized!");
      }

      const user = await User.findById(userId).select("+password");

      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const secret = process.env.JWT_SECRET + user.password;

      const { payload } = await jwtVerify(
        token,
        new TextEncoder().encode(secret)
      );

      if(payload.userId === userId){
        throw new UnAuthorizedError("you are not Authorized!");
      }
 
      const salt = await bcrypt.genSalt(10);
      const newHash = await bcrypt.hash(password, salt);
     

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
