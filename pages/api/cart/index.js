import dbConnect from "../../../lib/mongodb";
import Cart from "../../../models/Cart";
import Product from "../../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import { jwtVerify } from "jose";
import checkPermissions from "../../../utils/checkPermission";
import BadRequestError from "../../../errors/bad-request";
import cookie from "cookie";
import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      let cartRes;

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (!payload.isAdmin) {
        cartRes = await Cart.find({ createdBy: payload.userId });
      } else {
        cartRes = await Cart.find();
      }

      let totalItemsInCart = 0;
      let subTotal = 0;

      const cart = await Promise.all(
        cartRes.map(async (item) => {
          const productId = JSON.stringify(item.productId);
          const productDoc = await Product.findById(productId.slice(1, -1));

          if (productDoc) {
            totalItemsInCart += item.quantity || 0;
            subTotal += productDoc?.price * item.quantity || 0;
            return {
              productId: productId.slice(1, -1),
              _id: item._id,
              name: productDoc.name,
              image: productDoc.images[0],
              price: productDoc.price,
              actualPrice: productDoc.actualPrice,
              inStock: productDoc.inStock,
              link: productDoc.link,
              quantity: item.quantity,
            };
          } else {
            throw new UnAuthenticatedError("Invalid Product");
          }
        })
      );

      res
        .status(StatusCodes.OK)
        .json({ cart: cart || [], totalItemsInCart, subTotal });
    }

    if (method === "POST") {
      let responseCartItem;

      const secret = process.env.JWT_SECRET;
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      const newCart = {
        createdBy: payload.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
      };

      responseCartItem = await Cart.create(newCart);
      res.status(StatusCodes.CREATED).json(responseCartItem);
    }

    if (method === "PATCH") {
      let responseCartItem;
      let cartItem;

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const secret = process.env.JWT_SECRET;
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      cartItem = await Cart.findById(req.body.productId);

      if (!cartItem) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }
      checkPermissions(payload.userId, cartItem.createdBy);
      responseCartItem = await Cart.findOneAndUpdate(
        { _id: cartItem._id },
        { quantity: req.body.quantity },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(StatusCodes.OK).json(responseCartItem);
    }

    if (method === "DELETE") {
      const { cartId } = query;

      const secret = process.env.JWT_SECRET;
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      req.user = payload.userId;

      if (cartId) {
        const cartItem = await Cart.findOne({ _id: cartId });

        checkPermissions(req.user, cartItem.createdBy);

        await cartItem.remove();
        res.status(StatusCodes.OK).json({ msg: "Success: Cart Item Deleted" });
      } else {
        console.log(req.user, "req.user");
        const cartItems = await Cart.find({ createdBy: req.user });

        if (!cartItems) {
          throw new BadRequestError(`No Item in Cart`);
        }

        await Promise.all(
          cartItems.map(async (item) => await Cart.deleteOne({ _id: item._id }))
        );
        res.status(StatusCodes.OK).json({ msg: "Success: Cart Deleted" });
      }
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
