import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import RSuccess from "../../styles/checkout/Verify.module.css";
import { useAppContext } from "../../context/AppContext";

const ResetSuccess = () => {
  const { setToPassordReset, isPasswordReset } = useAppContext();
  const router = useRouter()

  useEffect(() => {
    if(!isPasswordReset){
      router.push("/products")
    }
  }, [])

  const handleNavigateBack = () => {
    setToPassordReset(false)
    router.push("/login")
  }
  return (
    <div>
      <Head>
        <title>Lilong International: Reset Passord Success!</title>
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
          <h2>Password Reset Successful</h2>
          <span>
            <IoMdCheckmarkCircleOutline className={RSuccess.icon} />
          </span>

          <p className="text-center text-gray-500">
            Click the button below to login
          </p>

          <button
            onClick={handleNavigateBack}
            className={RSuccess.btn}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
