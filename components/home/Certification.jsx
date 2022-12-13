import CertStyles from "../../styles/home/Certification.module.css";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReturnWrapper = ({ settings, children }) => {
  return (
    <>
      <div className={CertStyles.largeScreenWrap}>{children}</div>
      <div className={CertStyles.smallScreenWrap}>
        <Slider {...settings}>{children}</Slider>
      </div>
    </>
  );
};

const Certification = () => {
  let settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 1,
  };
  return (
    <div className={CertStyles.container}>
      <h2>Certifications</h2>

      <div className={CertStyles.articles}>
        <ReturnWrapper settings={settings}>
          <article>
            <div className={CertStyles.imgWrapper}>
              <div className={CertStyles.imgContainer}>
                <Image
                  src="/images/after-sales-service.png"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className={CertStyles.details}>
              <h4>
                Lilongs {"Five-Star"} National Commodities After-Sale Service
                Certified as Qualified
              </h4>

              {/* <span>View</span> */}
            </div>
          </article>
          <article>
            <div className={CertStyles.imgWrapper}>
              <div className={CertStyles.imgContainer}>
                <Image
                  src="/images/lilong-honors.jpg"
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className={CertStyles.details}>
              <h4>
                These honors represent the public’s acceptance of Lilong and its
                products
              </h4>

              {/* <span>View</span> */}
            </div>
          </article>
        </ReturnWrapper>
      </div>
    </div>
  );
};

export default Certification;
