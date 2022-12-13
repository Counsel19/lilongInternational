import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const product = await Product.findById(query.id);
      
      res.status(StatusCodes.OK).json(product);
    }

    if (method === "PUT") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { _id, images, specification, ...editedProduct } = req.body;

      await checkAdminPermissions(accessToken);

      const product = await Product.updateOne(
        { _id: query.id },
        {
          images: JSON.parse(images),
          specification: JSON.parse(specification),
          ...editedProduct,
        }
      );
      res.status(StatusCodes.CREATED).json(product);
    }
    if (method === "DELETE") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      await Product.findOneAndDelete({ _id: query.id });
      res
        .status(StatusCodes.CREATED)
        .json({ msg: "Product Deleted Successfully" });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
