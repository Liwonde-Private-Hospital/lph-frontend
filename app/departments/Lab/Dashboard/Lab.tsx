'use client'

import React from "react";
import './style.css'
import icon from '../../../images/icon.png'
import Image from "next/image";
import LogoutButton from "@/components/LogoutButton";


export default function Finance(){
    
    return(
        <div>
            <div id="dash">
                <header>Laborotory</header>
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
                <input type="text"  id="searchbar" placeholder="search for patients"
            />
           
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
        </div>
    )
    

}