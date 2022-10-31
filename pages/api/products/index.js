import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
   await  dbConnect();

    if (method === "GET") {
      let allProductsDetails = [];
      if (query.category) {
        allProductsDetails = await Product.find({ category: query.category });
      }

      if (query.price) {
        allProductsDetails = await Product.find({ price: query.category });
      } else {
        allProductsDetails = await Product.find();
      }
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
        };
      });

      res.status(StatusCodes.OK).json(products);
    }

    if (method === "POST") {
      const product = await Product.create(req.body);
      res.status(StatusCodes.CREATED).json(product);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
