import React from "react";
import { format } from "date-fns";
import { useAppContext } from "../../../context/AppContext";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";

const ViewAffiliate = ({ singleAffiliate }) => {
  const { completeAffiliateReg, isLoading } = useAppContext();
  const [currentRegStatus, setCurrentStatus] = useState(
    singleAffiliate.regStatus
  );

  const handleComplete = async () => {
    const res = await completeAffiliateReg({ _id: singleAffiliate._id });
    if (res) {
      setCurrentStatus(res.regStatus);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="self-end">
        <div>
          {currentRegStatus === "pending" ? (
            <button
              onClick={handleComplete}
              disabled={isLoading}
              className="bg-blue-800 text-white p-2 rounded cursor-pointer  flex items-center gap-3 disabled:bg-blue-200"
            >
              Mark as Completed and Send Mail
              {isLoading && <TailSpin height="20" width="20" />}
            </button>
          ) : (
            <span className="text-blue-800 capitalize border border-blue-800 bg-white p-2 rounded">
              {currentRegStatus}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-4  flex-col lg:flex-row">
        <div className="overflow-hidden w-full bg-white shadow sm:rounded-lg mb-8 lg:mb-0">
          <div className="flex items-center justify-between px-4 py-5 sm:px-6">
            <div className="">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {singleAffiliate.plan}
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Order ID: {singleAffiliate.transactionId}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Payment Status
                </dt>
                <dd className="mt-1 capitalize text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.status}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Card Type</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.cardType}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.email}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Paid At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {format(
                    new Date(singleAffiliate.createdAt),
                    "do MMM, yyy. k:m"
                  )}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Payment Bank
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.paymentBank}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Amount</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.amount}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Registration Status
                </dt>
                <dd className="mt-1 capitalize text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {currentRegStatus}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="overflow-hidden w-full bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              User Information
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Personal Information of registered affiliate
            </p>
          </div>

          <div className="border-y border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  First Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0 flex justify-between">
                  {singleAffiliate.firstname}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Last Name</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.lastname}
                </dd>
              </div>

              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.email}
                </dd>
              </div>

              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Date Of Birth
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {format(new Date(singleAffiliate.dateOfBirth), "do MMM, yyy")}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.gender}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">State</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.state}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Country</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.country}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Bank</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.bankName}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Account Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  {singleAffiliate.accountNumber}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAffiliate;
