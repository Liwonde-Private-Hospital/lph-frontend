'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import axios from "axios";
import LabSideBar from "../page";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/laboratory`;

export interface LabItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  TestOrdered: string;
  Date: string;
}

const Lab = () => {
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
  const [passwordPromptVisible, setPasswordPromptVisible] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
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
    setDeleteIndex(index);
    setPasswordPromptVisible(true);
  };

  const handlePasswordSubmit = async () => {
    if (!adminPassword) {
      alert("Admin password is required.");
      return;
    }

    try {
      const isValidPassword = await verifyAdminPassword(adminPassword);

      if (!isValidPassword) {
        alert("Invalid admin password. Deletion cancelled.");
        return;
      }

      if (deleteIndex !== null) {
        setLab((prevData) => prevData.filter((_, i) => i !== deleteIndex));
        setDataModified(true);
      }
    } catch (error) {
      console.error("Error verifying admin password:", error);
      alert("An error occurred while verifying the admin password.");
    } finally {
      setPasswordPromptVisible(false);
      setAdminPassword("");
      setDeleteIndex(null);
    }
  };

  const verifyAdminPassword = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/AdminPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify admin password');
      }

      const result = await response.json();
      return result.isValid;
    } catch (error) {
      console.error('Error verifying admin password:', error);
      return false;
    }
  };

  const updateRow = (index: number, newData: Partial<LabItem>) => {
    const updatedData = [...lab];
    updatedData[index] = { ...updatedData[index], ...newData };
    setLab(updatedData);
    setDataModified(true);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  return (<LabSideBar>
    <div className=" min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
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
                        <option value="">Select Test</option>
                        <option value="MRDT">MRDT</option>
                        <option value="FBC">FBC</option>
                        <option value="Urine">Urine</option>
                        <option value="TB">TB</option>
                      </select>
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
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mr-2"
              onClick={addRow}
            >
              Add Row
            </button>
            <button
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      {passwordPromptVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded mb-4"
              placeholder="••••••••"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <button
                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                onClick={handlePasswordSubmit}
              >
                DELETE
              </button>
              <button
                className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded"
                onClick={() => {
                  setPasswordPromptVisible(false);
                  setAdminPassword("");
                  setDeleteIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div></LabSideBar>
  );
};

export default Lab;
