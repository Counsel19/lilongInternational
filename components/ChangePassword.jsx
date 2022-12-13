import React from "react";
import { useAppContext } from "../context/AppContext";
import ProfileStyles from "../styles/Profile.module.css";
import { useFormik } from "formik";
import { changePasswordValidator } from "../lib/formValidation";



const ChangePassword = () => {
  const { changePassword, user } = useAppContext();

  const onSubmit = async (values, { resetForm }) => {
    await changePassword(user?._id, values);
    resetForm()
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      comfirmNewPassword: "",
    },
    validate: changePasswordValidator,
    onSubmit,
  });

  return (
    <div className={ProfileStyles.wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="currentPassword"
              className="block text-base font-semibold text-gray-700"
            >
              Current Password
            </label>
            <input
              type="password"
              name="currentPassword"
              id="currentPassword"
              {...formik.getFieldProps("currentPassword")}
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
            {formik.errors.currentPassword && formik.touched.currentPassword ? (
              <span className="text-rose-500">
                {formik.errors.currentPassword}
              </span>
            ) : null}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="newPassword"
              className="block text-base font-semibold text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              {...formik.getFieldProps("newPassword")}
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
            {formik.errors.newPassword && formik.touched.newPassword ? (
              <span className="text-rose-500">{formik.errors.newPassword}</span>
            ) : null}
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="comfirmNewPassword"
              className="block text-base font-semibold text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              name="comfirmNewPassword"
              {...formik.getFieldProps("comfirmNewPassword")}
              id="comfirmNewPassword"
              autoComplete="comfirmNewPassword"
              className="mt-1 block w-full py-2 px-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-base"
            />
            {formik.errors.comfirmNewPassword &&
            formik.touched.comfirmNewPassword ? (
              <span className="text-rose-500">
                {formik.errors.comfirmNewPassword}
              </span>
            ) : null}
          </div>

          <button
            type="submit"
            className="group justify-self-end font-bold relative flex w-48 justify-center rounded-md border border-transparent bg-indigo-700 py-3 px-4 text-sm text-white disabled:bg-indigo-300 disabled:cursor-not-allowed hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
