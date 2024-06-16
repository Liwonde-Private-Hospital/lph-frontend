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

const Pharmacy: React.FC = () => {
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

    const API_URL = "http://localhost:3000/pharmacy/add"; // Assuming a similar API endpoint

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
                if (!item.firstName || !item.LastName || !item.DrugName || !item.DrugType || !item.Amount || !item.MedicalScheme) {
                    alert("Enter All fields!");
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
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Pharmacy</h1>
                        </div>
                        <h1 className="tsiku">{formattedDate}</h1>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-4 py-2">ID</th>
                                    <th className="px-4 py-2">First Name</th>
                                    <th className="px-4 py-2">Last Name</th>
                                    <th className="px-4 py-2">Drug Name</th>
                                    <th className="px-4 py-2">Drug Type</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Medical Scheme</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pharmacy.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="px-4 py-2">{row.ID}</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="e.g. John"
                                                value={row.firstName}
                                                onChange={(event) =>
                                                    updateRow(index, { firstName: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="e.g. Doe"
                                                value={row.LastName}
                                                onChange={(event) =>
                                                    updateRow(index, { LastName: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="Drug Name"
                                                value={row.DrugName}
                                                onChange={(event) =>
                                                    updateRow(index, { DrugName: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="Drug Type"
                                                value={row.DrugType}
                                                onChange={(event) =>
                                                    updateRow(index, { DrugType: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="0"
                                                value={row.Amount}
                                                onChange={(event) =>
                                                    updateRow(index, { Amount: parseInt(event.target.value) })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={row.MedicalScheme}
                                                onChange={(event) =>
                                                    updateRow(index, { MedicalScheme: event.target.value })
                                                }
                                            >
                                                <option value="">Select Medical Scheme</option>
                                                <option value="MASM">MASM</option>
                                                <option value="MediHealth">MediHealth</option>
                                                <option value="National Bank">National Bank</option>
                                                <option value="Liberty Health">Liberty Health</option>
                                                <option value="Escom">Escom</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-green-500 text-white hover:bg-red-500 hover:text-white focus:outline-none px-4 py-2 rounded"
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
                    <div className="flex justify-end mt-4">
                        <div className="px-4 py-2 font-bold">Total Amount:</div>
                        <div className="px-4 py-2 font-bold">{getTotalAmount()}</div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                            onClick={addRow}
                        >
                            Add Row
                        </button>
                        <button
                            className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pharmacy;
