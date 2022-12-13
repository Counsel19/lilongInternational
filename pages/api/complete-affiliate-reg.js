import AffiliatePayment from "../../models/AffiliatePayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../utils";
import dbConnect from "../../lib/mongodb";
import { SignJWT } from "jose";
let nodemailer = require("nodemailer");

import UnAuthenticatedError from "../../errors/unauthenticated";

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    await dbConnect();

    if (method === "POST") {
      const { _id } = req.body;

      let affiliate = await AffiliatePayment.findById(_id);

      if (!affiliate) {
        throw new UnAuthenticatedError("Affiliate User does not Exist");
      }

      const output = `
        <div className="flex items-center justify-center">
          <h1 style={{ color: "blue" }}>Lilong International</h1>

          <div className="">
              <h3 className="text-3xl tracking-tight text-gray-900" >Hello ${affiliate.firstname} ${affiliate.lastname}!</h3>
               <p>Congratulations You have been succefully registered on our partner website</p> 
              <p>In response to your registration for our ${affiliate.plan}, a congratulatory email has been sent you from our partner company containing your credentails which can be edited</p>
              <p>This is a follow up to further give you assurance of our availability and ensure that all promises we made are fully kept</p>
              <p>Do not hesitate to get back to us should u have a further enqiury</p>


              <br />

              <h5>Contact at </h5>
              <p>Whatsapp: 08033366106</p>
              <p>Email: contact@lilonginternational.com</p>
             
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
        to: affiliate.email, // list of receivers
        subject: "Official Lilong Affiliate Account Created Successfully ✔", // Subject line
        html: output, // html body
      });

      transporter.sendMail(mailData, function (err, info) {
        if (err) console.log(err);
        else console.log("Email sent successfully");
      });

      const editedAffiliate = await AffiliatePayment.findOneAndUpdate(
        { _id: affiliate._id },
        { regStatus: "completed" },
        {
          new: true,
          runValidators: true,
        }
      );

 

      res.status(200).json({ msg: "Email sent successfully", editedAffiliate });
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
