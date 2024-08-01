"use client";

import React, { useState } from "react";
import "./style.css";
import icon from "../../../images/icon.png";
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";
import { logout } from "@/actions";
import { LPHStaffRole } from "@/app/enums";
import MaternitySideBar from "../page";

export default function Finance() {
 
  return (<MaternitySideBar>
    <div>
     
      <div id="table">
        <div>
          <Image src={icon} alt="alt" width={100} height={100} />
        </div>
        <div id="searchbar">
          <input type="text" id="searchbar" placeholder="search for patients" />
        </div>
        <div className="button-container">
          <div>
            <a href="ViewData">
              <button className="button">Todays Data</button>
            </a>
          </div>
          <div>
            <a href="Record">
              <button className="button2">New Day</button>
            </a>
          </div>
        </div>
      </div>
    </div></MaternitySideBar>
  );
}
