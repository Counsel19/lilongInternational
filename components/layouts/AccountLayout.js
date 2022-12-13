import Navbar from "../../components/Navbar";
import { Footer } from "./../home";
import { useAppContext } from "../../context/AppContext";
import AccountLayoutStyles from "../../styles/Layout.module.css";
import { useEffect, useState } from "react";
import { AccountSidebar } from "../account";
import { BsViewList } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const AccountLayout = ({ children }) => {
  const { errorMessage, successMessage, user, getUser, clearMessage } =
    useAppContext();

  const [showAccMobileNav, setShowAccMobileNav] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    const getData = async () => {
      if (!user) {
        await getUser();
      }
    };

    getData();
  }, [router, session]);

  return (
    <div>
      <Navbar />
      {errorMessage ? (
        <div className={AccountLayoutStyles.errorAlert} role="alert">
          <strong className={AccountLayoutStyles.msg}>{errorMessage}!</strong>

          <span
            className={AccountLayoutStyles.closeIcon}
            onClick={clearMessage}
          >
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

      {successMessage && (
        <div className={AccountLayoutStyles.successAlert} role="alert">
          <strong className={AccountLayoutStyles.msg}>{successMessage}!</strong>

          <span
            className={AccountLayoutStyles.closeIcon}
            onClick={clearMessage}
          >
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}

      <div className={AccountLayoutStyles.account}>
        <div className={AccountLayoutStyles.accountSidebar}>
          <AccountSidebar setShowAccMobileNav={setShowAccMobileNav} />
        </div>
        <div className={AccountLayoutStyles.MobileAccNav}>
          <span onClick={() => setShowAccMobileNav(!showAccMobileNav)}>
            {!showAccMobileNav ? (
              <BsViewList
                size={29}
                className="text-blue-800 cursor-pointer border border-blue-800 "
              />
            ) : (
              <IoMdClose
                size={29}
                className="text-rose-800 cursor-pointer border border-rose-800 "
              />
            )}
          </span>
          {showAccMobileNav && (
            <AccountSidebar setShowAccMobileNav={setShowAccMobileNav} />
          )}
        </div>
        <div className={AccountLayoutStyles.children}>{children}</div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountLayout;
