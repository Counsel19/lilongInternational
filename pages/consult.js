import ConsultStyles from "../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";

const ConsultTherapist = ({ problemCategory }) => {
  return (
    <div>
      <Head>
        <title>Lilong International: Consult Therapist!</title>
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

      <div className={ConsultStyles.container}>
        <div className={ConsultStyles.formWrap} style={{ width: "42vw" }}>
          <h2>Consult Therapist!</h2>
          <p></p>
          <form>
            <div className={ConsultStyles.formLine}>
              <div className={ConsultStyles.formGroup}>
                <label htmlFor="firstname">Firstname</label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Eg. Micheal"
                />
              </div>

              <div className={ConsultStyles.formGroup}>
                <label htmlFor="lastname">Lastname</label>
                <input name="lastname" type="text" placeholder="Eg. Robinson" />
              </div>
            </div>
            <div className={ConsultStyles.formLine}>
              <div className={ConsultStyles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter a valid email"
                />
              </div>

              <div className={ConsultStyles.formGroup}>
                <label htmlFor="contact">Contact</label>
                <input
                  name="contact"
                  type="contact"
                  placeholder="+23490765757"
                />
              </div>
            </div>

            <div className={ConsultStyles.formLine}>
              <div className={ConsultStyles.formGroup}>
                <label htmlFor="country">Country</label>
                <input name="country" type="text" placeholder="Your Country" />
              </div>

              <div className={ConsultStyles.formGroup}>
                <label htmlFor="state">State/Province</label>
                <input name="state" type="state" placeholder="your state" />
              </div>
            </div>

            <div className={ConsultStyles.formGroup}>
              <label htmlFor="address">Select Problem Category</label>
              <select defaultValue="Obesity" name="problemCategory">
                {problemCategory.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className={ConsultStyles.formGroup}>
              <label htmlFor="address">Describe Challenge</label>
              <textarea name="describeChallenge" id="" rows="10"></textarea>
            </div>

            <input type="submit" value="Submit" />
        </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = () => {
  const problemCategory = [
    "Obesity",
    "Cancer",
    "Alcer",
    "Diabetis",
    "Obesity",
    "Cancer",
    "Alcer",
    "Diabetis",
  ];

  return {
    props: {
      problemCategory,
    },
  };
};

export default ConsultTherapist;
