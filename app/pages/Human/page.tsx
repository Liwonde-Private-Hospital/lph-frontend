"use client";

import React from "react";
import "./dept.css";
import icon from "../../images/icon.png";
import Image from "next/image";
import Footer from "@/components/footer";
import Header from "@/components/navbar";

export default function Page() {
  const handleCallClick = () => {
    const phoneNumber = "0999146894"; // Replace with the actual phone number
    window.location.href = "tel:" + phoneNumber;
  };

  return (
    <>
      <Header />
      <div className="divyadept">
        <div className="deptinfo">
          <div className="tiyikelogo">
            <Image
              src={icon}
              alt="zilogo"
              width={200}
              height={20}
              className="zitobe"
            />
          </div>
          <div className="infoija">
            <h1 className="deptTitle">Human Resources Department</h1>
            <p className="deptdis">
              At Liwonde, our Human Resources Department serves as the heart of
              our organization, dedicated to fostering a vibrant, inclusive, and
              empowered workplace culture. We are committed to supporting our
              employees at every stage of their journey, from recruitment to
              retirement, and beyond.
            </p>
            <span className="deptgcpd">To contact the department </span>
            <button onClick={handleCallClick}>
              <a>call now</a>
            </button>
          </div>
        </div>
        <div className="deptImg"></div>
      </div>
      <Footer />
    </>
  );
}
