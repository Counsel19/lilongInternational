import LoginStyles from "../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { signIn, getSession, signOut } from "next-auth/react";
import Image from "next/image";
import { HiAtSymbol, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useFormik } from "formik";
import { loginValidator } from "../lib/formValidation";
import User from "../models/User";
import dbConnect from "../lib/mongodb";
import { serialize } from "cookie";
import { BiArrowBack } from "react-icons/bi";

const Login = ({ session, error }) => {
  const router = useRouter();

  const { isLoading, handleError, user, getUser } = useAppContext();

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let currentUser = await getUser();
      if (currentUser.isAmin) return router.push("/admin");
      router.push("/products");
    };
    const clearSession = async () => {
      await signOut();
    };

    if (error) {
      clearSession();
      handleError(error.msg);
    }
    if (session && !error) {
      getData();
    }
  }, []);

  async function onSubmit(values) {
    // const res = await handleLogin({ input: values });
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/products",
    });

    if (!res.error && res.ok) {
      await getUser();
      router.push(res.url);
    }
    if (res.error && !res.ok) {
      handleError(res.error);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidator,
    onSubmit,
  });

  // Google Handler function
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google");
    } catch (error) {
      handleError("Something went wrong!");
    }
  };

  return (
    <div>
      <Head>
        <title>Lilong International: Login!</title>
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

      <div className={LoginStyles.container}>
        <div className={LoginStyles.formWrap}>
          <Link href="/">
            <a className="flex gap-2 items-center text-blue-500">
              <BiArrowBack />
              Back Home
            </a>
          </Link>
          <h2>Login Here!</h2>
          <p className="text-center text-gray-400">
            Dont have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>

          <form onSubmit={formik.handleSubmit}>
            {isLoading ? (
              <div className={LoginStyles.loading}>
                Processing Request! Please wait...
              </div>
            ) : null}
            <div className={LoginStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <div
                className="flex border rounded bg-white"
                style={
                  formik.errors.email && formik.touched.email
                    ? { border: "1px solid red" }
                    : null
                }
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={LoginStyles.inputField}
                  placeholder="name@mail.com"
                  {...formik.getFieldProps("email")}
                />
                <span className="icon flex items-center px-4">
                  <HiAtSymbol size={20} />
                </span>
              </div>
              {formik.errors.email && formik.touched.email ? (
                <span className="text-rose-500">{formik.errors.email}</span>
              ) : null}
            </div>
            <div className={LoginStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <div
                className="flex border rounded bg-white"
                style={
                  formik.errors.password && formik.touched.password
                    ? { border: "1px solid red" }
                    : null
                }
              >
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={LoginStyles.inputField}
                  placeholder="your password"
                  {...formik.getFieldProps("password")}
                />

                <span
                  className="icon cursor-pointer flex items-center px-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HiOutlineEye size={20} />
                  ) : (
                    <HiOutlineEyeOff size={20} />
                  )}
                </span>
              </div>
              {formik.errors.password && formik.touched.password ? (
                <span className="text-rose-500">{formik.errors.password}</span>
              ) : null}
            </div>

            <input
              className={LoginStyles.button}
              type="submit"
              value="Login"
              disabled={isLoading}
            />
            <Link href="/forgot-password">
              <a className="text-blue-700 mt-3 flex justify-end">
                Forgot Password?
              </a>
            </Link>
          </form>
          <div className={LoginStyles.googleBtn}>
            <button
              type="button"
              className="w-full transition duration-500 border py-2 flex justify-center gap-2 hover:bg-gray-200"
              onClick={handleGoogleSignIn}
            >
              Sign in with Google{" "}
              <Image
                src="/images/google_logo.png"
                alt="Google logo"
                height={20}
                width={20}
                objectFit="contain"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.layout = "L4";

export const getServerSideProps = async ({ req, res }) => {
  try {
    const session = await getSession({ req });

    await dbConnect();

    let user = null;
    let error = null;

    if (session) {
      user = await User.findOne({ email: session.user.email }).select(
        "+password"
      );

      if (user) {
        const { accessToken, refreshToken } = await user.createJWT();
        user.password = undefined;

        const serializedToken = serialize("accessToken", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV != "development",
          maxAge: process.env.JWT_MAX_AGE,
          path: "/",
        });
        const serializedRefreshToken = serialize("refreshToken", refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV != "development",
          maxAge: 2592000,
          path: "/",
        });

        res.setHeader("Set-Cookie", [serializedToken, serializedRefreshToken]);
      } else {
        error = {
          msg: "Email Not Registered",
        };
      }
      if (user.isAdmin) {
        return {
          redirect: {
            destination: "/admin",
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: "/products",
            permanent: false,
          },
        };
      }
    }
    return {
      props: { session, error },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Login;
