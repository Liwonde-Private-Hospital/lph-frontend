import React from "react";
import { Metadata } from "next";
import "./globals.css";
import "slick-carousel/slick/slick.css";

const metadata: Metadata = {
  title: "Liwonde Private Medical Hospital",
  description: "Providing comprehensive medical services in Malawi.",
  keywords: "Liwonde, Medical, Hospital, Pharmacy, Dental, X-ray",
};
const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
      <body >{children}
      </body>
    </html>
  );
};

export default React.memo(RootLayout);
