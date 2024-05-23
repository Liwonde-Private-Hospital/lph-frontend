'use client'
import "./dash.css";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTools,
  faInfoCircle,
  faUserDoctor,
  faHospital,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";
import icon from "../app/images/icon.png";
import Image from "next/image";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
    const menuIcon = document.querySelector(".menu-icon");
    const bars = document.querySelectorAll(".bar");
    if (menuIcon !== null) {
      menuIcon.classList.toggle("change");
    }
    bars.forEach((bar) => bar.classList.toggle("change"));
  };

  return (
    <div className="header">
      
        <Image src={icon} width={50} height={50} alt="" />
      
      <div
        className={`menu-icon ${showLinks ? "change" : ""}`}
        onClick={toggleLinks}
      >
        <span id="menu">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </span>{" "}
        {/* This is the hamburger menu icon */}
      </div>
      {showLinks && (
        <div className="new-links">
          <a className="links" href="/">Profile
          </a>
          <a className="links" href="Patient">
            <FontAwesomeIcon icon={faUserFriends} className="my-icon1" />
            Transaction History
          </a>
          <a className="links" href="/departments">
            <FontAwesomeIcon icon={faTools} className="my-icon1" /> Day Summary
          </a>
          <a className="links" href="/Staff">
            <FontAwesomeIcon icon={faUserDoctor} className="my-icon1" /> Logout
          </a>
         
        </div>
      )}
     
    </div>
  );
}
