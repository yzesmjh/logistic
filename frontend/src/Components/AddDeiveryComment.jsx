import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useHeaderData from "../Hooks/useHeaderData";
import { useCallback, useEffect, useState } from "react";

const AddDeliveryComment = ({ id }) => {
const BaseUrl = import.meta.env.VITE_BASEURL;
  const { token: fetchedToken } = useHeaderData();

  const [commentData, setCommentData] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true); // Start loading as true

  const fetchComment = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}package/getcomment?packageId=${id}`
      );

      if (response.status === 200 && response?.data?.data?.comments) {
        setCommentData(response.data.data?.comments);
      } else {
        setCommentData([]); // Default to empty array if no comments found
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
      setCommentData([]); // Handle errors by setting to empty array
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <ThreeCircles height="50" width="50" color="#4fa94d" />
      </div>
    );
  }

  return (
    <div className="w-full mx-auto mt-6">
      <Formik
        enableReinitialize // Ensure form updates when `commentData` changes
        initialValues={{
          packageId: id, // Package ID
          comments: commentData?.length
            ? commentData
            : [
                {
                  title: "",
                  value: "",
                  date: "2025-01-29 2:00am",
                  tag: "",
                },
              ], // Preload with fetched data or default structure
        }}
        validationSchema={Yup.object({
          comments: Yup.array()
            .of(
              Yup.object({
                title: Yup.string().required("Title is required"),
                value: Yup.string().required("Value is required"),
                date: Yup.string().required("Date is required"),
                tag: Yup.string(),
              })
            )
            .required("At least one comment is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const response = await axios.post(
              `${BaseUrl}package/comment?packageId=${id}`,
              values,
              {
                headers: {
                  Authorization: `Bearer ${fetchedToken}`,
                },
              }
            );
            toast.success("Delivery Comment Submitted Successfully");
            resetForm();
          } catch (error) {
            toast.error("Failed to submit delivery comment");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          getFieldProps,
          errors,
          touched,
        }) => (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <FieldArray
              name="comments"
              render={({ remove, push }) => (
                <div>
                  <label className="block mb-2 text-lg font-medium text-gray-900">
                    Comments
                  </label>
                  {values.comments.map((comment, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 p-4 rounded-lg mb-4"
                    >
                      <div>
                        <label className="block text-sm font-medium">
                          Title
                        </label>
                        <input
                          type="text"
                          name={`comments[${index}].title`}
                          {...getFieldProps(`comments[${index}].title`)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="Enter title"
                        />
                        {touched.comments?.[index]?.title &&
                          errors.comments?.[index]?.title && (
                            <div className="text-red-600 text-sm">
                              {errors.comments[index].title}
                            </div>
                          )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Value
                        </label>
                        <textarea
                          name={`comments[${index}].value`}
                          {...getFieldProps(`comments[${index}].value`)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="Enter value"
                        />
                        {touched.comments?.[index]?.value &&
                          errors.comments?.[index]?.value && (
                            <div className="text-red-600 text-sm">
                              {errors.comments[index].value}
                            </div>
                          )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">
                          Date
                        </label>
                        <input
                          type="text"
                          name={`comments[${index}].date`}
                          {...getFieldProps(`comments[${index}].date`)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        />

                        {touched.comments?.[index]?.date &&
                          errors.comments?.[index]?.date && (
                            <div className="text-red-600 text-sm">
                              {errors.comments[index].date}
                            </div>
                          )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium">Tag</label>
                        <input
                          type="text"
                          name={`comments[${index}].tag`}
                          {...getFieldProps(`comments[${index}].tag`)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                          placeholder="Enter tag"
                        />
                        {touched.comments?.[index]?.tag &&
                          errors.comments?.[index]?.tag && (
                            <div className="text-red-600 text-sm">
                              {errors.comments[index].tag}
                            </div>
                          )}
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 text-white bg-red-600 py-1 px-3 rounded-md hover:bg-red-600 text-xs"
                      >
                        Remove Comment
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      push({ title: "", value: "", date: "", tag: "" })
                    }
                    className="mt-4 text-white bg-green-600 py-1 px-3 rounded-md hover:bg-green-600 text-xs"
                  >
                    Add Comment
                  </button>
                </div>
              )}
            />

            <div>
              {isSubmitting ? (
                <button
                  disabled
                  className="flex items-center justify-center w-full bg-purple-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  <ThreeCircles height="25" width="25" color="#ffffff" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-purple-800 text-white font-medium rounded-lg text-sm px-5 py-2.5"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default AddDeliveryComment;
