import numShowStyles from "../../styles/home/NumShow.module.css";
import { ImHappy } from "react-icons/im";
import { GiHealing } from "react-icons/gi";
import { RiHealthBookLine } from "react-icons/ri";

const NumShow = () => {
  return (
    <div className={numShowStyles.container}>
      <div className={numShowStyles.wrapper}>
        <div className={numShowStyles.iconWrapper}>
          <ImHappy className={numShowStyles.icon} />
        </div>
        <span>500+</span>
        <h3>Happy Customers</h3>
      </div>
      <div className={numShowStyles.wrapper}>
        <div className={numShowStyles.iconWrapper}>
          <GiHealing className={numShowStyles.icon} />
        </div>
        <span>99.9%</span>
        <h3>Satisfaction</h3>
      </div>
      <div className={numShowStyles.wrapper}>
        <div className={numShowStyles.iconWrapper}>
          <RiHealthBookLine className={numShowStyles.icon} />
        </div>
        <span>25+</span>
        <h3>Years of Experience</h3>
      </div>
    </div>
  );
};

export default NumShow;
