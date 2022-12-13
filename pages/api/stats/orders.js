import dbConnect from "../../../lib/mongodb";
import ProductPayment from "../../../models/ProductPayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import checkPermissions from "../../../utils/checkPermission";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import BadRequestError from "../../../errors/bad-request";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { email, search } = query;

      let queryObject = { email };

      if (search) {
        const stringSearchFields = ["productsData.name"];

        const query = {
          $or: [
            ...stringSearchFields.map((field) => ({
              [field]: new RegExp("^" + search, "i"),
            })),
          ],
        };
        queryObject = { ...queryObject, ...query };
      }

      // ADD BASED ON CONDITIONS
      // No AWAIT
      let result = ProductPayment.find(queryObject);

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      let orders = await result;

      const totalOrders = await ProductPayment.countDocuments(queryObject);

      const numOfPages = Math.ceil(totalOrders / limit);

      res.status(StatusCodes.OK).json({
        orders,
        totalOrders,
        numOfPages,
      });
    }

    if (method === "PUT") {
      const { id } = query;
      const { orderStatus } = req.body;

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const order = await ProductPayment.findById(id);

      if (!order) {
        throw new BadRequestError(" Invalid Credentials ");
      }

      const newOrder = await ProductPayment.findOneAndUpdate(
        { _id: id },
        { state: orderStatus },
        { new: true, runValidators: true }
      );
      res.status(StatusCodes.OK).json(newOrder);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
