import BDetailsStyles from "../../styles/home/BenefitDetails.module.css";
import { useAppContext } from "../../context/AppContext";
import * as ACTIONS from "../../context/actions";
import { MdOutlineClose } from "react-icons/md";

const BenefitDetails = () => {
  const { overlayIndex, dispatch } = useAppContext();
  return (
    <div className={BDetailsStyles.container}>
      <div className={BDetailsStyles.wrapper}>
        {overlayIndex === 1 && (
          <article>
            <h2>The prevention of tumor</h2>
            <p>
              The spectrum energy makes the blood vessel dilate through the warm
              heat effect, reduces the pressure inside the blood vessel, makes
              the blood pressure return to normal, simultaneously the metabolism
              acceleration, the blood purification makes the blood lipid blood
              viscosity to be reduced.
            </p>
            <p>
              The enhancement of cell vitality enables the function of islet
              cells to be restored, the secretion and utilization of insulin
              reach a balance, and the blood sugar naturally returns to normal.
            </p>

            <MdOutlineClose
            size={24}
              className={BDetailsStyles.icon}
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: false, overlayoverlayIndex: null },
                })
              }
            />
          </article>
        )}
        {overlayIndex === 2 && (
          <article>
            <h2> Remove toxins and purify the internal body environment</h2>
            <p>
              The spectrum energy makes the blood vessel dilate through the warm
              heat effect, reduces the pressure inside the blood vessel, makes
              the blood pressure return to normal, simultaneously the metabolism
              acceleration, the blood purification makes the blood lipid blood
              viscosity to be reduced.
            </p>
            <p>
              The enhancement of cell vitality enables the function of islet
              cells to be restored, the secretion and utilization of insulin
              reach a balance, and the blood sugar naturally returns to normal.
            </p>

            <MdOutlineClose
              size={30}
              className={BDetailsStyles.icon}
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: false, overlayoverlayIndex: null },
                })
              }
            />
          </article>
        )}
        {overlayIndex === 3 && (
          <article>
            <h2>
              Replenish energy and restore the body&apos;s ability to heal
              itself
            </h2>
            <p>
              The spectrum energy makes the blood vessel dilate through the warm
              heat effect, reduces the pressure inside the blood vessel, makes
              the blood pressure return to normal, simultaneously the metabolism
              acceleration, the blood purification makes the blood lipid blood
              viscosity to be reduced.
            </p>
            <p>
              The enhancement of cell vitality enables the function of islet
              cells to be restored, the secretion and utilization of insulin
              reach a balance, and the blood sugar naturally returns to normal.
            </p>

            <MdOutlineClose
              size={24}
              className={BDetailsStyles.icon}
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: false, overlayoverlayIndex: null },
                })
              }
            />
          </article>
        )}
        {overlayIndex === 4 && (
          <article>
            <h2> Pressure to reduce fat, viscosity and sugarf</h2>
            <p>
              The spectrum energy makes the blood vessel dilate through the warm
              heat effect, reduces the pressure inside the blood vessel, makes
              the blood pressure return to normal, simultaneously the metabolism
              acceleration, the blood purification makes the blood lipid blood
              viscosity to be reduced.
            </p>
            <p>
              The enhancement of cell vitality enables the function of islet
              cells to be restored, the secretion and utilization of insulin
              reach a balance, and the blood sugar naturally returns to normal.
            </p>

            <MdOutlineClose
              size={24}
              className={BDetailsStyles.icon}
              onClick={() =>
                dispatch({
                  type: ACTIONS.TOGGLE_OVERLAY,
                  payload: { bool: false, overlayoverlayIndex: null },
                })
              }
            />
          </article>
        )}
      </div>
    </div>
  );
};

export default BenefitDetails;
