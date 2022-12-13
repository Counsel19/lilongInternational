import NavStyles from "../styles/Navbar.module.css";
import Image from "next/image";
import CustomLink from "./CustomLink";
import { BsCart3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useAppContext } from "../context/AppContext";
import {
  RiArrowDropDownLine,
  RiArrowDropUpLine,
  RiMenu3Line,
} from "react-icons/ri";
import { signOut } from "next-auth/react";
import { useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";

const Account = () => {
  const { user, handleLogout, showDropdown, handleSetShowDropdown } =
    useAppContext();

  const btnRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!btnRef.current.contains(e.target)) {
        handleSetShowDropdown(false);
      }
    };

    document.body.addEventListener("click", handler);

    return () => document.body.removeEventListener("click", handler);
  }, []);

  const logoutActions = async () => {
    await handleLogout();
    await signOut();
  };

  return (
    <div className={NavStyles.account}>
      <div
        className="flex justify-center w-full items-center"
        ref={btnRef}
        onClick={() => handleSetShowDropdown(!showDropdown)}
      >
        <span className={NavStyles.userName}>
          {user.firstname.length > 7
            ? user.firstname.slice(0, 5) + `...`
            : user.firstname}
          , Welcome!
        </span>
        <AiOutlineUser className={NavStyles.userIcon} />
        {showDropdown ? (
          <RiArrowDropUpLine className={NavStyles.icon} />
        ) : (
          <RiArrowDropDownLine className={NavStyles.icon} />
        )}
      </div>
      {showDropdown && (
        <div className={NavStyles.dropdown}>
          <span>
            <CustomLink url="/profile" element="Account" />
          </span>
          <span>
            <CustomLink url="/orders" element="Orders" />
          </span>
          <span>
            <CustomLink url="/saved" element="Saved Items" />
          </span>
          <span onClick={logoutActions}>Logout</span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { numOfCartItems, user, handleInputChange } = useAppContext();

  return (
    <div className={NavStyles.container}>
      <div className={NavStyles.left}>
        <ul>
          <li>
            <CustomLink url="/products" element="Product" />
          </li>

          <li>
            <CustomLink url="/consult" element="Consult Therapist" />
          </li>
          <li>
            <CustomLink url="/become-an-affiliate" element="Be an Affiliate" />
          </li>
        </ul>
      </div>
      <CustomLink
        url="/"
        element={
          <div className={NavStyles.center}>
            <div className={NavStyles.imgWrapper}>
              <Image
                src="/images/lilong.png"
                alt="Lilong Logo"
                objectFit="cover"
                layout="fill"
                className={NavStyles.img}
              />
            </div>
            Lilong International
          </div>
        }
      />
      <div className={NavStyles.right}>
        <ul>
          <div className="flex items-center">
            <button
              onClick={() => handleInputChange("showSearchModal", true)}
              className=" text-blue-800 bg-white py-2 px-3 rounded-md"
            >
              <IoSearch size={25} />
            </button>
          </div>
          {!user ? (
            <li>
              <CustomLink url="/login" element="Login" />
            </li>
          ) : (
            <li>
              <Account />
            </li>
          )}
          <li className={NavStyles.cartBtn}>
            <CustomLink
              url="/cart"
              element={
                <>
                  <BsCart3 className={NavStyles.icon} />{" "}
                  <span>{numOfCartItems}</span>
                </>
              }
            />
          </li>
        </ul>
      </div>

      <div className={NavStyles.menu}>
        <span
          className="cursor-pointer"
          onClick={() => handleInputChange("showMobileNav", true)}
        >
          <RiMenu3Line size={23} />
        </span>
        <span className={NavStyles.cartBtn}>
          <CustomLink
            url="/cart"
            element={
              <>
                <BsCart3 size={23} className={NavStyles.icon} />{" "}
                <span>{numOfCartItems}</span>
              </>
            }
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
