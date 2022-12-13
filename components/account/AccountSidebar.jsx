import Link from "next/link";
import ASidebarStyles from "../../styles/account/AccountSidebar.module.css";
import Image from "next/image";

const routes = [
  {
    name: "Profile",
    link: "/profile",
    icon: "/images/profile.gif",
  },
  {
    name: "Saved Items",
    link: "/saved",
    icon: "/images/user.gif",
  },
  {
    name: "Orders",
    link: "/orders",
    icon: "/images/shopping.gif",
  },
];

const AccountSidebar = ({ setShowAccMobileNav }) => {
  return (
    <div className={ASidebarStyles.container}>
      <h2>My Account</h2>
      <div className={ASidebarStyles.wrapper}>
        {routes.map((item) => (
          <Link key={item.name} href={item.link}>
            <a onClick={() => setShowAccMobileNav(false)}>
              <Image src={item.icon} alt="icon" height={40} width={40} />
              <span>{item.name}</span>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountSidebar;
