import dbConnect from "../../../lib/mongodb";
import AffiliatePayment from "../../../models/AffiliatePayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
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

      const { sort, search, plan, time, regStatus } = query;

      let queryObject = {};

      // ADD BASED ON CONDITIONS
      if (plan && plan !== "all") {
        queryObject.plan = plan;
      }
      if (regStatus && regStatus !== "all") {
        queryObject.regStatus = regStatus;
      }

      if (search) {
        const stringSearchFields = [
          "firstname",
          "lastname",
          "accountNumber",
          "country",
          "state",
          "paymentBank",
          "email",
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
      let result = AffiliatePayment.find(queryObject);

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

      let affiliateUsers = await result;

      const totalAffiliateUsers = await AffiliatePayment.countDocuments(
        queryObject
      );
      const numOfPages = Math.ceil(totalAffiliateUsers / limit);

      res.status(StatusCodes.OK).json({
        affiliateUsers,
        totalAffiliateUsers,
        numOfPages,
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
