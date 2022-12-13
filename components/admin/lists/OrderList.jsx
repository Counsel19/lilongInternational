import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppContext } from "../../../context/AppContext";
import Pagination from "../../Pagination";
import EntriesFilter from "../EntriesFilter";
import { SearchContainer } from "../Search";
import { format } from "date-fns";
import { TailSpin } from "react-loader-spinner";

const style = {
  delivered: {
    padding: "5px",
    borderRadius: "5px",
    color: "green",
    textTransform: "capitalize",
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
    backgroundColor: "#d8defc",
  },
};

const AllOrderList = () => {
  const {
    productsPayment,
    getProductsPayment,
    search,
    timeFilter,
    orderStatusFilter,
    sort,
    page,
    user,
    moneyFormat,
    limit,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      await getProductsPayment();
    };

    getData();
  }, [search, timeFilter, user, orderStatusFilter, sort, limit, page]);

  return (
    <div className="mt-6 ">
      <h1 className="text-xl font-bold text-gray-600 mb-5">Orders</h1>
      <div className=" mb-7 shadow-md sm:rounded-lg bg-white px-4 py-8">
        <SearchContainer />
      </div>

      {productsPayment ? (
        <div className="my-4 shadow-md sm:rounded-lg bg-white py-8 ">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-600 pl-4 ">
              Order Details
            </h2>
            <EntriesFilter total={productsPayment.totalproductsPayment} />
          </div>
          <table className=" w-full text-sm text-left text-gray-900">
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
              {productsPayment.productsPayment.length === 0 ? (
                <tr className="text-center font-bold text-xl py-2 px-3">
                  <td className="py-2 px-3"> No Order to Display</td>
                </tr>
              ) : (
                productsPayment.productsPayment.map((item) => (
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
                              height={30}
                              width={30}
                              objectFit="contain"
                            />{" "}
                            {product.name}
                          </li>
                        ))}
                      </ol>
                    </td>
                    <td className="py-2 px-3">
                      {moneyFormat.format(item.amount)}
                    </td>
                    <td className="py-2 px-3">{item.fullname}</td>
                    <td className="py-2 px-3 w-48">{item.deliveryAddress}</td>
                    <td className="py-2 px-3 w-48">
                      {format(new Date(item.createdAt), "do MMM, yyy. k:m")}
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
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            {productsPayment.numOfPages > 1 && (
              <Pagination numOfPages={productsPayment.numOfPages} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full justify-center items-center">
          <TailSpin ariaLabel="loading" />
        </div>
      )}
    </div>
  );
};

export default AllOrderList;
