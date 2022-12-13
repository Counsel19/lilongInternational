import Link from "next/link";
import SavedListStyles from "../../styles/cart/CartList.module.css";
import SavedItem from "./SavedItem";

const SavedList = ({ products, checkout }) => {
  return (
    <div
      className={
        !checkout ? SavedListStyles.container : SavedListStyles.container2
      }
    >
      {products?.length === 0 ? (
        <>
          <h3>No Items Saved</h3>
          <Link href="/products">
            <a className={SavedListStyles.btn}>Buy Products</a>
          </Link>
        </>
      ) : (
        products?.map((product, index) => (
          <div className={SavedListStyles.itemWrapper} key={product?._id}>
            <div className={SavedListStyles.serialNum}>{index + 1}</div>
            <SavedItem product={product} />
          </div>
        ))
      )}
    </div>
  );
};

export default SavedList;
