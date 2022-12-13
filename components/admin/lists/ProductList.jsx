import Image from "next/image";
import Link from "next/link";
import { ProductSearchContainer } from "../Search";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import Pagination from "../../Pagination";
import AddButton from "../AddButton";
import EntriesFilter from "../EntriesFilter";
import { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext";
import { TailSpin } from "react-loader-spinner";

const ProductsList = ({ prices, categories }) => {
  const {
    allProducts,
    getProducts,
    search,
    productPriceFilter,
    productCategoryFilter,
    productInstockFilter,
    sort,
    handleSetDeletePrompt,
    user,
    numOfPages,
    totalNumProducts,
    getReportStats,
    page,
    limit,
  } = useAppContext();
  useEffect(() => {
    const getData = async () => {
      await getProducts();
      await getReportStats();
    };

    getData();
  }, [
    search,
    productPriceFilter,
    productCategoryFilter,
    productInstockFilter,
    sort,
    page,
    user,
    limit,
  ]);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-600">Products</h1>
        <Link href="/admin/add-product">
          <a>
            <AddButton />
          </a>
        </Link>
      </div>
      <div className=" mb-7 p-4 shadow-md sm:rounded-lg bg-white py-8">
        <ProductSearchContainer prices={prices} categories={categories} />
      </div>

      {allProducts && numOfPages && totalNumProducts ? (
        <div className="my-4 shadow-md sm:rounded-lg bg-white py-8 overflow-x-auto relative">
          <div className="flex items-center justify-between  mb-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-600 pl-4  ">
              Product Details
            </h2>
            <EntriesFilter total={totalNumProducts} />
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-blue-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="py-5 px-3">
                  Product Name
                </th>
                <th scope="col" className="py-5 px-3">
                  Category
                </th>
                <th scope="col" className="py-5 px-3">
                  Selling Price
                </th>
                <th scope="col" className="py-5 px-3">
                  Actual Price
                </th>
                <th scope="col" className="py-5 px-3">
                  Revenue
                </th>
                <th scope="col" className="py-5 px-3">
                  Percentage Revenue
                </th>
                <th scope="col" className="py-5 px-3">
                  Featured
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
              {allProducts.length === 0 ? (
                <tr className="text-center font-bold text-xl py-2 px-3">
                  <td className="py-2 px-3"> No Order to Display</td>
                </tr>
              ) : (
                allProducts.map((item) => (
                  <tr key={item._id} className="bg-white border-b h-full">
                    <td className="py-2 flex gap-2 text-sm items-center px-3 font-medium text-gray-800 w-52">
                      <Image
                        src={item.images[0]}
                        alt="product"
                        height={50}
                        width={50}
                        className="h-12 w-12 object-contain"
                      />
                      {item.name}
                    </td>
                    <td className="py-2 px-3">{item.category}</td>
                    <td className="py-2 px-3">{item.price}</td>
                    <td className="py-2 px-3">{item.actualPrice}</td>
                    <td className="py-2 px-3">{item.productRevenue}</td>
                    <td className="py-2 px-3">{item.percentageProductRev}%</td>
                    <td className="py-2 px-3">
                      {item.featured ? "Yes" : "No"}
                    </td>
                    <td className="py-2 px-3 font-semibold">
                      {item.inStock ? "In Stock" : "Out Of Stock"}
                    </td>
                    <td className="py-2 px-3 h-full  flex items-center">
                      <Link href={`/admin/edit/${item._id}`}>
                        <a className="mr-2 font-medium bg-blue-600 text-white p-1 rounded hover:underline">
                          <FiEdit size={18} />
                        </a>
                      </Link>
                      <span
                        onClick={() =>
                          handleSetDeletePrompt({
                            _id: item._id,
                            title: `Delete Product! - ${item.name}`,
                            question:
                              "Are you sure you want to delete this product?",
                          })
                        }
                        className="mr-2 cursor-pointer font-medium bg-rose-600 text-white p-1 rounded hover:underline"
                      >
                        <MdDeleteOutline size={18} />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            {numOfPages > 1 && <Pagination numOfPages={numOfPages} />}
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default ProductsList;
