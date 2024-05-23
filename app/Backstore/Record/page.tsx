'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from '../../images/icon.png';
import './style.css';

interface BackstoreItem {
    DrugID: number;
    DrugName: string;
    DrugType: string;
    Quantity: string;
    DateCreated: string;
    ExpiryDate: string;
}

export default function Backstore() {
    const [backstore, setBackstore] = useState<BackstoreItem[]>([
        { DrugID: 1, DrugName: '', DrugType: '', Quantity: '', DateCreated: '', ExpiryDate: '' }
    ]);

    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

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
        const newRow: BackstoreItem = {
            DrugID: backstore.length + 1,
            DrugName: '',
            DrugType: '',
            Quantity: '',
            DateCreated: '',
            ExpiryDate: ''
        };
        setBackstore(prevData => [...prevData, newRow]);
        setUnsavedChanges(true);
    }

    const deleteRow = (index: number) => {
        setBackstore(prevData => prevData.filter((_, i) => i !== index));
        setUnsavedChanges(true);
    }

    const updateRow = (index: number, newData: Partial<BackstoreItem>) => {
        const updatedData = [...backstore];
        updatedData[index] = { ...updatedData[index], ...newData };
        setBackstore(updatedData);
        setUnsavedChanges(true);
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    const API_URL = ""; // Add your API URL here

    const postData = async (url: string, data: BackstoreItem) => {
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
            for (const item of backstore) {
                if (!item.DrugID|| !item.DrugName || !item.DrugType || !item.Quantity || !item.DateCreated || !item.ExpiryDate) {
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
        <div className="flex justify-center items-center h-full">
            <div id="table" className="w-full max-w-screen-md">
                <Image
                    src={icon}
                    alt=""
                    width={100}
                    height={100}
                />
                <div>
                    <h1 className="Tsikuli">Drug Store</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
                    <br />
                </div>

                <div className="container">
                    <div className="table-box">
                        <div className="table-row">
                            <div className="table-cell">
                                <p>DrugID</p>
                            </div>
                            <div className="table-cell">
                                <p>DrugName</p>
                            </div>
                            <div className="table-cell">
                                <p>DrugType</p>
                            </div>
                            <div className="table-cell">
                                <p>Quantity</p>
                            </div>
                            <div className="table-cell">
                                <p>DateCreated</p>
                            </div>
                            <div className="table-cell">
                                <p>ExpiryDate</p>
                            </div>
                            <div className="table-cell">
                                <p>Action</p>
                            </div>
                        </div>

                        {backstore.map((row, index) => (
                            <div className="table-row" key={index}>
                                <div className="table-cell">
                                    <input
                                        type="number"
                                        id="label"
                                        placeholder="e.g 1"
                                        value={row.DrugID}
                                        onChange={(event) => updateRow(index, { DrugID: parseInt(event.target.value) })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <input
                                        type="text"
                                        id="label"
                                        placeholder=" e.g DrugName"
                                        value={row.DrugName}
                                        onChange={(event) => updateRow(index, { DrugName: event.target.value })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <input
                                        type="text"
                                        id="label"
                                        placeholder=" e.g DrugType"
                                        value={row.DrugType}
                                        onChange={(event) => updateRow(index, { DrugType: event.target.value })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <input
                                        type="text"
                                        id="label"
                                        placeholder=" e.g Quantity"
                                        value={row.Quantity}
                                        onChange={(event) => updateRow(index, { Quantity: event.target.value })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <input
                                        type="date"
                                        id="label"
                                        value={row.DateCreated}
                                        onChange={(event) => updateRow(index, { DateCreated: event.target.value })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <input
                                        type="date"
                                        id="label"
                                        value={row.ExpiryDate}
                                        onChange={(event) => updateRow(index, { ExpiryDate: event.target.value })}
                                    />
                                </div>
                                <div className="table-cell">
                                    <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                                </div>
                            </div>
                        ))}

                        <button onClick={addRow} className="button">Add Row</button>
                        <button onClick={handleSubmit} className="button1">Save</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
