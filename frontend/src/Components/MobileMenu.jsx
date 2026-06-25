"use client";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { navData } from "../utils/data";
import { useNavigate } from "react-router-dom";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    trackingId: Yup.string()
      .min(7, "Tracking ID must be at least 7 characters long")
      .required("Tracking ID is required"),
  });

  const handleSubmit = (values) => {
    navigate(`/track/${values.trackingId}`);
  };

  return (
    <div className="lg:hidden">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-purple-800 shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Navigation Links */}
            {Object.entries(navData).map(([name, data]) => (
              <div
                key={name}
                className="border-b border-purple-700 last:border-b-0"
              >
                <button className="w-full text-left px-3 py-2 text-white font-medium hover:bg-purple-700 rounded-md">
                  {name}
                </button>
                {data.items.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="block pl-6 pr-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700 text-sm"
                  >
                    {item}
                  </a>
                ))}
                {data.bottomLink && (
                  <div className="px-3 py-2 border-t border-purple-700">
                    <a
                      href="#"
                      className={`text-xs font-semibold ${
                        name === "Design & Print"
                          ? "text-orange-300"
                          : "text-blue-300"
                      } hover:underline`}
                    >
                      {data.bottomLink}
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Tracking Section */}
            <div className="border-b border-purple-700">
              <div className="px-3 py-4 bg-purple-700">
                <Formik
                  initialValues={{ trackingId: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <label
                        htmlFor="tracking-id"
                        className="block uppercase text-xs text-white font-bold mb-2"
                      >
                        Tracking ID
                      </label>
                      <Field
                        id="tracking-id"
                        name="trackingId"
                        type="text"
                        placeholder="Enter tracking number"
                        className="w-full p-3 mb-2 border border-purple-600 bg-purple-800 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <ErrorMessage
                        name="trackingId"
                        component="div"
                        className="text-orange-200 text-xs mb-3"
                      />

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 text-white font-bold rounded-lg bg-orange-500 hover:bg-orange-600 transition duration-150 disabled:opacity-60"
                      >
                        {isSubmitting ? "Processing..." : "TRACK PACKAGE"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>

              {/* Extra tracking links */}
              {[
                "Advanced Shipment Tracking",
                "Manage Your Delivery",
                "Manage a Return",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block pl-6 pr-3 py-2 text-purple-200 hover:text-white hover:bg-purple-700 text-sm"
                >
                  {item}
                </a>
              ))}

              <div className="px-3 py-2 border-t border-purple-700">
                <a
                  href="#"
                  className="text-xs text-blue-300 font-semibold hover:underline"
                >
                  All Tracking Services
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
