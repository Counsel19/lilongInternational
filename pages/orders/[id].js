import { format } from "date-fns";
import Head from "next/head";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import OrderItem from "../../components/account/OrderItem";
import { SuggestedProducts } from "../../components/singleProduct";
import TrackOrder from "../../components/TrackOrder";
import dbConnect from "../../lib/mongodb";
import Product from "../../models/Product";
import ProductPayment from "../../models/ProductPayment";
import OrderDetailsStyles from "../../styles/account/OrderDetails.module.css";

const OrderDetails = ({ orderProduct, suggestedProducts }) => {
  return (
    <div>
      <Head>
        <title>Lilong International: My Orders!</title>
        <meta
          name="description"
          content="Lilong International Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={OrderDetailsStyles.container}>
        <Link href="/orders">
          <a className="">
            <IoIosArrowRoundBack />
            Go Back
          </a>
        </Link>
        <h2>Your Order: {orderProduct.transactionId}</h2>

        <div className={OrderDetailsStyles.header}>
          <TrackOrder orderStatus={orderProduct.state} id={orderProduct._id} />
        </div>

        <div className={OrderDetailsStyles.wrapper}>
          <div className={OrderDetailsStyles.sectionRow}>
            <div className={OrderDetailsStyles.section}>
              <h3>Delivery Information</h3>
              <p>
                <BiUser color="gray" /> {orderProduct.fullname}
              </p>
              <p>
                <HiOutlineMail color="gray" /> {orderProduct.email}
              </p>
              <p>
                <BsPhone color="gray" /> {orderProduct.phone}
              </p>
              <p>
                <IoLocationOutline color="gray" />{" "}
                {orderProduct.deliveryAddress}, {orderProduct.countryCode}
              </p>
            </div>
            <div className={OrderDetailsStyles.section}>
              <h3>Order Information</h3>
              <p>
                <span>Transaction ID</span> {orderProduct.transactionId}
              </p>
              <p>
                <span>Placed On</span>  {format(
                new Date(orderProduct.createdAt),
                "do, MMM, yyyy, k:m"
              )}
              </p>
              <p>
                <span>Payment Method</span> {orderProduct.cardType}
              </p>
            </div>
          </div>
          <OrderItem orderProduct={orderProduct} orderDetails={true} />
        </div>
      </div>
      <SuggestedProducts products={suggestedProducts} />
    </div>
  );
};

OrderDetails.layout = "L3";

export const getServerSideProps = async (context) => {
  let suggestedProducts = null;
  let singleOrder = null;

  try {
    await dbConnect();
    const { id } = context.query;
    singleOrder = await ProductPayment.findById(id);

    suggestedProducts = await Product.find();
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      orderProduct: JSON.parse(JSON.stringify(singleOrder)),
      suggestedProducts: JSON.parse(JSON.stringify(suggestedProducts)),
    },
  };
};

export default OrderDetails;
