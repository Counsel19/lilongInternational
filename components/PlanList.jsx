import React from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useAppContext } from "../context/AppContext";
import * as ACTIONS from "../context/actions";
import { useRouter } from "next/router";

const PlanList = ({ plan }) => {
  const { moneyFormat, dispatch, addAffiliateUser } = useAppContext();
  const router = useRouter();

  const updateAffiliateDetials = () => {
    dispatch({
      type: ACTIONS.UPDATE_AFFILIATE_DETAILS,
      payload: { affiliateDetails: plan },
    });
    addAffiliateUser(plan, "affiliateDetails");
    router.push("/become-an-affiliate/apply");
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-start w-full transition duration-500 ease-in-out transform bg-gray-50 border-2 border-gray-400 rounded-lg hover:border-rose-200 ">
        <div className="w-full xl:w-1/4 md:w-1/4">
          <div className="relative flex flex-col h-full p-8 ">
            <h2 className="mb-4 font-semibold tracking-widest text-gray-800 uppercase title-font">
              {plan.name}
            </h2>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-800">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-800 rounded-full bg-blue-1300">
                <IoMdCheckmark size={22} className="text-green-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-800">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-800 rounded-full bg-blue-1300">
                <IoMdCheckmark size={22} className="text-green-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-800">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-800 rounded-full bg-blue-1300">
                <IoMdCheckmark size={22} className="text-green-600" />
              </span>
              Feature.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-1/4">
          <div className="relative flex flex-col h-full p-8 ">
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-800">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-800 rounded-full bg-blue-1300">
                <IoMdCheckmark size={22} className="text-green-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-400">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-400 rounded-full bg-blue-1300">
                <MdClose size="small" className="text-rose-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-400">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-400 rounded-full bg-blue-1300">
                <MdClose size="small" className="text-rose-600" />
              </span>
              Feature.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-1/4">
          <div className="relative flex flex-col h-full p-8 ">
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-400">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-400 rounded-full bg-blue-1300">
                <MdClose size="small" className="text-rose-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-400">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-400 rounded-full bg-blue-1300">
                <MdClose size="small" className="text-rose-600" />
              </span>
              Feature.
            </p>
            <p className="flex items-center mb-2 text-lg font-normal tracking-wide text-gray-400">
              <span className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 mr-2 text-gray-400 rounded-full bg-blue-1300">
                <MdClose size="small" className="text-rose-600" />
              </span>
              Feature.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/4 md:w-1/4 lg:ml-auto">
          <div className="relative flex flex-col h-full p-8">
            <h1 className="flex items-end mx-auto text-3xl font-black leading-none text-blue-800 ">
              <span> {moneyFormat.format(plan.price)} </span>
            </h1>
            <button
              onClick={updateAffiliateDetials}
              className={`${
                plan.id === 2
                  ? "bg-blue-700 text-white border-blue-900"
                  : "text-gray-800 border-gray-900"
              }  w-full px-4 py-2 mx-auto mt-3  transition duration-500 ease-in-out transform border  rounded-lg text-md hover:bg-blue-900 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 focus:border-gray-700 focus:bg-blue-800 focus:text-white `}
            >
              Register Now
            </button>
            <p className="mx-auto mt-6 text-sm font-semibold text-gray-800">
              { plan.msg }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanList;
