import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import ApplyStyles from "../../styles/Login.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import countries from "../../lib/countries.min.json";
import { useFormik } from "formik";
import { applyValidator } from "../../lib/formValidation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Image from "next/image";
import { TailSpin } from "react-loader-spinner";

const Apply = () => {
  const { addAffiliateUser } = useAppContext();
  const router = useRouter();
  const [affiliateDetails, setAffiliateDetails] = useState();

  useEffect(() => {
    setAffiliateDetails(JSON.parse(localStorage.getItem("affiliateDetails")));
  }, []);

  const onSubmit = (values) => {
    console.log("values", values);
    addAffiliateUser(values, "affiliateUser");
    router.push("/become-an-affiliate/application-summary");
  };

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      accountNumber: "",
      bankName: "",
      country: "",
      state: "",
      phone: "",
      dateOfBirth: Date.now(),
      gender: "",
    },
    validate: applyValidator,
    onSubmit,
  });

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

      <div className={ApplyStyles.container}>
        {affiliateDetails ? (
          <div className={ApplyStyles.formWrap}>
            <h2>Register as Affiliate!</h2>
            <p>
              Your selected plan is - <span>{affiliateDetails?.name}</span>
            </p>
            <span className={ApplyStyles.info}>
              **Please note that the following information is required and will
              be kept confidential**
            </span>
            <form onSubmit={formik.handleSubmit}>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="firstname">Firstname</label>
                  <input
                    id="firstname"
                    name="firstname"
                    {...formik.getFieldProps("firstname")}
                    type="text"
                    placeholder="Eg. Micheal"
                    style={{ border: "1px solid lightgray" }}
                  />
                  {formik.errors.firstname && formik.touched.firstname ? (
                    <span className="text-rose-500">
                      {formik.errors.firstname}
                    </span>
                  ) : null}
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="lastname">Lastname</label>
                  <input
                    name="lastname"
                    type="text"
                    placeholder="Eg. Robinson"
                    {...formik.getFieldProps("lastname")}
                    style={{ border: "1px solid lightgray" }}
                  />
                  {formik.errors.lastname && formik.touched.lastname ? (
                    <span className="text-rose-500">
                      {formik.errors.lastname}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="dateOfBirth">
                    Date of Birth{" "}
                    <span className="text-sm text-red-300">(MM/DD/YY)</span>
                  </label>
                  <div
                    style={{
                      border: "1px solid lightgray",
                      borderRadius: ".25rem",
                    }}
                  >
                    <DatePicker
                      id="dateOfBirth"
                      name="dateOfBirth"
                      selected={formik.values.dateOfBirth}
                      onChange={(value) => {
                        console.log(Date.parse(value), "value");
                        formik.setFieldValue("dateOfBirth", Date.parse(value));
                      }}
                    />
                  </div>

                  {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
                    <span className="text-rose-500">
                      {formik.errors.dateOfBirth}
                    </span>
                  ) : null}
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="gender">Gender</label>
                  <select
                    name="gender"
                    {...formik.getFieldProps("gender")}
                    style={{ border: "1px solid lightgray" }}
                  >
                    <option>Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {formik.errors.gender && formik.touched.gender ? (
                    <span className="text-rose-500">
                      {formik.errors.gender}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="accountNumber">Account Number</label>
                  <input
                    id="accountNumber"
                    name="accountNumber"
                    type="text"
                    {...formik.getFieldProps("accountNumber")}
                    placeholder="2281986763"
                    style={{ border: "1px solid lightgray", padding: ".5rem" }}
                  />
                  {formik.errors.accountNumber &&
                  formik.touched.accountNumber ? (
                    <span className="text-rose-500">
                      {formik.errors.accountNumber}
                    </span>
                  ) : null}
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="bankName">Bank</label>
                  <input
                    name="bankName"
                    type="text"
                    {...formik.getFieldProps("bankName")}
                    placeholder="Zenith"
                    style={{ border: "1px solid lightgray" }}
                  />
                  {formik.errors.bankName && formik.touched.bankName ? (
                    <span className="text-rose-500">
                      {formik.errors.bankName}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="email">Valid and Active Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    {...formik.getFieldProps("email")}
                    placeholder="Please enter a valid email"
                    style={{ border: "1px solid lightgray" }}
                  />
                  {formik.errors.email && formik.touched.email ? (
                    <span className="text-rose-500">{formik.errors.email}</span>
                  ) : null}
                </div>

                <div className={ApplyStyles.formGroup}>
                  <label htmlFor="phone">Contact/Phone</label>
                  <input
                    name="phone"
                    type="text"
                    placeholder="+23490191823"
                    {...formik.getFieldProps("phone")}
                    style={{ border: "1px solid lightgray" }}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <span className="text-rose-500">{formik.errors.phone}</span>
                  ) : null}
                </div>
              </div>

              <div className={ApplyStyles.formLine}>
                <div className={ApplyStyles.formGroup}>
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
                    <span className="text-rose-500">
                      {formik.errors.country}
                    </span>
                  ) : null}
                </div>

                <div className={ApplyStyles.formGroup}>
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

              <input
                className={ApplyStyles.button}
                type="submit"
                value="Proceed"
              />
            </form>
          </div>
        ) : (
          <div className="w-full flex items-center justify-center">
            <TailSpin />
          </div>
        )}
      </div>
    </div>
  );
};

export default Apply;
