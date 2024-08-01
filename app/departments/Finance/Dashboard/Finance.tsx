"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import { FaSearch } from "react-icons/fa";
import FinanceSideBar from "../page";
import Modal from "./Modal";
import './style.css'
const Button = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className={`p-2 rounded-md text-white bg-green-500 hover:bg-green-600 ${className}`}
  >
    <button className="w-full md:w-auto text-center">{children}</button>
  </a>
);

const SearchBar = ({
  value,
  onChange,
  isQueryEmpty,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isQueryEmpty: boolean;
}) => (
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

const ResultItem = ({
  result,
  onClick,
}: {
  result: SearchResult;
  onClick: () => void;
}) => (
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

const formatDate = (dateString: string | number | Date) => {
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
  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null
  );

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

  const filterResults = (data: any[], query: string) => {
    const queryParts = query.toLowerCase().split(" ");
    return data.filter((item: { FirstName: string; LastName: string }) => {
      const fullName = (item.FirstName + " " + item.LastName).toLowerCase();
      return queryParts.every((part: string) => fullName.includes(part));
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

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  return (
    <FinanceSideBar>
      <div className="flex items-center justify-center py-20">
        <div className="max-w-2xl min-h-[400px] flex flex-col items-center gap-y-5">
          <h1 className="text-3xl font-bold mb-4 text-center">
            Finance Department
          </h1>

          <div className="relative w-full max-w-lg mb-4">
            <div className="mb-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 w-full md:max-w-xs mx-auto">
              <Button href="ViewData" className="px-6 py-3">
                Todays Data
              </Button>
              <Button href="Record" className="px-6 py-3">
                New Day
              </Button>
            </div>

            <SearchBar
              value={input}
              onChange={handleInputChange}
              isQueryEmpty={isQueryEmpty}
            />

            {error && (
              <div className="text-red-500 mt-2 text-center">{error}</div>
            )}

            {isLoading && (
              <div className="flex items-center justify-center">
                <div className="glow-spinner" role="status">
                  {/* <span className="visually-hidden">Loading...</span> */}
                </div>
              </div>
            )}
          </div>

          {results.length > 0 && (
            <div className="flex flex-col items-center w-full">
              {results.map((result) => (
                <ResultItem
                  key={result.ID}
                  result={result}
                  onClick={() => handleResultClick(result)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal isOpen={selectedResult !== null} onClose={handleCloseModal}>
        {selectedResult && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Patient Details</h2>
            <div className="mb-2">
              <strong>First Name:</strong> {selectedResult.FirstName || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Last Name:</strong> {selectedResult.LastName || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Treatment:</strong> {selectedResult.Treatment || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Amount:</strong> {selectedResult.Amount || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Payment Method:</strong>{" "}
              {selectedResult.PaymentMethod || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Date:</strong> {formatDate(selectedResult.Date)}
            </div>
          </div>
        )}
      </Modal>
    </FinanceSideBar>
  );
};

export default Finance;
