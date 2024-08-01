'use client'
// Import necessary modules from React and Next.js
import React, { useState, useEffect } from 'react';
import { NextPage, NextPageContext } from 'next';
import BackstoreSideBar from '../page';

// Define the API endpoint
const api = "www";

// Define the props interface for the component
interface HistoryDateProps {
  initialDate: string;
}

// Define the HistoryDate functional component
const HistoryDate= ({
  initialDate,
}: any) => {
  // State hooks for managing component state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [searchText, setSearchText] = useState<string>(initialDate);
  const [historyDates, setHistoryDates] = useState<string[]>([]);
  const [filteredDates, setFilteredDates] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  // useEffect to initialize historyDates and filteredDates
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const today = currentDate.getDate();

    const buttons: string[] = [];
    for (let i = 0; i < 5; i++) {
      // Generate dates for the next 5 days
      const targetDate = new Date(year, month - 1, today + i);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const targetDay = targetDate.getDate();
      const dateString = `${targetYear}-${
        targetMonth < 10 ? "0" + targetMonth : targetMonth
      }-${targetDay < 10 ? "0" + targetDay : targetDay}`;
      buttons.push(dateString);
    }
    setHistoryDates(buttons);
    setFilteredDates(buttons);
  }, []);

  // useEffect to fetch data when selectedDate changes
  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  // Function to fetch data from API based on selectedDate
  const fetchData = async (date: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${api}?date=${date}`);
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (Array.isArray(responseData)) {
        const filteredData = responseData.filter(
          (item: any) => item.test_ordered === "use client"
        );
        const mappedData = filteredData.map((item: any) => ({
          DrugID: item.id,
          DrugName: item.first_name,
          DrugType: item.drugtype,
          Quantity: item.quantity,
          ExpiryDate: item.expirydate,
        }));

        setData(mappedData);
        setAlert(null);
      } else {
        setAlert({
          type: "error",
          message: "Invalid data received from the server.",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Oops! Failed to fetch data." });
    } finally {
      setLoading(false);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    setSelectedDate(searchText); // Update selectedDate based on the searchText
    const filteredDates = historyDates.filter((date) =>
      date.includes(searchText)
    );
    setFilteredDates(filteredDates);
  };

  // Function to update a row of data
  const updateRow = (indexToUpdate: number, updatedRow: any) => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === indexToUpdate ? updatedRow : item
      )
    );
  };

  // JSX rendering of the component
  return (<BackstoreSideBar>
    <div className="container mx-auto p-4 bg-opacity-75">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center">
            <div className="ml-4">
              <h1 className="text-4xl font-bold">
                DrugStore Transaction History
              </h1>
            </div>
            <h1
              className="tsiku"
              style={{
                fontWeight: "bolder",
                fontSize: "30px",
                marginLeft: "900px",
              }}
            >
              {selectedDate}
            </h1>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="flex">
            <div className="w-1/2">
              <p>
                You can search the date you want to view by selecting a date in
                the search box below
              </p>
              <h2 className="text-xl font-bold mb-2">Search</h2>
              <div className="flex">
                <input
                  type="date"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="border border-gray-800 p-2 mr-2 w-1/2"
                  placeholder="Search date... e.g., 2024-05-06"
                  min="2024-01-01" // Set minimum date allowed
                />
              </div>
            </div>
            <div className="w-1/2 pl-4">
              <h2 className="text-xl font-bold mb-2">{selectedDate} Data</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        DrugID
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        DrugName
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        DrugType
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        Quantity
                      </th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                        ExpiryDate
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          Loading...
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-red-500"
                        >
                          Error: {error}
                        </td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center py-4 text-red-500"
                        >
                          No data available for this date.
                        </td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 border border-gray-300">
                            {item.id}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="text"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.DrugName}
                              onChange={(event) =>
                                updateRow(index, {
                                  ...item,
                                  FirstName: event.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="text"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.DrugType}
                              onChange={(event) =>
                                updateRow(index, {
                                  ...item,
                                  LastName: event.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="text"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.Quantity}
                              onChange={(event) =>
                                updateRow(index, {
                                  ...item,
                                  Treatment: event.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="number"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.ExpiryDate.toString()}
                              onChange={(event) =>
                                updateRow(index, {
                                  ...item,
                                  Amount: parseFloat(event.target.value),
                                })
                              }
                            />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => setSelectedDate(selectedDate)}
                  className="block w-32 py-2 px-4 bg-green-900 text-white rounded-md shadow-md hover:bg-orange-500 focus:outline-none focus:bg-gray-700"
                >
                  Refresh Data
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div></BackstoreSideBar>
  );
};
export default HistoryDate; 
