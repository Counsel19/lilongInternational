import dbConnect from "../../lib/mongodb";
import Saved from "../../models/Saved";
import Product from "../../models/Product";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../utils";
import { jwtVerify } from "jose";
import checkPermissions from "../../utils/checkPermission";
import BadRequestError from "../../errors/bad-request";
import cookie from "cookie";
import UnAuthenticatedError from "../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "GET") {
      let savedRes;

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );

      if (!payload.isAdmin) {
        savedRes = await Saved.find({ createdBy: payload.userId });
      } else {
        savedRes = await Saved.find();
      }

      let totalItemsInSaved = 0;

      const saved = await Promise.all(
        savedRes.map(async (item) => {
          const productId = JSON.stringify(item.productId);
          const productDoc = await Product.findById(productId.slice(1, -1));

          if (productDoc) {
            totalItemsInSaved += item.quantity || 0;

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
        .json({ saved: saved || [], totalItemsInSaved });
    }

    if (method === "POST") {
      let responseSavedItem;

      const secret = process.env.JWT_SECRET;
      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      const newSaved = {
        createdBy: payload.userId,
        productId: req.body.productId,
        quantity: req.body.quantity,
      };

      responseSavedItem = await Saved.create(newSaved);
      res.status(StatusCodes.CREATED).json(responseSavedItem);
    }

    if (method === "PATCH") {
      let responseSavedItem;
      let savedItem;

      const { accessToken } = cookie.parse(req.headers?.cookie || "");

      if (!accessToken) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }

      const secret = process.env.JWT_SECRET;
      const { payload } = await jwtVerify(
        accessToken,
        new TextEncoder().encode(secret)
      );

      savedItem = await Saved.findById(req.body.productId);

      if (!savedItem) {
        throw new UnAuthenticatedError("Invalid Credentials");
      }
      checkPermissions(payload.userId, savedItem.createdBy);
      responseSavedItem = await Saved.findOneAndUpdate(
        { _id: savedItem._id },
        { quantity: req.body.quantity },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(StatusCodes.OK).json(responseSavedItem);
    }

    if (method === "DELETE") {
      const { savedId } = query;

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

      if (savedId) {
        const savedItem = await Saved.findOne({ _id: savedId });

        checkPermissions(req.user, savedItem.createdBy);

        await savedItem.remove();
        res.status(StatusCodes.OK).json({ msg: "Success: Saved Item Deleted" });
      } else {
        console.log(req.user, "req.user");
        const savedItems = await Saved.find({ createdBy: req.user });

        if (!savedItems) {
          throw new BadRequestError(`No Item in Saved`);
        }

        await Promise.all(
          savedItems.map(
            async (item) => await Saved.deleteOne({ _id: item._id })
          )
        );
        res.status(StatusCodes.OK).json({ msg: "Success: Saved Deleted" });
      }
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
