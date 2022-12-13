import BenefitsStyles from "../../styles/home/Benefits.module.css";
import { BsArrowRight } from "react-icons/bs";
import { useAppContext } from "../../context/AppContext";
import * as ACTIONS from "../../context/actions";
import MobileBenefits from "./MobileBenefits";
import Link from "next/link";

const Benefits = () => {
  const { dispatch } = useAppContext();

  return (
    <div id="#benefits" className={BenefitsStyles.container}>
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
        <div className={BenefitsStyles.mobileBenefits}>
          <MobileBenefits />
        </div>

        <div className={BenefitsStyles.details}>
          <section class=" h-full lg:h-96 w-full lg:w-80  space-y-6 rounded-2xl">
            <div class="flex justify-end">
              <div class="h-4 w-4 rounded-full bg-gray-900"></div>
            </div>

            <header class="text-center text-xl font-bold text-gray-600">
              Products Benefits
            </header>

            <div className="">
              <p class="text-center leading-[3.5rem] text-5xl font-bold text-gray-900">
                Amazing <br /> Benefits
              </p>
              <p class="text-center leading-[3.5rem]  text-4xl font-bold text-[#FE5401]">
                For You
              </p>
            </div>

            <footer class="mb-10 flex justify-center">
              <Link href="/products">
                <a class="flex items-center rounded-lg bg-[#FF7308] px-3 py-2 text-lg font-bold text-white hover:bg-[#E56707]">
                  <p>Buy Products</p>
                  <svg
                    class="h-9 w-9"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </a>
              </Link>
            </footer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
