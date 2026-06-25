import React, { useEffect } from "react";

const LoadStyles = () => {
  useEffect(() => {
    // Array of styles to load
    const styles = [
      {
        rel: "stylesheet",
        href: "template/assets/web/assets/mobirise-icons2/mobirise2.css",
      },
      {
        rel: "stylesheet",
        href: "template/assets/bootstrap/css/bootstrap.min.css",
      },
      {
        rel: "stylesheet",
        href: "template/assets/bootstrap/css/bootstrap-grid.min.css",
      },
      {
        rel: "stylesheet",
        href: "template/assets/bootstrap/css/bootstrap-reboot.min.css",
      },
      {
        rel: "stylesheet",
        href: "template/assets/theme/css/style.css",
      },
      {
        rel: "preload",
        as: "style",
        href: "template/assets/mobirise/css/mbr-additional.css?v=3b7zl8",
      },
      {
        rel: "stylesheet",
        href: "template/assets/mobirise/css/mbr-additional.css?v=3b7zl8",
        type: "text/css",
      },
    ];

    // Dynamically append each link to the <head>
    styles.forEach((style) => {
      const link = document.createElement("link");
      Object.entries(style).forEach(([key, value]) => {
        link[key] = value;
      });
      document.head.appendChild(link);
    });

    // Cleanup function to remove styles when the component unmounts
    return () => {
      styles.forEach((style) => {
        const existingLink = Array.from(document.head.getElementsByTagName("link")).find(
          (link) => link.href === style.href
        );
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, []);

  return null; // No visual UI, just injecting styles
};

export default LoadStyles;
