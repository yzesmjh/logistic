import { useCallback, useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import useHeaderData from "../../Hooks/useHeaderData";

const Main = () => {
  const BaseUrl = import.meta.env.VITE_BASEURL;
  const [packages, setPackages] = useState([]);
  const { userInfo, token } = useHeaderData();

  const fetchPackages = useCallback(async () => {
    try {
      if (userInfo?._id) {
        const response = await axios.get(
          `${BaseUrl}package/getallPackages?userId=${userInfo?._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setPackages(response?.data?.accounts);
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
  }, [fetchPackages, userInfo?._id]);

  const [currentScreen, setCurrentScreen] = useState("home");

  return (
    <div className="w-full flex flex-col h-screen overflow-y-hidden">
      <Header user={userInfo} />

      <div className="w-full overflow-x-hidden flex flex-col ">
        <main className="w-full flex-grow bg-bankred ">
          <div className="w-full  bg-white rounded-t-xl p-5"></div>
        </main>
      </div>
    </div>
  );
};

export default Main;
