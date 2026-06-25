import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import axios from "axios";
import QRCodeGenerator from "../Components/QRCodeGenerator";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Home/Footer";

const Track = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const goToTrackForm = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("track-form")?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const [packageData, setPackageData] = useState(null);
  const [packageComment, setPackageComment] = useState(null);
  const [packageImage, setPackageImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  const fetchPackages = useCallback(async () => {
    try {
      const response = await axios.get(
        `${BaseUrl}package/getpackage?packageId=${id}`
      );

      if (response.status === 200 && response?.data?.data?.package) {
        setPackageData(response.data.data.package);
        setPackageComment(response?.data?.data?.comment || []);
        setPackageImage(response.data.data.packageImage || []);
      } else {
        setPackageData(null);
      }
    } catch (error) {
      console.error("Error fetching packages:", error.message);
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    if (email) {
      // Handle email subscription logic here
      alert(`You'll receive updates at: ${email}`);
      setEmail("");
    }
  };

  const getStatusColor = (status) => {
    const statusColors = {
      processed: "from-blue-500 to-cyan-500",
      "picked up": "from-green-500 to-emerald-500",
      transit: "from-orange-500 to-amber-500",
      "on hold": "from-yellow-500 to-orange-500",
      delivered: "from-green-600 to-teal-500",
    };
    return statusColors[status?.toLowerCase()] || "from-gray-500 to-gray-700";
  };

  const getStatusIcon = (status) => {
    const icons = {
      processed: "📦",
      "picked up": "🏢",
      transit: "✈️",
      "on hold": "⏸️",
      delivered: "✅",
    };
    return icons[status?.toLowerCase()] || "📋";
  };

  const trackingSteps = [
    {
      status: "processed",
      label: "Processed",
      description: "Package has been processed and is ready for pickup",
    },
    {
      status: "picked up",
      label: "Picked Up",
      description: "Package has been collected from sender",
    },
    {
      status: "transit",
      label: "In Transit",
      description: "Package is on its way to destination",
    },
    {
      status: "on hold",
      label: "On Hold",
      description: "Package is temporarily held at facility",
    },
    {
      status: "delivered",
      label: "Delivered",
      description: "Package has been successfully delivered",
    },
  ];

  const currentStatusIndex = trackingSteps.findIndex(
    (step) => step.status === packageData?.status?.toLowerCase()
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <ThreeCircles
            height="60"
            width="60"
            radius="9"
            color="#4f46e5"
            ariaLabel="three-circles-loading"
          />
          <p className="mt-4 text-gray-600">Tracking your package...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Package Not Found
          </h1>
          <p className="text-gray-600 mb-4">
            No package found with tracking ID: <strong>{id}</strong>
          </p>
          <button
            onClick={goToTrackForm}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Try Another ID
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <NavBar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Banner */}
        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Current Status */}
            <div className="text-center lg:text-left">
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${getStatusColor(
                  packageData?.status
                )} text-white font-semibold text-sm mb-3`}
              >
                <span className="mr-2">
                  {getStatusIcon(packageData?.status)}
                </span>
                {packageData?.status?.toUpperCase()}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Delivery Status
              </h2>
              <p className="text-gray-600">
                Expected: {packageData.expectedDeliveryDate}
              </p>
              {packageData.signedBy && (
                <p className="text-gray-600 mt-1">
                  Signed by: {packageData.signedBy}
                </p>
              )}
            </div>

            {/* Tracking ID */}
            <div className="text-center">
              <p className="text-gray-500 text-sm mb-1">TRACKING ID</p>
              <h3 className="text-2xl font-mono font-bold text-gray-900">
                {packageData?.packageNumber}
              </h3>
              <button className="mt-3 text-purple-600 hover:text-purple-700 font-semibold flex items-center justify-center space-x-1">
                <span>📥</span>
                <span>Obtain Proof of Delivery</span>
              </button>
            </div>

            {/* Email Updates */}
            <div className="text-center lg:text-right">
              <form onSubmit={handleEmailUpdate} className="space-y-3">
                <p className="text-gray-600 text-sm">Get real-time updates</p>
                <div className="flex space-x-2 flex-wrap gap-5">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Delivery Progress
          </h3>
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-4 top-8 bottom-8 w-1 bg-gray-200 rounded-full">
              <div
                className="bg-gradient-to-b from-purple-500 to-blue-500 rounded-full transition-all duration-1000"
                style={{
                  height: `${
                    (currentStatusIndex / (trackingSteps.length - 1)) * 100
                  }%`,
                }}
              ></div>
            </div>

            {/* Steps */}
            <div className="space-y-8">
              {trackingSteps.map((step, index) => {
                const isCompleted = index <= currentStatusIndex;
                const isCurrent = index === currentStatusIndex;

                return (
                  <div key={step.status} className="flex items-start space-x-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        isCompleted
                          ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      } ${isCurrent ? "ring-4 ring-purple-200" : ""}`}
                    >
                      {isCompleted ? "✓" : index + 1}
                    </div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold text-lg ${
                          isCompleted ? "text-gray-900" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </div>
                      <p
                        className={`text-sm ${
                          isCompleted ? "text-gray-600" : "text-gray-400"
                        }`}
                      >
                        {step.description}
                      </p>
                      {isCurrent && packageComment.length > 0 && (
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <p className="text-blue-800 text-sm">
                            {packageComment[packageComment.length - 1]?.value}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Timeline */}
          <div className="lg:col-span-2 space-y-8">
            {/* Package Details */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Package Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(packageData).map(
                  ([key, value]) =>
                    key !== "__v" &&
                    key !== "updatedAt" &&
                    key !== "createdAt" &&
                    key !== "comment" &&
                    key !== "_id" && (
                      <div key={key} className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-700 text-sm capitalize">
                          {key.replace(/([A-Z])/g, " $1")}
                        </h4>
                        <p className="text-gray-900 mt-1">
                          {value || "Not specified"}
                        </p>
                      </div>
                    )
                )}
              </div>
              {packageData.comment && (
                <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-800">Remarks</h4>
                  <p className="text-yellow-700 mt-1">{packageData.comment}</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* QR Code */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Digital Tracking
              </h3>
              <div className="flex justify-center">
                <QRCodeGenerator />
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                Scan to track on mobile
              </p>
            </div>

            {/* Package Images */}
            {packageImage.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Package Photos
                </h3>
                <div className="grid gap-3">
                  {packageImage.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Package ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Support Card */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Need Help?</h3>
              <p className="text-purple-100 mb-4">
                Our support team is here to assist you with your shipment.
              </p>
              <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Track;
