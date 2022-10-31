import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import { jwtVerify } from "jose";
import checkPermissions from "../../../utils/checkPermissoin";
import BadRequestError from "../../../errors/bad-request";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      let cartRes;
      if (query.id) {
        cartRes = await Cart.findById(query.id);
      } else {
        cartRes = await Cart.find();
      }

      let totalItemsInCart = 0;
      let subTotal = 0;
      const cart = await Promise.all(
        cartRes.map(async (item) => {
          const productId = JSON.stringify(item.productId);
          const productDoc = await Product.findById(productId.slice(1, -1));
          totalItemsInCart += item.quantity;
          subTotal += productDoc.price * item.quantity;
          return {
            _id: item._id,
            name: productDoc.name,
            image: productDoc.images[0],
            price: productDoc.price,
            actualPrice: productDoc.actualPrice,
            inStock: productDoc.inStock,
            quantity: item.quantity,
          };
        })
      );

      res.status(StatusCodes.OK).json({ cart, totalItemsInCart, subTotal });
    }

    if (method === "POST") {
      let responseCartItem;
      const cartItem = await Cart.findOne({ productId: req.body.productId });
      if (cartItem) {
        responseCartItem = await Cart.findOneAndUpdate(
          { _id: cartItem._id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );

        res.status(StatusCodes.OK).json(responseCartItem);
      } else {
        const secret = process.env.JWT_SECRET;
        const jwt = req.cookies.token;

        const { payload } = await jwtVerify(
          jwt,
          new TextEncoder().encode(secret)
        );

        req.body.createdBy = payload.userId;
        responseCartItem = await Cart.create(req.body);
        res.status(StatusCodes.CREATED).json(responseCartItem);
      }
    }

    if (method === "PATCH") {
      const cartId = query.id;
      let cartItems = await Cart.findOne({ _id: cartId });

      if (!cartItems) {
        throw new Error(`No job with Id: ${cartId}`);
      }

      //check permissions
      // checkPermissions(req.user, job.createdBy);

      cartItems = await Cart.findOneAndUpdate({ _id: cartId }, req.body, {
        new: true,
        runValidators: true,
      });
      res.status(StatusCodes.OK).json(cartItems);
    }

    if (method === "DELETE") {
      const { id: cartId } = query;

      const cartItem = await Cart.findOne({ _id: cartId });

      if (!cartItem) {
        throw new BadRequestError(`No cart with Id: ${cartId}`);
      }

      const secret = process.env.JWT_SECRET;
      const jwt = req.cookies.token;

      const { payload } = await jwtVerify(
        jwt,
        new TextEncoder().encode(secret)
      );

      req.user = payload.userId;

      checkPermissions(req.user, cartItem.createdBy);

      await cartItem.remove();
      res.status(StatusCodes.OK).json({ msg: "Success: Cart Deleted" });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
