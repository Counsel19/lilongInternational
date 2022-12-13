import SPlanStyles from "../../styles/becomeAffiliate/SelectPlan.module.css";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const SelectPlan = () => {
  return (
    <div>
      <Head>
        <title>Lilong International: Become an Affiliate</title>
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

      <div className={SPlanStyles.container}>
        <section className="">
          <div className="container max-w-xl p-6 px-6 py-12 mx-auto space-y-24 lg:px-8 lg:max-w-7xl">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl">
                Register with us as an Affiliate
              </h2>
              <p className="max-w-3xl mx-auto mt-4 text-xl text-center">
                As an Affiliate marketer you earn money (commissions) every time
                you promote the company’s products or services and drive a sale.
              </p>
            </div>
            <div className="grid lg:gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <h3 className="text-lg font-semibold tracking-tight sm:text-3xl">
                  The Process
                </h3>
                <p className="mt-3 text-lg">
                  On registration, you supply us with your details which we use
                  to register you on our partner company. You then after get
                  two mails, one from us and the other from our partner. Become
                  an Affilliate today and earn amazing benefits.
                </p>
                <div className="mt-12 space-y-12">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-400 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold leading-normal mt-0 mb-2 text-gray-800">
                        Starter Plan
                      </h4>
                      <p className="mt-2 text-gray-400">
                        This is our most basic plan mostly low income starters
                        with comensurate benefits.{" "}
                        <Link href="/become-an-affiliate/plans">
                          <a className="text-gray-500">
                            More details on next page{" "}
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-400 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold leading-normal mt-0 mb-2 text-gray-800">
                        Standard Plan
                      </h4>
                      <p className="mt-2 dark:text-gray-400">
                        This is an intermidiate and recommended plan for
                        beginners. Its come with intruiging benefits.{" "}
                        <Link href="/become-an-affiliate/plans">
                          <a className="text-gray-500">
                            More details on next page{" "}
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-400 text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-7 h-7"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-xl font-semibold leading-normal mt-0 mb-2 text-gray-800">
                        Advanced Plan
                      </h4>
                      <p className="mt-2 dark:text-gray-400">
                        Currently this is the best plan avaialable. It brings a
                        number of mouth watering benefits.{" "}
                        <Link href="/become-an-affiliate/plans">
                          <a className="text-gray-500">
                            More details on next page{" "}
                          </a>
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                aria-hidden="true"
                className="mt-10 lg:mt-0 flex item-center justify-center"
              >
                <Image
                  src="/images/tab.jpg"
                  alt=""
                  height={480}
                  width={360}
                  className="mx-auto rounded-lg shadow-lg dark:bg-gray-500"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SelectPlan;
