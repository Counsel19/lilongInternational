import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import cookie from "cookie";
import { jwtVerify } from "jose";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import checkAdminPermissions from "../../../utils/checkIsAdmin";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");
      const { search } = query;
      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      let queryObject = {};
      if (search) {
        const stringSearchFields = [
          "firstname",
          "lastname",
          "email",
          "state",
          "country",
          "deliveryAddress",
        ];

        const query = {
          $or: [
            ...stringSearchFields.map((field) => ({
              [field]: new RegExp("^" + search, "i"),
            })),
          ],
        };
        queryObject = { ...queryObject, ...query };
      }

      let result = User.find(queryObject);

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 4;
      const skip = (page - 1) * limit;

      const users = await result.skip(skip).limit(limit);
      const totalUsers = await User.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalUsers / limit);

      res.status(StatusCodes.OK).json({ users, numOfPages, totalUsers });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
