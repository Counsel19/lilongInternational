import React, { useState } from "react";
import { BsCart3, BsChat } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import CustomLink from "./CustomLink";
import NavStyles from "../styles/Navbar.module.css";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

const MobileNav = () => {
  const { user, handleInputChange, handleLogout } = useAppContext();
  const [localInputSearch, setLocalSearchInput] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    handleInputChange("search", localInputSearch);
    handleInputChange("showMobileNav", false);
    router.push("/products");
  };
  const logoutActions = async () => {
    handleInputChange("showMobileNav", false);
    await handleLogout();
    await signOut();
  };

  return (
    <div className={NavStyles.mobileContainer}>
      <span
        className="cursor-pointer"
        onClick={() => handleInputChange("showMobileNav", false)}
      >
        <MdOutlineClose className={NavStyles.closeIcon} />
      </span>
      {user ? (
        <header>
          {user?.firstname.length > 7
            ? user.firstname.slice(0, 5) + `...`
            : user.firstname}
          , Welcome!
        </header>
      ) : (
        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <Link href="/login">
            <a>Login Here!</a>
          </Link>
        </span>
      )}
      <div className="flex gap-2 items-center my-4">
        <input
          className=" block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
          type="text"
          name="localInputSearch"
          value={localInputSearch}
          onChange={(e) => setLocalSearchInput(e.target.value)}
          placeholder="Search Products"
        />
        <button
          onClick={handleSearch}
          className=" bg-blue-800 text-white py-2 px-3 rounded-md"
        >
          <IoSearch size={25} />
        </button>
      </div>
      <div className={NavStyles.mobileLinks}>
        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/products" element="Products" />
        </span>

        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/consult" element="Consult Therapist" />
        </span>
        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/become-an-affiliate" element="Be an Affiliate" />
        </span>

        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/profile" element="Profile" />
        </span>
        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/orders" element="Orders" />
        </span>
        <span onClick={() => handleInputChange("showMobileNav", false)}>
          <CustomLink url="/saved" element="Saved Items" />
        </span>

        {user && <span onClick={logoutActions}>Logout</span>}
      </div>
    </div>
  );
};

export default MobileNav;
