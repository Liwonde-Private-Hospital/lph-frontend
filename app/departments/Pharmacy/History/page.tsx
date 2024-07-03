'use client'
import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';

// Define the API endpoint (adjust as per your backend setup)
const api = "http://lph-backend.onrender.com/transactions";

// Define the props interface for the component
interface HistoryDateProps {
  initialDate: string;
}

// Define the HistoryDate functional component
const HistoryDate = ({ initialDate }:any) => {
  // State hooks for managing component state
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [searchText, setSearchText] = useState<string>(initialDate);
  const [historyDates, setHistoryDates] = useState<string[]>([]);
  const [filteredDates, setFilteredDates] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  // useEffect to initialize historyDates and filteredDates
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const today = currentDate.getDate();

    const buttons: string[] = [];
    for (let i = 0; i < 5; i++) { // Generate dates for the next 5 days
      const targetDate = new Date(year, month - 1, today + i);
      const targetYear = targetDate.getFullYear();
      const targetMonth = targetDate.getMonth() + 1;
      const targetDay = targetDate.getDate();
      const dateString = `${targetYear}-${targetMonth < 10 ? '0' + targetMonth : targetMonth}-${targetDay < 10 ? '0' + targetDay : targetDay}`;
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
        setData(responseData);
        setAlert(null);
      } else {
        setAlert({ type: "error", message: "Invalid data received from the server." });
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
    const filteredDates = historyDates.filter(date => date.includes(searchText));
    setFilteredDates(filteredDates);
  };

  // Function to update a row of data
  const updateRow = async (updatedRow: any) => {
    try {
      const response = await fetch(`${api}/${updatedRow.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRow),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedData = [...data];
      const indexToUpdate = data.findIndex(item => item.id === updatedRow.id);
      updatedData[indexToUpdate] = updatedRow;
      setData(updatedData);
      setAlert({ type: 'success', message: 'Transaction updated successfully!' });
    } catch (error) {
      console.error('Error updating transaction:', error);
      setAlert({ type: 'error', message: 'Failed to update transaction.' });
    }
  };

  // JSX rendering of the component
  return (
    <div className="container mx-auto p-4 bg-opacity-75">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center">
            <div className="ml-4">
              <h1 className="text-4xl font-bold">Pharmacy Transaction History</h1>
            </div>
            <h1 className="tsiku" style={{ fontWeight: 'bolder', fontSize: '30px', marginLeft: '900px' }}>{selectedDate}</h1>
          </div>
        </div>
        <div className="px-4 py-2">
          <div className="flex">
            <div className="w-1/2">
              <p>You can search the date you want to view by selecting a date in the search box below</p>
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
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">ID</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">First Name</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Last Name</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Drug Name</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Drug Type</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Amount</th>
                      <th className="px-4 py-2 bg-gray-200 border border-gray-300">Medical Scheme</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4">Loading...</td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-red-500">Error: {error}</td>
                      </tr>
                    ) : data.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-4 text-red-500">No data available for this date.</td>
                      </tr>
                    ) : (
                      data.map((item, index) => (
                        <tr key={item.id}>
                          <td className="px-4 py-2 border border-gray-300">{item.id}</td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="text"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.FirstName}
                              onChange={(event) =>
                                updateRow({
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
                              value={item.LastName}
                              onChange={(event) =>
                                updateRow({
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
                              value={item.DrugName}
                              onChange={(event) =>
                                updateRow({
                                  ...item,
                                  DrugName: event.target.value,
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
                                updateRow({
                                  ...item,
                                  DrugType: event.target.value,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="number"
                              className="w-full bg-transparent focus:outline-none"
                              value={item.Amount.toString()}
                              onChange={(event) =>
                                updateRow({
                                  ...item,
                                  Amount: parseFloat(event.target.value),
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">{item.MedicalScheme}</td>
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
    </div>
  );
};

export default HistoryDate;
