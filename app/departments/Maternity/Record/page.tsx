'use client'

import React, { useEffect, useState } from "react";
import './style.css';  // Assuming you have a CSS file for styling
import Image from "next/image";
import icon from '../../../images/icon.png';
import MaternitySideBar from "../page";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MaternityItem {
    ID: number;
    firstName: string;
    LastName: string;
    Amount: string;
    MedicalScheme: string;
    Date: string;
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Maternity = () => {
    const [maternity, setMaternity] = useState<MaternityItem[]>([
        { ID: 1, firstName: '', LastName: '', Amount: '', MedicalScheme: '', Date: '' }
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
        const newRow: MaternityItem = {
            ID: maternity.length + 1,
            firstName: '',
            LastName: '',
            Amount: '',
            MedicalScheme: '',
            Date: '',
        };
        setMaternity(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setMaternity(prevData => {
            const newData = prevData.filter((_, i) => i !== index);
            setDataModified(true);
            return newData;
        });
    }

    const updateRow = (index: number, newData: Partial<MaternityItem>) => {
        const updatedData = [...maternity];
        updatedData[index] = { ...updatedData[index], ...newData };
        setMaternity(updatedData);
        setDataModified(true);
    }

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/maternity/add`;

    const postData = async (url: string, data: MaternityItem) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Data saved successfully");
            } else {
                toast.error("Failed to save data");
            }
        } catch (error) {
            console.log("Error connecting to server:", error);
            toast.error("Failed to save data");
        }
    };

    const handleSubmit = async () => {
        try {
            for (const item of maternity) {
                if (!item.firstName || !item.LastName || !item.Amount || !item.MedicalScheme || !item.Date) {
                    toast.error("Enter all fields!");
                    return;
                }
                await postData(API_URL, item);
            }
            setDataModified(false); // Reset dataModified after successful submission
        } catch (error) {
            console.log("Error connecting to server:", error);
            toast.error("Failed to save data");
        }
    };

    return (
        <MaternitySideBar>
            <div className="container mx-auto p-4 bg-opacity-75">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                        <div className="flex items-center">
                            <Image src={icon} alt="icon" width={100} height={100} />
                            <div className="ml-4">
                                <h1 className="text-4xl font-bold">Maternity</h1>
                                <h1 className="tsiku text-lg">{formattedDate}</h1>
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2 text-left">ID</th>
                                        <th className="px-4 py-2 text-left">First Name</th>
                                        <th className="px-4 py-2 text-left">Last Name</th>
                                        <th className="px-4 py-2 text-left">Amount</th>
                                        <th className="px-4 py-2 text-left">Medical Scheme</th>
                                        <th className="px-4 py-2 text-left">Date</th>
                                        <th className="px-4 py-2 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {maternity.map((row, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2">{row.ID}</td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="e.g John"
                                                    value={row.firstName}
                                                    onChange={(event) => updateRow(index, { firstName: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="e.g Doe"
                                                    value={row.LastName}
                                                    onChange={(event) => updateRow(index, { LastName: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    placeholder="Amount"
                                                    value={row.Amount}
                                                    onChange={(event) => updateRow(index, { Amount: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <select
                                                    value={row.MedicalScheme}
                                                    onChange={(event) => updateRow(index, { MedicalScheme: event.target.value })}
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
                                                <input
                                                    type="date"
                                                    value={row.Date}
                                                    onChange={(event) => updateRow(index, { Date: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => deleteRow(index)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className="flex justify-end mt-4">
                                <div className="px-4 py-2 font-bold">Total Amount:</div>
                                <div className="px-4 py-2 font-bold">0</div>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                                    onClick={addRow}
                                >
                                    Add Row
                                </button>
                                <button
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    onClick={handleSubmit}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </MaternitySideBar>
    );
}

export default Maternity;
