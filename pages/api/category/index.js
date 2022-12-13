import dbConnect from "../../../lib/mongodb";
import Category from "../../../models/Category";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import BadRequestError from "../../../errors/bad-request";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    }

    if (method === "POST") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const doesCategoryExist = await Category.find({ name: req.body.name });
      if (doesCategoryExist) {
        throw new BadRequestError(" Category Already Exists");
      }
      const category = await Category.create(req.body);
      res.status(StatusCodes.CREATED).json(category);
    }
    if (method === "DELETE") {
      const { id } = query;
      const category = await Category.findById(id);

      if (!category) {
        throw new BadRequestError(" Link Does not Exist ");
      }

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      await Category.findOneAndDelete({ id: id });
      res.status(StatusCodes.OK).json({ msg: "Category Deleted Successfully" });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
