import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import cookie from "cookie";
import { jwtVerify } from "jose";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import BadRequestError from "../../../errors/bad-request";
import checkPermissions from "../../../utils/checkPermission";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid access token");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      const user = await User.findOne({ _id: payload.userId }).select(
        "+password"
      );

      if (!user) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      res.status(StatusCodes.OK).json({ user });
    }

    if (method === "PUT") {
      const secret = process.env.JWT_SECRET;
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      const actualUser = await User.findOne({ _id: req.body._id });

      if (!actualUser) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      checkPermissions(payload.userId, actualUser._id);

      const { firstname, lastname, email, state, country, deliveryAddress } =
        req.body;

      if (
        !firstname ||
        !lastname ||
        !email ||
        !state ||
        !country ||
        !deliveryAddress
      ) {
        throw new BadRequestError("Enter all Fields");
      }
      const user = await User.findOneAndUpdate(
        { _id: req.body._id },
        { firstname, lastname, email, state, country, deliveryAddress },
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(StatusCodes.OK).json(user);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
