import dbConnect from "../../../lib/mongodb";
import Category from "../../../models/Category";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const categories = await Category.find();
      res.status(StatusCodes.OK).json(categories);
    }

    if (method === "POST") {
      const category = await Category.create(req.body);
      res.status(StatusCodes.CREATED).json(category);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
