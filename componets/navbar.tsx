'use client'
import "./nav.css";
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
import Image from "next/image";
import icon from "../app/images/icon.png";
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
          <a className="links" href="/">
            <FontAwesomeIcon icon={faHome} className="my-icon1" /> Home
          </a>
          <a className="links" href="/pages/Patient">
            <FontAwesomeIcon icon={faUserFriends} className="my-icon1" />
            Patients & Visitors
          </a>
          <a className="links" href="/departments">
            <FontAwesomeIcon icon={faTools} className="my-icon1" /> Departments
          </a>
          <a className="links" href="/login">
            <FontAwesomeIcon icon={faUserDoctor} className="my-icon1" /> Staff
          </a>
          <a className="links" href="/pages/AboutUs">
            <FontAwesomeIcon icon={faInfoCircle} className="my-icon1" /> About Us
          </a>
        </div>
      )}
      <div className="nav-links">
        <a className="links" href="/">
          <FontAwesomeIcon icon={faHome} className="my-icon1" />
          Home
        </a>
        <a className="links" href="/pages/Patient">
          <FontAwesomeIcon icon={faUserFriends} className="my-icon1" />
          Patients and Visitors
        </a>
        <a className="links" href="/login">
          <FontAwesomeIcon icon={faUserDoctor} className="my-icon1" /> Staff
        </a>
        <a className="links" href="/departments">
          <FontAwesomeIcon icon={faHospital} className="my-icon1" /> Departments
        </a>
        <a className="links" href="/pages/AboutUs">
          <FontAwesomeIcon icon={faInfoCircle} className="my-icon1" /> About Us
        </a>
      </div>
      <div className="button">
        <a href="pages/Appointment">
          <button>Book Appointment</button>
        </a>
      </div>
    </div>
  );
}
