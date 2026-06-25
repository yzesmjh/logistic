const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ROLES } = require("../utils/constants");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add a First Name"],
    },

    lastname: {
      type: String,
      required: [true, "Please add a Last Name"],
    },
    profilePicx: {
      type: String,
      required: [false, "Please add a profilePicx"],
      default:
        "https://newaccessbank.onrender.com/api/uploads/pictures/user.png",
    },

    email: {
      type: String,
      required: [true, "Please add a Email"],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid Email",
      ],
    },
    customerId: {
      type: String,
      required: [true, "Please add a customerId"],
      unique: true,
      trim: true,
    },

    role: {
      type: String,
      required: [true, "Please add a gender"],
      default: ROLES.USER,
      enum: [ROLES.ADMIN, ROLES.USER],
    },

    password: {
      type: String,
      required: [true, "Please add your Password"],
      minLength: [6, "password must be up to 6 characters"],
    },
  },
  { timestamps: true }
);

// Encrypt password before saving to DB
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
