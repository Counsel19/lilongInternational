import User from "../../../models/User";
import { HandleError } from "../../../utils";
import cookie from "cookie";
import { jwtVerify } from "jose";
import UnAuthenticatedError from "../../../errors/unauthenticated";
import paystack from "../../../lib/paystack";
import { StatusCodes } from "http-status-codes";
const { initializePayment } = paystack();

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    if (method === "POST") {
      const { affiliate } = query;
      if (!affiliate) {
        const { accessToken } = cookie.parse(req.headers?.cookie || "");

        if (!accessToken) {
          throw new UnAuthenticatedError("Invalid Credentials");
        }

        const { payload } = await jwtVerify(
          accessToken,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );

        const user = await User.findOne({ _id: payload.userId });

        if (!user) {
          throw new UnAuthenticatedError("Invalid Credentials");
        }
      }

      const form = {
        email: req.body.email,
        amount: req.body.amount * 100,
      };

      form.metadata = {
        full_name: req.body.fullname,
      };

      const response = await initializePayment(form);
      res
        .status(StatusCodes.CREATED)
        .json({ url: response.data.authorization_url });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
