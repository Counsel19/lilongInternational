import User from "../../../models/User.js";
import { StatusCodes } from "http-status-codes";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      if (query.action === "login") {
        const { email, password } = req.body;
        if (!email || !password) {
          throw new Error("Please Provide all Values");
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
          throw new Error("Invalid Credentials");
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (!isPasswordCorrect) {
          throw new Error("Invalid Credentials");
        }
        const token = user.createJWT();
        user.password = undefined;
        res
          .status(StatusCodes.OK)
          .json({ user, token, location: user.location });
      } 
      
      else if (query.action === "register") {
        const { firstname, lastname, email, password } = req.body;

        if (!firstname || !lastname || !password || !email) {
          throw new Error("Please provide all fields");
        }

        const emailAlreadyExist = await User.findOne({ email });

        if (emailAlreadyExist) {
          throw new Error("Email Already in use");
        }

        const user = await User.create(req.body);

        const token = user.createJWT();

        res.status(StatusCodes.CREATED).json({
          user: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            country: user.country,
            state: user.state,
            phone: user.phone,
            deliveryAddress: user.deliveryAddress,
          },
          token,
        });
      }
    }

    if (method === "PATCH") {
      const { firstname, lastname, country, state } = req.body;

      if (!firstname || !lastname || !country || !state) {
        throw new Error("Please Provide All Fields");
      }

      const user = await User.findOne({ _id: req.user.userId });

      user.email = email;
      user.firstname = firstname;
      user.lastname = lastname;
      user.country = country;
      user.state = state;
      user.deliveryAddress = deliveryAddress;

      await user.save();

      const token = user.createJWT();s

      res.status(StatusCodes.OK).json({ user, token });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
