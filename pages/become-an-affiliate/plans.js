import SPlanStyles from "../../styles/becomeAffiliate/SelectPlan.module.css";
import Head from "next/head";
import PlanList from "../../components/PlanList";

const plans = [
  {
    id: 1,
    name: "Starter Plan",
    price: 60000,
    benefits: [
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
    ],
    missing: [
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
    ],
    msg: "Most basic plan",
  },
  {
    id: 2,
    name: "Standard Plan",
    price: 120000,
    benefits: [
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
    ],
    missing: [
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
    ],
    msg: "Recommended for you",
  },
  {
    id: 3,
    name: "Advanced Plan",
    price: 220000,
    benefits: [
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
      "Possible of annual profit",
      "Products Worth the amount paid",
    ],
    missing: [
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
      "Reducce possible for high profit",
      "Little annual Income",
    ],
    msg: "King of Plans",
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

        <p>Pick your Plan of choice, glad to have you register!!</p>

        <div className={SPlanStyles.plans}>
          {plans.map((item) => (
            <PlanList key={item.id} plan={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectPlan;
