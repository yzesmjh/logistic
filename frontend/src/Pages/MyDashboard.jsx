import { useLayoutEffect } from "react";
import Aside from "../Components/Dashboard/Aside";
import Main from "../Components/Dashboard/Main";
import useHeaderData from "../Hooks/useHeaderData";
import Package from "./Package";

const MyDashboard = () => {
  const { userInfo } = useHeaderData();

  useLayoutEffect(() => {
    document.title = "Fed.Exx | Dashboard";
  }, []);

  return (
    <div className="bg-gray-100 font-family-karla flex">
      <Package />
    </div>
  );
};

export default MyDashboard;
