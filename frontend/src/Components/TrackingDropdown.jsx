import {
  Menu,
  Transition,
  MenuButton,
  MenuItems,
  MenuItem,
} from "@headlessui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const TrackingDropdown = () => {
  const navigate = useNavigate();

  // Helper function for conditional classes
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // Validation schema
  const validationSchema = Yup.object({
    trackingId: Yup.string()
      .min(7, "Tracking ID must be at least 7 characters long")
      .required("Tracking ID is required"),
  });

  // Form submit handler
  const handleSubmit = (values) => {
    navigate(`/track/${values.trackingId}`);
  };

  return (
    <Menu as="div" className="relative">
      {/* Trigger button */}
      <div>
        <MenuButton className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900 rounded-lg mx-1 transition-all duration-200">
          Tracking
          <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </MenuButton>
      </div>

      {/* Dropdown menu */}
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute left-0 mt-2 w-80 origin-top-left bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
          {/* Formik Form */}
          <Formik
            initialValues={{ trackingId: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="p-4 bg-gradient-to-r from-purple-600 to-purple-700">
                <label
                  htmlFor="tracking-id"
                  className="block uppercase text-xs text-white font-bold mb-2"
                >
                  Track Your Package
                </label>

                <Field
                  id="tracking-id"
                  name="trackingId"
                  type="text"
                  placeholder="Enter tracking number"
                  className="w-full p-3 mb-2 border border-purple-500 bg-white text-gray-900 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-150"
                />

                <ErrorMessage
                  name="trackingId"
                  component="div"
                  className="text-orange-200 text-xs mb-3"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-white font-bold rounded-lg bg-orange-500 hover:bg-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-60"
                >
                  {isSubmitting ? "Tracking..." : "TRACK PACKAGE"}
                </button>
              </Form>
            )}
          </Formik>

          {/* Additional Links */}
          <div className="py-2">
            {[
              "Advanced Shipment Tracking",
              "Manage Your Delivery",
              "Manage a Return",
            ].map((item) => (
              <MenuItem key={item}>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-purple-50 text-purple-700" : "text-gray-700",
                      "block px-4 py-3 text-sm font-medium transition-colors duration-150 border-l-4 border-transparent hover:border-purple-500"
                    )}
                  >
                    {item}
                  </a>
                )}
              </MenuItem>
            ))}
          </div>

          {/* Footer link */}
          <div className="py-3 px-4 text-center bg-gray-50 border-t border-gray-100">
            <a
              href="#"
              className="text-xs text-blue-600 uppercase font-bold hover:text-blue-700 transition-colors duration-150"
            >
              All Tracking Services
            </a>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default TrackingDropdown;
