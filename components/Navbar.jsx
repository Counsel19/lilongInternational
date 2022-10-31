import NavStyles from "../styles/Navbar.module.css";
import Image from "next/image";
import CustomLink from "./CustomLink";
import { BsCart3 } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useState } from "react";

const Account = () => {
  const { user, handleLogout } = useAppContext();

  const [showDropdown, setShowDropdown] = useState(false);
const logout = async () => {
  
}

  return (
    <div
      className={NavStyles.account}
      onClick={() => setShowDropdown(!showDropdown)}
    >
      {user.firstname}, Welcome!
      {showDropdown ? (
        <RiArrowDropUpLine className={NavStyles.icon} />
      ) : (
        <RiArrowDropDownLine className={NavStyles.icon} />
      )}
      {showDropdown && (
        <div className={NavStyles.dropdown}>
          <span>
            <CustomLink url="/account" element="Account" />
          </span>
          <span>
            <CustomLink url="/orders" element="Orders" />
          </span>
          <span>
            <CustomLink url="/saved-items" element="Saved Items" />
          </span>
          <span onClick={handleLogout}>Logout</span>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { numOfCartItems, user } = useAppContext();
  return (
    <div className={NavStyles.container}>
      <div className={NavStyles.left}>
        <ul>
          <li>
            <CustomLink url="/products" element="Product" />
          </li>
          <li>
            <CustomLink url="#benefits" element="Benefits" />
          </li>

          <li>
            <CustomLink url="/consult" element="Consult Therapist" />
          </li>
        </ul>
      </div>
      <CustomLink
        url="/"
        element={
          <div className={NavStyles.center}>
            <Image
              src="/images/lilong.png"
              alt="Lilong Logo"
              width={60}
              height={60}
              className={NavStyles.img}
            />
            Lilong International
          </div>
        }
      />
      <div className={NavStyles.right}>
        <ul>
          <li>
            <CustomLink url="/become-an-affiliate" element="Be an Affiliate" />
          </li>
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
    </div>
  );
};

export default Navbar;
