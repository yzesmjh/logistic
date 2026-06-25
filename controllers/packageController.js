const express = require("express");
const Package = require("../models/packageModel");
const asynchandler = require("express-async-handler");
const { respondsSender } = require("../middleWare/responseHandler");
const { ResponseCode } = require("../utils/responseCode");
const User = require("../models/userModel");
const File = require("../models/fileModel");
const DeliveryComment = require("../models/deliveryCommentModel");

// CREATE

// Create a package
const createPackage = asynchandler(async (req, res) => {
  const {
    origin,
    destination,
    carrier,
    typeOfShipment,
    weight,
    shipmentMode,
    carrierReferenceNo,
    product,
    qty,
    paymentMode,
    totalFreight,
    expectedDeliveryDate,
    deliveryTime,
    pickupDate,
    pickupTime,
    comments,
    shipperInformation,
    shipperContact,
    receiverInformation,
    receiverContact,
    packageName,
    signedForBy,
    status,
  } = req.body;

  const userId = req.userId;

  // Validate required fields
  if (
    !origin ||
    !destination ||
    !carrier ||
    !typeOfShipment ||
    !weight ||
    !shipmentMode ||
    !carrierReferenceNo ||
    !product ||
    !qty ||
    !paymentMode ||
    !totalFreight ||
    !expectedDeliveryDate ||
    !deliveryTime ||
    !pickupDate ||
    !pickupTime ||
    !shipperInformation ||
    !shipperContact ||
    !receiverInformation ||
    !packageName ||
    !receiverContact ||
    !signedForBy ||
    !status
  ) {
    const responseMessage = "All fields are required.";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Create the package document
    const newPackage = new Package({
      userId,
      origin,
      destination,
      carrier,
      typeOfShipment,
      weight,
      shipmentMode,
      carrierReferenceNo,
      product,
      qty,
      paymentMode,
      totalFreight,
      expectedDeliveryDate,
      deliveryTime,
      pickupDate,
      pickupTime,
      comments,
      shipperInformation,
      packageName,
      shipperContact,
      receiverInformation,
      receiverContact,
      status,
      signedForBy,
      packageNumber: Math.floor(Math.random() * 1_000_000_000_000_000),
    });

    // Save the package
    const newsavedPackage = await newPackage.save();

    // Send success response
    const responseMessage = "Package created successfully";
    return respondsSender(
      newsavedPackage,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// Save Delivery Comments
const saveDeliveryComments = asynchandler(async (req, res) => {
  const { packageId, comments } = req.body;

  // Validate required fields
  if (
    !packageId ||
    !comments ||
    !Array.isArray(comments) ||
    comments.length === 0
  ) {
    const responseMessage = "Package ID and at least one comment are required.";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Remove all existing comments for the given packageId
    await DeliveryComment.deleteMany({ packageId });

    // Create a new delivery comment document
    const newDeliveryComment = new DeliveryComment({
      packageId,
      comments: comments.map((comment) => ({
        title: comment.title,
        value: comment.value,
        date: comment.date,
        tag: comment.tag,
      })),
    });

    // Save to the database
    await newDeliveryComment.save();

    // Send success response
    const responseMessage = "Delivery comments saved successfully";
    return respondsSender(
      newDeliveryComment,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error saving delivery comments: " + error.message;
    return respondsSender(null, responseMessage, ResponseCode.serverError, res);
  }
});

// READ
// Get all packages
const getAllPackages = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId } = req.query;
  // Validate data
  if (!userId) {
    // Send error message
    const responseMessage = "User ID not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const packages = await Package.find({ userId }).sort({
      createdAt: -1,
    });

    // Check if packages exist
    if (!packages) {
      // Send error message if no packages found
      const responseMessage = "No Package found";
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }

    // Return success response with packages
    const responseMessage = "Packages retrieved successfully";
    return respondsSender(
      packages,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    // Handle errors
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// Get a single package
const getSinglePackage = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId, packageId } = req.query;
  // Validate data
  if (!userId || !packageId) {
    // Send error message
    const responseMessage =
      "User ID or Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const package = await Package.findOne({
      $and: [{ userId }, { _id: packageId }],
    });

    if (!package) {
      const responseMessage = `No package found with id: ${packageId} for user: ${userId}`;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }
    const comment = await DeliveryComment.findOne({
      packageNumber: `${packageId}`,
    });

    const responseMessage = "Package retrieved successfully";
    return respondsSender(
      { package, comment },
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

const deleteComment = asynchandler(async (req, res) => {
  const { packageId } = req.body;
  // Validate data
  if (!packageId) {
    // Send error message
    const responseMessage = "Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }
  try {
    const package = await DeliveryComment.findOneAndDelete({
      packageId: packageId,
    });

    if (!package) {
      // If no package was found and deleted
      const responseMessage = `No comment with id: ${packageId}`;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.badRequest,
        res
      );
    }

    // If package was successfully deleted
    const responseMessage = `Comment deleted successfully`;
    return respondsSender(
      package,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    // If an error occurred during the deletion process
    const responseMessage = error.message;
    return respondsSender(null, responseMessage, ResponseCode.successful, res);
  }
});

// Get a single package general
const getPackage = asynchandler(async (req, res) => {
  // Collect data from body
  const { packageId } = req.query;

  // Validate data
  if (!packageId) {
    // Send error message
    const responseMessage = " Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const package = await Package.findOne({ packageNumber: `${packageId}` });

    if (!package) {
      const responseMessage = `No package found with Tracking ID: ${packageId} `;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }
    const responseMessage = "Package retrieved successfully";
    const Images = await File.findOne({ packageId: `${package._id}` });
    const comment = await DeliveryComment.findOne({
      packageId: `${package._id}`,
    });

    const newDdata = {
      package,
      packageImage: Images?.photos,
      comment: comment?.comments,
    };

    return respondsSender(
      newDdata,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});
const getComment = asynchandler(async (req, res) => {
  // Collect data from body
  const { packageId } = req.query;

  // Validate data
  if (!packageId) {
    // Send error message
    const responseMessage = " Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const comment = await DeliveryComment.findOne({ packageId });

    if (!comment) {
      const responseMessage = `No package found with Tracking ID: ${packageId} `;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }

    return respondsSender(
      comment,
      "Package retrieved successfully",
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// UPDATE
// Update a single field

const updateSinglePackage = asynchandler(async (req, res) => {
  const { packageId } = req.params;
  const updates = req.body; // Get fields to update from the request body

  console.log("Here", packageId);

  // Validate required fields
  if (!packageId || Object.keys(updates).length === 0) {
    const responseMessage = "Package ID and update fields are required.";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Find and update the package
    const updatedPackage = await Package.findByIdAndUpdate(
      packageId,
      { $set: updates }, // Dynamically apply updates
      { new: true, runValidators: true } // Return the updated package and validate fields
    );

    // If no package is found
    if (!updatedPackage) {
      const responseMessage = `No package found with ID: ${packageId}`;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }

    // Success response
    const responseMessage = "Package updated successfully";
    return respondsSender(
      updatedPackage,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error updating package: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// DELETE
// Delete a single package
const deletePackage = asynchandler(async (req, res) => {
  const { packageId } = req.body;
  // Validate data
  if (!packageId) {
    // Send error message
    const responseMessage = "Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }
  try {
    const package = await Package.findOneAndDelete({
      _id: packageId,
    });

    if (!package) {
      // If no package was found and deleted
      const responseMessage = `No packages with id: ${packageId}`;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.badRequest,
        res
      );
    }

    // If package was successfully deleted
    const responseMessage = `Package deleted successfully`;
    return respondsSender(
      package,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    // If an error occurred during the deletion process
    const responseMessage = error.message;
    return respondsSender(null, responseMessage, ResponseCode.successful, res);
  }
});

// Delete all packages
const deleteAllPackages = asynchandler(async (req, res) => {
  // Collect data from body
  const { userId } = req.query;
  // Validate data
  if (!userId) {
    // Send error message
    const responseMessage = "User ID not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Delete all packages associated with the user
    const result = await Package.deleteMany({ userId });

    // Check if any packages were deleted
    if (result.deletedCount === 0) {
      // Send error message if no packages were deleted
      const responseMessage = "No packages found for the user";
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }

    // Return success response
    const responseMessage = "All packages deleted successfully";
    return respondsSender(null, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    // Handle errors
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// Delete all packages
const runScript = asynchandler(async (req, res) => {
  // Collect data from body

  try {
    // Run update
    const defaultPackagePin = [
      { status: "success", pin: "1234" },
      { status: "failed", pin: "0000" },
      { status: "hold", pin: "0090" },
    ];

    // Update all users with the default packagePin
    const result = await User.updateMany(
      {},
      { $set: { packagePin: defaultPackagePin } }
    );

    return respondsSender(null, responseMessage, ResponseCode.successful, res);
  } catch (error) {
    // Handle errors
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

const uploadPhotos = asynchandler(async (req, res) => {
  const { packageId } = req.query;
  const userId = req.userId;

  try {
    // Validation Check
    if (!userId || !packageId || !req.files || req.files.length === 0) {
      return respondsSender(
        null,
        "Please provide userId, packageId, and at least one file",
        ResponseCode.badRequest,
        res
      );
    }

    // Get the file URLs from Cloudinary
    const filePaths = req.files.map((file) => file.path); // Array of Cloudinary URLs

    // Check if a document with the same packageId and userId exists
    let existingPackageImages = await File.findOne({ userId, packageId });

    if (existingPackageImages) {
      // Push new images into the existing photos array
      existingPackageImages.photos.push(...filePaths);

      // Save the updated document
      await existingPackageImages.save();

      return respondsSender(
        existingPackageImages,
        "Photos added to existing package successfully",
        ResponseCode.successful,
        res
      );
    } else {
      // Create a new document if none exists
      const newPackageImages = new File({
        userId,
        packageId,
        photos: filePaths, // Store the array of image URLs
      });

      // Save the document to the database
      await newPackageImages.save();

      return respondsSender(
        newPackageImages,
        "Photos uploaded successfully",
        ResponseCode.successful,
        res
      );
    }
  } catch (error) {
    // Handle any errors that occurred during the upload
    return respondsSender(
      null,
      "Photo upload failed: " + error.message,
      ResponseCode.internalServerError,
      res
    );
  }
});

const getPackageImages = asynchandler(async (req, res) => {
  // Collect data from body
  const { packageId } = req.query;
  const userId = req.userId;

  // Validate data
  if (!userId || !packageId) {
    // Send error message
    const responseMessage =
      "User ID or Package Id not included in body request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    const package = await File.findOne({
      $and: [{ userId }, { packageId }],
    });

    if (!package) {
      const responseMessage = `No package image found with id: ${packageId} for user: ${userId}`;
      return respondsSender(null, responseMessage, ResponseCode.noData, res);
    }
    const responseMessage = "Package Image retrieved successfully";
    return respondsSender(
      package,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    const responseMessage = "Error: " + error.message;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

// Delete a single package image
// Delete a single image link from a package
const deletePackageImage = asynchandler(async (req, res) => {
  const { packageId, link } = req.query;
  const userId = req.userId;

  // Validate inputs
  if (!packageId || !link) {
    const responseMessage =
      "Package Id and link must be included in the request";
    return respondsSender(null, responseMessage, ResponseCode.badRequest, res);
  }

  try {
    // Find the document and remove the specific link from the photos array
    const package = await File.findOneAndUpdate(
      { packageId, userId }, // Match the package and user
      { $pull: { photos: link } }, // Remove the specific link from the array
      { new: true } // Return the updated document
    );

    if (!package) {
      const responseMessage = `No package found with packageId: ${packageId} and userId: ${userId}`;
      return respondsSender(
        null,
        responseMessage,
        ResponseCode.badRequest,
        res
      );
    }

    // If the link was successfully removed
    const responseMessage = `Link removed successfully`;
    return respondsSender(
      package,
      responseMessage,
      ResponseCode.successful,
      res
    );
  } catch (error) {
    // If an error occurred during the process
    const responseMessage = `Error removing link: ${error.message}`;
    return respondsSender(
      null,
      responseMessage,
      ResponseCode.internalServerError,
      res
    );
  }
});

module.exports = {
  getComment,
  deleteComment,
  saveDeliveryComments,
  getPackage,
  deletePackageImage,
  getPackageImages,
  uploadPhotos,
  runScript,
  createPackage,
  getAllPackages,
  getSinglePackage,
  updateSinglePackage,
  deletePackage,
  deleteAllPackages,
};
