'use client'
import React, { useState } from "react";
import "./style.css";
import icon from "../../images/icon.png";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";


interface Patient {
  ID: number;
  FirstName: string;
  LastName: string;
  PaymentMethod:string;
  TestOrdered:string;

}

const api = 'http://localhost:3000/laboratory';
const searchapi = 'http://localhost:3000/laboratory/';

export default function Sale() {
  const [tableData, setTableData] = useState<Patient[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`${searchapi}${searchQuery}`);
      if (response.ok) {
        const data = await response.json();
        if (data === 'Name not found') {
          setError(data);
          setTableData([]);
        } else {
          setTableData(data);
          setError(null);
        }
      } else {
        throw new Error('Failed to search patients');
      }
    } catch (error) {
      console.error('Error searching patients:', error);
      alert('Failed to search patients');
    }
  };


  return (
    <div>
      <div id="dash">
        <header>Lab</header>
        <ul>
          <li><a href="#">Profile</a></li>
          <li><a href="#">History</a></li>
          <li><a href="Login">Logout</a></li>
        </ul>
      </div>
      <div id="table">
        <div>
          <Image src={icon} alt="alt" width={200} height={200} />
        </div>
        <div className="searchbar-container">
          <input
            type="text"
            id="searchbar"
            placeholder="search for patients"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="search-button" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
        <div className="button-container">
          <div>
            <a href="ViewData">
            <button className="button"  >
              Today's Data
            </button>
            </a>
          </div>
          <div>
            <a href="Record">
              <button className="button2">New Day</button>
            </a>
          </div>
        </div>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
        
        </thead>
        <tbody>
          {tableData.map(patient => (
            <tr key={patient.ID}>
           
              {/* Render more table cells for additional patient data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
