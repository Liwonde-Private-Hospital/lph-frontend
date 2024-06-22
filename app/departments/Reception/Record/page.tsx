'use client'
import React, { useEffect, useState } from "react";
import './style.css'; // Ensure your CSS file for styling is correctly imported
import Image from "next/image";
import icon from '../../../images/icon.png';

interface ReceptionItem {
    ID: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    PaymentMethod: string;
    Returned:string;
    Date: string;
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Reception: React.FC = () => {
    const [reception, setReception] = useState<ReceptionItem[]>([
        { ID: 1, FirstName: '', LastName: '', PhoneNumber: '', PaymentMethod: '',Returned:"", Date: '' }
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
            ID: reception.length + 1,
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            PaymentMethod: '',
            Returned:'',
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

    const updateRow = (index: number, newData: Partial<ReceptionItem>) => {
        const updatedData = [...reception];
        updatedData[index] = { ...updatedData[index], ...newData };
        setReception(updatedData);
        setDataModified(true);
    }

    const API_URL = ""; // Replace with your API endpoint

    const postData = async (url: string, data: ReceptionItem) => {
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
            for (const item of reception) {
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

    return (
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Reception</h1>
                            <h1 className="Tsiku">{formattedDate}</h1>
                        </div>
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
                                    <th className="px-4 py-2">Phone Number</th>
                                    <th className="px-4 py-2">Payment Method</th>
                                    <th className="px-4 py-2">Returned</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reception.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="e.g. 1"
                                                value={row.ID}
                                                onChange={(event) =>
                                                    updateRow(index, { ID: parseInt(event.target.value) })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="e.g. John"
                                                value={row.FirstName}
                                                onChange={(event) =>
                                                    updateRow(index, { FirstName: event.target.value })
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
                                                placeholder="e.g. 0888900000"
                                                value={row.PhoneNumber}
                                                onChange={(event) =>
                                                    updateRow(index, { PhoneNumber: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={row.PaymentMethod}
                                                onChange={(event) =>
                                                    updateRow(index, { PaymentMethod: event.target.value })
                                                }
                                            >
                                                <option value="">Select</option>
                                                <option value="Cash">Cash</option>
                                                <option value="NedicalScheme">Medical Scheme</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="Return Reason if returned"
                                                value={row.Returned}
                                                onChange={(event) =>
                                                    updateRow(index, { Returned: event.target.value })
                                                }
                                            />
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

export default Reception;
