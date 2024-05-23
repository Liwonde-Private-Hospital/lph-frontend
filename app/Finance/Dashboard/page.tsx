'use client'

import React, {useState} from "react";
import './style.css'
import icon from '../../images/icon.png'
import Image from "next/image";
import search from '../images/search.png'
import { Search } from "react-bootstrap-icons";
import Login from "../Login/page";


export default function Finance(){
    
    return(
        <div>
            <div id="dash">
                <header>Finance</header>
                <ul>
                    <li><a href="#">Profile</a></li>
                    <li><a href="History">Transaction History</a></li>
                    <li><a href="Summary">Day Summary</a></li>
                    <li><a href="Login">Logout</a></li>
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
              <span> </span>  <input type="text"  id="searchbar"placeholder="search for patients"
            />
            

            </div>
            <div className="button-container">
                <a href="ViewData">
                <div>
                    <button className="button">TodaysData</button>
                </div>
                </a>
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