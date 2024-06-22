'use client'
// use client"; // Mark the component as a Client Component
import React, { useState, useEffect } from "react";
//import './style.css';
import Image from "next/image";
import icon from "../../../images/icon.png";
import axios from "axios"; // Import axios for HTTP requests

const API_URL = "http://localhost:3000/laboratory";

export interface LabItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  TestOrdered: string;
  Date: string;
}

const Lab: React.FC = () => {
  const [lab, setLab] = useState<LabItem[]>([
    {
      ID: 1,
      FirstName: "",
      LastName: "",
      PaymentMethod: "",
      TestOrdered: "",
      Date: new Date().toDateString(),
    },
  ]);

  const [dataModified, setDataModified] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (dataModified) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [dataModified]);

  const postData = async (url: string, data: LabItem) => {
    try {
      const response = await axios.post(url, data); // Use axios to post data

      if (response.status === 200) {
        alert("Data saved successfully");
      } else {
        alert("Failed to save data");
      }
    } catch (error) {
      console.log("Error connecting to server:", error);
      alert("Failed to save data");
    }
  };

  const handleSubmit = async () => {
    try {
      for (const item of lab) {
        if (!item.FirstName || !item.LastName || !item.PaymentMethod || !item.TestOrdered) {
          alert("Please enter all fields!");
          return;
        }

        await postData(API_URL, item);
      }
      setDataModified(false); // Reset dataModified after successful submission
    } catch (error) {
      console.log("Error connecting to server:", error);
      alert("Failed to save data");
    }
  };

  const addRow = () => {
    const newRow: LabItem = {
      ID: lab.length + 1,
      FirstName: "",
      LastName: "",
      PaymentMethod: "",
      TestOrdered: "",
      Date: new Date().toDateString(),
    };
    setLab((prevData) => [...prevData, newRow]);
    setDataModified(true);
  };

  const deleteRow = (index: number) => {
    setLab((prevData) => prevData.filter((_, i) => i !== index));
    setDataModified(true);
  };

  const updateRow = (index: number, newData: Partial<LabItem>) => {
    const updatedData = [...lab];
    updatedData[index] = { ...updatedData[index], ...newData };
    setLab(updatedData);
    setDataModified(true);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"> {/* Increased max-w-4xl to max-w-5xl */}
        <div className="p-6 bg-gray-800 text-white flex items-center justify-between">
          <div className="flex items-center">
            <Image src={icon} alt="" width={80} height={80} />
            <div className="ml-4">
              <h1 className="text-3xl font-bold">Laboratory Records</h1>
            </div>
          </div>
          <div className="Tsiku">{formattedDate}</div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">First Name</th>
                  <th className="px-4 py-2 text-left">Last Name</th>
                  <th className="px-4 py-2 text-left">Payment Method</th>
                  <th className="px-4 py-2 text-left">Test Ordered</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {lab.map((row, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        className="w-full border-gray-300 rounded-md"
                        placeholder="ID"
                        value={row.ID}
                        onChange={(e) => updateRow(index, { ID: parseInt(e.target.value) || 0 })}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        className="w-full border-gray-300 rounded-md"
                        placeholder="First Name"
                        value={row.FirstName}
                        onChange={(e) => updateRow(index, { FirstName: e.target.value })}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        className="w-full border-gray-300 rounded-md"
                        placeholder="Last Name"
                        value={row.LastName}
                        onChange={(e) => updateRow(index, { LastName: e.target.value })}
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        className="w-full border-gray-300 rounded-md"
                        value={row.PaymentMethod}
                        onChange={(e) => updateRow(index, { PaymentMethod: e.target.value })}
                      >
                        <option value="">Select Payment</option>
                        <option value="Cash">Cash</option>
                        <option value="Airtel Money">Airtel Money</option>
                        <option value="Mpamba">Mpamba</option>
                        <option value="Bank">Bank</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <select
                        className="w-full border-gray-300 rounded-md"
                        value={row.TestOrdered}
                        onChange={(e) => updateRow(index, { TestOrdered: e.target.value })}
                      >
                        <option value="">Select</option>
                        <option value="MRDT">MRDT</option>
                        <option value="FBC">FBC</option>
                        <option value="Urine">Urine</option>
                        <option value="TB">TB</option>
                      </select>
                    </td>
                    <td className="border px-4 py-2">
                      <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md" onClick={() => deleteRow(index)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end mt-4">
            {/* Calculate and display total if needed */}
          </div>

          <div className="flex justify-center mt-4">
            <button className="bg-green-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md mr-2" onClick={addRow}>Add Row</button>
            <button className="bg-green-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
