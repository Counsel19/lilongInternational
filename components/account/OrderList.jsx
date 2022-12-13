import Link from "next/link";
import { useAppContext } from "../../context/AppContext";
import OrderListStyles from "../../styles/cart/CartList.module.css";
import OrderItem from "./OrderItem";

const OrderList = ({ orders }) => {
  return (
    <div className={OrderListStyles.container}>
      {orders?.length === 0 ? (
        <>
          <h3>No Items Ordered</h3>
          <Link href="/products">
            <a className={OrderListStyles.btn}>Buy Products</a>
          </Link>
        </>
      ) : (
        orders?.map((orderProduct) => (
          <div className={OrderListStyles.itemWrapper} key={orderProduct?._id}>
            <OrderItem orderProduct={orderProduct} />
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
