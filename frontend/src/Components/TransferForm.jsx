import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TransferForm = () => {
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const navigate = useNavigate();

  const { token: fetchedToken } = useHeaderData();

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
    signedForBy: Yup.string().required("Signed For By is required"),
    comments: Yup.string().required("Comments are required"),
    expectedDeliveryDate: Yup.string().required(
      "Expected Delivery Date are required"
    ),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
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
    deliveryTime: "",
    pickupDate: "",
    pickupTime: "",
    shipperInformation: "",
    shipperContact: "",
    receiverInformation: "",
    receiverContact: "",
    status: "",
    comments: "",
    expectedDeliveryDate: "",
    signedForBy: "",
  };

  // Common field rendering component
  const RenderField = ({
    name,
    label,
    type = "text",
    options = [{ name: "Default", value: null }],
  }) => (
    <div className="mt-2">
      <label htmlFor={name} className="block text-sm text-gray-600">
        {label}
      </label>
      {type !== "select" ? (
        <Field
          as={type === "textarea" ? "textarea" : undefined}
          name={name}
          type={type === "textarea" ? undefined : type}
          className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
        />
      ) : (
        <Field
          as="select"
          name={name}
          className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </Field>
      )}
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
      {({ setFieldValue, values, isSubmitting }) => (
        <Form className="w-full lg:w-full mt-6 pl-0 lg:pl-2 font-normal">
          <div className="leading-loose text-left">
            <RenderField label="Origin" name="origin" type="text" />
            <RenderField label="Destination" name="destination" type="text" />
            <RenderField label="Carrier" name="carrier" type="text" />
            <RenderField label="Package Name" name="packageName" type="text" />
            <RenderField
              label="Type Of Shipment"
              name="typeOfShipment"
              type="text"
            />
            <RenderField label="weight" name="weight" type="text" />
            <RenderField
              label="shipment Mode"
              name="shipmentMode"
              type="text"
            />
            <RenderField
              label="Carrier Reference No"
              name="carrierReferenceNo"
              type="text"
            />
            <RenderField label="product" name="product" type="text" />
            <RenderField label="Quantity(qty)" name="qty" type="text" />
            <RenderField label="Payment Mode" name="paymentMode" type="text" />
            <RenderField
              label="Total Freight"
              name="totalFreight"
              type="text"
            />

            <RenderField
              label="Delivery Time"
              name="deliveryTime"
              type="time"
            />
            <RenderField label="Pickup Date" name="pickupDate" type="date" />
            <RenderField label="Pickup Time" name="pickupTime" type="time" />
            <RenderField
              label="Shipper Information"
              name="shipperInformation"
              type="text"
            />
            <RenderField
              label="Shipper Contact"
              name="shipperContact"
              type="text"
            />
            <RenderField
              label="Receiver Contact"
              name="receiverContact"
              type="text"
            />
            <RenderField
              label="Receiver Information"
              name="receiverInformation"
              type="text-area"
            />
            <RenderField
              label="Expected Delivery Date"
              name="expectedDeliveryDate"
              type="date"
            />
            <RenderField label="Signed For By" name="signedForBy" type="text" />
            <RenderField
              label="status"
              name="status"
              type="select"
              options={[
                { name: "select an option", value: "" },
                { name: "Processed", value: "Processed" },
                { name: "Picked Up", value: "Picked Up" },
                { name: "Transit", value: "Transit" },
                { name: "On Hold", value: "On Hold" },
                { name: "Delivered", value: "Delivered" },
              ]}
            />

            <RenderField label="comments" name="comments" type="textarea" />

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
              >
                {isSubmitting ? "Submitting..." : "Submit Packages"}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default TransferForm;
