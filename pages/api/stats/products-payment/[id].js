import dbConnect from "../../../../lib/mongodb";
import ProductPayment from "../../../../models/ProductPayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../../utils";
import checkAdminPermissions from "../../../../utils/checkIsAdmin";
import cookie from "cookie";
import UnAuthenticatedError from "../../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const productPayment = await ProductPayment.findById(query.id);

      res.status(StatusCodes.OK).json(productPayment);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
