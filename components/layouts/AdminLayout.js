import { useAppContext } from "../../context/AppContext";
import LayoutStyles from "../../styles/Layout.module.css";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { AdminHeader, AdminSidebar, AdminFooter } from "../../components/admin";
import Delete from "../admin/Delete";
import MobileAdminSidebar from "../admin/MobileAdminSidebar";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const {
    deletePrompt,
    errorMessage,
    successMessage,
    clearMessage,
    showMobileNav,
    handleInputChange,
    user,
    getUser,
  } = useAppContext();
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      if (session && !user) {
        
        const user = await getUser();
        if(!user){
          router.push("/login")
        }
      }
    };

    getData();
  }, [router, session]);

  return (
    <div className={LayoutStyles.adminContainer}>
      <div className={LayoutStyles.adminSidebar}>
        <AdminSidebar />
      </div>

      {showMobileNav && (
        <div className={LayoutStyles.adminMobileSidebar}>
          <span style={{ color: "white" }}>
            <MdOutlineClose
              className="absolute top-4 right-4 cursor-pointer"
              size={29}
              onClick={() => handleInputChange("showMobileNav", false)}
            />
          </span>
          <MobileAdminSidebar />
        </div>
      )}

      <div className={LayoutStyles.adminWrapper}>
        <AdminHeader />

        <div className={LayoutStyles.adminInside}>
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

          {successMessage && (
            <div className={LayoutStyles.successAlert} role="alert">
              <strong className={LayoutStyles.msg}>{successMessage}!</strong>

              <span className={LayoutStyles.closeIcon} onClick={clearMessage}>
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

          {deletePrompt && (
            <div className={LayoutStyles.delete}>
              <Delete {...deletePrompt} />
            </div>
          )}
          {children}
        </div>
        <AdminFooter />
      </div>
    </div>
  );
};

export default Layout;
