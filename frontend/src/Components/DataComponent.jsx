import { BASE_URL } from "../config";
import React, { useState } from "react";
import Modal from "./Modal";
import { toast } from "react-toastify";
import axios from "axios";
import useHeaderData from "../Hooks/useHeaderData";
import EditPackageForm from "./EditPackageForm";

const DataComponent = ({ data, type }) => {
  const BaseUrl = BASE_URL;
  const { token } = useHeaderData();
  const deleteUser = (data) => {
    // Ask if user should be deleted
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (shouldDelete) {
      const deleteUserAsync = async () => {
        try {
          const response = await axios.delete(
            `${BaseUrl}package/deletesinglepackage`,
            {
              data: { packageId: data },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            // Display response message
            toast.success(response?.data?.responseMessage);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            toast.success(response?.data?.message);
          }
        } catch (error) {
          console.error("Error deleting user:", error.message);
        }
      };

      deleteUserAsync();
    }
  };
  const [isCreating, setIsCreating] = useState(false);
  const createAccount = async (userId) => {
    try {
      setIsCreating(true);
      const response = await axios.delete(`${BaseUrl}account/createaccount/`, {
        data: { userId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // Display response message
        toast.success(response?.data?.responseMessage);
      } else {
        toast.success(response?.data?.message);
        setIsCreating;
      }
    } catch (error) {
      console.error("Error deleting user:", error.message);
    } finally {
      setIsCreating(false);
    }
  };
  return (
    <tr>
      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <span className="material-symbols-outlined text-slate-400">
              payments
            </span>
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {data?.receiverName}
            </p>
          </div>
        </div>
      </td>

      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10"></div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">
              {data?.packageName}
            </p>
          </div>
        </div>
      </td>

      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <p className="text-gray-900 whitespace-no-wrap font-bold">
          ${data?.packageAmount}
        </p>
      </td>
      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <p className="text-gray-900 whitespace-no-wrap">{data?.packageDate}</p>
      </td>
      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <p className="text-gray-900 whitespace-no-wrap">{data?.packageType}</p>
      </td>

      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <span
          className={`relative inline-block px-3 py-1 font-semibold  leading-tight ${
            data?.packageStatus == "pending" && "text-yellow-900"
          }  ${data?.packageStatus == "canceled" && "text-red-900"}   ${
            data?.packageStatus == "in progress" && "text-blue-900"
          }  ${data?.packageStatus == "completed" && "text-Green-900"} `}
        >
          <span
            aria-hidden
            className={`absolute inset-0 opacity-50 rounded-full  ${
              data?.packageStatus == "pending" && "bg-yellow-200"
            }  ${data?.packageStatus == "canceled" && "bg-red-200"}   ${
              data?.packageStatus == "in progress" && "bg-blue-200"
            }  ${data?.packageStatus == "completed" && "bg-green-200"} `}
          ></span>
          <span className="relative">{data?.packageStatus}</span>
        </span>
      </td>
      <td
        className={`px-5 py-5 border-b border-gray-200 ${
          data?.packageType == "Debit" ? " bg-red-50 " : "bg-green-50"
        } text-sm`}
      >
        <p className="text-gray-900 whitespace-no-wrap">
          {data?.accountBalance}
        </p>
      </td>
      {type && type == "ADMIN" && (
        <td className={`px-5 py-5 border-b border-gray-200 bg-white text-sm`}>
          <div className="flex justify-between flex-row">
            <div className="flex">
              <span className="material-symbols-outlined text-green-800">
                edit
              </span>
              <Modal
                caption={"Edit"}
                captionButton={false}
                modalContent={<EditPackageForm data={data} />}
              />
            </div>
            <span
              className="material-symbols-outlined text-red-600"
              onClick={() => deleteUser(data?._id)}
            >
              delete_forever
            </span>
            {isCreating ? (
              "Loading"
            ) : (
              <span
                className="material-symbols-outlined"
                onClick={() => createAccount(data?._id)}
              >
                add_circle
              </span>
            )}
          </div>
        </td>
      )}
    </tr>
  );
};

export default DataComponent;
