const express = require("express");
const protect = require("../middleWare/authMiddleware");
const {
  createPackage,
  getAllPackages,
  getSinglePackage,
  updateSinglePackage,
  deletePackage,
  deleteAllPackages,
  runScript,
  uploadPhoto,
  getPackageImages,
  uploadPhotos,
  deletePackageImage,
  getPackage,
  saveDeliveryComments,
  deleteComment,
  getComment,
} = require("../controllers/packageController");
const { upload } = require("../middleWare/uploadHandler");

const router = express.Router();

router.post("/createpackage", protect, createPackage);
router.get("/getallPackages", protect, getAllPackages);
router.get("/getsinglePackage", protect, getSinglePackage);
router.get("/getpackage", getPackage);
router.get("/getcomment", getComment);
router.get("/getpackageimage", protect, getPackageImages);
router.put("/updatesinglepackage/:packageId", protect, updateSinglePackage);
router.post("/comment", protect, saveDeliveryComments);
router.delete("/deletecomment", protect, deleteComment);
router.delete("/deletesinglepackage", protect, deletePackage);
router.delete("/deleteallPackages", protect, deleteAllPackages);
router.delete("/deletepackageimage", protect, deletePackageImage);
router.post("/uploadphotos", upload.array("files", 20), protect, uploadPhotos);

router.get("/runscript", runScript);

module.exports = router;
