import RegisterStyles from "../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import countries from "../lib/countries.min.json";
import { HiAtSymbol, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { useFormik } from "formik";
import { registerValidator } from "../lib/formValidation";
import { useSession } from "next-auth/react";
import { BiArrowBack } from "react-icons/bi";

const Register = () => {
  const { user, isLoading, handleRegister, handleError } = useAppContext();
  const router = useRouter();
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  useEffect(() => {
    if (user || session) router.push("/products");
  }, []);

  const onSubmit = async (values) => {
    const res = await handleRegister(values);
    if (res) {
      router.push("/products");
    }
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
      state: "",
      phone: "",
      deliveryAddress: "",
    },
    validate: registerValidator,
    onSubmit,
  });

  return (
    <div>
      <Head>
        <title>Lilong International: Register!</title>
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

      <div className={RegisterStyles.container}>
        <div className={RegisterStyles.formWrap}>
          <Link href="/">
            <a className="flex gap-2 items-center text-blue-500">
              <BiArrowBack />
              Back Home
            </a>
          </Link>
          <h2>Register Here!</h2>
          <p>
            Have an account already?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>

          <form onSubmit={formik.handleSubmit}>
            {isLoading ? (
              <div className={RegisterStyles.loading}>
                {" "}
                Processing Request! Please wait...
              </div>
            ) : null}
            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="firstname">Firstname</label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Eg. Micheal"
                  {...formik.getFieldProps("firstname")}
                  className="border rounded"
                />
                {formik.errors.firstname && formik.touched.firstname ? (
                  <span className="text-rose-500">
                    {formik.errors.firstname}
                  </span>
                ) : null}
              </div>

              <div className={RegisterStyles.formGroup}>
                <label htmlFor="lastname">Lastname</label>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Eg. Robinson"
                  className="border rounded"
                  {...formik.getFieldProps("lastname")}
                />
                {formik.errors.lastname && formik.touched.lastname ? (
                  <span className="text-rose-500">
                    {formik.errors.lastname}
                  </span>
                ) : null}
              </div>
            </div>
            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Please enter a valid email"
                  {...formik.getFieldProps("email")}
                  className="border rounded"
                />
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-rose-500">{formik.errors.email}</span>
                ) : null}
              </div>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+23490765757"
                  className="border rounded"
                  {...formik.getFieldProps("phone")}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <span className="text-rose-500">{formik.errors.phone}</span>
                ) : null}
              </div>
            </div>

            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  {...formik.getFieldProps("country")}
                  autoComplete="country-name"
                  className="border rounded"
                >
                  <option value="">Select Country</option>
                  {Object.keys(countries).map((country, index) => (
                    <option value={country} key={`${country}-${index}`}>
                      {country}
                    </option>
                  ))}
                </select>
                {formik.errors.country && formik.touched.country ? (
                  <span className="text-rose-500">{formik.errors.country}</span>
                ) : null}
              </div>

              <div className={RegisterStyles.formGroup}>
                <label htmlFor="state">State/Province</label>
                <select
                  id="state"
                  name="state"
                  autoComplete="state-name"
                  {...formik.getFieldProps("state")}
                  disabled={!formik.values.country}
                  className="border rounded"
                >
                  <option value="">Select state</option>
                  {formik.values.country &&
                    countries[`${formik.values.country}`].map(
                      (state, index) => (
                        <option value={state} key={`${state}-${index}`}>
                          {state}
                        </option>
                      )
                    )}
                </select>
                {formik.errors.state && formik.touched.state ? (
                  <span className="text-rose-500">{formik.errors.state}</span>
                ) : null}
              </div>
            </div>

            <div className={RegisterStyles.formGroup}>
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <input
                name="deliveryAddress"
                type="text"
                placeholder="your delivery address"
                className="border rounded"
                {...formik.getFieldProps("deliveryAddress")}
              />
              {formik.errors.deliveryAddress &&
              formik.touched.deliveryAddress ? (
                <span className="text-rose-500">
                  {formik.errors.deliveryAddress}
                </span>
              ) : null}
            </div>
            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="password">Password </label>
                <div className="flex border rounded bg-white">
                  <input
                    id="password"
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    className={RegisterStyles.inputField}
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
                  <span className="text-rose-500">
                    {formik.errors.password}
                  </span>
                ) : null}
              </div>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password </label>
                <div className="flex border rounded bg-white">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.comfirmpassword ? "text" : "password"}
                    placeholder="Re-type your passoword"
                    {...formik.getFieldProps("confirmPassword")}
                    className={RegisterStyles.inputField}
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
                  <span className="text-rose-500">
                    {formik.errors.confirmPassword}
                  </span>
                ) : null}
              </div>
            </div>

            <input
              className={RegisterStyles.button}
              type="submit"
              value="Submit"
              disabled={isLoading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

Register.layout = "L4";

export default Register;
