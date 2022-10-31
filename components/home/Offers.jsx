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
              publicId="marketting_team"
            />
          </div>
        </div>

        <div className={OffersStyles.right}>
          <h3>Buy Approved and Verified Healthcare Products</h3>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident
            excepturi rem et dignissimos numquam ipsum. Alias quia reiciendis
            unde repudiandae ullam quas beatae, tempora dolor fugit
            reprehenderit!
          </p>

          <Link href="/products">
            <a>
              Shop Now <BsArrowRight />
            </a>
          </Link>
        </div>
      </article>

      <article className={OffersStyles.articleType2}>
        <div className={OffersStyles.left}>
          <div className={OffersStyles.leftDetails}>
            <h3>Become an Affiliate Marketer Today</h3>

            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Provident excepturi rem et dignissimos numquam ipsum. Alias quia
              reiciendis unde repudiandae ullam quas beatae, tempora dolor fugit
              reprehenderit!
            </p>

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
            <VideoPlayer
              cloud_name="counselokpabi"
              publicId="marketting_team"
            />
          </div>
        </div>

        <div className={OffersStyles.right}>
          <h3>Consult Therapist for Medical Enquiry</h3>

          <p>
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
