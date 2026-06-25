const mongoose = require("mongoose");

const packageSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Please add a user"],
    },
    packageNumber: {
      type: String,
      default: Math.floor(
        100000 + Math.random() * 9_000_000_000_000
      ).toString(),
      required: [true, "Please add a package Number"],
    },
    origin: {
      type: String,
      required: [true, "Please add the origin"],
    },
    destination: {
      type: String,
      required: [true, "Please add the destination"],
    },
    carrier: {
      type: String,
      required: [true, "Please add the carrier name"],
    },
    typeOfShipment: {
      type: String,
      required: [true, "Please add the type of shipment"],
    },
    packageName: {
      type: String,
      default: "Not specified",
    },
    weight: {
      type: String,
      required: [true, "Please add the weight"],
    },
    shipmentMode: {
      type: String,
      required: [true, "Please add the shipment mode"],
    },
    carrierReferenceNo: {
      type: String,
      required: [true, "Please add the carrier reference number"],
    },
    product: {
      type: String,
      required: [true, "Please add the product description"],
    },
    qty: {
      type: String,
      required: [true, "Please add the quantity"],
    },
    paymentMode: {
      type: String,
      required: [true, "Please add the payment mode"],
    },
    totalFreight: {
      type: String,
      required: [true, "Please add the total freight details"],
    },
    expectedDeliveryDate: {
      type: String,
      required: [true, "Please add the expected delivery date"],
    },
    deliveryTime: {
      type: String,
      required: [true, "Please add the delivery time"],
    },
    pickupDate: {
      type: String,
      required: [true, "Please add the pickup date"],
    },
    pickupTime: {
      type: String,
      required: [true, "Please add the pickup time"],
    },
    comments: {
      type: String,
      required: [true, "Please add any comments"],
    },
    shipperInformation: {
      type: String,
      required: [true, "Please add the shipper information"],
    },
    shipperContact: {
      type: String,
      required: [true, "Please add the shipper contact"],
    },
    receiverInformation: {
      type: String,
      required: [true, "Please add the receiver information"],
    },
    receiverContact: {
      type: String,
      required: [true, "Please add the receiver contact"],
    },
    status: {
      type: String,
      required: [true, "Please add the package status"],
      default: "Processed",
    },
    signedForBy: {
      type: String,
      required: [true, "Please add the Signed for by"],
    },
  },
  {
    timestamps: true,
  }
);

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
