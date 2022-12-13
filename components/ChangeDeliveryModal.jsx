import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import { useAppContext } from "../context/AppContext";

const ChangeDeliveryModal = () => {
  const { handleInputChange } = useAppContext();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const update = () => {
    handleInputChange("currentDeliveryAddress", address);
    handleInputChange("currentDeliveryPhone", phone);
    handleInputChange("deliveryModal", false);
  };

  return (
    <div className="w-full md:w-1/3 mx-auto relative">
      <div className="flex flex-col p-5 rounded-lg shadow bg-white">
        <h2 className="font-semibold text-xl mb-4 text-gray-500">Change Address</h2>
        <span style={{ color: "red" }}>
          <GrClose
            className="absolute top-4 right-4 cursor-pointer"
            size={22}
            onClick={() => handleInputChange("deliveryModal", false)}
          />
        </span>

        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <div className="flex gap-2 flex-col mb-4">
              <label htmlFor="email">Delivery Address</label>
              <input
                className=" block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter Address"
              />
            </div>
            <div className="flex gap-2 flex-col">
              <label htmlFor="phone">Delivery Phone Contact</label>
              <input
                className=" block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
                type="text"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter Phone Contact"
              />
            </div>
          </div>
          <button
            onClick={update}
            className=" bg-blue-800 text-white py-2 px-3 rounded-md"
          >
            Use this
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeDeliveryModal;
