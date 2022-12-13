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

const color = ["#7e88ef", "#f7890e", "#3fb757", "#7bcaec", "#9f2dcb"];

const AdminSidebar = () => {
  const { handleLogout } = useAppContext();

  const logoutActions = async () => {
    await handleLogout();
    await signOut();
  };

  return (
    <div className={ASidebarStyles.container}>
      <div
        className={`border-b  py-2 flex justify-center gap-1 items-center ${ASidebarStyles.header}`}
      >
        <p className="font-bold text-lg text-blue-900">Lilong International</p>
      </div>

      <div className={`p-4 space-y-12 ${ASidebarStyles.menu}`}>
        <div className="space-y-2">
          <h1 className="text-gray-400">Menu</h1>
          <div>
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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

export default AdminSidebar;
