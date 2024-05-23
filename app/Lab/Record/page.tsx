'use client'
// use client"; // Mark the component as a Client Component
import React, { useState, useEffect } from "react";
import "./style.css";
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

export default function Lab() {
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
          alert("Enter All fields !");
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
    <div>
      <div id="table">
        <Image src={icon} alt="" width={100} height={100} />
        <div>
          <h1 className="Tsikuli">Laboratory</h1>
          <h1 className="tsiku">{formattedDate}</h1>
          <br></br>
        </div>

        <div className="table-box">
          <div className="table-row">
            <div className="table-cell">
              <p>ID</p>
            </div>
            <div className="table-cell">
              <p>FirstName</p>
            </div>
            <div className="table-cell">
              <p>LastName</p>
            </div>
            <div className="table-cell">
              <p>PaymentMethod</p>
            </div>
            <div className="table-cell">
              <p>TestOrdered</p>
            </div>

            <div className="table-cell">
              <p>Action</p>
            </div>
          </div>
        </div>
        {lab.map((row, index) => (
          <div className="table-row" key={index}>
            <div className="table-cell">
              <input
                type="number"
                placeholder="e.g 1"
                id="label"
                value={row.ID}
                onChange={(event) =>
                  updateRow(index, { ...row, ID: parseInt(event.target.value) })
                }
              />
            </div>
            <div className="table-cell">
              <input
                type="text"
                id="label"
                placeholder=" e.g damascus"
                value={row.FirstName}
                onChange={(e) =>
                  updateRow(index, { ...row, FirstName: e.target.value })
                }
              />
            </div>
            <div className="table-cell">
              <input
                type="text"
                id="label"
                placeholder="multiplug"
                value={row.LastName}
                onChange={(e) =>
                  updateRow(index, { ...row, LastName: e.target.value })
                }
              />
            </div>
            <div className="table-cell">
              <select
                value={row.PaymentMethod}
                id="label"
                onChange={(e) =>
                  updateRow(index, { ...row, PaymentMethod: e.target.value })
                }
              >
                <option value="select">select option</option>
                <option value="Cash">Cash</option>
                <option value="Airtel Money">Airtel Money</option>
                <option value="Mpamba">Mpamba</option>
                <option value="Bank">Bank</option>
              </select>
            </div>
            <div className="table-cell">
              <select
                value={row.TestOrdered}
                id="label"
                onChange={(e) =>
                  updateRow(index, { ...row, TestOrdered: e.target.value })
                }
              >
                <option value="select">select option</option>
                <option value="MRDT">MRDT</option>
                <option value="FBC">FBC</option>
                <option value="Urine">Urine</option>
                <option value="TB">TB</option>
              </select>
            </div>

            <div className="table-cell">
              <button className="delete" onClick={() => deleteRow(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
        <button onClick={addRow} className="button">
          Add Row
        </button>
        <button onClick={handleSubmit} className="button1">
          Save
        </button>
      </div>
    </div>
  );
}
