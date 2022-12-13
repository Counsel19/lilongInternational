import { useAppContext } from "../../context/AppContext";
import TotalStyles from "../../styles/checkout/Total.module.css";
import { useRouter } from "next/router";

const Total = () => {
  const { subTotal, initiatePayment, isLoading } = useAppContext();
  const router = useRouter();

  const handleInitPayment = async () => {
    const url = await initiatePayment();
    if (url) router.push(url);
  };

  return (
    <div className={TotalStyles.container}>
      <div className={TotalStyles.wrapper}>
        <div className={TotalStyles.line}>
          <h4>Delivery</h4>
          <p>Free</p>
        </div>
        <div className={TotalStyles.total}>
          <h4>TOTAL</h4>
          <p>&#8358;{subTotal}</p>
        </div>

        <p>Click the button below to make ur payments </p>

        <button disabled={isLoading} onClick={handleInitPayment} className={TotalStyles.btn}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Total;
