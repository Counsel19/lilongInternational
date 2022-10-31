import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import ApplyStyles from "../../styles/Login.module.css";
import Head from "next/head";
import { useRouter } from "next/router";

const Apply = () => {
  const { affiliateDetails } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!affiliateDetails) {
      router.push("/become-an-affiliate");
    }
  });

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

      <div className={ApplyStyles.container}>
        {affiliateDetails && (
          <div className={ApplyStyles.formWrap} style={{ width: "42vw" }}>
            <h2>Register as Affiliate!</h2>
            <p>
              Your selected plan is - <span>{affiliateDetails?.name}</span>
            </p>
            <form>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    id="firstname"
                    name="firstname"
                    type="text"
                    placeholder="Eg. Micheal"
                  />
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    name="lastname"
                    type="text"
                    placeholder="Eg. Robinson"
                  />
                </div>
              </div>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Please enter a valid email"
                  />
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="phone">Contact/Phone</label>
                  <input name="phone" type="text" placeholder="+23490191823" />
                </div>
              </div>

              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="country">Country</label>
                  <input
                    name="country"
                    type="text"
                    placeholder="Your Country"
                  />
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="state">State/Province</label>
                  <input name="state" type="state" placeholder="your state" />
                </div>
              </div>

              <input type="submit" value="Proceed" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;
