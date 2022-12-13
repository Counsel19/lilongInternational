import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EditProduct from "../../../components/admin/edit/EditProduct";
import { useAppContext } from "../../../context/AppContext";

function AdminEditProduct() {
  const { categories, getCategories, getSingleProduct } =
    useAppContext();
  const [singleProduct, setSingleProduct] = useState({});
 
  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      await getCategories();
    };

    getData();
  }, []);

  useEffect(() => {
    if (!router.isReady) return;
    const { id } = router.query;

    getSingleProduct(id).then((res) => setSingleProduct(res));
  }, [router]);

  return (
    <div>
      <Head>
        <title>Lilong International: Administrator</title>
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

      <div>
        {Object.keys(singleProduct).length > 0 && (
          <EditProduct categories={categories} singleProduct={singleProduct} />
        )}
      </div>
    </div>
  );
}

AdminEditProduct.layout = "L2";

export default AdminEditProduct;
