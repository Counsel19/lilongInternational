import Head from "next/head";
import React from "react";
import { ProductFilter, ProductsCatalog } from "../../components/products";
import dbConnect from "../../lib/mongodb";
import Category from "../../models/Category";
import Product from "../../models/Product";

const index = ({ prices, products, categories }) => {
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

      <div
        style={{
          padding: "3rem 5rem",
          display: "flex",
          gap: "4rem",
          backgroundColor: "#fcfcfc",
        }}
      >
        <ProductFilter prices={prices} categories={categories} />
        <ProductsCatalog products={products} />
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let prices = [];
  let categories = [];
  let products = null;
  try {
    await dbConnect();
    const allProductsDetails = await Product.find();
    products = allProductsDetails.map((item) => {
      return {
        _id: item._id,
        images: item.images,
        category: item.category,
        name: item.name,
        price: item.price,
        actualPrice: item.actualPrice,
        link: item.link,
        featured: item.featured,
      };
    });

    categories = await Category.find();

    prices = [
      {
        id: 1,
        price: "< $20",
      },
      {
        id: 2,
        price: "$20 - $50",
      },
      {
        id: 3,
        price: "$50 - $100",
      },
      {
        id: 4,
        price: "$100 - $200",
      },
      {
        id: 5,
        price: "$200 - $400",
      },
      {
        id: 6,
        price: "$400 - $800",
      },
      {
        id: 7,
        price: "$800 - $1000",
      },
      {
        id: 8,
        price: "> $1000",
      },
    ];
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      prices: prices,
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default index;
