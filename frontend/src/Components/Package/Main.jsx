import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../Pagination";
import useHeaderData from "../../Hooks/useHeaderData";
import PackageDataComponent from "../PackageDataComponent";

const BaseUrl = import.meta.env.VITE_BASEURL;

export default function PackageMain() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userInfo, token } = useHeaderData();

  const fetchPackages = useCallback(async () => {
    if (!userInfo) return;
    try {
      const { status, data } = await axios.get(
        `${BaseUrl}package/getallPackages?userId=${userInfo._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPackages(status === 200 ? data?.data ?? [] : []);
    } catch {
      setPackages([]);
    } finally {
      setLoading(false);
    }
  }, [token, userInfo?._id]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const reducedPackage = packages.map((item) => ({
    _id: item._id,
    "Package Name": item.packageName,
    "Package No":   item.packageNumber,
    "Shipment Info": item.shipperInformation,
    "receiver Info": item.receiverInformation,
  }));

  // ── Loading ────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading packages…</p>
        </div>
      </div>
    );
  }

  // ── Content ────────────────────────────────────────────────────────────
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">

        {/* Summary bar */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Packages</h2>
            <p className="text-sm text-gray-400 mt-0.5">
              {packages.length} shipment{packages.length !== 1 ? "s" : ""} total
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {packages.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-5xl mb-4">📭</p>
              <p className="font-semibold text-gray-600 text-lg">No packages yet</p>
              <p className="text-sm text-gray-400 mt-1">
                Packages you create will appear here.
              </p>
            </div>
          ) : (
            <Pagination
              data={reducedPackage}
              original={packages}
              RenderComponent={PackageDataComponent}
              title=""
              pageLimit={5}
              dataLimit={10}
            />
          )}
        </div>

      </div>
    </div>
  );
}
