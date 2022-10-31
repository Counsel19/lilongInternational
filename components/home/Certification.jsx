import CertStyles from "../../styles/home/Certification.module.css";
import Image from "next/image";

const Certification = () => {
  return (
    <div className={CertStyles.container}>
      <h2>Certifications</h2>

      <div className={CertStyles.articles}>
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

            <span>View</span>
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

            <span>View</span>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Certification;
