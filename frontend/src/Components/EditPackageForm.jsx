import { BASE_URL } from "../config";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import { toast } from "react-toastify";

const EditTransferForm = ({ data }) => {
  const BaseUrl = BASE_URL;

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

  // Initial values for Formik (prefilled with data)
  const initialValues = {
    origin: data?.origin || "",
    destination: data?.destination || "",
    carrier: data?.carrier || "",
    packageName: data?.packageName || "",
    typeOfShipment: data?.typeOfShipment || "",
    weight: data?.weight || "",
    shipmentMode: data?.shipmentMode || "",
    carrierReferenceNo: data?.carrierReferenceNo || "",
    product: data?.product || "",
    qty: data?.qty || "",
    paymentMode: data?.paymentMode || "",
    totalFreight: data?.totalFreight || "",
    deliveryTime: data?.deliveryTime || "",
    pickupDate: data?.pickupDate || "",
    pickupTime: data?.pickupTime || "",
    shipperInformation: data?.shipperInformation || "",
    shipperContact: data?.shipperContact || "",
    receiverInformation: data?.receiverInformation || "",
    receiverContact: data?.receiverContact || "",
    status: data?.status || "",
    comments: data?.comments || "",
    expectedDeliveryDate: data?.expectedDeliveryDate || "",
    signedForBy: data?.signedForBy || "",
  };

  // Form submission handler
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.put(
        `${BaseUrl}package/updatesinglepackage/${data._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${fetchedToken}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Shipment updated successfully");
        window.location.reload();
      } else {
        toast.warn("Failed to update shipment");
      }
    } catch (error) {
      setFieldError("apiresponse", error.message);
    } finally {
      setSubmitting(false);
    }
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
    <div className="w-full mt-6">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
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

            {/* Similar blocks for each field */}

            <div>
              <ErrorMessage
                name="apiresponse"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white ${
                isSubmitting ? "bg-gray-400" : "bg-blue-600"
              } px-5 py-2.5 rounded-lg`}
            >
              {isSubmitting ? "Submitting..." : "Update Shipment"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditTransferForm;
