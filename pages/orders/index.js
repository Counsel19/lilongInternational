import OrdersStyles from "../../styles/Orders.module.css";
import LayoutStyles from "../../styles/Layout.module.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import OrderList from "../../components/account/OrderList";
import { IoSearch } from "react-icons/io5";
import { SuggestedProducts } from "../../components/singleProduct";
import Product from "../../models/Product";
import dbConnect from "../../lib/mongodb";
import { TailSpin } from "react-loader-spinner";
import SearchModal from "../../components/SearchModal";

const statusOptions = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Processing",
    value: "processing",
  },
  {
    name: "Dispatched",
    value: "dispatched",
  },
  {
    name: "Delivered",
    value: "delivered",
  },
];

const MyOrders = ({ suggestedProducts }) => {
  const {
    user,
    userOrders,
    orderSearch,
    handleInputChange,
    showSearchModal,
    handleGetOrders,
  } = useAppContext();
  const { orders } = userOrders;

  const [active, setActive] = useState("all");
  const [localInputSearch, setLocalSearchInput] = useState(orderSearch);
  const [displayedOrders, setDisplayedOrders] = useState(orders);

  const getOrdersInfo = async () => {
    await handleGetOrders(user?.email);
  };

  useEffect(() => {
    if (!localInputSearch) {
      handleInputChange("orderSearch", localInputSearch);
      getOrdersInfo();
    }
  }, [localInputSearch]);

  useEffect(() => {
    getOrdersInfo();
  }, [orderSearch, user]);

  useEffect(() => {
    if (active === "all") {
      setDisplayedOrders(orders);
    } else {
      setDisplayedOrders(orders.filter((item) => item.state === active));
    }
  }, [active, userOrders]);

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

      {showSearchModal && (
        <div className={LayoutStyles.modal}>
          <SearchModal orders={true} />
        </div>
      )}

      <div className={OrdersStyles.container}>
        <div className={OrdersStyles.wrapper}>
          <div className="flex justify-between items-center my-6">
            <h2>Your Orders</h2>
            <button
              onClick={() => handleInputChange("showSearchModal", true)}
              className="lg:hidden bg-blue-500 h-fit text-white py-2 px-3 rounded-md"
            >
              <IoSearch size={20} />
            </button>
          </div>

          <div className={OrdersStyles.header}>
            <div className={OrdersStyles.statusOptions}>
              {statusOptions.map((item) => (
                <span
                  key={item.value}
                  style={
                    active === item.value
                      ? { borderBottom: "2px solid #172155" }
                      : null
                  }
                  onClick={() => setActive(item.value)}
                >
                  {item.name}
                </span>
              ))}
            </div>
            <div className="hidden lg:flex gap-2 items-center ">
              <input
                className=" block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                type="search"
                name="localInputSearch"
                value={localInputSearch}
                onChange={(e) => setLocalSearchInput(e.target.value)}
                placeholder="Search Orders"
              />
              <button
                onClick={() =>
                  handleInputChange("orderSearch", localInputSearch)
                }
                className=" bg-blue-600 text-white py-2 px-3 rounded-md"
              >
                <IoSearch size={25} />
              </button>
            </div>
          </div>
        </div>
        <OrderList orders={displayedOrders} />
      </div>
      {suggestedProducts ? (
        <div className="w-full flex">
          <SuggestedProducts products={suggestedProducts} />
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

MyOrders.layout = "L3";

export const getServerSideProps = async (context) => {
  let suggestedProducts = null;

  try {
    await dbConnect();

    suggestedProducts = await Product.find();

    //   let sameCategory = await Product.find({ category: singleProduct?.category });
    //   suggestedProducts = sameCategory.filter(product => product._id !== singleProduct._id)
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      suggestedProducts: JSON.parse(JSON.stringify(suggestedProducts)),
    },
  };
};

export default MyOrders;
