import Head from "next/head";
import { useAppContext } from "../../context/AppContext";
import ApplicationStyles from "../../styles/becomeAffiliate/ApplicationSummary.module.css";
import { BsCheckSquare } from "react-icons/bs";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

const ApplicationSummary = () => {
  const { affiliateDetails, handleApplyAffiliate } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!affiliateDetails) {
      router.push("/become-an-affiliate");
    }
  });

  const handleProceed = async () => {
    const url = await handleApplyAffiliate();
    if (url) {
      router.push(url);
    }
  };

  return (
    <div>
      <Head>
        <title>Lilong International: Become an Affiliate</title>
        <meta
          name="description"
          content="Lilong International Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {affiliateDetails ? (
        <div className={ApplicationStyles.container}>
          <div className={ApplicationStyles.wrapper}>
            <h2>Application Summary</h2>

            <p>
              You are apply for an affiliate plan with the following details
            </p>

            <div className={ApplicationStyles.details}>
              <div className={ApplicationStyles.line}>
                <h3>{affiliateDetails.name}</h3>
                <h2>&#8358; {affiliateDetails.price}</h2>
              </div>

              <div className={ApplicationStyles.items}>
                <h3>You stand to gain </h3>
                {affiliateDetails.benefits.map((items, index) => (
                  <div key={index} className={ApplicationStyles.item}>
                    <BsCheckSquare className={ApplicationStyles.icon} />
                    {items}
                  </div>
                ))}
              </div>
            </div>
            <button
              type="button"
              onClick={handleProceed}
              className={ApplicationStyles.btn}
            >
              Proceed to pay
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <TailSpin />
        </div>
      )}
    </div>
  );
};

export default ApplicationSummary;
