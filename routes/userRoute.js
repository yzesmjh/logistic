const express = require("express");
const protect = require("../middleWare/authMiddleware");

const {
  registerUser,
  loginUser,
  verifyUser,
  logout,
  changePassword,
  editUser,
  forgotPassword,
  resetPassword,
  getAllUsers,
  deleteUser,
  getSingleUser,
  uploadPhoto,
  changePin,
} = require("../controllers/userController");
const { upload } = require("../middleWare/uploadHandler");

const router = express.Router();

router.post("/register", registerUser);
router.get("/verify/:id/", verifyUser);
router.post("/login", loginUser);
router.post("/logout", logout);
router.patch("/changepassword", protect, changePassword);
router.patch("/changepin", protect, changePin);
router.patch("/edituser", protect, editUser);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword", resetPassword);
router.get("/getallusers", protect, getAllUsers);
router.delete("/deletesingleuser", protect, deleteUser);
router.get("/getsingleuser", protect, getSingleUser);
router.post("/uploadphoto", upload.single("file"), protect, uploadPhoto);

module.exports = router;
