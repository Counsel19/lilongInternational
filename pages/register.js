import RegisterStyles from "../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "../context/AppContext";
import countries from "../lib/countries.min.json";

const inputInit = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
  country: "",
  state: "",
  phone: "",
  deliveryAddress: "",
};

const Register = () => {
  const { user, isLoading, handleRegister, handleError } = useAppContext();
  const router = useRouter();
  const [input, setInput] = useState(inputInit);

  useEffect(() => {
    if (user) router.push("/products");
  });
  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const {
      firstname,
      lastname,
      email,
      password,
      confirmPassword,
      country,
      state,
      phone,
      deliveryAddress,
    } = input;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !password ||
      !confirmPassword ||
      !country ||
      !state ||
      !phone ||
      !deliveryAddress
    ) {
      handleError("Please input all fields");

      return;
    }

    if (password !== confirmPassword) {
      handleError("Your Passwords do not match");
      return;
    }
    const submitInput = {
      firstname,
      lastname,
      email,
      password,
      country,
      state,
      phone,
      deliveryAddress,
    };

    handleRegister(submitInput);
    setInput(inputInit);
    router.push("/products");
  };

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
        <div className={RegisterStyles.formWrap} style={{ width: "42vw" }}>
          <h2>Register Here!</h2>
          <p>
            Have an account already?{" "}
            <Link href="/login">
              <a>Login</a>
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {isLoading ? (
              <div className={RegisterStyles.loading}> Processing Request! Please wait...</div>
            ) : null}
            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="firstname">Firstname</label>
                <input
                  id="firstname"
                  name="firstname"
                  type="text"
                  placeholder="Eg. Micheal"
                  onChange={handleInputChange}
                  value={input.firstname}
                />
              </div>

              <div className={RegisterStyles.formGroup}>
                <label htmlFor="lastname">Lastname</label>
                <input
                  name="lastname"
                  type="text"
                  placeholder="Eg. Robinson"
                  onChange={handleInputChange}
                  value={input.lastname}
                />
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
                  onChange={handleInputChange}
                  value={input.email}
                />
              </div>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="phone">Email</label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+23490765757"
                  onChange={handleInputChange}
                  value={input.phone}
                />
              </div>
            </div>

            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={input.country}
                  onChange={handleInputChange}
                  autoComplete="country-name"
                >
                  <option value="">Select Country</option>
                  {Object.keys(countries).map((country, index) => (
                    <option value={country} key={`${country}-${index}`}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              <div className={RegisterStyles.formGroup}>
                <label htmlFor="state">State/Province</label>
                <select
                  id="state"
                  name="state"
                  autoComplete="state-name"
                  value={input.state}
                  onChange={handleInputChange}
                  disabled={!input.country}
                >
                  <option value="">Select state</option>
                  {input.country &&
                    countries[`${input.country}`].map((state, index) => (
                      <option value={state} key={`${state}-${index}`}>
                        {state}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className={RegisterStyles.formGroup}>
              <label htmlFor="deliveryAddress">Delivery Address</label>
              <input
                name="deliveryAddress"
                type="text"
                placeholder="your delivery address"
                onChange={handleInputChange}
                value={input.deliveryAddress}
              />
            </div>
            <div className={RegisterStyles.formLine}>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="password">Password </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleInputChange}
                  value={input.password}
                />
                <span>Pasword should have at least 6 characters</span>
              </div>
              <div className={RegisterStyles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Re-type your passoword"
                  onChange={handleInputChange}
                  value={input.confirmPassword}
                />
              </div>
            </div>

            <input type="submit" value="Submit" disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
