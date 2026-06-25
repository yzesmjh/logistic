import React, { useEffect, useState } from "react";
import CheckDeposit from "./CheckDeposit";
// import WireTransfer from "./WireTransfer";

import shareicon from "./../../assets/Icons/shareicon.png";
import cardicon from "./../../assets/Icons/card.png";
import userplus from "./../../assets/Icons/userplus.png";
import secondCard from "./../../assets/Icons/card2.png";
import bitcoin from "./../../assets/Icons/bitcoin.png";
import noteicon from "./../../assets/Icons/note.png";
import secondnote from "./../../assets/Icons/note2.png";
import statement from "./../../assets/Icons/message.png";
import cash from "./../../assets/Icons/cash.png";
import stat from "./../../assets/Icons/stat.png";
import chatIcon from "./../../assets/Icons/chatIcon.png";
import finduser from "./../../assets/Icons/finduser.png";
import ShowLoader from "./ShowLoader";
import { useNavigate } from "react-router-dom";
import AddUserForm from "../AddUserForm";
import LocalTransfer from "./Forms/LocalTransfer";
import AddBeneficiary from "./Forms/AddBeneficiary";
import WireTransfer from "./Forms/WireTransfer";

const DashboardBody = ({ screenSetter, user, account }) => {
  const navigate = useNavigate();
  const menubar = [
    { icon: shareicon, caption: "Local Transfer" },
    { icon: shareicon, caption: "Wire Transfer" },
    { icon: shareicon, caption: "Internal Transfer" },
    { icon: bitcoin, caption: "Buy Crypto" },
    { icon: cardicon, caption: "Pay Bill" },
    { icon: userplus, caption: "Add Beneficiary" },
    { icon: secondCard, caption: "Card Deposit" },
    { icon: bitcoin, caption: "Crypto Deposit" },
    { icon: cardicon, caption: "Check Deposit" },
    { icon: noteicon, caption: "Saving Statement" },
    { icon: secondnote, caption: "Checking Statement" },
    { icon: statement, caption: "National Alert" },
    { icon: cash, caption: "National Loans" },
    { icon: stat, caption: "National Investments" },
    { icon: chatIcon, caption: "National Support" },
  ];

  const adminMenubar = [
    { icon: userplus, caption: "Add User" },
    { icon: finduser, caption: "View Users" },
  ];

  // Function to chunk the array into groups of 3
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const groupedItems = chunkArray(menubar, 3);
  const [display, setDisplay] = useState("home");
  useEffect(() => {
    screenSetter(display);
  }, [display]);

  const [showLoader, setShowLoader] = useState(false);
  const displaySetter = (item) => {
    setDisplay(item);
    if (item == "View Users") {
      navigate("/users", {});
    }
    if (item == "Saving Statement" || item == "Checking Statement") {
      navigate("/mypackages", {});
    }
    if (
      item != "Check Deposit" &&
      item != "Wire Transfer" &&
      item != "Add Beneficiary" &&
      item != "Local Transfer" &&
      item != "Internal Transfer" &&
      item != "Add User"
    ) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  };

  return (
  <h1>Welcome</h1>
  );
};

export default DashboardBody;
