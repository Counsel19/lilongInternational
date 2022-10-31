import BenefitsStyles from "../../styles/home/Benefits.module.css";
import { BsArrowRight } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import * as ACTIONS from "../../context/actions";

const Benefits = () => {
  const { dispatch } = useAppContext();

  return (
    <div className={BenefitsStyles.container}>
      <h1> Products Benefits</h1>
      <div className={BenefitsStyles.wrapper}>
        <div className={BenefitsStyles.shape}>
          <article className={BenefitsStyles.article0}>
            <h2>Lilong Products</h2>
          </article>

          <article className={BenefitsStyles.article1}>
            <h3>Prevents Tumor</h3>

            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: true, overlayIndex: 1 },
                })
              }
            >
              More <BsArrowRight />
            </span>
          </article>
          <article className={BenefitsStyles.article2}>
            <h3>Remove Toxins and Purify Body</h3>

            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: true, overlayIndex: 2 },
                })
              }
            >
              More <BsArrowRight />
            </span>
          </article>
          <article className={BenefitsStyles.article3}>
            <h3>Replenish Energy and Healing</h3>

            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: true, overlayIndex: 3 },
                })
              }
            >
              More <BsArrowRight />
            </span>
          </article>
          <article className={BenefitsStyles.article4}>
            <h3>Reduce fat, Viscosity, Sugar</h3>

            <span
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: true, overlayIndex: 4 },
                })
              }
            >
              More <BsArrowRight />
            </span>
          </article>
        </div>

        <div className={BenefitsStyles.details}>
          <h3>
            You cannot Afford to miss this <br />
            <span>Amazing Benefits</span>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
