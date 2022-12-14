import footerStyles from "../../styles/home/Footer.module.css";
import Link from "next/link";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BsTelephone, BsTwitter, BsInstagram, BsWhatsapp } from "react-icons/bs";
import { IoMailOutline } from "react-icons/io5";
import { FaFacebookF } from "react-icons/fa";
import { IoLogoGoogleplus } from "react-icons/io";
import { VscArrowSmallRight } from "react-icons/vsc";

const CustomLink = ({ Component }, ref) => {
  return <Component ref={ref} className={footerStyles.icon} />;
};

const Footer = () => {
  return (
    <div className={footerStyles.container}>
      <div className={footerStyles.top}>
        <div className={footerStyles.contacts}>
          <h2>Get in Touch</h2>
          <div className={footerStyles.contact}>
            <HiOutlineLocationMarker className={footerStyles.icon} />
            <div className={footerStyles.details}>
              <span>119 Obafemi Awolowo way</span>
              <span>119 Obafemi Awolowo way</span>
            </div>
          </div>
          <div className={footerStyles.contact}>
            <IoMailOutline className={footerStyles.icon} />
            <div className={footerStyles.details}>lilong@international.com</div>
          </div>
          <div className={footerStyles.contact}>
            <BsTelephone className={footerStyles.icon} />
            <div className={footerStyles.details}>
              <span>+234-7458-4544</span>
              <span>+234-7458-4544</span>
            </div>
          </div>
        </div>

        <div className={footerStyles.link}>
          <h2>Top Links</h2>
          <ul>
            <li>
              <Link href="/shop">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} /> All
                  Products
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#about">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} /> About
                  Company
                </a>
              </Link>
            </li>
            <li>
              <Link href="/#consult">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} />
                  Consultation
                </a>
              </Link>
            </li>
            <span>Customer Insights</span>
            <li>
              <Link href="/article/weight-loss">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} /> Weight
                  Loss
                </a>
              </Link>
            </li>
            <li>
              <Link href="/article/infrared-suana">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} /> 30
                  Benefits of Using the Infrared Suana
                </a>
              </Link>
            </li>
            <li>
              <Link href="/article/proper-diet">
                <a>
                  <VscArrowSmallRight className={footerStyles.icon} /> Proper
                  Diet
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className={footerStyles.schedule}>
          <h2>Our Time Schedule</h2>

          <div>
            <p>Monday - Friday </p>
            <span>8am - 6pm</span>
          </div>
          <div>
            <p>Saturday - Sunday </p>
            <span>10am - 6pm</span>
          </div>
        </div>

        <div className={footerStyles.others}>
          <h2>Follow us on</h2>
          <div className="my-6 flex gap-4 mb-6">
            <button
              className="bg-white flex text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <BsTwitter />
            </button>
            <button
              className="bg-white flex text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <BsInstagram />
            </button>
            <button
              className="bg-white  flex text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <FaFacebookF />
            </button>
            <button
              className="bg-white flex text-gray-800 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
              type="button"
            >
              <BsWhatsapp />
            </button>
          </div>

          <div className={footerStyles.btn}>
            <Link href="/products">
              <a>
                <button>Buy Products</button>
              </a>
            </Link>

            <button>Consult Therapist</button>
            <button>Become and Affiliate</button>
          </div>
        </div>
      </div>
      <div className={footerStyles.bottom}>
        &copy; Lilong International 2022
      </div>
    </div>
  );
};

export default Footer;
