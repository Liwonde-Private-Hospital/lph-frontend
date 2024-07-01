'use client'
import Footer from "@/componets/footer";
import Header from "@/componets/navbar";
import React, { useState, useEffect } from "react";

interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Temperature: number;
  Weight: number;
  BloodPressure: number;
}

const api = "http://lph-backend.onrender.com/vitals";
const sendSelectedApi = "http://lph-backend.onrender.com/vitals/selected";

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [selectedData, setSelectedData] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(api);
      const responseData = await response.json();
      setData(responseData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Oops! Today's data is not available." });
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (id: number) => {
    setSelectedData((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSendSelected = async () => {
    const selectedVitals = data.filter((item) => selectedData.has(item.ID));
    try {
      const response = await fetch(sendSelectedApi, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVitals),
      });
      if (response.ok) {
        setAlert({ type: "success", message: "Selected records sent to doctor." });
      } else {
        setAlert({ type: "error", message: "Failed to send selected records." });
      }
    } catch (error) {
      console.error("Error sending selected data:", error);
      setAlert({ type: "error", message: "Failed to send selected records." });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <br />
        <h1 className="date text-4xl font-bold text-center">{formattedDate}</h1>
        <br />
        {alert && (
          <div className={`text-center ${alert.type === "error" ? "text-red-500" : "text-green-500"}`}>
            {alert.message}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Select</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">FirstName</th>
                <th className="py-2 px-4">LastName</th>
                <th className="py-2 px-4">Temperature</th>
                <th className="py-2 px-4">Weight</th>
                <th className="py-2 px-4">BloodPressure</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={7} className="text-center py-4 text-gray-600">Data is Loading...</td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={selectedData.has(item.ID)}
                          onChange={() => handleSelect(item.ID)}
                        />
                      </td>
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.Temperature}</td>
                      <td className="py-2 px-4">{item.Weight}</td>
                      <td className="py-2 px-4">{item.BloodPressure}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-600">No data available</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button 
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleSendSelected}
          >
            Send recods to Doctor
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewData;
