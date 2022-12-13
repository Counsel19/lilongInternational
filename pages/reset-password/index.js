import Head from "next/head";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useFormik } from "formik";
import { resetPasswordValidator } from "../../lib/formValidation";
import { useAppContext } from "../../context/AppContext";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as ACTIONS from "../../context/actions"

const ResetPassword = () => {
  const {
    handleResetPassword,
    setEmailSending,
    dispatch,
    handleError,
    setToPassordReset,
    isLoading,
  } = useAppContext();
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const router = useRouter();
  useEffect(() => {
    setEmailSending(false);
  }, []);

  async function onSubmit(values) {
    try {
      const { userId, token } = router.query;
      const res = await handleResetPassword({ values, userId, token });
      if (res) {
        setToPassordReset(true);
        router.push("/reset-password/success");
      }
    } catch (error) {
      dispatch({ type: ACTIONS.STOP_LOADING });
      handleError(error?.response?.data?.msg);
      router.push("/login");
    }
  }

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validate: resetPasswordValidator,
    onSubmit,
  });
  return (
    <div>
      <Head>
        <title>Lilong International: Rest Passowrd!</title>
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
              Reset Password
            </h2>

            <p className="mt-3 font-medium text-center text-gray-400">
              Enter and comfirm new Password
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
            <div className="space-y-6 rounded-md p-3 shadow-sm">
              <div>
                <label htmlFor="password">Password</label>
                <div className="flex border my-1 rounded bg-white">
                  <input
                    id="password"
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    className="relative block w-full appearance-none px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <span
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                    className="icon cursor-pointer flex items-center px-4"
                  >
                    {showPassword.password ? (
                      <HiOutlineEye size={20} />
                    ) : (
                      <HiOutlineEyeOff size={20} />
                    )}
                  </span>
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <span className="text-rose-500 text-sm">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="flex border rounded my-1 bg-white">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    placeholder="Re-type your passoword"
                    {...formik.getFieldProps("confirmPassword")}
                    className="relative block w-full appearance-none rounded-md px-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                  <span
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirmPassword: !showPassword.confirmPassword,
                      })
                    }
                    className="icon cursor-pointer flex items-center px-4"
                  >
                    {showPassword.confirmPassword ? (
                      <HiOutlineEye size={20} />
                    ) : (
                      <HiOutlineEyeOff size={20} />
                    )}
                  </span>
                </div>
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <span className="text-rose-500 text-sm">
                    {formik.errors.confirmPassword}
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
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ query }) => {
  const { userId, token } = query;

  if (!userId || !token) {
    return {
      redirect: {
        destination: "/products",
        permanent: false,
      },
    };
  }

  return {
    props: { userId, token },
  };
};

export default ResetPassword;
