import Head from "next/head";
import {
  Banner,
  About,
  Offers,
  Certification,
  Call,
  FeaturedProducts,
  Benefits,
  BenefitDetails,
  Articles,
  Stories,
  VideoSlider,
} from "../components/home";
import { useAppContext } from "../context/AppContext";
import dbConnect from "../lib/mongodb";
import Product from "../models/Product";
import { useEffect } from "react";

export default function Home({ products }) {
  const { showOverlay, user, getUser, getVideoLinks } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getVideoLinks();
    };

    getData();
  }, [user]);

  return (
    <div>
      <Head>
        <title>Lilong International: Welcome</title>
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

      <Banner />
      <About />
      <Certification />
      <Call />
      <Offers />
      <FeaturedProducts products={products} />
      <Benefits />
  
      {showOverlay && <BenefitDetails />}
      <VideoSlider />
      <Articles />
      <Stories />
    </div>
  );
}

export const getServerSideProps = async () => {
  try {
    await dbConnect();
    const allProductsDetails = await Product.find();
    const products = allProductsDetails
      .map((item) => {
        return {
          _id: item._id,
          images: item.images,
          category: item.category,
          name: item.name,
          price: item.price,
          actualPrice: item.actualPrice,
          link: item.link,
          featured: item.featured,
          inStock: item.inStock,
        };
      })
      .filter((item) => item.featured === true);
    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
      },
    };
  } catch (error) {
    console.log(error);
  }
};
