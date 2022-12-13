import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../../context/AppContext";
import Pagination from "../../Pagination";
import EntriesFilter from "../EntriesFilter";
import { AffiliateSearchContainer } from "../Search";

const style = {
  completed: {
    padding: "5px",
    borderRadius: "5px",
    textTransform: "capitalize",
    color: "green",
    backgroundColor: "rgba(0, 128, 0, 0.151)",
  },
  pending: {
    padding: "5px",
    borderRadius: "5px",
    textTransform: "capitalize",
    color: "goldenrod",
    backgroundColor: "rgba(189, 189, 3, 0.103)",
  },
};

const AllAffiliateList = () => {
  const {
    allAffiliates,
    user,
    getAllAffiliates,
    affiliateStatusFilter,
    search,
    affiliatePlanFilter,
    timeFilter,
    sort,
    limit,
    page,
  } = useAppContext();

  useEffect(() => {
    const getData = async () => {
      console.log("useEffect");
      await getAllAffiliates();
    };

    getData();
  }, [
    search,
    affiliatePlanFilter,
    affiliateStatusFilter,
    timeFilter,
    user,
    sort,
    page,
    limit,
  ]);

  return (
    <div className="mt-6 overflow-x-auto relative ">
      <h1 className="text-xl font-bold text-gray-600 mb-5">Affiliates</h1>
      <div className=" mb-7 shadow-md sm:rounded-lg bg-white px-8 py-8">
        <AffiliateSearchContainer />
      </div>

      {allAffiliates ? (
        <div className="my-4 shadow-md sm:rounded-lg bg-white px-2 py-8 overflow-x-auto relative ">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base md:text-lg font-semibold text-gray-600 pl-4 ">
              Affiliates Details
            </h2>
            <EntriesFilter total={allAffiliates?.totalAffiliateUsers} />
          </div>
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-blue-700 uppercase bg-gray-100">
              <tr>
                <th scope="col" className="py-5 px-3">
                  TransactionID
                </th>
                <th scope="col" className="py-5 px-3">
                  Plan
                </th>
                <th scope="col" className="py-5 px-3">
                  Reg Status
                </th>
                <th scope="col" className="py-5 px-3">
                  First Name
                </th>
                <th scope="col" className="py-5 px-3">
                  Last Name
                </th>
                <th scope="col" className="py-5 px-3">
                  Email
                </th>
                <th scope="col" className="py-5 px-3">
                  State
                </th>
                <th scope="col" className="py-5 px-3">
                  Nigeria
                </th>
                <th scope="col" className="py-5 px-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {allAffiliates.affiliateUsers.length === 0 ? (
                <tr className="text-center font-bold text-xl py-4 px-3">
                  <td className="py-4 px-3"> No Order to Display</td>
                </tr>
              ) : (
                allAffiliates.affiliateUsers.map((item) => (
                  <tr key={item.transactionId} className="bg-white border-b">
                    <td className="py-4 px-3">{item.transactionId}</td>
                    <td className="py-4 px-3">{item.plan}</td>
                    <td className="py-4 px-3">
                      <span style={style[item.regStatus]}>
                        {item.regStatus}
                      </span>
                    </td>
                    <td className="py-4 px-3">{item.firstname}</td>
                    <td className="py-4 px-3">{item.lastname}</td>
                    <td className="py-4 px-3">{item.email}</td>

                    <td className="py-4 px-3">{item.state}</td>
                    <td className="py-4 px-3">{item.country}</td>
                    <td className="py-4 px-3">
                      <Link href={`/admin/affiliates/${item._id}`}>
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
            {allAffiliates?.numOfPages > 1 && (
              <Pagination numOfPages={allAffiliates?.numOfPages} />
            )}
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

export default AllAffiliateList;
