
import Head from "next/head";
import ViewAffiliate from "../../../components/admin/view/ViewAffiliate";
import dbConnect from "../../../lib/mongodb";
import AffiliatePayment from "../../../models/AffiliatePayment";

function SingleAffiliate({ singleAffiliate }) {
  
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
        {singleAffiliate && <ViewAffiliate singleAffiliate={singleAffiliate} />}
      </div>
    </div>
  );
}

SingleAffiliate.layout = "L2";

export const getServerSideProps = async (context) => {
  let singleAffiliate = null;

  try {
    await dbConnect();
    const { id } = context.query;
    singleAffiliate = await AffiliatePayment.findById(id);

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      singleAffiliate: JSON.parse(JSON.stringify(singleAffiliate)),
    },
  };
};

export default SingleAffiliate;
