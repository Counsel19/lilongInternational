import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RSuccess from "../../styles/checkout/Verify.module.css";
import { useAppContext } from "../../context/AppContext";

const ResetSuccess = () => {
  const { isEmailSending } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!isEmailSending) {
      router.push("/products");
    }
  });
  
  return (
    <div>
      <Head>
        <title>Lilong International:Emali Sent Success!</title>
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

      <div className={RSuccess.container}>
        <div className={RSuccess.wrapper}>
          <h2>Email Sent Success</h2>
          <span>
            <IoMdCheckmarkCircleOutline className={RSuccess.icon} />
          </span>

          <p className="text-center text-gray-500">
            A Reset password link has been successfully sent to you email
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
