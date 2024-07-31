"use client";

import React, { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { FaSearch } from "react-icons/fa";
import "./style.css";
import FinanceSideBar from "../page";

// Button Component
const Button = ({ href, className, children }) => (
  <a href={href} className={`p-2 rounded-md text-white ${className}`}>
    <button className="w-full md:w-auto text-center">{children}</button>
  </a>
);

// SearchBar Component
const SearchBar = ({ value, onChange, onSearch, isQueryEmpty, error }) => (
  <div className="relative flex flex-col md:flex-row mb-4 max-w-full md:max-w-xs mx-auto">
    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-500" />
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search records..."
      className={`flex-grow p-2 pl-10 pr-4 py-2 border ${
        isQueryEmpty ? "border-red-500" : "border-gray-300"
      } rounded-md focus:outline-none focus:ring-2 focus:ring-green-500`}
    />
    <button
      onClick={onSearch}
      className="mt-2 md:mt-0 md:ml-2 p-2 bg-green-800 text-white rounded-md hover:bg-green-700 w-full md:w-auto"
    >
      Search
    </button>
  </div>
);

interface SearchResult {
  ID: number;
  Amount: number;
  Date: string;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  Treatment: string;
}

// ResultItem Component
const ResultItem = ({ result, onClick }) => (
  <div
    className="p-4 mb-2 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 cursor-pointer"
    onClick={onClick}
  >
    <div>
      <strong>First Name:</strong> {result.FirstName || "N/A"}
    </div>
    <div>
      <strong>Last Name:</strong> {result.LastName || "N/A"}
    </div>
    <div>
      <strong>Treatment:</strong> {result.Treatment || "N/A"}
    </div>
    <div>
      <strong>Amount:</strong> {result.Amount || "N/A"}
    </div>
    <div>
      <strong>Payment Method:</strong> {result.PaymentMethod || "N/A"}
    </div>
    <div>
      <strong>Date:</strong> {formatDate(result.Date)}
    </div>
  </div>
);

// Date Formatter
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

const Finance: React.FC = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryEmpty, setIsQueryEmpty] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (input.trim()) {
        fetchData(input);
      } else {
        setResults([]);
        setError("Please enter a search query.");
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [input]);

  const filterResults = (data, query) => {
    const queryParts = query.toLowerCase().split(" ");
    return data.filter((item) => {
      const fullName = (item.FirstName + " " + item.LastName).toLowerCase();
      return queryParts.every((part) => fullName.includes(part));
    });
  };

  const fetchData = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      setError("Please enter a search query.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/finance/${encodeURIComponent(
          query
        )}`
      );
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      if (!Array.isArray(data)) throw new Error("Unexpected data format");

      const filteredResults = filterResults(data, query);

      if (filteredResults.length > 0) {
        setResults(filteredResults);
        setError("");
      } else {
        setResults([]);
        setError("Name not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setResults([]);
      setError("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsQueryEmpty(false);
  };

  const handleResultClick = (result) => {
    console.log("Result clicked:", result);
    // Add any additional logic for handling result click
  };

  return (
    <FinanceSideBar>
      <div className="flex items-center justify-center py-20">
        <div className="max-w-2xl min-h-[400px] flex flex-col items-center gap-y-5">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Finance Department
          </h1>

          <div className="relative w-full max-w-lg mb-4">
            {/* Button Section */}
            <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:max-w-xs mx-auto">
              <Button href="ViewData" className="bg-blue-500">
                Todays Data
              </Button>
              <Button href="Record" className="bg-green-500">
                New Day
              </Button>
            </div>

            {/* Search Bar */}
            <SearchBar
              value={input}
              onChange={handleInputChange}
              onSearch={() => fetchData(input)}
              isQueryEmpty={isQueryEmpty}
              error={error}
            />
          </div>

          {/* Error and Loading States */}
          {isLoading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Results List */}
          <div className="w-full max-w-3xl">
            {results.length === 0 && !isLoading && !error && (
              <p className="p-4 text-center text-gray-500">No results found.</p>
            )}
            {results.map((result) => (
              <ResultItem
                key={result.ID}
                result={result}
                onClick={() => handleResultClick(result)}
              />
            ))}
          </div>
        </div>
      </div>
    </FinanceSideBar>
  );
};

export default Finance;
