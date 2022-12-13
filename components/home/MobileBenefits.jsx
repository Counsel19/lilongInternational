import React from "react";
import { BiMedal } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import * as ACTIONS from "../../context/actions";
import { useAppContext } from "../../context/AppContext";

const MobileBenefits = () => {
  const { dispatch } = useAppContext();

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="relative w-full block rounded-sm border-t-4 border-pink-500 p-8 pb-24 shadow-xl">
        <p className="mt-4 text-xlg uppercase font-medium text-gray-500">
          Prevents Tumor
        </p>
        <p className="mt-4 text-xlg font-medium text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, culpa!
        </p>
        <span
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_OVERLAY,
              payload: { bool: true, overlayIndex: 1 },
            })
          }
          className="flex mt-4 items-center gap-2"
        >
          More <BsArrowRight />
        </span>
        <span className="absolute bottom-8 right-8">
          <BiMedal className="text-pink-500" size={30} />
        </span>
      </div>
      <div className="relative w-full block rounded-sm border-t-4 border-green-500 p-8 pb-24 shadow-xl">
        <p className="mt-4 text-xlg uppercase font-medium text-gray-500">
          Prevents Tumor
        </p>
        <p className="mt-4 text-xlg font-medium text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, culpa!
        </p>
        <span
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_OVERLAY,
              payload: { bool: true, overlayIndex: 1 },
            })
          }
          className=" mt-8 flex items-center gap-2"
        >
          More <BsArrowRight />
        </span>
        <span className="absolute bottom-8 right-8">
          <BiMedal className="text-green-500" size={30} />
        </span>
      </div>
      <div className="relative w-full block rounded-sm border-t-4 border-blue-500 p-8 pb-24 shadow-xl">
        <p className="mt-4 text-xlg uppercase font-medium text-gray-500">
          Prevents Tumor
        </p>
        <p className="mt-4 text-xlg font-medium text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, culpa!
        </p>
        <span
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_OVERLAY,
              payload: { bool: true, overlayIndex: 1 },
            })
          }
          className="mt-8 flex items-center gap-2"
        >
          More <BsArrowRight />
        </span>
        <span className="absolute bottom-8 right-8">
          <BiMedal className="text-blue-500" size={30} />
        </span>
      </div>
      <div className="relative w-full block rounded-sm border-t-4 border-[#FF7308] p-8 pb-24 shadow-xl">
        <p className="mt-4 text-xlg uppercase font-medium text-gray-500">
          Prevents Tumor
        </p>
        <p className="mt-4 text-xlg font-medium text-gray-500">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed, culpa!
        </p>
        <span
          onClick={() =>
            dispatch({
              type: ACTIONS.TOGGLE_OVERLAY,
              payload: { bool: true, overlayIndex: 1 },
            })
          }
          className="mt-8 flex items-center gap-2"
        >
          More <BsArrowRight />
        </span>
        <span className="absolute bottom-8 right-8">
          <BiMedal className="text-[#FF7308]" size={30} />
        </span>
      </div>
    </div>
  );
};

export default MobileBenefits;
