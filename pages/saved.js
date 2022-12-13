import SavedStyles from "../styles/Saved.module.css";
import Head from "next/head";
import { useAppContext } from "../context/AppContext";
import SavedList from "../components/saved/savedList";
import { TailSpin } from "react-loader-spinner";

const SavedItems = () => {
  const { savedItems, user } = useAppContext();

  return (
    <div>
      <Head>
        <title>Lilong International: My Saved Items!</title>
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

      <div className={SavedStyles.container}>
        <div className={SavedStyles.header}>
          <h2> Saved Items</h2>
        </div>
        {savedItems ? <SavedList products={savedItems} /> : <TailSpin />}
      </div>
    </div>
  );
};

SavedItems.layout = "L3";

export default SavedItems;
