import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect } from "react";
import { ProductList } from "../../components/admin/lists";
import { useAppContext } from "../../context/AppContext";
import dbConnect from "../../lib/mongodb";
import Category from "../../models/Category";

function AdminProductsPage({ prices, categories }) {

  return (
    <div>
      <Head>
        <title>Lilong International: Administrator</title>
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

      <div>
        <ProductList prices={prices} categories={categories} />
      </div>
    </div>
  );
}

AdminProductsPage.layout = "L2";

export const getServerSideProps = async () => {
  let prices = [];
  let categories = [];

  try {
    await dbConnect();

    categories = await Category.find();

    prices = [
      {
        id: 1,
        price: "less than 2k",
      },
      {
        id: 2,
        price: "2k - 100k",
      },
      {
        id: 3,
        price: "100k - 300k",
      },
      {
        id: 4,
        price: "300k - 500k",
      },
      {
        id: 5,
        price: "500k - 1000k",
      },

      {
        id: 6,
        price: "Above 1000k",
      },
    ];
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      prices: prices,
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default AdminProductsPage;
