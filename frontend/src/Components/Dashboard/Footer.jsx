import React from "react";
import { Link } from "react-router-dom";
import Modal from "../Modal";
import TransferForm from "../TransferForm";

const Footer = () => {
  const menu = [
    { icon: "", caption: "Packages", link: "package" },
    { icon: "", caption: "Profile", link: "profile" },
    { icon: "", caption: "Home", link: "" },
    { icon: "", caption: "Logout", link: "logout" },
  ];
  return (
    <div className="bg-white  shadow-md shadow-black p-2 grid grid-cols-6 justify-between w-full gap-5 fixed bottom-0">
      {menu.map((item, index) => (
        <Link to={`/${item?.link}`} key={index}>
          <li className="h-10 w-full col-span-1 border-t-2 border-t-bankredhover p-2 flex justify-center items-center">
            <div className="relative">{item.icon}</div>
            <p className="text-bankSmall text-nowrap text-bankredhover font-medium">
              {item.caption}
            </p>
          </li>
        </Link>
      ))}
      <Modal
        caption={
          <div>
            <div className="h-10 w-full col-span-1 border-t-2 border-t-bankredhover p-2 flex justify-center items-center">
              <p className="text-bankSmall text-nowrap text-bankredhover font-medium">
                Send Package
              </p>
            </div>
          </div>
        }
        captionButton={false}
        modalContent={<TransferForm />}
      />
    </div>
  );
};

export default Footer;
