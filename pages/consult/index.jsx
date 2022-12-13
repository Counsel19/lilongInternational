import ConsultStyles from "../../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import ConsultTimeline from "../../components/ConsultTimeline";

const ConsultTherapist = ({ problemCategory }) => {
  return (
    <div>
      <Head>
        <title>Lilong International: Consult Therapist!</title>
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

      <div className={ConsultStyles.container}>
        <div>
          <h2 className="text-blue-900 text-2xl md:text-4xl text-center mb-4 font-semibold">
            Consult Therapist!
          </h2>

          <ConsultTimeline />

          <div className="flex flex-col lg:flex-row gap-20">
            <div>
              <Image
                src="/images/phone-plant.jpg"
                alt=""
                height={700}
                width={800}
                objectFit="cover"
                objectPosition="center"
                className="rounded-xl object-center"
              />
            </div>

            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-xl font-semibold leading-normal mt-0 mb-2 text-blue-800">
                  Why Consult Us
                </h3>

                <p className="text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  omnis eveniet deleniti adipisci doloribus sint blanditiis
                  mollitia at harum culpa!
                </p>

                <p className="text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                  rerum?
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold leading-normal mt-0 mb-2 text-blue-800">
                  Methodology for Consultation
                </h3>

                <p className="text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                  omnis eveniet deleniti adipisci doloribus sint blanditiis
                  mollitia at harum culpa!
                </p>

                <p className="text-lg font-light leading-relaxed mt-0 mb-0 text-neutral-800">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio,
                  rerum?
                </p>
              </div>
              <Link href="/consult/details">
                <a className="w-fit px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  Consult Now
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = () => {
  const problemCategory = [
    "Obesity",
    "Cancer",
    "Alcer",
    "Diabetis",
    "Obesity",
    "Cancer",
    "Alcer",
    "Diabetis",
  ];

  return {
    props: {
      problemCategory,
    },
  };
};

export default ConsultTherapist;
