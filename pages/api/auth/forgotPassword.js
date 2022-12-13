import User from "../../../models/User";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import dbConnect from "../../../lib/mongodb";
import { SignJWT } from "jose";
let nodemailer = require("nodemailer");

import UnAuthenticatedError from "../../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { email } = req.body;

      let user = await User.findOne({ email }).select("+password");
      if (!user) {
        throw new UnAuthenticatedError("No Account with Email");
      }

      const secret = process.env.JWT_SECRET + user.password;
    
      const payload = { userId: user._id, isAdmin: user.isAdmin };

      const forgotPasswordToken = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256", typ: "JWT" })
        .setExpirationTime("10m")
        .sign(new TextEncoder().encode(secret));

      const link = `http://localhost:3000/api/auth/resetPassword/?userId=${user._id}&token=${forgotPasswordToken}`;

      const output = `
        <div className="flex items-center justify-center">
          <h2 className=" text-center text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Lilong International</h2>

          <div className="">
              <h3 className="text-3xl tracking-tight text-gray-900" >Hello ${user.firstname} ${user.lastname}!</h3>
              <p>You have requested to reset the password to your account on Lilong International</p>
              <p>Please Note the link will only be active for 5 minutes</p>

              <p>Click the link below to reset password</p>
              <a target="_" href="${link}">Reset My Password</a>

              <br />
              <p>Cheers!!</p>
              <p>Lilong International Team</p>
          </div>
        
        </div>
      `;

      const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
          user: "counselokpabijs@gmail.com",
          pass: process.env.GOOGLE_PASS,
        },
        secure: true,
      });

      let mailData = await transporter.sendMail({
        from: "counselokpabijs@gmail.com",
        to: user.email, // list of receivers
        subject: "Password reset notification ✔", // Subject line
        text: `Hello ${user.firstname} ${user.lastname}! \n You have requested to reset the password to your account on Lilong International. Click the link below to get started.\n ${link}`, // plain text body
        html: output, // html body
      });

      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log("Email sent successfully");
      });

      res.status(200).json({msg: "Email sent successfully"});
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
