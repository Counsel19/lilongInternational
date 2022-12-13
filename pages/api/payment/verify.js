import ProductPayment from "../../../models/ProductPayment";
import { StatusCodes } from "http-status-codes";
import { HandleError } from "../../../utils";
import paystack from "../../../lib/paystack";
import AffiliatePayment from "../../../models/AffiliatePayment";
const { verifyPayment } = paystack();

export default async function handler(req, res) {
  const { method, query } = req;

  try {
    if (method === "POST") {
      const { ref, affiliate } = query;

      const response = await verifyPayment(ref);

      const {
        reference,
        amount,
        id,
        status,
        customer: { email },
        metadata: { full_name },
        authorization: { card_type, bank, country_code },
      } = response.data;
      let payment;

      if (!affiliate) {
        const { deliveryAddress, phone, cartData } = req.body;
        const productsData = JSON.parse(cartData);
    
        payment = await ProductPayment.create({
          reference,
          productsData,
          deliveryAddress,
          transactionId: id,
          status,
          amount,
          email,
          phone,
          fullname: full_name,
          cardType: card_type,
          paymentBank: bank,
          countryCode: country_code,
        });
      } else {
        const {
          dateOfBirth,
          gender,
          accountNumber,
          bankName,
          phone,
          country,
          state,
          firstname,
          lastname,
          plan,
        } = req.body;
        payment = await AffiliatePayment.create({
          plan,
          reference,
          firstname,
          lastname,
          transactionId: id,
          status,
          amount,
          email,
          dateOfBirth,
          gender,
          cardType: card_type,
          bankName,
          phone,
          country,
          state,
          accountNumber,
          paymentBank: bank,
        });
      }
      res.status(StatusCodes.OK).json(payment);
    }
  } catch (error) {
    HandleError(error, req, res);
  }
}
