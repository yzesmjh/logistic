import { BASE_URL } from "../../config";
import { useRef, useState } from "react";
import axios from "axios";
import useHeaderData from "../../Hooks/useHeaderData";
import { toast, ToastContainer } from "react-toastify";

const ImageUploader = ({ user }) => {
  const BaseUrl = BASE_URL;
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useHeaderData();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!previewUrl || !user?._id) return;

    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user._id);

    setLoading(true);
    try {
      const response = await axios.post(
        `${BaseUrl}users/uploadphoto`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response?.data?.responseCode == 200) {
        toast.success(response?.data?.responseMessage || "Photo updated!");
        // Persist to session so NavBar/Header reflect the change
        const stored = sessionStorage.getItem("user");
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.profilePicx = response?.data?.data?.profilePicx;
          sessionStorage.setItem("user", JSON.stringify(parsed));
        }
        setTimeout(() => window.location.reload(), 1200);
      } else {
        toast.warn(response?.data?.responseMessage || "Upload failed.");
      }
      setPreviewUrl(null);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Error uploading photo. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview or pick-photo area */}
      {previewUrl ? (
        <div className="flex flex-col items-center gap-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-200 shadow"
          />
          <p className="text-xs text-gray-500">Looking good? Hit upload.</p>
          <div className="flex gap-2 w-full">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 shadow-sm"
            >
              {loading ? "Uploading…" : "Upload Photo"}
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-blue-400 rounded-xl py-4 px-4 text-sm font-medium text-gray-500 hover:text-blue-600 transition-all duration-200 cursor-pointer bg-gray-50 hover:bg-blue-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Change Profile Picture
        </button>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ImageUploader;
