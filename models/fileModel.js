const mongoose = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "package",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    photos: {
      type: [String], // An array of strings to store image paths/URLs
      required: true,
    },
  },

  { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
module.exports = File;
