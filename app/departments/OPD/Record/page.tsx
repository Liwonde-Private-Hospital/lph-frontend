'use client';

import React, { useState, useEffect } from "react";
import CustomModal from "@/components/CustomModal";
import Image from "next/image";
import icon from "../../../images/icon.png";
import './style.css';
import OPDSideBar from "../page";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface OPDItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;
  Date: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/opd`;

const OPD = () => {
  const [OPD, setOPD] = useState<OPDItem[]>([
    { ID: 1, FirstName: '', LastName: '', Treatment: '', Amount: 0, MedicalScheme: '', Date: '' }
  ]);
  const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(true);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        event.preventDefault();
        event.returnValue = ''; // For modern browsers
        return ''; // For old browsers
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [unsavedChanges]);

  const addRow = () => {
    const newRow: OPDItem = {
      ID: OPD.length + 1,
      FirstName: '',
      LastName: '',
      Amount: 0,
      MedicalScheme: '',
      Treatment: '',
      Date: formattedDate,
    };
    setOPD(prevData => [...prevData, newRow]);
    setUnsavedChanges(true);
  }

  const deleteRow = (index: number) => {
    setOPD(prevData => prevData.filter((row, i) => i !== index));
    setUnsavedChanges(true);
  }

  const updateRow = (index: number, newData: Partial<OPDItem>) => {
    const updatedData = [...OPD];

    const amount = newData.Amount !== undefined ? Number(newData.Amount) : updatedData[index].Amount;
    const medicalScheme = newData.MedicalScheme !== undefined ? newData.MedicalScheme : updatedData[index].MedicalScheme;

    if (amount && medicalScheme) {
      toast.error("Amount and Medical Scheme cannot be entered at once.");
      return;
    }

    updatedData[index] = { ...updatedData[index], ...newData, Amount: amount };
    setOPD(updatedData);
    setUnsavedChanges(true);
  }

  const calculateTotalAmount = () => {
    return OPD.reduce((total, item) => total + (item.Amount || 0), 0).toFixed(2);
  }

  const handleSubmit = async () => {
    let errorMessage = ''; // Track errors
  
    for (const item of OPD) {
      if (!item.FirstName || !item.LastName || !item.Treatment) {
        errorMessage = "Enter required fields before saving!";
        break; // Stop further checks
      }
  
      if (!item.Amount && !item.MedicalScheme) {
        errorMessage = "Either Amount or Medical Scheme must be entered.";
        break; // Stop further checks
      }
  
      if (item.Amount && item.MedicalScheme) {
        errorMessage = "Amount and Medical Scheme cannot both be entered.";
        break; // Stop further checks
      }
  
      // Optionally, you could include an additional error check for the response from `postData`
      try {
        await postData(API_URL, item);
      } catch {
        errorMessage = "Failed to save data"; // Set a general error message
        break; // Stop further checks
      }
    }
  
    if (errorMessage) {
      toast.error(errorMessage);
    } else {
      setUnsavedChanges(false);
      toast.success("Data saved successfully");
    }
  };
  
  const postData = async (url: string, data: OPDItem) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to save data"); // Throw an error if response is not ok
    }
  };
  return (
    <OPDSideBar>
      <div className="container mx-auto p-4 bg-opacity-75">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="flex items-center justify-between bg-gray-800 text-white p-4">
            <div className="flex items-center">
              <Image src={icon} alt="icon" width={100} height={100} />
              <div className="ml-4 flex-1">
                <h1 className="text-3xl font-bold">DoctorsOffice</h1>
              </div>
              <div className="flex-none text-right">
                <div className="Tsiku">{formattedDate}</div>
              </div>
            </div>
          </div>
          <div className="px-4 py-2 relative">
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left">First Name</th>
                    <th className="px-4 py-2 text-left">Last Name</th>
                    <th className="px-4 py-2 text-left">Treatment</th>
                    <th className="px-4 py-2 text-left">Amount</th>
                    <th className="px-4 py-2 text-left">Medical Scheme</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {OPD.map((row, index) => (
                    <tr key={index} className="border-b border-gray-300">
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. John"
                          value={row.FirstName}
                          onChange={(event) => updateRow(index, { FirstName: event.target.value })}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. Doe"
                          value={row.LastName}
                          onChange={(event) => updateRow(index, { LastName: event.target.value })}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. Treatment"
                          value={row.Treatment}
                          onChange={(event) => updateRow(index, { Treatment: event.target.value })}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. 1000"
                          value={row.Amount || ''}
                          onChange={(event) => updateRow(index, { Amount: Number(event.target.value) })}
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          className="w-full bg-transparent focus:outline-none"
                          value={row.MedicalScheme}
                          onChange={(event) =>
                            updateRow(index, {
                              MedicalScheme: event.target.value,
                            })
                          }
                        >
                          <option value="">Select Medical Scheme</option>
                          <option value="MASM">MASM</option>
                          <option value="MediHealth">MediHealth</option>
                          <option value="National Bank">National Bank</option>
                          <option value="Liberty Health">Liberty Health</option>
                          <option value="MRA">MRA</option>
                          <option value="ECM">ECM</option>
                        </select>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={addRow}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
              >
                Add Row
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
              >
                Save
              </button>
            </div>
            <div className="absolute bottom-4 right-4 text-lg font-bold text-gray-800">
              Total Amount: {calculateTotalAmount()}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </OPDSideBar>
  );
};

export default OPD;
