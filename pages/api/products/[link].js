import dbConnect from "../../../lib/mongodb";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();
    
    if (method === "GET") {
      const products = await Product.findById(query.link);
      res.status(StatusCodes.OK).json(products);
    }

    if (method === "PATCH") {
      const product = await Product.updateOne({ _id: query.id  });
      res.status(StatusCodes.CREATED).json(product);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
