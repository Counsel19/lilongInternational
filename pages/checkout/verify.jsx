import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import VerifyStyles from "../../styles/checkout/Verify.module.css";
import { useAppContext } from "../../context/AppContext";
import { useSession } from "next-auth/react";
import { TailSpin } from "react-loader-spinner";

const Verify = () => {
  const { verifyPayment, getSideData } = useAppContext();

  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const { reference: ref } = router.query;
    const affiliateUser = JSON.parse(localStorage.getItem("affiliateUser"));
    const affiliateDetails = JSON.parse(
      localStorage.getItem("affiliateDetails")
    );
    let payload;
    if (affiliateUser && affiliateDetails) {
      payload = {
        ...affiliateUser,
        plan: affiliateDetails.name,
      };
    }

    getSideData().then((res) => {
      verifyPayment(ref, payload, res)
        .then((data) => setPaymentDetails(data))
        .catch((error) => {
          router.push("/products");
          console.log(error);
        });
    });
  }, [router]);



  return (
    <div className={VerifyStyles.container}>
      {paymentDetails ? (
        <div className={VerifyStyles.wrapper}>
          <h2>
            {paymentDetails.status === "success"
              ? `Payment Successfull`
              : "Payment Report"}
          </h2>
          <span>
            <IoMdCheckmarkCircleOutline className={VerifyStyles.icon} />
          </span>

          <div className={VerifyStyles.details}>
            <div className={VerifyStyles.line}>
              <h4>Transaction ID: </h4>
              <p>{paymentDetails.transactionId}</p>
            </div>
            <div className={VerifyStyles.line}>
              <h4>Full Name: </h4>
              <p>
                {paymentDetails?.fullname ||
                  `${paymentDetails.firstname} ${paymentDetails.lastname}`}
              </p>
            </div>
            <div className={VerifyStyles.line}>
              <h4>Email: </h4>
              <p>{paymentDetails.email}</p>
            </div>
            <div className={VerifyStyles.line}>
              <h4>Amount: </h4>
              <p>&#x20A6;{paymentDetails.amount / 100}</p>
            </div>
            {paymentDetails.paymentBank && (
              <div className={VerifyStyles.line}>
                <h4>Bank: </h4>
                <p>{paymentDetails.paymentBank}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => router.push("/products")}
            className={VerifyStyles.btn}
          >
            Close
          </button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default Verify;
