'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from '../../../images/icon.png';
import './style.css';

// Define enum for DrugType options
enum DrugType {
    Syrup = "Syrup",
    Tablet = "Tablet",
    Capsules = "Capsules",
    Suppositories = "Suppositories",
    Drops = "Drops",
    Inhalers = "Inhalers",
    Injections = "Injections",
    Other = "Other"
}

interface BackstoreItem {
    DrugID: number;
    DrugName: string;
    DrugType: DrugType;
    Quantity: number;
    DateCreated: string;
    ExpiryDate: string;
}

const Backstore: React.FC = () => {
    const [backstore, setBackstore] = useState<BackstoreItem[]>([
        { DrugID: 1, DrugName: '', DrugType: DrugType.Syrup, Quantity: 0, DateCreated: '', ExpiryDate: '' }
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
            DrugType: DrugType.Syrup,
            Quantity: 0,
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
                if (!item.DrugName || !item.DrugType || !item.Quantity || !item.ExpiryDate) {
                    alert("Enter All fields !");
                    return;
                }

                // Validate ExpiryDate to ensure it's not in the past
                const currentDate = new Date();
                const selectedDate = new Date(item.ExpiryDate);
                if (selectedDate < currentDate) {
                    alert("Expiry Date must be a future date.");
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
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Drug Store</h1>
                        </div>
                        <h1 className="tsiku">{formattedDate}</h1>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="overflow-x-auto">
                        <div className="w-full table-auto border-collapse border border-gray-300">
                            <div className="table-row bg-gray-200">
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">DrugID</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">DrugName</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">DrugType</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Quantity</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">ExpiryDate</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Action</div>
                            </div>

                            {backstore.map((row, index) => (
                                <div className="table-row" key={index}>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g 1"
                                            value={row.DrugID}
                                            onChange={(event) => updateRow(index, { DrugID: parseInt(event.target.value) })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="text"
                                            className="w-full p-2"
                                            placeholder=" e.g DrugName"
                                            value={row.DrugName}
                                            onChange={(event) => updateRow(index, { DrugName: event.target.value })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <select
                                            className="w-full p-2"
                                            value={row.DrugType}
                                            onChange={(event) => updateRow(index, { DrugType: event.target.value as DrugType })}
                                        >
                                            <option value="">Select Drug Type</option>
                                            {Object.values(DrugType).map(type => (
                                                <option key={type} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder=" e.g Quantity"
                                            value={row.Quantity}
                                            onChange={(event) => updateRow(index, { Quantity: parseInt(event.target.value) })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="date"
                                            className="w-full p-2"
                                            value={row.ExpiryDate}
                                            onChange={(event) => updateRow(index, { ExpiryDate: event.target.value })}
                                            min={currentDate.toISOString().split('T')[0]} // Set minimum date to today
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <button
                                            onClick={() => deleteRow(index)}
                                            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 flex justify-center gap-4">
                                <button
                                    onClick={addRow}
                                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-700"
                                >
                                    Add Row
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-orange-700"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Backstore;
