import { BASE_URL } from "../config";
import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import EditPackageForm from "./EditPackageForm";
import TransferForm from "./TransferForm";
import ImageUploader from "./ImageUploader";
import AddDeiveryComment from "./AddDeiveryComment";

const PackageDataComponent = ({ data, type, original }) => {
  const BaseUrl = BASE_URL;
  const { token } = useHeaderData();
  const [isCreating, setIsCreating] = useState(false);

  const deletePackage = async (packageId) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );
    if (shouldDelete) {
      try {
        const response = await axios.delete(
          `${BaseUrl}package/deletesinglepackage`,
          {
            data: { packageId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          toast.success(
            response?.data?.responseMessage || "Package deleted successfully"
          );
          setTimeout(() => window.location.reload(), 1000);
        }
      } catch (error) {
        toast.error("Error deleting package. Please try again.");
      }
    }
  };

  return (
    <tr>
      {Object.entries(data).map(([key, value], index) =>
        key !== "_id" ? (
          <td
            className="px-5 py-5 border-b border-gray-200 text-sm"
            key={index}
          >
            <div className="flex items-center">
              <p className="text-gray-900 whitespace-no-wrap ml-3">
                {value !== undefined ? value : "N/A"}
              </p>
            </div>
          </td>
        ) : null
      )}

      {type != "ADMIN" && (
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex space-x-4">
            <Modal
              caption="Edit"
              captionButton={false}
              modalContent={
                <EditPackageForm
                  data={original.find((item) => item._id === data._id)}
                />
              }
            />
            <span
              className="material-symbols-outlined text-red-600 cursor-pointer"
              onClick={() => deletePackage(data?._id)}
            >
              delete_forever
            </span>
            {isCreating ? (
              <span>Loading...</span>
            ) : (
              <Modal
                caption={
                  <span className="material-symbols-outlined">
                    add_photo_alternate
                  </span>
                }
                captionButton={false}
                modalContent={<ImageUploader id={data?._id} />}
              />
            )}

            <Modal
              caption={
                <span className="material-symbols-outlined text-green-600 cursor-pointer">
                  add_circle
                </span>
              }
              captionButton={false}
              modalContent={<TransferForm />}
            />
            <Modal
              caption={<span class="material-symbols-outlined">forum</span>}
              captionButton={false}
              modalContent={<AddDeiveryComment id={data?._id} />}
            />
          </div>
        </td>
      )}
    </tr>
  );
};

export default PackageDataComponent;
