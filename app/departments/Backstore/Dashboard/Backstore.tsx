'use client'

import React, { useEffect } from "react";
import './style.css'
import icon from '../../../images/icon.png'
import Image from "next/image";
import LogoutButton from "@/componets/LogoutButton";
export default function Backstore(){
   
    return(
        <div>
            <div id="dash">
                <header>Backstore</header>
                <ul>
                    <li><a href="#">Profile</a></li>
                    <li><a href="History">History</a></li>
                    
                    <li>
                        <LogoutButton/>
                    </li>
                </ul>
            </div>
            <div id="table">
          <div>
          <Image
                    src={icon}
                    alt="alt"
                    width={100}
                    height={100}
                    />
          </div>
            <div id="searchbar">
                <input type="text"  id="searchbar" placeholder="search for available drugs"
            />
      

            </div>
            <div className="button-container">
                <div>
                    <a href="ViewData">
                    <button className="button">View Drugs</button>
                    </a>
                   
                </div>
                <div>
                    <a href="Record">
                    <button className="button2">Stock Drugs</button>
                    </a>
                  
                </div>
            </div>  
            </div>
        </div>
    )
    

}