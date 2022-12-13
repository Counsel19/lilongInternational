import ProfileStyles from "../styles/Profile.module.css";
import { useAppContext } from "../context/AppContext";
import countries from "../lib/countries.min.json";
import { useFormik } from "formik";
import { updateUserValidator } from "../lib/formValidation";
import { TailSpin } from "react-loader-spinner";

const Profile = ({ user }) => {
  const { updateUser } = useAppContext();

  const onSubmit = async (values) => {
    const res = await updateUser(values);
  };

  const formik = useFormik({
    initialValues: {
      _id: user?._id,
      firstname: user?.firstname,
      lastname: user?.lastname,
      email: user?.email,
      country: user?.country,
      state: user?.state,
      phone: user?.phone,
      deliveryAddress: user?.deliveryAddress,
    },
    validate: updateUserValidator,
    onSubmit,
  });

  return (
    <div className={ProfileStyles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="firstname"
                className="block text-base font-semibold text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                {...formik.getFieldProps("firstname")}
                autoComplete="given-name"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              />
              {formik.errors.firstname && formik.touched.firstname ? (
                <span className="text-rose-500">{formik.errors.firstname}</span>
              ) : null}
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="lastname"
                className="block text-base font-semibold text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="lastname"
                id="lastname"
                {...formik.getFieldProps("lastname")}
                autoComplete="family-name"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              />
              {formik.errors.lastname && formik.touched.lastname ? (
                <span className="text-rose-500">{formik.errors.lastname}</span>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="email"
                className="block text-base font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
                id="email"
                autoComplete="email"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              />
              {formik.errors.email && formik.touched.email ? (
                <span className="text-rose-500">{formik.errors.email}</span>
              ) : null}
            </div>

            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="phone"
                className="block text-base font-semibold text-gray-700"
              >
                Contact/Phone
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                {...formik.getFieldProps("phone")}
                autoComplete="phone"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              />
              {formik.errors.phone && formik.touched.phone ? (
                <span className="text-rose-500">{formik.errors.phone}</span>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="country"
                className="block text-base font-semibold text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                {...formik.getFieldProps("country")}
                autoComplete="country-name"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
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

            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="state"
                className="block text-base font-semibold text-gray-700"
              >
                State/Province
              </label>
              <select
                id="state"
                name="state"
                autoComplete="state-name"
                {...formik.getFieldProps("state")}
                disabled={!formik.values.country}
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              >
                <option value="">Select state</option>
                {formik.values.country &&
                  countries[`${formik.values.country}`].map((state, index) => (
                    <option value={state} key={`${state}-${index}`}>
                      {state}
                    </option>
                  ))}
              </select>
              {formik.errors.state && formik.touched.state ? (
                <span className="text-rose-500">{formik.errors.state}</span>
              ) : null}
            </div>
          </div>
          <div className="grid  gap-6">
            <div className="col-span-6 lg:col-span-3">
              <label
                htmlFor="deliveryAddress"
                className="block text-base font-semibold text-gray-700"
              >
                Delivery Address
              </label>
              <input
                type="text"
                name="deliveryAddress"
                id="deliveryAddress"
                {...formik.getFieldProps("deliveryAddress")}
                autoComplete="given-name"
                className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
              />
              {formik.errors.address && formik.touched.address ? (
                <span className="text-rose-500">{formik.errors.address}</span>
              ) : null}
            </div>
          </div>
          <button
            type="submit"
            className="group justify-self-end font-bold relative flex w-32 justify-center rounded-md border border-transparent bg-indigo-700 py-3 px-4 text-sm text-white disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
