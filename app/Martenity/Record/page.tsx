'use client'
import React, { useEffect, useState } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

interface MartenityItem {
    ID: number;
    firstName: string;
    LastName: string;
    Treatment: string;
    Amount: string;
    MedicalScheme: string;
    Date: string;
}

export default function Martenity() {
    const [Martenity, setMartenity] = useState<MartenityItem[]>([
        { ID: 1, firstName: '', LastName: '', Treatment: '', Amount: '', MedicalScheme: '', Date: '' }
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
        const newRow: MartenityItem = {
            ID: Martenity.length + 1,
            firstName: '',
            LastName: '',
            Treatment: '',
            Amount: '',
            MedicalScheme: '',
            Date: ''
        };
        setMartenity(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setMartenity(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
            setDataModified(true);
            return newData;
        });
    }

    const updateRow = (index: number, newData: Partial<MartenityItem>) => {
        const updatedData = [...Martenity];
        updatedData[index] = { ...updatedData[index], ...newData };
        setMartenity(updatedData);
        setDataModified(true);
    }
    const API_URL=""

    const postData = async (url: string, data: MartenityItem) => {
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
          for (const item of Martenity) {
            if (!item.firstName || !item.LastName || !item.Treatment || !item.MedicalScheme||!item.Amount||!item.Date) {
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
                    <h1 id="pharma-head">Martenity</h1>
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
                            <p>Treatment</p>
                        </div>
                        <div className="table-cell">
                            <p>Medical Scheme</p>
                        </div>
                        <div className="table-cell">
                            <p>Date</p>
                        </div>
                    </div>
                </div>
                {Martenity.map((row, index) => (
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
                                placeholder="Aids"
                                value={row.Treatment}
                                onChange={(event) => updateRow(index, { ...row, Treatment: event.target.value })}
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
                                <option value="">MediHealth</option>
                                <option value="">National Bank</option>
                                <option value="">Liberty Health</option>
                                <option value="">MRA</option>
                                <option value="">ECM</option>
                            </select>
                        </div>
                        <div className="table-cell">
                            <input
                                type="date"
                                id="label"
                                value={row.Date}
                                onChange={(event) => updateRow(index, { ...row, Date: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <button className="delete1" onClick={() => updateRow(index, row)}>Update</button>
                        </div>
                        <div className="table-cell">
                            <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                <button onClick={addRow} className="button">Add Row</button>
                <button  onClick={handleSubmit}className="button1">Save</button>
            </div>
        </div>
    );

}
