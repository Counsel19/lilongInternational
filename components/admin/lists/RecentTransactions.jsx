import Link from "next/link";
import { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import { format } from "date-fns";
import { TailSpin } from "react-loader-spinner";
import Image from "next/image";

const style = {
  delivered: {
    padding: "5px",
    borderRadius: "5px",
    textTransform: "capitalize",
    color: "green",
    backgroundColor: "rgba(0, 128, 0, 0.151)",
  },
  processing: {
    padding: "5px",
    borderRadius: "5px",
    color: "goldenrod",
    textTransform: "capitalize",
    backgroundColor: "rgba(189, 189, 3, 0.103)",
  },
  dispatched: {
    padding: "5px",
    borderRadius: "5px",
    textTransform: "capitalize",
    color: "blue",
    backgroundColor: "#e3e6f5",
  },
};

const RecentTransactionList = () => {
  const { recentProductsPayment, moneyFormat, getRecentProductsPayment, user } =
    useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getRecentProductsPayment();
    };

    getData();
  }, [user]);

  return (
    <div className="mt-12 overflow-x-auto relative shadow-md sm:rounded-lg bg-white py-8">
      {recentProductsPayment ? (
        <>
          <h2 className="text-md font-bold text-gray-600 mb-5 pl-4 ">
            Latest Transaction
          </h2>
          <table className="text-sm text-left text-gray-500 w-full">
            <thead className="text-sm text-blue-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="py-5 px-3">
                  OrderID
                </th>
                <th scope="col" className="py-5 px-3">
                  Product
                </th>
                <th scope="col" className="py-5 px-3">
                  Price
                </th>
                <th scope="col" className="py-5 px-3">
                  Customer
                </th>
                <th scope="col" className="py-5 px-3">
                  Address
                </th>
                <th scope="col" className="py-5 px-3">
                  Date
                </th>
                <th scope="col" className="py-5 px-3">
                  Status
                </th>
                <th scope="col" className="py-5 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {recentProductsPayment.productsPayment.length > 0 ? (
                recentProductsPayment.productsPayment.slice(0, 5).map((item) => (
                  <tr key={item.transactionId} className="bg-white border-b">
                    <td className="py-2 px-3">{item.transactionId}</td>
                    <td className="py-2 px-3">
                      <ol>
                        {item.productsData.map((product) => (
                          <li
                            key={product._id}
                            className="flex items-center gap-3 w-52"
                          >
                            <Image
                              src={product.image}
                              alt={product.name}
                              height={50}
                              width={50}
                              objectFit="contain"
                            />{" "}
                            {product.name}
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td className="py-2 px-3">
                      {(moneyFormat.format(item.amount))}</td>
                    <td className="py-2 px-3">{item.fullname}</td>
                    <td className="py-2 px-3">{item.deliveryAddress}</td>
                    <td className="py-2 px-3">
                      {format(
                        new Date(item.createdAt),
                        "eee, do MMM, yyy k:m"
                      )}
                    </td>
                    <td className="py-1 px-3">
                      <span style={style[item.state]}>{item.state}</span>
                    </td>
                    <td className="py-2 px-3">
                      <Link href={`/admin/orders/${item._id}`}>
                        <a className="mr-2 font-medium bg-white text-blue-900 p-1 rounded border border-blue-900 hover:underline">
                          Details
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="py-2 px-3 font-bold text-center text-xl"
                    colSpan={8}
                  >
                    No Products to Display
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      ) : (
        <div className="flex w-full justify-center items-center ">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default RecentTransactionList;
