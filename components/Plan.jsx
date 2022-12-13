import PlanStyles from "../styles/becomeAffiliate/Plan.module.css";
import { GiCheckMark } from "react-icons/gi";
import * as ACTIONS from "../context/actions";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";

const Plan = ({ plan }) => {
  const { dispatch, addAffiliateUser, moneyFormat } = useAppContext();
  const router = useRouter();

  const updateAffiliateDetials = () => {
    dispatch({
      type: ACTIONS.UPDATE_AFFILIATE_DETAILS,
      payload: { affiliateDetails: plan },
    });
    addAffiliateUser(plan, "affiliateDetails");
    router.push("/become-an-affiliate/apply");
  };

  return (
    <div
      className={PlanStyles.container}
      style={{
        backgroundColor: `${plan.bg}`,
        border: plan.id === 2 ? "3px solid #1352b9" : null,
        transform: plan.id === 2 ? "scale(1.1)" : null,
      }}
      onClick={updateAffiliateDetials}
    >
      {plan.id === 2 && <span>Recommended</span>}
      <div className={PlanStyles.header}>
        <h3>{plan.name}</h3>
        <h4>{moneyFormat.format(plan.price)}</h4>
      </div>

      <p>{plan.desc}</p>

      <ul>
        {plan.benefits.map((item, index) => (
          <li key={index}>
            <GiCheckMark className={PlanStyles.icon} /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Plan;
