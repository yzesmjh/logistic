import { useCallback, useEffect, useState } from "react";
import Header from "../Dashboard/Header";
import axios from "axios";

import Pagination from "../Pagination";
import useHeaderData from "../../Hooks/useHeaderData";
import Footer from "../Dashboard/Footer";
import PackageDataComponent from "../PackageDataComponent";

const Main = () => {
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const [packages, setPackages] = useState([]);
  const { userInfo, token } = useHeaderData();
  const fetchPackages = useCallback(async () => {
    try {
      if (userInfo) {
        const response = await axios.get(
          `${BaseUrl}package/getallPackages?userId=${userInfo?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setPackages(response?.data?.data);
        } else {
          setPackages([]);
        }
      }
    } catch (error) {
      console.error("Error fetching packages:", error.message);
    }
  }, [token, userInfo?._id]);

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  const reducedPackage = packages?.map((item) => {
    return {
      _id: item._id,
      "Package Name": item.packageName,
      "Package No": item?.packageNumber,
      "Shipment Info": item.shipperInformation,
      "receiver Info": item.receiverInformation,
    };
  });

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <Header />

      <div className="w-full overflow-x-hidden border-t flex flex-col">
        <main className="w-full flex-grow p-6">
          <h1 className="text-3xl text-black pb-6">Packages</h1>

          <div className="w-full mt-12">
            <div className="bg-white overflow-auto">
              {packages.length < 1 ? (
                <h1 className="sm:p-10 p-5 sm:text-3xl text-lg">
                  No packages found!
                </h1>
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
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Main;
