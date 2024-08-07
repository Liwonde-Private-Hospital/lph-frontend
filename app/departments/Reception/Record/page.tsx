'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import icon from "../../../images/icon.png";
import axios from "axios";
import ReceptionSideBar from "../page";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/reception`;

interface ReceptionItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  PaymentMethod: string;
  Returned: string;
  Date: string;
}

const Reception = () => {
  const [receptionData, setReceptionData] = useState<ReceptionItem[]>([
    {
      ID: 1,
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      PaymentMethod: "",
      Returned: "",
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

  const postData = async (url: string, data: ReceptionItem) => {
    try {
      const response = await axios.post(url, data);
      if (response.status >= 200 && response.status < 300) {
        return true;
      } else {
        console.log(`Failed to save data for ${data.FirstName} ${data.LastName}: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.log("Error connecting to server:", error);
      return false;
    }
  };

  const handleSubmit = async () => {
    try {
      for (const item of receptionData) {
        if (!item.FirstName || !item.LastName || !item.PaymentMethod || !item.PhoneNumber) {
          toast.error("Please enter all fields!");
          return;
        }
      }

      const results = await Promise.all(receptionData.map(item => postData(API_URL, item)));

      const successfulSaves = results.filter(result => result).length;
      const failedSaves = results.length - successfulSaves;

      if (failedSaves === 0) {
        toast.success("All data saved successfully!");
      } else if (successfulSaves > 0) {
        toast.warning(`Some data failed to save. ${successfulSaves} out of ${results.length} records saved.`);
      } else {
        toast.error("Failed to save all data.");
      }

      setDataModified(false);
    } catch (error) {
      console.log("Error connecting to server:", error);
      toast.error("Failed to save data");
    }
  };

  const addRow = () => {
    const newRow: ReceptionItem = {
      ID: receptionData.length + 1,
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      PaymentMethod: "",
      Returned: "",
      Date: new Date().toDateString(),
    };
    setReceptionData(prevData => [...prevData, newRow]);
    setDataModified(true);
  };

  const updateRow = (index: number, updatedData: Partial<ReceptionItem>) => {
    const updatedDataList = receptionData.map((item, idx) =>
      idx === index ? { ...item, ...updatedData } : item
    );
    setReceptionData(updatedDataList);
    setDataModified(true);
  };

  const deleteRow = async (index: number) => {
    const rowToDelete = receptionData[index];

    if (window.confirm(`Are you sure you want to delete the record for ${rowToDelete.FirstName} ${rowToDelete.LastName}?`)) {
      try {
        const response = await axios.delete(`${API_URL}/${rowToDelete.ID}`);

        if (response.status === 200) {
          const updatedDataList = [...receptionData];
          updatedDataList.splice(index, 1);
          setReceptionData(updatedDataList);
          setDataModified(true);
          toast.success("Record deleted successfully!");
        } else {
          toast.error("Failed to delete the record.");
        }
      } catch (error) {
        console.error("Error deleting the record:", error);
        toast.error("Failed to delete the record.");
      }
    }
  };

  const formattedDate = new Date().toDateString();

  return (
    <ReceptionSideBar>
      <div className="min-h-screen py-8">
        <ToastContainer />
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-800 text-white flex items-center justify-between">
            <div className="flex items-center">
              <Image src={icon} alt="" width={80} height={80} />
              <div className="ml-4">
                <h1 className="text-4xl font-bold">Reception Records</h1>
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
                    <th className="px-4 py-2 text-left">Phone Number</th>
                    <th className="px-4 py-2 text-left">Payment Method</th>
                    <th className="px-4 py-2 text-left">Returned</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {receptionData.map((row, index) => (
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
                        <input
                          type="text"
                          className="w-full border-gray-300 rounded-md"
                          placeholder="Phone Number"
                          value={row.PhoneNumber}
                          onChange={(e) => updateRow(index, { PhoneNumber: e.target.value })}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <select
                          className="w-full border-gray-300 rounded-md"
                          value={row.PaymentMethod}
                          onChange={(e) => updateRow(index, { PaymentMethod: e.target.value })}
                        >
                          <option value="">Select Payment Method</option>
                          <option value="Cash">Cash</option>
                          <option value="MedicalScheme">Medical Scheme</option>
                        </select>
                      </td>
                      <td className="border px-4 py-2">
                        <input
                          type="text"
                          className="w-full border-gray-300 rounded-md"
                          placeholder="Returned Reason"
                          value={row.Returned}
                          onChange={(e) => updateRow(index, { Returned: e.target.value })}
                        />
                      </td>
                      <td className="border px-4 py-2">
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                          onClick={() => deleteRow(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <button
                className="bg-green-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md mr-4"
                onClick={addRow}
              >
                Add Row
              </button>
              <button
                className="bg-green-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </ReceptionSideBar>
  );
};

export default Reception;
