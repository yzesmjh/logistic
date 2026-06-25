const mongoose = require("mongoose");

const deliveryCommentSchema = mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Package", // Reference the "Package" model
    },
    comments: [
      {
        title: { type: String, required: true },
        value: { type: String, required: true },
        date: { type: String, required: false },
        tag: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

const DeliveryComment = mongoose.model(
  "DeliveryComment",
  deliveryCommentSchema
);
module.exports = DeliveryComment;
