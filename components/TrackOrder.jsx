import React from "react";
import { AiOutlineCar, AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";
import TrackOrderStyles from "../styles/TrackOrder.module.css";

const TrackOrder = ({ orderStatus, id, setCurrentStatus, isAdmin }) => {
  const { updateOrderStatus } = useAppContext();

  const statusClass = (index) => {
    if (orderStatus === "processing") {
      return index === 0 ? TrackOrderStyles.completed : null;
    }
    if (orderStatus === "dispatched") {
      return index <= 1 ? TrackOrderStyles.completed : null;
    }
    if (orderStatus === "delivered") {
      return index <= 2 ? TrackOrderStyles.completed : null;
    }
  };

  const setOrder = async (statusValue) => {
    if (isAdmin) {
      await updateOrderStatus(id, statusValue);
      setCurrentStatus(statusValue);
    }
  };

  return (
    <div className={TrackOrderStyles.container}>
      <h2>Order Status</h2>
      <div
        className={`${TrackOrderStyles.steps} flex justify-between pt-2 pb-1`}
      >
        <div
          className={`${TrackOrderStyles.step} ${statusClass(0)}`}
          onClick={() => setOrder("processing")}
        >
          <div className={TrackOrderStyles.stepIconWrap}>
            <div className={TrackOrderStyles.stepIcon}>
              <AiOutlineSetting />
            </div>
          </div>
          <h4 className={TrackOrderStyles.stepTitle}>Processing Order</h4>
        </div>

        <div
          className={`${TrackOrderStyles.step} ${statusClass(1)}`}
          onClick={() => setOrder("dispatched")}
        >
          <div className={TrackOrderStyles.stepIconWrap}>
            <div className={TrackOrderStyles.stepIcon}>
              <AiOutlineCar />
            </div>
          </div>
          <h4 className={TrackOrderStyles.stepTitle}>Product Dispatched</h4>
        </div>
        <div
          className={`${TrackOrderStyles.step} ${statusClass(2)}`}
          onClick={() => setOrder("delivered")}
        >
          <div className={TrackOrderStyles.stepIconWrap}>
            <div className={TrackOrderStyles.stepIcon}>
              <AiOutlineHome />
            </div>
          </div>
          <h4 className={TrackOrderStyles.stepTitle}>Product Delivered</h4>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
