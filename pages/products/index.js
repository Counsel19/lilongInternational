import Head from "next/head";
import { useEffect, useState } from "react";
import { ProductFilter, ProductsCatalog } from "../../components/products";
import dbConnect from "../../lib/mongodb";
import Category from "../../models/Category";
import Product from "../../models/Product";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useAppContext } from "../../context/AppContext";
import { TailSpin } from "react-loader-spinner";
import ProductsStyles from "../../styles/products/ProductsPage.module.css";

const Index = ({ prices, products, categories, numOfPages }) => {
  const {
    getProducts,
    productPriceFilter,
    allProducts,
    productCategoryFilter,
    sort,
    page,
    search,
  } = useAppContext();
  const [controlledProducts, setControlledProducts] = useState(products);

  useEffect(() => {
    const getData = async () => {
      await getProducts();
    };

    getData();
  }, [productCategoryFilter, productPriceFilter, page, search, sort]);

  useEffect(() => {
    if (allProducts) {
      setControlledProducts(allProducts);
    }
  }, [allProducts]);

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

      <div className={ProductsStyles.container}>
        {!products || !prices || !categories ? (
          <div
            style={{
              position: "fixed",
              top: "0",
              right: "0",
              left: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="w-full flex items-center justify-center">
              <TailSpin />
            </div>
          </div>
        ) : (
          <>
            <ProductFilter prices={prices} categories={categories} />
            <ProductsCatalog products={controlledProducts} />
          </>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async () => {
  let prices = [];
  let categories = [];
  let products = null;
  let numOfPages = 0;
  try {
    await dbConnect();
    const result = Product.find();

    const page = 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    let allProductsDetails = await result
      .skip(skip)
      .limit(limit)
      .sort("-createdAt");

    const totalProducts = await Product.countDocuments();
    numOfPages = Math.ceil(totalProducts / limit);

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
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
      numOfPages,
    },
  };
};

export default Index;
