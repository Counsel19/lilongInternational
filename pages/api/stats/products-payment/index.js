import dbConnect from "../../../../lib/mongodb";
import ProductPayment from "../../../../models/ProductPayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../../utils";
import checkAdminPermissions from "../../../../utils/checkIsAdmin";
import cookie from "cookie";
import UnAuthenticatedError from "../../../../errors/unauthenticated";
import moment from "moment";

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

      const { sort, search, state, time } = query;

      let queryObject = {};

      // ADD BASED ON CONDITIONS
      if (state && state !== "all") {
        queryObject.state = state;
      }

      if (search) {
        const stringSearchFields = ["fullname", "email"];

        const query = {
          $or: [
            ...stringSearchFields.map((field) => ({
              [field]: new RegExp("^" + search, "i"),
            })),
          ],
        };
        queryObject = { ...queryObject, ...query };
      }

      let today = moment();

      if (time === "today") {
        queryObject.createdAt = { $gte: today.startOf("date").toString() };
      }
      if (time === "this week") {
        queryObject.createdAt = {
          $gte: today.startOf("week").toString(),
          $lte: today.endOf("week").toString(),
        };
      }

      if (time === "this month") {
        queryObject.createdAt = {
          $gte: today.startOf("month").toString(),
          $lte: today.endOf("month").toString(),
        };
      }
      if (time === "this year") {
        queryObject.createdAt = {
          $gte: today.startOf("year").toString(),
          $lte: today.endOf("year").toString(),
        };
      }
      
      // No AWAIT
      let result = ProductPayment.find(queryObject);

      // CHAIN CONNDITIONS
      if (sort === "a-z") {
        result = result.sort("fullname");
      }
      if (sort === "latest") {
        result = result.sort("-createdAt");
      }
      if (sort === "oldest") {
        result = result.sort("createdAt");
      }
      if (sort === "z-a") {
        result = result.sort("-fullname");
      }
  
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);

      let productsPayment = await result;

      productsPayment = productsPayment.map((product) => ({
        ...product._doc,
        amount: product.amount / 100,
      }));
      const totalproductsPayment = await ProductPayment.countDocuments(
        queryObject
      );
      const numOfPages = Math.ceil(totalproductsPayment / limit);

      res.status(StatusCodes.OK).json({
        productsPayment,
        totalproductsPayment,
        numOfPages,
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
