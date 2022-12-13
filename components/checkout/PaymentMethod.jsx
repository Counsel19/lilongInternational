import PMStyles from "../../styles/checkout/PaymentMethod.module.css";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";

const PaymentMethod = () => {
  return (
    <div className={PMStyles.container}>
      <div className={PMStyles.wrapper}>
        <div className={PMStyles.card}>
          <Image
            src="/images/paystack.png"
            alt="mastercard"
            height={100}
            width={200}
            objectFit="cover"
          />
        </div>
        <p>Pay with Paystack</p>

        <FaCheckCircle className={PMStyles.icon} />
      </div>
    </div>
  );
};

export default PaymentMethod;
