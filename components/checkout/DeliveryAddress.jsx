import DAddressStyles from "../../styles/checkout/DeliveryAddress.module.css";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const DeliveryAddress = () => {
  const { user, currentDeliveryAddress, handleInputChange, currentDeliveryPhone } =
    useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  return (
    <div className={DAddressStyles.container}>
      {user && user.deliveryAddress && (
        <div className={DAddressStyles.deliveryAddress}>
          <h4>
            <span>
              Hi! {user.firstname} {user.lastname}
            </span>
            , your product(s) will be delivered to:
          </h4>

          <p>
            <span>Address: </span>
            {currentDeliveryAddress || user.deliveryAddress}
          </p>
          <p>
            <span>Phone: </span> {currentDeliveryPhone || user.phone}
          </p>

          <span onClick={() => handleInputChange("deliveryModal", true)} className="bg-white cursor-pointer flex w-fit text-blue-700 border border-blue-700 rounded px-2 py-2 mt-4">
            Change Address
          </span>
        </div>
      )}
      {user && !user.deliveryAddress && (
        <div className={DAddressStyles.noAddress}>
          <p>
            Hi!{" "}
            <span>
              {user.firstname} {user.lastname}
            </span>
            , Please add an addess for delivery
          </p>

          <p>
            Your product should be delivered to you in 2 days around lagos and
            about 5 days outside Lagos
          </p>

          <span>Add Address</span>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
