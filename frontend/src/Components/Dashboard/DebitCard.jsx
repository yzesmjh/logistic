import React from "react";
import Logo from "./../../assets/Images/channelLogo.png";
import chip from "./../../assets/Images/chip.png";

const DebitCard = ({ user, expiryDate = "12/26" }) => {
  function maskCardNumber() {
    return `${Math.floor(Math.random() * 10000)} XXXX XXXX ${Math.floor(
      Math.random() * 10000
    )}`;
  }

  return (
    <div className="">
      <h1 className="border-b-[1px] border-black pb-2 text-bankred text-xs font-bold mb-2">
        National Cards
      </h1>
      <div className="mb-10 w-full max-w-xs mx-auto bg-gradient-to-tr from-black via-blue-900 to-black rounded-2xl p-6 shadow-lg text-white">
        <div className="flex justify-between items-center">
          <div className="text-xl font-semibold">
            <img src={chip} alt="Card Type" className="w-12" />
          </div>
          <img
            // src={Logo}
            // src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg"
            src="https://www.mastercard.com/content/dam/public/brandcenter/assets/images/logos/mclogo-for-footer.svg"
            alt="Logo"
            className="w-auto h-7 rounded-md"
          />
        </div>

        <div className="my-6">
          <p className="text-lg tracking-widest tech text-center">
            {maskCardNumber()}
          </p>
        </div>
        <div className="leading-tight tech uppercase  w-fit pl-12 flex gap-2">
          <p className="text-center text-xs">
            valid
            <br />
            THRU
          </p>
          <p>
            {" "}
            <p className="font-medium text-2xl">{expiryDate}</p>
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium tech pl-2 uppercase">
              {user?.firstname} {user?.lastname}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DebitCard;
