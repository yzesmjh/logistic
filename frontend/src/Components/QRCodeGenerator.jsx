import { QRCodeSVG } from "qrcode.react";

const QRCodeGenerator = ({ text }) => {
  const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  };
  const BaseUrl = getBaseUrl();
  return (
    <QRCodeSVG
      value={`${BaseUrl}/${text}`}
      title={"Title for my QR Code"}
      size={128}
      bgColor={"#ffffff"}
      fgColor={"#000000"}
      level={"L"}
      imageSettings={{
        src: "https://static.zpao.com/favicon.png",
        x: undefined,
        y: undefined,
        height: 24,
        width: 24,
        opacity: 1,
        excavate: true,
      }}
    />
  );
};

export default QRCodeGenerator;
