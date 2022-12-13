import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import OrderStyles from "../../styles/account/OrderItem.module.css";
import { format } from "date-fns";

const useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};

const OrderItem = ({ orderProduct, orderDetails }) => {
  const { isLoading } = useAppContext();
  const router = useRouter();

  const handleNavigate = () => {
    router.push({
      pathname: `/orders/${orderProduct?._id}`,
    });
  };
  const buyAgain = (item) => {
    router.push({
      pathname: `/products/${item.name.split(" ").join("-")}`,
      query: { id: item.id },
    });
  };

  return (
    <div className={OrderStyles.container}>
      <div className={OrderStyles.parent}>
        <div className={OrderStyles.header}>
          <h3>{orderProduct.state}</h3>
          <div className="flex flex-col gap-1">
            <p className="text-sm">
              <span className="font-semibold">Date: </span>
              {format(
                new Date(orderProduct.createdAt),
                "do, MMM, yyyy, k:m"
              )}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Transaction ID: </span>
              {orderProduct.transactionId}
            </p>
          </div>
        </div>

        <div className={OrderStyles.wrapper}>
          {orderProduct.productsData.map((item) => (
            <div key={item._id} className={`${OrderStyles.item} flex justify-between items-center`}>
              <div className={OrderStyles.productInfo}>
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={110}
                  height={110}
                  objectFit="contain"
                />

                <div className={OrderStyles.details}>
                  <h3>{item?.name}</h3>
                  <div className={OrderStyles.prices}>
                    <h4>Bought At: &#8358;{item?.price}</h4>
                  </div>

                  <div className={OrderStyles.selectQuantity}>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
              </div>

              <div className={OrderStyles.action}>
                {orderDetails ? (
                  <span onClick={() => buyAgain(item)}>Buy Again </span>
                ) : (
                  <span onClick={handleNavigate}>See Details &gt;</span>
                )}
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
