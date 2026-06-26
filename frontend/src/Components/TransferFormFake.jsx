import { BASE_URL } from "../config";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import { toast } from "react-toastify";

const TransferForm = () => {
  const BaseUrl = BASE_URL;
  const { userInfo, token: fetchedToken } = useHeaderData();

  // Form validation schema using Yup
  const validationSchema = Yup.object({
    origin: Yup.string().required("Origin name is required"),
    destination: Yup.string().required("Destination address is required"),
    carrier: Yup.string().required("Carrier is required"),
    packageName: Yup.string().required("Package name is required"),
    typeOfShipment: Yup.string().required("Type of shipment is required"),
    weight: Yup.string().required("Weight is required"),
    shipmentMode: Yup.string().required("Shipment mode is required"),
    carrierReferenceNo: Yup.string().required(
      "Carrier reference number is required"
    ),
    product: Yup.string().required("Product is required"),
    qty: Yup.string().required("Quantity is required"),
    paymentMode: Yup.string().required("Payment mode is required"),
    totalFreight: Yup.string().required("Total freight is required"),
    expectedshipmentMode: Yup.string().required(
      "Expected shipmentMode is required"
    ),
    deliveryTime: Yup.string().required("Delivery time is required"),
    pickupDate: Yup.string().required("Pickup date is required"),
    pickupTime: Yup.string().required("Pickup time is required"),
    shipperInformation: Yup.string().required(
      "Shipper information is required"
    ),
    shipperContact: Yup.string().required("Shipper contact is required"),
    receiverInformation: Yup.string().required(
      "Receiver information is required"
    ),
    receiverContact: Yup.string().required("Receiver contact is required"),
    status: Yup.string().required("Status is required"),
    comments: Yup.string().required("Comments are required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${BaseUrl}package/createpackage`,
        values,
        {
          headers: {
            Authorization: `Bearer ${fetchedToken}`,
          },
        }
      );

      if (response?.status === 200) {
        toast.success(response?.data?.responseMessage);
        setApiResponse(response?.data?.responseMessage);
        resetForm();
        setTimeout(() => {
          navigate("/dashboard", {});
        }, 1000);
      } else {
        toast.warn(response?.data?.responseMessage);
      }
    } catch (error) {
      console.error("Error creating package:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    origin: "",
    destination: "",
    carrier: "",
    packageName: "",
    typeOfShipment: "",
    weight: "",
    shipmentMode: "",
    carrierReferenceNo: "",
    product: "",
    qty: "",
    paymentMode: "",
    totalFreight: "",
    expectedshipmentMode: "",
    deliveryTime: "",
    pickupDate: "",
    pickupTime: "",
    shipperInformation: "",
    shipperContact: "",
    receiverInformation: "",
    receiverContact: "",
    status: "",
    comments: "",
  };

  // Common field rendering component
  const RenderField = ({ name, label, type = "text" }) => (
    <div className="mt-2">
      <label htmlFor={name} className="block text-sm text-gray-600">
        {label}
      </label>
      <Field
        name={name}
        type={type}
        className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="text-left">
          {/* Shipment Details Section */}
          <h4>Shipment Details</h4>
          <RenderField name="origin" label="Origin" />
          <RenderField name="destination" label="Destination" />
          <RenderField name="carrier" label="Carrier" />
          <RenderField name="typeOfShipment" label="Type of Shipment" />

          {/* Package Details Section */}
          <h4>Package Details</h4>
          <RenderField name="packageName" label="Package Name" />
          <RenderField name="weight" label="Weight (kg)" type="number" />
          <RenderField name="product" label="Product Description" />
          <RenderField name="qty" label="Quantity" type="number" />

          {/* Timing Section */}
          <h4>Timing</h4>
          <RenderField name="pickupDate" label="Pickup Date" type="date" />
          <RenderField name="pickupTime" label="Pickup Time" type="time" />

          {/* Additional Fields */}
          <h4>Additional Information</h4>
          <div className="mb-3">
            <label htmlFor="comments" className="form-label">
              Comments
            </label>
            <Field
              name="comments"
              as="textarea"
              rows="3"
              className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
            />
            <ErrorMessage
              name="comments"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
            >
              {isSubmitting ? "Submitting..." : "Submit Packages"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransferForm;
