'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../images/icon.png";

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
          alert("Enter all fields!");
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
    <div className="flex justify-center items-center h-screen">
      <div className="container mx-auto p-4 bg-opacity-75">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center">
            <Image src={icon} alt="" width={100} height={100} />
            <div className="ml-4">
            <h1 className="text-4xl font-bold">Laboratory Records</h1>
                </div>
            <h1 className="tsiku">{formattedDate}</h1>
          </div></div>
          </div>
          <div className="px-4 py-2">
            <div className="overflow-x-auto">
              <div className="table w-full">
                <div className="table-header bg-gray-200 flex">
                  <div className="table-cell px-4 py-2">ID</div>
                  <div className="table-cell px-4 py-2">FirstName</div>
                  <div className="table-cell px-4 py-2">LastName</div>
                  <div className="table-cell px-4 py-2">PaymentMethod</div>
                  <div className="table-cell px-4 py-2">TestOrdered</div>
                  <div className="table-cell px-4 py-2">Action</div>
                </div>
                <div className="table-body">
                  {lab.map((row, index) => (
                    <div key={index} className="table-row flex">
                      <div className="table-cell px-4 py-2">
                        <input
                          type="number"
                          className="input-field"
                          placeholder="ID"
                          value={row.ID}
                          onChange={(e) => updateRow(index, { ID: parseInt(e.target.value) || 0 })}
                        />
                      </div>
                      <div className="table-cell px-4 py-2">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="First Name"
                          value={row.FirstName}
                          onChange={(e) => updateRow(index, { FirstName: e.target.value })}
                        />
                      </div>
                      <div className="table-cell px-4 py-2">
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Last Name"
                          value={row.LastName}
                          onChange={(e) => updateRow(index, { LastName: e.target.value })}
                        />
                      </div>
                      <div className="table-cell px-4 py-2">
                        <select
                          className="select-field"
                          value={row.PaymentMethod}
                          onChange={(e) => updateRow(index, { PaymentMethod: e.target.value })}
                        >
                          <option value="">Select Payment Method</option>
                          <option value="Cash">Cash</option>
                          <option value="Airtel Money">Airtel Money</option>
                          <option value="Mpamba">Mpamba</option>
                          <option value="Bank">Bank</option>
                        </select>
                      </div>
                      <div className="table-cell px-4 py-2">
                        <select
                          className="select-field"
                          value={row.TestOrdered}
                          onChange={(e) => updateRow(index, { TestOrdered: e.target.value })}
                        >
                          <option value="">Select Test Ordered</option>
                          <option value="MRDT">MRDT</option>
                          <option value="FBC">FBC</option>
                          <option value="Urine">Urine</option>
                          <option value="TB">TB</option>
                        </select>
                      </div>
                      <div className="table-cell px-4 py-2">
                        <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <div className="px-4 py-2 font-bold">Total:</div>
              {/* Calculate total here if needed */}
            </div>
            <div className="flex justify-center mt-4">
              <button className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" onClick={addRow}>Add Row</button>
              <button className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSubmit}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
