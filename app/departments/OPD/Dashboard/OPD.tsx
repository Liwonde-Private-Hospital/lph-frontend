'use client'
import React, { useState } from 'react';
import './style.css';
import icon from '../../../favicon.ico';
import Image from 'next/image';
import { logout } from '@/actions';
import { LPHStaffRole } from '@/app/enums';

interface SearchResult {
  ID:number;
  Amount: number;
  Date: string;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  Treatment: string;
}

export default function Backstore() {
  const [name, setName] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!name) {
      setIsQueryEmpty(true);
      setError('Please enter a search query.');
      return;
    }

    setIsQueryEmpty(false);
    setError('');

    const opdapi="";

    try {
      const response = await fetch(opdapi);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('API Response:', data); // Log API response

      if (Array.isArray(data.results)) {
        setResults(data.results);
      } 

    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
      setError('name not found.');
      setTimeout(() => {
        setError('');
      }, 3000)
    }
  };
 const handleLogout = async () => {
   logout(LPHStaffRole.OPD);
   
 };
  return (
    <div>
      <div id="dash">
        <header>OPD</header>
        <ul>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="History">History</a>
          </li>
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
      <div id="table">
        <div>
          <Image src={icon} alt="alt" width={100} height={100} />
        </div>
        <div id="searchbar" className="relative w-full max-w-md mb-4">
          <div className="flex">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search for patients"
              className={`flex-grow p-2 border ${
                isQueryEmpty ? "border-red-500" : "border-gray-300"
              } rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-green-800 text-white rounded-r-md hover:bg-orange-400"
            >
              Search
            </button>
          </div>
          {isQueryEmpty && (
            <p></p>
            // <p className="text-red-700 text-sm mt-1">Please enter a search query.</p>
          )}
          {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {results.map((result, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md shadow-md"
                >
                  <p>Amount: {result.Amount}</p>
                  <p>Date: {result.Date}</p>
                  <p>First Name: {result.FirstName}</p>
                  <p>Last Name: {result.LastName}</p>
                  <p>Payment Method: {result.PaymentMethod}</p>
                  <p>Treatment: {result.Treatment}</p>
                </div>
              ))}
            </div>
          )}
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
  );
}
