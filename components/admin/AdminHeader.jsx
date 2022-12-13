import Image from "next/image";
import Link from "next/link";
import { BsFillMoonFill } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useAppContext } from "../../context/AppContext";
import HeaderStyles from "../../styles/admin/AdminHeader.module.css";
import { useRouter } from "next/router";
import { AiOutlineMenu } from "react-icons/ai";

const AdminHeader = () => {
  const { user, search, handleInputChange } = useAppContext();
  const router = useRouter();
  const handleSearch = (e) => {
    handleInputChange("search", e.target.value);
    router.push("/admin/products");
  };
  return (
    <div className={HeaderStyles.container}>
      <span
        className={HeaderStyles.menuIcon}
        onClick={() => handleInputChange("showMobileNav", true)}
      >
        <AiOutlineMenu size={23} />
      </span>
      <div className={HeaderStyles.left}>
        <IoSearch size={25} color="gray" />
        <input
          className={HeaderStyles.input}
          type="search"
          value={search}
          onChange={handleSearch}
          placeholder="search products"
        />
      </div>
      {/* 
      <div className={HeaderStyles.middle}>
        <BsFillMoonFill className={HeaderStyles.icon1} />
        <span>Set to Night Mood</span>
      </div> */}

      <div className={HeaderStyles.right}>
        <div className={HeaderStyles.adminInfo}>
          <div className={HeaderStyles.names}>
            <p>
              {user?.firstname} {user?.lastname}
            </p>
            <p>Admin</p>
          </div>
          <div className="relative w-12 h-12 border-2 border-blue-500 rounded-full overflow-hidden">
            <Image
              src="/images/lilong.png"
              alt="logo"
              height="45px"
              width="45px"
              objectFit="contain"
            />
          </div>
        </div>
        <Link href="/admin/notifications">
          <a className={HeaderStyles.noticeBtn}>
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
              <span className="sr-only">Notifications</span>
              <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full"></span>
              <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-2 bg-red-500 rounded-full animate-ping"></span>
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
