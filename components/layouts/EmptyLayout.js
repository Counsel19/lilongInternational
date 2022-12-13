import Navbar from "../../components/Navbar";
import { Footer } from "./../home";
import { useAppContext } from "../../context/AppContext";
import LayoutStyles from "../../styles/Layout.module.css";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import SearchModal from "../SearchModal";
import ChangeDeliveryModal from "../ChangeDeliveryModal";
import MobileNav from "../MobileNav";
import { BsWhatsapp } from "react-icons/bs";
import { useRouter } from "next/router";

const EmptyLayout = ({ children }) => {
  const {
    errorMessage,
    user,
    deliveryModal,
    showSearchModal,
    getUser,
    clearMessage,
    showMobileNav,
  } = useAppContext();
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      if (!user) {
        console.log("running");
        await getUser();
      }
    };

    getData();
  }, [router, session]);

  return (
    <div>
      {errorMessage ? (
        <div className={LayoutStyles.errorAlert} role="alert">
          <strong className={LayoutStyles.msg}>{errorMessage}!</strong>

          <span className={LayoutStyles.closeIcon} onClick={clearMessage}>
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      ) : null}
      {showSearchModal && (
        <div className={LayoutStyles.modal}>
          <SearchModal />
        </div>
      )}
      {deliveryModal && (
        <div className={LayoutStyles.modal}>
          <ChangeDeliveryModal />
        </div>
      )}
      {showMobileNav && (
        <div className={LayoutStyles.modal}>
          <MobileNav />
        </div>
      )}
      {children}

      <a
        href="https://wa.me/2348172028728"
        className="whatsapp_float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <BsWhatsapp className={LayoutStyles.whatApp} />
      </a>
    </div>
  );
};

export default EmptyLayout;
