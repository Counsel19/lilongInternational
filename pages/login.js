import LoginStyles from "../styles/Login.module.css";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const inputInit = {
  email: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const { user, isLoading, handleLogin, handleError, errorMessage } =
    useAppContext();
  const [input, setInput] = useState(inputInit);

  useEffect(() => {
    if (user) router.push("/products");
  });

  const handleInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = input;

      if (!email || !password) {
        handleError("Please input all fields");
        return;
      }

      const submitInput = {
        email,
        password,
      };

      const res = await handleLogin(submitInput);
      console.log(res);

      if (res) {
        setInput(inputInit);
        router.push("/cart");
      }
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
        <div className={LoginStyles.formWrap} style={{ width: "32vw" }}>
          <h2>Login Here!</h2>
          <p>
            Dont have an account?{" "}
            <Link href="/register">
              <a>Register</a>
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            {isLoading ? (
              <div className={LoginStyles.loading}>
                {" "}
                Processing Request! Please wait...
              </div>
            ) : null}
            <div className={LoginStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={input.email}
                placeholder="name@mail.com"
                onChange={handleInputChange}
                style={errorMessage ? { border: "1px solid red" } : null}
              />
            </div>
            <div className={LoginStyles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                value={input.password}
                name="password"
                type="password"
                placeholder="your password"
                onChange={handleInputChange}
                style={errorMessage ? { border: "1px solid red" } : null}
              />
            </div>

            <input type="submit" value="Submit" disabled={isLoading} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
