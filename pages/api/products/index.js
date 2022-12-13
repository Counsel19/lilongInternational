import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import BadRequestError from "../../../errors/bad-request";
import checkAdminPermissions from "../../../utils/checkIsAdmin";
import ProductPayment from "../../../models/ProductPayment";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      const { search, price, category, instock, sort } = query;
      let queryObject = {};
  
      if (category && category !== "all") {
        queryObject.category = category;
      }

      if (instock && instock !== "all") {
        if (instock === "in stock") {
          queryObject.inStock = true;
        }
        if (instock === "out of Stock") {
          queryObject.inStock = false;
        }
      }

      if (price === "less than 2k") {
        queryObject.price = { $lte: 2000 };
      }
      if (price === "2k - 100k") {
        queryObject.price = { $gte: 2000, $lte: 100000 };
      }
      if (price === "100k - 300k") {
        queryObject.price = { $gte: 100000, $lte: 300000 };
      }
      if (price === "300k - 500k") {
        queryObject.price = { $gte: 300000, $lte: 500000 };
      }

      if (price === "500k - 1000k") {
        queryObject.price = { $gte: 500000, $lte: 1000000 };
      }
      if (price === "Above 1000k") {
        queryObject.price = { $gte: 1000000 };
      }

      if (search) {
        const stringSearchFields = ["name", "features"];

        const query = {
          $or: [
            ...stringSearchFields.map((field) => ({
              [field]: new RegExp("^" + search, "i"),
            })),
          ],
        };
        queryObject = { ...queryObject, ...query };
      }

      let result = Product.find(queryObject);

      // CHAIN CONNDITIONS

      if (sort === "latest") {
        result = result.sort("-createdAt");
      }
      if (sort === "low-to-high") {
        result = result.sort("price");
      }
      if (sort === "high-to-low") {
        result = result.sort("-price");
      }

      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 8;
      const skip = (page - 1) * limit;

      result = result.skip(skip).limit(limit);
      const totalNumProducts = await Product.countDocuments(queryObject);
      const numOfPages = Math.ceil(totalNumProducts / limit);

      const allProductsDetails = await result;

      const products = allProductsDetails.map((item) => {
        return {
          _id: item._id,
          images: item.images,
          category: item.category,
          name: item.name,
          price: item.price,
          actualPrice: item.actualPrice,
          link: item.link,
          featured: item.featured,
          inStock: item.inStock,
        };
      });

      res
        .status(StatusCodes.OK)
        .json({ products, numOfPages, totalNumProducts });
    }

    if (method === "POST") {
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        console.log("invalid Credentials");
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      await checkAdminPermissions(accessToken);

      const {
        name,
        images,
        specification,
        category,
        price,
        actualPrice,
        features,
        benefits,
      } = req.body;
      if (
        !name ||
        !images ||
        !category ||
        !price ||
        !actualPrice ||
        !features ||
        !specification ||
        !benefits
      ) {
        throw new BadRequestError("Please Enter all Fields ");
      }
      const doesProductExist = await Product.find({ name });
      if (doesProductExist.length > 0) {
        throw new BadRequestError("Product already exists");
      }

      const product = await Product.create({
        ...req.body,
        images: JSON.parse(images),
        specification: JSON.parse(specification),
      });
      res.status(StatusCodes.CREATED).json(product);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
