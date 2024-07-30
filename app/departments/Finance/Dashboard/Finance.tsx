"use client";
import React, { useState } from "react";
import "./style.css";
import icon from "../../../favicon.ico";
import Image from "next/image";
import { SearchResultsList } from "@/components/searchResultsList";
import { json } from "stream/consumers";
import { logout } from "@/actions";
import { LPHStaffRole } from "@/app/enums";

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
  const [name, setName] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);
  const [error, setError] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  const toggleProfile = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowProfile(!showProfile);
  };

  const handleSearch = async () => {
    if (!name) {
      setIsQueryEmpty(true);
      setError("Please enter a search query.");
      return;
    }

    setIsQueryEmpty(false);
    setError("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/${name}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("API Response:", data);

      if (Array.isArray(data.results)) {
        setResults(data.results);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
      setError("name not found");
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };
  const handleLogout = async () => {
    logout(LPHStaffRole.FINANCE);
  };
  return (
    <div>
      <div id="dash">
        <header>Finance</header>
        <ul>
          <li>
            <a href="#" onClick={toggleProfile}>
              Profile
            </a>
          </li>
          <li>
            <a href="Summary">Day Summary</a>
          </li>
          <li>
            <a href="History">Transaction History</a>
          </li>
          <li>
            <a href="#">Creditors</a>
          </li>{" "}
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
            <p className="text-red-700 text-sm mt-1">
              Please enter a search query.
            </p>
          )}
          {error && <p className="text-red-700 text-sm mt-1">{error}</p>}
          {results.length > 0 && <SearchResultsList results={results} />}
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
                  <h2 className="text-lg font-semibold text-center">
                    User Profile
                  </h2>
                  <p className="text-sm">
                    <span className="font-semibold">Name:</span>Wakisa
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Age:</span> 25
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Position:</span>Cashier
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Phone Number:</span>{" "}
                    0880070673
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Email:</span>{" "}
                    wakisa@liwondepvt.com
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Status:</span> online🟢
                  </p>
                  <button
                    onClick={toggleProfile}
                    className="mt-4 w-full bg-green-800 hover:bg-orange-300 text-black-800 py-1 px-3 rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
