import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import moment from "moment";
import ProductPayment from "../../../models/ProductPayment";
import Product from "../../../models/Product";
import AffiliatePayment from "../../../models/AffiliatePayment";
import { ConstructionOutlined } from "@mui/icons-material";

const organiseReport = (monthlyReport) => {
  monthlyReport = monthlyReport
    .map((item) => {
      const {
        _id: { year, month },
        totalNum,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");

      return { date, totalNum };
    })
    .reverse();

  return monthlyReport;
};

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

      let usersByLocation = await User.aggregate([
        {
          $group: {
            _id: { state: "$state", country: "$country" },
            count: { $sum: 1 },
          },
        },
      ]);

      usersByLocation = usersByLocation.map((item) => {
        const {
          _id: { state, country },
          count,
        } = item;
        return { state, country, count };
      });

      let allPurchase = await ProductPayment.find();

      const totalRevenue = allPurchase.reduce((prev, next) => {
        return prev + next.amount / 100;
      }, 0);

      let productsRevenue = {};
      allPurchase
        .flatMap((item) => {
          return item.productsData.map((details) => ({
            name: details.name,
            id: details.id,
            quantity: details.quantity,
            price: details.price,
          }));
        })
        .forEach(
          (item) =>
            (productsRevenue[item.id] = {
              id: item.id,
              name: item.name,
              quantity: item.quantity,
              compiledRev:
                productsRevenue[item.id]?.compiledRev +
                  item.quantity * item.price || item.quantity * item.price,
            })
        );

      let allPurchaseProducts = Object.values(productsRevenue).map((item) => {
        const percentageProductRev = (item.compiledRev / totalRevenue) * 100;
        return {
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          percentageProductRev: Number(percentageProductRev.toFixed(2)),
          productRevenue: item.compiledRev,
        };
      });

      let bestSellingProducts = allPurchaseProducts
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 5);

      let monthlyPurchaseRep = await ProductPayment.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalNum: { $sum: 1 },
          },
        },

        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]);

      let monthlyAffiliateRep = await AffiliatePayment.aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            totalNum: { $sum: 1 },
          },
        },

        { $sort: { "_id.year": -1, "_id.month": -1 } },
        { $limit: 6 },
      ]);

      monthlyPurchaseRep = organiseReport(monthlyPurchaseRep);
      monthlyAffiliateRep = organiseReport(monthlyAffiliateRep);

      let purchaseAffiliateMonthlyRep = [...monthlyPurchaseRep];

      monthlyAffiliateRep.forEach((affiliateItem) => {
        const index = monthlyPurchaseRep
          .map((purchaseItem) => purchaseItem.date)
          .indexOf(affiliateItem.date);

        if (index >= 0) {
          purchaseAffiliateMonthlyRep[index] = {
            date: affiliateItem.date,
            totalAffiliate: affiliateItem.totalNum,
            totalPurchase: monthlyPurchaseRep[index].totalNum,
          };
        }
      });

      res.status(StatusCodes.OK).json({
        usersByLocation,
        bestSellingProducts,
        monthlyPurchaseRep,
        purchaseAffiliateMonthlyRep,
      });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
