import ASidebarStyles from "../../styles/admin/AdminSidebar.module.css";
import Link from "next/link";
import { BiAddToQueue, BiCategory, BiHomeCircle } from "react-icons/bi";
import { FaListUl } from "react-icons/fa";
import { GoSettings } from "react-icons/go";
import { BsBag, BsFillPeopleFill, BsGraphUp, BsPower } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { signOut } from "next-auth/react";
import { useAppContext } from "../../context/AppContext";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";

const color = ["#7e88ef", "#f7890e", "#3fb757", "#7bcaec", "#9f2dcb"];

const MobileAdminSidebar = () => {
  const { handleLogout, user, handleInputChange } = useAppContext();
  const [localInputSearch, setLocalSearchInput] = useState("");
  const router = useRouter()
  const logoutActions = async () => {
    await handleLogout();
    await signOut();
    router.push("/login")
  };

  const handleSearch = () => {
    handleInputChange("search", localInputSearch);
    handleInputChange("showMobileNav", false);
    router.push("/admin/products");
  };

  return (
    <div className={ASidebarStyles.mobileSidebarContainer}>
      <div className={ASidebarStyles.header}>
        <p className="font-bold text-lg">Lilong International</p>

        <span>
          {user?.firstname} {user?.lastname}{" "}
        </span>
        <span>Admin</span>
      </div>

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

      <div className={`p-4 space-y-12 ${ASidebarStyles.menu}`}>
        <div className="space-y-2">
          <h1 className="text-gray-400">Menu</h1>
          <div  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin">
              <a
                style={{ color: "#7e88ef" }}
                className="flex p-3 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
              >
                <BiHomeCircle size={25} />
                <span className=" font-semibold">Dashboard</span>
              </a>
            </Link>
          </div>
          <div className="" onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/orders">
              <a
                style={{ color: "#f7890e" }}
                className="flex p-3 space-x-4 0 hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
              >
                <BsBag size={25} />
                <span className=" font-semibold">Orders</span>
              </a>
            </Link>
          </div>
          <div className=""  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/products">
              <a
                style={{ color: "#3fb757" }}
                className="flex p-3 space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <FaListUl size={25} />
                <span className=" font-semibold">Products</span>
              </a>
            </Link>
          </div>
          <div className=""  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/customers">
              <a
                style={{ color: "#7bcaec" }}
                className="flex p-3 space-x-4 0 items-center hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <BsFillPeopleFill size={25} />
                <span className=" font-semibold">Customers </span>
              </a>
            </Link>
          </div>
          <div className=""  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/affiliates">
              <a
                style={{ color: "#3fb757" }}
                className="flex p-3 space-x-4 0 items-center hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <BsFillPeopleFill size={25} />
                <span className=" font-semibold">Affiliates </span>
              </a>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-gray-400">Add</h1>
          <div className=""  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/add-product">
              <a
                style={{ color: "#7e88ef" }}
                className="flex p-3 space-x-4 0 items-center hover:bg-gray-50 hover:text-blue-600 cursor-pointer"
              >
                <BiAddToQueue size={25} />
                <span className=" font-semibold">Products</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-gray-400">Reports </h1>
          <div className=""  onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/report">
              <a
                style={{ color: "#9f2dcb" }}
                className="flex p-3 space-x-4 0 items-center hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <BsGraphUp size={25} />
                <span className=" font-semibold">Sales and Affiliates </span>
              </a>
            </Link>
          </div>
          <div className="" onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/notifications">
              <a
                style={{ color: "#f7890e" }}
                className="flex p-3 space-x-4 0 items-center hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <IoMdNotificationsOutline size={25} />
                <span className=" font-semibold">Notifications </span>
              </a>
            </Link>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-gray-400">Settings </h1>
          <div className="" onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/admin-profile">
              <a
                style={{ color: "#3fb757" }}
                className="flex p-3 items-center space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <GoSettings size={25} />
                <span className=" font-semibold">Account </span>
              </a>
            </Link>
          </div>
          <div className="" onClick={() =>  handleInputChange("showMobileNav", false)}>
            <Link href="/admin/site-videos">
              <a
                style={{ color: "#7bcaec" }}
                className="flex p-3 items-center space-x-4 0 hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
              >
                <AiOutlineVideoCamera size={25} />
                <span className=" font-semibold">Videos</span>
              </a>
            </Link>
          </div>
        </div>
        <div className="space-y-6">
          <div className="" onClick={() =>  handleInputChange("showMobileNav", false)}>
            <div
              style={{ color: "#f7890e" }}
              className="flex p-3 space-x-4 items-center hover:bg-gray-50 hover:text-blue-600  cursor-pointer  "
            >
              <BsPower size={25} />
              <span onClick={logoutActions} className=" font-semibold">
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAdminSidebar;
