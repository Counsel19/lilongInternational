import OffersStyles from "../../styles/home/Offers.module.css";
import { BsArrowRight } from "react-icons/bs";
import VideoPlayer from "../VideoPlayer";
import Link from "next/link";

const Offers = () => {
  return (
    <div className={OffersStyles.container}>
      <article className={OffersStyles.articleType1}>
        <div className={OffersStyles.left}>
          <div className={OffersStyles.backdrop}></div>
          <div className={OffersStyles.videoContainer}>
            <VideoPlayer
              cloud_name="counselokpabi"
              publicId="lilong_products-2"
            />
          </div>
        </div>

        <div className={OffersStyles.right}>
          <h3 className="text-xl font-semibold leading-normal mt-0 mb-2 text-blue-800  text-center lg:text-left">
            Buy Approved and Verified Healthcare Products
          </h3>

          <p className=" text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
            Having passed through various R&D sequences, these products are
            beyond doubt safe, reliable and conducive to use. Apart from being
            used as a stand alone therapy, they can also be used as an adjuvant
            to all other therapies and treatment(s) you are on.
          </p>

          <Link href="/products">
            <a className="text-center flex w-full" >
              Shop Now <BsArrowRight />
            </a>
          </Link>
        </div>
      </article>

      <article className={OffersStyles.articleType2}>
        <div className={OffersStyles.left}>
          <div className={OffersStyles.leftDetails}>
            <h3 className="text-xl font-semibold leading-normal mt-0 mb-2 text-blue-800  text-center lg:text-left">
              Become an Affiliate Marketer Today!
            </h3>

            <p className="text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800"></p>

            <Link href="/become-an-affiliate">
              <a>
                Become an Affiliate <BsArrowRight />
              </a>
            </Link>
          </div>
        </div>
        <div className={OffersStyles.right}>
          <div className={OffersStyles.backdrop}></div>
          <div className={OffersStyles.videoContainer}>
            <VideoPlayer
              cloud_name="counselokpabi"
              publicId="marketting_team"
            />
          </div>
        </div>
      </article>

      <article className={OffersStyles.articleType1}>
        <div className={OffersStyles.left}>
          <div className={OffersStyles.backdrop}></div>
          <div className={OffersStyles.videoContainer}>
            <VideoPlayer cloud_name="counselokpabi" publicId="therapist" />
          </div>
        </div>

        <div className={OffersStyles.right}>
          <h3 className="text-xl font-semibold leading-normal mt-0 mb-2 text-blue-800 text-center lg:text-left">
            Consult Therapist for Medical Enquiry
          </h3>

          <p className=" text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            excepturi rem et dignissimos numquam ipsum. Alias quia reiciendis
            unde repudiandae ullam quas beatae, tempora dolor fugit
            reprehenderit!
          </p>

          <Link href="/consult">
            <a>
              Consult Therapist
              <BsArrowRight />
            </a>
          </Link>
        </div>
      </article>
    </div>
  );
};

export default Offers;
