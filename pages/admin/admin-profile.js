import ProfileStyles from "../../styles/Profile.module.css";
import Head from "next/head";
import { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { getSession, useSession } from "next-auth/react";
import User from "../../models/User";
import dbConnect from "../../lib/mongodb";
import { TailSpin } from "react-loader-spinner";
import Profile from "../../components/Profile";
import ChangePassword from "../../components/ChangePassword";

const AdminProfile = ({ user }) => {
  return (
    <div>
      <Head>
        <title>Lilong International: My Account!</title>
        <meta
          name="description"
          content="Lilong International Marketplace. A place for purchase of all helath products"
        />
        <meta
          name="keywords"
          content="health, natural treatment, wellness, therapist, products, suana, Complementary medicine, chinese medicine, herbal medicine, cosmetics, medical devices, vitamins"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={ProfileStyles.container}>
        <div className={ProfileStyles.title}>
          <h2>Account</h2>
        </div>

        {user ? (
          <div className="flex w-full gap-8 flex-col lg:flex-row">
            <div className={ProfileStyles.left}>
              <Profile user={user} />
            </div>
            <div className={ProfileStyles.right}>
              <ChangePassword />
            </div>
          </div>
        ) : (
          <TailSpin />
        )}
      </div>
    </div>
  );
};

AdminProfile.layout = "L2";

export const getServerSideProps = async ({ req, res }) => {
  try {
    const session = await getSession({ req });

    await dbConnect();

    let user = await User.findOne({ email: session.user.email });

    return {
      props: { user: JSON.parse(JSON.stringify(user)) },
    };
  } catch (error) {
    console.log(error);
  }
};

export default AdminProfile;
