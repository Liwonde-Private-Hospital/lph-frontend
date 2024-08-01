"use client"
import React, { useState, useEffect } from "react";
import FinanceSideBar from "../page";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = `${process.env.NEXT_PUBLIC_API_URL}/finance`;

interface HistoryDateProps {
  initialDate: string;
}

const HistoryDate = ({ initialDate }: HistoryDateProps) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);
  const [searchText, setSearchText] = useState<string>(initialDate);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const fetchData = async (date: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${api}?date=${date}`);
      const responseData = await response.json();
      console.log("Fetched data:", responseData);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      if (Array.isArray(responseData)) {
        const filteredData = responseData.filter(
          (item: any) => item.test_ordered === "use client"
        );
        const mappedData = filteredData.map((item: any) => ({
          id: item.id,
          FirstName: item.first_name,
          LastName: item.last_name,
          Treatment: item.treatment,
          Amount: item.amount,
          PaymentMethod: item.payment_method,
          TestOrdered: item.test_ordered,
        }));

        setData(mappedData);
        setAlert(null);
        toast.success("Data fetched successfully!");
      } else {
        setAlert({
          type: "error",
          message: "Invalid data received from the server.",
        });
        toast.error("Invalid data received from the server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Oops! Failed to fetch data." });
      toast.error("Failed to fetch data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = event.target.value;
    setSearchText(searchText);
    setSelectedDate(searchText);
  };

  const updateRow = (indexToUpdate: number, updatedRow: any) => {
    setData((prevData) =>
      prevData.map((item, index) =>
        index === indexToUpdate ? updatedRow : item
      )
    );
  };

  return (
    <FinanceSideBar>
      <div className="container mx-auto bg-opacity-75">
        <ToastContainer />
        <div className=" shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-green-800 text-white p-4">
            <div className="flex items-center">
              <div className="ml-4">
                <h1 className="text-4xl font-bold">
                  Finance Transaction History
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
                  You can search the date you want to view by selecting a date
                  in the search box below
                </p>
                <h2 className="text-xl font-bold mb-2">Search</h2>
                <div className="flex">
                  <input
                    type="date"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="border border-green-800 p-2 mr-2 w-1/2"
                    placeholder="Search date... e.g., 2024-05-06"
                    min="2024-01-01"
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
                          ID
                        </th>
                        <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                          First Name
                        </th>
                        <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                          Last Name
                        </th>
                        <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                          Treatment
                        </th>
                        <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                          Amount
                        </th>
                        <th className="px-4 py-2 bg-gray-200 border border-gray-300">
                          Payment Method
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={6} className="text-center py-4">
                            <div className="glow-spinner glow-spinner-loading"></div>
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
                                value={item.FirstName}
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
                                value={item.LastName}
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
                                value={item.Treatment}
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
                                type="text"
                                className="w-full bg-transparent focus:outline-none"
                                value={item.Amount}
                                onChange={(event) =>
                                  updateRow(index, {
                                    ...item,
                                    Amount: event.target.value,
                                  })
                                }
                              />
                            </td>
                            <td className="px-4 py-2 border border-gray-300">
                              {item.PaymentMethod}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {alert && (
            <div className={`alert alert-${alert.type} mt-4`}>
              <p>{alert.message}</p>
            </div>
          )}
        </div>
      </div>
    </FinanceSideBar>
  );
};

export default HistoryDate;
