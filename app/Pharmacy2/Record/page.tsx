'use client';
import React, { useEffect, useState } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

interface PharmacyItem {
    ID: number;
    firstName: string;
    LastName: string;
    DrugName: string;
    DrugType: string;
    Amount: number;
    MedicalScheme: string;
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

export default function Pharmacy() {
    const [pharmacy, setPharmacy] = useState<PharmacyItem[]>([
        { ID: 1, firstName: '', LastName: '', DrugName: '', DrugType: '', Amount: 0, MedicalScheme: '' }
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
        const newRow: PharmacyItem = {
            ID: pharmacy.length + 1,
            firstName: '',
            LastName: '',
            DrugName: '',
            DrugType: '',
            Amount: 0,
            MedicalScheme: ''
        };
        setPharmacy(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setPharmacy(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
            setDataModified(true);
            return newData;
        });
    }
const API_URL="";

        
        const postData = async (url: string, data: PharmacyItem) => {
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
              for (const item of pharmacy) {
                if (!item.firstName || !item.LastName || !item.DrugName || !item.DrugType||!item.Amount||!item.MedicalScheme) {
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
        

    const updateRow = (index: number, newData: Partial<PharmacyItem>) => {
        const updatedData = [...pharmacy];
        updatedData[index] = { ...updatedData[index], ...newData };
        setPharmacy(updatedData);
        setDataModified(true);
    }

    const getTotalAmount = () => {
        return pharmacy.reduce((total, item) => total + item.Amount, 0);
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
                    <h1 className="Tsikuli">Pharmacy</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
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
                            <p>DrugName</p>
                        </div>
                        <div className="table-cell">
                            <p>DrugType</p>
                        </div>
                        <div className="table-cell">
                            <p>Amount</p>
                        </div>
                        <div className="table-cell">
                            <p>MedicalScheme</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>
                {pharmacy.map((row, index) => (
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
                                value={row.firstName}
                                onChange={(event) => updateRow(index, { ...row, firstName: event.target.value })}
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
                                type="text"
                                id="label"
                                placeholder="drugname"
                                value={row.DrugName}
                                onChange={(event) => updateRow(index, { ...row, DrugName: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="drugtype"
                                value={row.DrugType}
                                onChange={(event) => updateRow(index, { ...row, DrugType: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="0"
                                value={row.Amount}
                                onChange={(event) => updateRow(index, { ...row, Amount: parseInt(event.target.value) })}
                            />
                        </div>
                        <div className="table-cell">
                            <select
                                name={`medical-scheme-${index}`}
                                id="label"
                                required
                                onChange={(event) => updateRow(index, { ...row, MedicalScheme: event.target.value })}
                            >
                                <option value="">MASM</option>
                                <option value="">Liberty Health</option>
                                <option value="">National Bank</option>
                                <option value="">Escom</option>
                            </select>
                        </div>
                        <div className="table-cell">
                            <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                <div className="table-row">
                    <div className="table-cell">
                        <p>Total Amount:</p>
                    </div>
                    <div className="table-cell">
                        <p>{getTotalAmount()}</p>
                    </div>
                </div>
                <button onClick={addRow} className="button">Add Row</button>
                <button onClick={handleSubmit} className="button1">Save</button>
            </div>
        </div>
    );
}
