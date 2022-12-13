import Link from "next/link";
import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { forgotPasswordValidator } from "../../lib/formValidation";
import { useAppContext } from "../../context/AppContext";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const { handleForgotPassword, isLoading, setEmailSending } = useAppContext();
  const router = useRouter();

  async function onSubmit(values) {
    const res = await handleForgotPassword(values);

    if (res) {
      setEmailSending(true);
      router.push("/forgot-password/success");
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: forgotPasswordValidator,
    onSubmit,
  });
  return (
    <div>
      <Head>
        <title>Lilong International: Forgot Password!</title>
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

      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-semibold tracking-tight text-gray-900">
              Forgot Passord
            </h2>

            <p className="mt-3 font-medium text-center text-gray-400">
              Enter Registered Email to request reset link
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="-space-y-px rounded-md p-2 shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-3 my-1 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="name@mail.com"
                  {...formik.getFieldProps("email")}
                  style={
                    formik.errors.email && formik.touched.email
                      ? { border: "1px solid red" }
                      : null
                  }
                />
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-sm text-rose-500">
                    {formik.errors.email}
                  </span>
                ) : null}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-700 py-3 px-4 text-sm font-medium text-white disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Request Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
