import SProductStyles from "../../styles/singleProduct/SingleProduct.module.css";
import {
  ProductDescription,
  PurchaseInfo,
  ShowCase,
  PurchaseCTA,
  SuggestedProducts,
} from "../../components/singleProduct";
import Head from "next/head";
import Product from "../../models/Product";
import Image from "next/image";
import dbConnect from "../../lib/mongodb";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoArrowBackOutline } from "react-icons/io5";

const SingleProduct = ({ product, products }) => {
  return (
    <div>
      <Head>
        <title>Lilong International: Buy Now!</title>
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

      {product ? (
        <div className={SProductStyles.container}>
          <div className={SProductStyles.wrapper}>
            <div className={SProductStyles.top}>
              <ShowCase images={product.images} />
              <PurchaseInfo product={product} />
            </div>
            <div className={SProductStyles.bottom}>
              <ProductDescription product={product} />
              <PurchaseCTA product={product} />
            </div>
          </div>
          <div className={SProductStyles.suggestions}>
            <SuggestedProducts products={products} />
          </div>
        </div>
      ) : (
        <div className={SProductStyles.notFoundWrapper}>
          <div className={SProductStyles.notFound}>
            <Image
              src="/images/searching.gif"
              alt="Loading"
              height={80}
              width={80}
              objectFit="contain"
            />
            <h2 className=" mt-8 font-bold text-lg text-gray">
              Product Not Found
            </h2>
            <Link href="/products">
              <a>
                <IoArrowBackOutline /> Continue to Shop
              </a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  let suggestedProducts = null;
  let singleProduct = null;

  try {
    await dbConnect();
    const { id } = context.query;
    singleProduct = await Product.findById(id);

    let sameCategory = await Product.find({
      category: singleProduct?.category,
    });
    suggestedProducts = sameCategory.filter(
      (product) => product._id !== singleProduct._id
    );
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      product: JSON.parse(JSON.stringify(singleProduct)),
      products: JSON.parse(JSON.stringify(suggestedProducts)),
    },
  };
};

export default SingleProduct;
