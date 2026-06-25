import React, { useCallback, useEffect, useState } from "react";
import useHeaderData from "../Hooks/useHeaderData";
import axios from "axios";

const ImageUploader = ({ id }) => {
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const [packageImages, setPackageImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const { userInfo, token } = useHeaderData();

  // Fetch package images
  const fetchPackageImages = useCallback(async () => {
    try {
      if (userInfo) {
        const response = await axios.get(
          `${BaseUrl}package/getpackageimage?packageId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPackageImages(
          response.status === 200 ? response.data.data.photos : []
        );
      }
    } catch (error) {
      console.error("Error fetching package images:", error.message);
    }
  }, [id, token, userInfo]);

  useEffect(() => {
    fetchPackageImages();
  }, [fetchPackageImages]);

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter((file) =>
      ["image/jpeg", "image/png", "image/gif"].includes(file.type)
    );

    if (imageFiles.length > 15) {
      alert("You can only upload up to 15 images at once.");
    } else {
      setSelectedImages(imageFiles);
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    const formData = new FormData();

    selectedImages.forEach((file) => {
      formData.append("files", file); // The field name here ("photos") should match your multer setup on the backend
    });

    try {
      const response = await axios.post(
        `${BaseUrl}package/uploadphotos?packageId=${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.responseCode === 200) {
        alert("Images uploaded successfully!");
        fetchPackageImages();
        setSelectedImages([]);
      }
    } catch (error) {
      console.error("Error uploading images:", error.message);
    }
  };

  // Handle image deletion
  const handleDelete = async (imageId, link) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${BaseUrl}package/deletepackageimage?packageId=${id}&link=${link}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Image deleted successfully!");
        fetchPackageImages();
      }
    } catch (error) {
      console.error("Error deleting image:", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Display uploaded images */}
      {packageImages.length === 0 ? (
        <h1>No images uploaded for this package. Upload one!</h1>
      ) : (
        <div className="grid grid-cols-4">
          {packageImages.map((image, index) => (
            <div key={index} className="col-span-1 rounded-md relative">
              <img src={image} alt="Uploaded" />
              <button
                className="rounded opacity-70 bg-red-600 hover:bg-red-500 p-[2px] text-white w-full absolute bottom-0 text-xs"
                onClick={() => handleDelete(index, image)}
              >
                <span className="material-symbols-outlined ">
                  delete_forever
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Image upload form */}
      <div className="flex justify-between p-5">
        <input
          type="file"
          name="image"
          id="image"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="rounded bg-purple-800 hover:bg-purple-700 p-2 text-white"
        >
          Upload
        </button>
      </div>

      {/* Preview selected images */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-4 gap-5 justify-between">
          {selectedImages.map((image, index) => (
            <div key={index} className="col-span-1">
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
