import Plan from "../../components/Plan";
import SPlanStyles from "../../styles/becomeAffiliate/SelectPlan.module.css";
import Head from "next/head";

const plans = [
  {
    id: 1,
    name: "Starter Plan",
    price: "4",
    benefits: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
    bg: "rgb(241, 240, 237)",
  },
  {
    id: 2,
    name: "Standard Plan",
    price: "8",
    benefits: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
    bg: " #d9ffea",
  },
  {
    id: 3,
    name: "Advanced Plan",
    price: "16",
    benefits: [
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
      "Lorem ipsum dolor sit amet",
    ],
    bg: " #ebedff",
  },
];

const SelectPlan = () => {
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

      <div className={SPlanStyles.container}>
        <h2>Select an Affiliate Plan</h2>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum iste
          illo blanditiis velit
        </p>

        <div className={SPlanStyles.plans}>
          {plans.map((item) => (
            <Plan key={item.id} plan={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
