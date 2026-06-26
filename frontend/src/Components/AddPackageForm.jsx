import { BASE_URL } from "../config";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import useHeaderData from "../Hooks/useHeaderData";

const AddPackageForm = ({ data }) => {
const BaseUrl = BASE_URL;

  const { token } = useHeaderData();
  const formik = useFormik({
    initialValues: {
      packageName: "",
      packageStatus: "completed",
      packageDate: "",
      bankName: "",
      receiverName: "",
      packageAmount: "",
      packageType: "",
      userId: data?._id,
      // accountType: "savings",
    },
    validationSchema: Yup.object({
      packageName: Yup.string().required("Package name is required"),
      packageDate: Yup.string().required("Package date is required"),
      bankName: Yup.string().required("Bank name is required"),
      receiverName: Yup.string().required("Receiver name is required"),
      packageAmount: Yup.string().required("Package amount is required"),
      packageType: Yup.string().required("Package type is required"),
      // accountType: Yup.string().required("Package type is required"),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError, resetForm }) => {
      try {
        const response = await axios.put(
          `${BaseUrl}package/createpackage`,
          values,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.responseMessage);
          resetForm();
        } else {
          toast.warn(response.data.responseMessage);
        }
      } catch (error) {
        setFieldError("apiresponse", error.message); // Display error from API response
      } finally {
        setSubmitting(false); // Reset loading state after submission
      }
    },
  });

  return (
    <div className="w-full lg:full mt-6 pl-0 lg:pl-2">
      <div className="leading-loose text-left">
        <form className="space-y-4 md:space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Package Name
            </label>
            <select
              id="packageName"
              name="packageName"
              {...formik.getFieldProps("packageName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            >
              <option value="Deposit">Deposit</option>
              <option value="Transfer">Transfer</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
            {formik.touched.packageName && formik.errors.packageName && (
              <div className="text-red-600 text-sm">
                {formik.errors.packageName}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Account Type
            </label>
            <select
              id="accountType"
              name="accountType"
              {...formik.getFieldProps("accountType")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            >
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
            </select>
            {formik.touched.accountType && formik.errors.accountType && (
              <div className="text-red-600 text-sm">
                {formik.errors.accountType}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Package Status
            </label>
            <select
              id="packageStatus"
              name="packageStatus"
              {...formik.getFieldProps("packageStatus")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
              <option value="in progress">In Progress</option>
            </select>
            {formik.touched.packageStatus && formik.errors.packageStatus && (
              <div className="text-red-600 text-sm">
                {formik.errors.packageStatus}
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-xl font-thin text-gray-900 dark:text-white">
              Package Date
            </label>
            <input
              id="packageDate"
              name="packageDate"
              type="date"
              {...formik.getFieldProps("packageDate")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            />
            {formik.touched.packageDate && formik.errors.packageDate && (
              <div className="text-red-600 text-sm">
                {formik.errors.packageDate}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-thin text-gray-900 dark:text-white">
              Bank Name
            </label>
            <input
              id="bankName"
              name="bankName"
              type="text"
              {...formik.getFieldProps("bankName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            />
            {formik.touched.bankName && formik.errors.bankName && (
              <div className="text-red-600 text-sm">
                {formik.errors.bankName}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Receiver Name
            </label>
            <input
              id="receiverName"
              name="receiverName"
              type="text"
              {...formik.getFieldProps("receiverName")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            />
            {formik.touched.receiverName && formik.errors.receiverName && (
              <div className="text-red-600 text-sm">
                {formik.errors.receiverName}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Package Amount
            </label>
            <input
              id="packageAmount"
              name="packageAmount"
              type="number"
              {...formik.getFieldProps("packageAmount")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            />
            {formik.touched.packageAmount && formik.errors.packageAmount && (
              <div className="text-red-600 text-sm">
                {formik.errors.packageAmount}
              </div>
            )}
          </div>
          <div>
            <label className="block mb-2 text-xl font-light text-gray-900 dark:text-white">
              Package Type
            </label>
            <select
              id="packageType"
              name="packageType"
              {...formik.getFieldProps("packageType")}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
              required
            >
              <option value="">Select an Option</option>
              <option value="Debit">Debit</option>
              <option value="Credit">Credit</option>
            </select>
            {formik.touched.packageType && formik.errors.packageType && (
              <div className="text-red-600 text-sm">
                {formik.errors.packageType}
              </div>
            )}
          </div>
          {formik.errors.apiresponse && (
            <div className="text-red-600 text-sm mt-0">
              {formik.errors.apiresponse}
            </div>
          )}
          {formik.isSubmitting ? (
            <button
              disabled
              className="flex justify-center items-center w-full text-white bg-red-400 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-gradient-to-r from-[#100257] to-[#BA0D76] 
                  dark:from-[#100257] dark:to-[#BA0D76] hover:from-[#0d0148] hover:to-[#e01c92]
 dark:focus:ring-red-800"
            >
              <ThreeCircles
                height="25"
                width="25"
                radius="5"
                color="#ffffff"
                ariaLabel="three-circles-loading"
              />
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-white bg-gradient-to-r from-[#100257] to-[#BA0D76] 
                  dark:from-[#100257] dark:to-[#BA0D76] hover:from-[#0d0148] hover:to-[#e01c92]
 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Add Package
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddPackageForm;
