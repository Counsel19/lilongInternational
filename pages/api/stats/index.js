import Product from "../../../models/Product";
import ProductPayment from "../../../models/ProductPayment";
import AffiliatePayment from "../../../models/AffiliatePayment";
import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import moment from "moment";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const customersList = await User.find();
      const orderList = await ProductPayment.find();
      const affiliateList = await AffiliatePayment.find();

      const revenue = orderList.reduce((prev, next) => prev + next.amount, 0);

      const cardsInfo = [
        {
          name: "Customers",
          number: customersList.length,
        },
        {
          name: "Orders",
          number: orderList.length,
        },
        {
          name: "Affiliates",
          number: affiliateList.length,
        },
        {
          name: "Revenue",
          number: revenue / 100,
        },
      ];

      let monthlyFinancialRep = await ProductPayment.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            numOfSales: { $sum: 1 },
            revenueAmt: { $sum: "$amount" },
          },
        },

        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]);

      monthlyFinancialRep = monthlyFinancialRep
        .map((item) => {
          const {
            _id: { year, month },
            numOfSales,
            revenueAmt,
          } = item;
          const date = moment()
            .month(month - 1)
            .year(year)
            .format("MMM Y");

          return { date, numOfSales, revenueAmt: revenueAmt / 100 };
        })
        .reverse();

      let ordersState = await ProductPayment.aggregate([
        {
          $group: {
            _id: {
              state: "$state",
            },
            count: { $sum: 1 },
          },
        },
      ]);

      ordersState = ordersState.map((item) => {
        const {
          _id: { state },
          count,
        } = item;
        return {
          state,
          count,
        };
      });
      let today = moment();
      const todayOrders = await ProductPayment.find({
        createdAt: { $gte: today.startOf("date").toString() },
      });

      const todayRevenue = todayOrders.reduce(
        (prev, next) => prev + next.amount / 100,
        0
      );
      const todayPercentRevenue = (todayRevenue / revenue) * 100;
      res.status(StatusCodes.OK).json({
        cardsInfo,
        monthlyFinancialRep,
        ordersState,
        todayRevenue,
        todayPercentRevenue: Number(todayPercentRevenue.toFixed(2)),
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
