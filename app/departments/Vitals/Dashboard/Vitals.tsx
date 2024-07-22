'use client'
import React, { useState } from 'react';
import './style.css';
import icon from '../../../favicon.ico';
import Image from 'next/image';

interface SearchResult {
  ID: number;
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

    try {
      const response = await fetch(`http://localhost:3000/Vitals/${name}`);
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
      }, 3000);
    }
  };

  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = (event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    event.preventDefault(); // Prevents the default behavior for both <a> and <button>
    setShowProfile(!showProfile);
  };

  return (
    <div>
      <div id="dash">
        <header>Vitals</header>
        <ul>
          <a href="#" onClick={toggleProfile}>Profile</a>
          <li><a href="History">History</a></li>
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
        <div id="searchbar" className="relative w-full max-w-md mb-4">
          <div className="flex">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Search for patients"
              className={`flex-grow p-2 border ${isQueryEmpty ? 'border-red-500' : 'border-gray-300'} rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-green-800 text-white rounded-r-md hover:bg-orange-400"
            >
              Search
            </button>
          </div>
          {isQueryEmpty && (
            <p className="text-red-700 text-sm mt-1">Please enter a search query.</p>
          )}
          {error && (
            <p className="text-red-700 text-sm mt-1">{error}</p>
          )}
          {results.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border border-gray-300 rounded-md shadow-md">
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

        {/* Profile Popup Container */}
        {showProfile && (
          <div className="profile-popup absolute right-0 top-0 mt-2 mr-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <div className="profile-content p-4">
              <div className="flex justify-center">
                <div className="rounded-lg overflow-hidden h-32 w-32 mb-4">
                  <img
                    src="https://scontent-jnb2-1.xx.fbcdn.net/v/t39.30808-6/440377891_847631457383615_2637721381328687699_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LbaLrq5mlXMQ7kNvgEYJP0J&_nc_ht=scontent-jnb2-1.xx&oh=00_AYA9O63tWIPYEEjJt0aOZcC17fF4VMAVTZjcAJL16fh_2A&oe=6676A9C3"
                    alt="Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-lg font-semibold text-center">User Profile</h2>
              <p className="text-sm"><span className="font-semibold">Name:</span> Afick Mulinji</p>
              <p className="text-sm"><span className="font-semibold">Age:</span> 30</p>
              <p className="text-sm"><span className="font-semibold">Position:</span> Physician</p>
              <p className="text-sm"><span className="font-semibold">Phone Number:</span> 0887261094</p>
              <p className="text-sm"><span className="font-semibold">Email:</span> afickmulini@liwondepvt.com</p>
              <p className="text-sm"><span className="font-semibold">Status:</span> online🟢</p>
              <button onClick={toggleProfile} className="mt-4 w-full bg-green-800 hover:bg-orange-300 text-black-800 py-1 px-3 rounded-md">
                Close
              </button>


              
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
