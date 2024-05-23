'use client'
import React, { useEffect, useState } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

interface VitalsItem {
    ID: number;
    FirstName: string;
    LastName: string;
    Temperature: string;
    Weight: string;
    BloodPressure: string;
}

export default function Vitals() {
    const [vitals, setVitals] = useState<VitalsItem[]>([
        { ID: 1, FirstName: '', LastName: '', Temperature: '', Weight: '', BloodPressure: '' }
    ]);

    const addRow = () => {
        const newRow: VitalsItem = {
            ID: vitals.length + 1,
            FirstName: '',
            LastName: '',
            Temperature: '',
            Weight: '',
            BloodPressure: ''
        };
        setVitals(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setVitals(prevData => prevData.filter((_, i) => i !== index));
        setDataModified(true);
    }

    const updateRow = (index: number, newData: Partial<VitalsItem>) => {
        const updatedData = [...vitals];
        updatedData[index] = { ...updatedData[index], ...newData };
        setVitals(updatedData);
        setDataModified(true);
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    const [dataModified, setDataModified] = useState(false);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (dataModified) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dataModified]);
    const API_URL = ""; // Add your API URL here

    const postData = async (url: string, data: VitalsItem) => {
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
            for (const item of vitals) {
                if (!item.FirstName || !item.LastName || !item.Temperature || !item.Weight || !item.BloodPressure) {
                    alert("Enter All fields !");
                    return;
                }

                await postData(API_URL, item);
            }
            setUnsavedChanges(false); // Reset unsavedChanges after successful submission
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
                    <h1 className="Tsikuli">Body Tests</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
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
                            <p>Temperature</p>
                        </div>
                        <div className="table-cell">
                            <p>Weight</p>
                        </div>
                        <div className="table-cell">
                            <p>Blood Pressure</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>
                {vitals.map((row, index) => (
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
                                placeholder="in degrees"
                                value={row.Temperature}
                                onChange={(event) => updateRow(index, { ...row, Temperature: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="in kilograms"
                                value={row.Weight}
                                onChange={(event) => updateRow(index, { ...row, Weight: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="mmHg"
                                value={row.BloodPressure}
                                onChange={(event) => updateRow(index, { ...row, BloodPressure: event.target.value })}
                            />
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
function setUnsavedChanges(arg0: boolean) {
    throw new Error("Function not implemented.");
}

