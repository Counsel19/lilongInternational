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
            <div className={SProductStyles.left}>
              <ShowCase images={product.images} />
              <ProductDescription product={product} />
            </div>
            <div className={SProductStyles.right}>
              <PurchaseInfo product={product} />
              <PurchaseCTA product={product} />
            </div>
          </div>
          <div className={SProductStyles.suggestions}>
            <SuggestedProducts products={products} />
          </div>
        </div>
      ) : (
        <div className={SProductStyles.loading}>
          <Image
            src="/images/spin.gif"
            alt="Loading"
            height={50}
            width={50}
            objectFit="contain"
          />
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

    let sameCategory = await Product.find({ category: singleProduct?.category });
    suggestedProducts = sameCategory.filter(product => product._id !== singleProduct._id)
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
