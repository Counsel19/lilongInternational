import Link from "next/link";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useAppContext } from "../../../context/AppContext";

const PendingAffiliateList = () => {
  const { allAffiliates, user, getAllAffiliates } = useAppContext();
  const [ pending, setPending ] = useState(null)

  useEffect(() => {
    const getData = async () => {
     
      await getAllAffiliates();
    };

    getData();
  }, [user]);

  useEffect(() => {
    if(allAffiliates){
      setPending(allAffiliates.affiliateUsers.filter(item => item.regStatus === "pending"))
    }
  }, [allAffiliates])

  return (
    <div className="mt-0 overflow-x-auto relative shadow-md sm:rounded-lg bg-white  flex-1">
      {pending ? (
        <div className="my-0  px-2 py-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-600 pl-4 ">
              Pending Affiliates
            </h2>
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
                  Full Name
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
              {pending.length === 0 ? (
                <tr className="text-center font-bold text-xl py-4 px-3">
                  <td className="py-4 px-3"> No Pending Affiliate to Display</td>
                </tr>
              ) : (
                pending.map((item) => (
                  <tr key={item.transactionId} className="bg-white border-b">
                    <td className="py-4 px-3">{item.transactionId}</td>
                    <td className="py-4 px-3">{item.plan}</td>
                    <td className="py-4 px-3">
                      {item.firstname} {" "}
                      {item.lastname}
                    </td>

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
        </div>
      ) : (
        <TailSpin />
      )}
    </div>
  );
};

export default PendingAffiliateList;
