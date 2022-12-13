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
        <div className="w-full">
          <h2 className="text-blue-900 text-2xl md:text-4xl text-center mb-1 font-semibold">
            Consult Therapist!
          </h2>
          <ConsultTimeline />

          <section className="bg-white w-full">
            <div className="container md:px-6 py-8">
              <div className="flex flex-col-reverse lg:flex-row w-full gap-12 lg:-mx-6">
                <div
                  className={`hidden md:flex lg:w-1/2 lg:mx-6 mx-auto ${ConsultStyles.consultLeft}`}
                >
                  <h1 className="text-xl md:text-3xl font-semibold  mb-2 text-white capitalize lg:text-3xl">
                    Contact Us
                  </h1>

                  <div className="mt-6 space-y-8 text-lg md:mt-8">
                    <p className="flex items-start -mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-2 text-blue-500 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>

                      <span className="mx-2 text-white truncate w-72 ">
                        119 Obafemi Awolowo way, Ikeja, Lagos, Nigeria
                      </span>
                    </p>

                    <p className="flex items-start -mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-2 text-blue-500  "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>

                      <span className="mx-2 text-white truncate w-72 ">
                        (234) 803-3366-106
                      </span>
                    </p>

                    <p className="flex items-start -mx-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 mx-2 text-blue-500 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <span className="mx-2 text-white truncate w-72 ">
                        lilong@international.com
                      </span>
                    </p>
                  </div>
                </div>

                <div className=" w-full  lg:w-1/2 lg:mx-6">
                  <div className="w-full px-8 py-8  mx-auto overflow-hidden bg-white rounded-lg shadow-2xl  lg:max-w-xl shadow-gray-300/50">
                    <h1 className="text-xl font-semibold leading-normal mt-0 mb-2 text-gray-700">
                      How can we help you?
                    </h1>

                    <form className="mt-6">
                      <div className="flex-1">
                        <label className="block mb-2 text-normal text-gray-600 font-semibold">
                          Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="flex-1 mt-6">
                        <label className="block mb-2 text-normal text-gray-600 font-semibold">
                          Email address
                        </label>
                        <input
                          type="email"
                          placeholder="johndoe@example.com"
                          className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                      </div>

                      <div className="w-full mt-6">
                        <label className="block mb-2 text-normal text-gray-600 font-semibold">
                          Describe Challenge
                        </label>
                        <textarea
                          className="block w-full h-32 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:h-48  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                          placeholder="Message"
                        ></textarea>
                      </div>

                      <button className="w-full px-6 py-3 mt-6 text-normal font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                        get in touch
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
