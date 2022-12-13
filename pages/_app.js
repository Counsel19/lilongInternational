import Layout from "../components/layouts/Layout";
import AdminLayout from "../components/layouts/AdminLayout";
import "../styles/globals.css";
import AppContextProvider from "../context/AppContext";
import { SessionProvider } from "next-auth/react";
import AccountLayout from "../components/layouts/AccountLayout";
import EmptyLayout from "../components/layouts/EmptyLayout";

const layouts = {
  L1: Layout,
  L2: AdminLayout,
  L3: AccountLayout,
  L4: EmptyLayout,
};

function MyApp({ Component, pageProps, session }) {
  const Layout = layouts[Component.layout] || layouts.L1;
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
