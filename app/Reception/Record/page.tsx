'use client'
import React, { useEffect, useState } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

interface ReceptionItem {
    ID: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PaymentMethod: string;
    Date: string;
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

export default function Reception() {
    const [Reception, setReception] = useState<ReceptionItem[]>([
        { ID: 1, FirstName: '', LastName: '', PhoneNumber: '', PaymentMethod: '', Date: '' }
    ]);

    const [dataModified, setDataModified] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (dataModified) {
                const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
                event.preventDefault();
                event.returnValue = confirmationMessage;
                return confirmationMessage;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [dataModified]);

    const addRow = () => {
        const newRow: ReceptionItem = {
            ID: Reception.length + 1,
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            PaymentMethod: '',
            Date: ''
        };
        setReception(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setReception(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
            setDataModified(true);
            return newData;
        });
    }
const API_URL=""
const postData = async (url: string, data:ReceptionItem) => {
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
      for (const item of Reception) {
        if (!item.FirstName || !item.LastName || !item.PhoneNumber || !item.PaymentMethod) {
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

    const updateRow = (index: number, newData: Partial<ReceptionItem>) => {
        const updatedData = [...Reception];
        updatedData[index] = { ...updatedData[index], ...newData };
        setReception(updatedData);
        setDataModified(true);
    }

    return (
        <div>
            <div id="table">
                <Image
                    src={icon}
                    alt=""
                    width={100}
                    height={100}
                />
                <div>
                    <h1 className="Tsikuli">Reception</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
                    <br></br>
                </div>
                <div className="table-box">
                    <div className="table-row">
                        <div className="table-cell">
                            <p>ID</p>
                        </div>
                        <div className="table-cell">
                            <p>First Name</p>
                        </div>
                        <div className="table-cell">
                            <p>Last Name</p>
                        </div>
                        <div className="table-cell">
                            <p>Phone Number</p>
                        </div>
                        <div className="table-cell">
                            <p>Payment Method</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>
                {Reception.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="e.g 1"
                                value={row.ID}
                                onChange={(event) => updateRow(index, { ...row, ID: parseInt(event.target.value) })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder=" e.g damascus"
                                value={row.FirstName}
                                onChange={(event) => updateRow(index, { ...row, FirstName: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="multiplug"
                                value={row.LastName}
                                onChange={(event) => updateRow(index, { ...row, LastName: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="0888900000"
                                value={row.PhoneNumber}
                                onChange={(event) => updateRow(index, { ...row, PhoneNumber: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <select
                                name={`payment-method-${index}`}
                                id="type"
                                required
                                onChange={(event) => updateRow(index, { ...row, PaymentMethod: event.target.value })}
                            >
                                <option value="">Cash</option>
                                <option value="">Medical Scheme</option>
                            </select>
                        </div>
                        <div className="table-cell">
                            <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                <button onClick={addRow} className="button">Add Row</button>
                <button onClick={handleSubmit}className="button1">Save</button>
            </div>
        </div>
    );
}
