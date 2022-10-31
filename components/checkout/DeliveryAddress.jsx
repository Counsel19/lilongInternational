import DAddressStyles from "../../styles/checkout/DeliveryAddress.module.css";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const DeliveryAddress = () => {
  const { user } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });
  return (
    <div className={DAddressStyles.container}>
      {user && user.address && (
        <div className={DAddressStyles.address}>
          <h4>
            <span>
              Hi! {user.firstname} {user.lastname}
            </span>
            , your product(s) will be delivered to:
          </h4>

          <p>
            <span>Address: </span> {user.address}
          </p>
          <p>
            <span>Phone: </span> {user.phone}
          </p>

          <span>Change Address</span>
        </div>
      )}
      {user && !user.address && (
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
