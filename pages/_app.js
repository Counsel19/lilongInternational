import Layout from "../components/Layout";
import "../styles/globals.css";
import AppContextProvider from "../context/AppContext";

function MyApp({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AppContextProvider>
  );
}

export default MyApp;
