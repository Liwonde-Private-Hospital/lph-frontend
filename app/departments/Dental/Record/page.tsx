'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import './style.css';
import DentalSideBar from "../page";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DentalItem {
    ID: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Address: string;
    Diagnosis: string;
    Amount: number;
    MedicalScheme: string;
    Treatment: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/dental`;

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Dental = () => {
    const [dental, setDental] = useState<DentalItem[]>([
        { ID: 1, FirstName: '', LastName: '', PhoneNumber: '', Address: '', Diagnosis: '', Amount: 0, MedicalScheme: '', Treatment: '' }
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

    useEffect(() => {
        calculateTotalAmount();
    }, [dental]);

    const addRow = () => {
        const newRow: DentalItem = {
            ID: dental.length + 1,
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Address: '',
            Diagnosis: '',
            Amount: 0,
            MedicalScheme: '',
            Treatment: '',
        };
        setDental(prevData => [...prevData, newRow]);
        setUnsavedChanges(true);
    }

    const deleteRow = (index: number) => {
        setDental(prevData => prevData.filter((row, i) => i !== index));
        setUnsavedChanges(true);
    }

    const updateRow = (index: number, newData: Partial<DentalItem>) => {
        const updatedData = [...dental];

        // Ensure Amount is a number
        const amount = newData.Amount !== undefined ? Number(newData.Amount) : updatedData[index].Amount;
        const medicalScheme = newData.MedicalScheme !== undefined ? newData.MedicalScheme : updatedData[index].MedicalScheme;

        if (amount && medicalScheme) {
            toast.error("Amount and Medical Scheme cannot be entered at once.");
            return; // Prevent the update if both are entered
        }

        updatedData[index] = { ...updatedData[index], ...newData, Amount: amount };
        setDental(updatedData);
        setUnsavedChanges(true);
    }

    const calculateTotalAmount = () => {
        let total = 0;
        dental.forEach(item => {
            if (item.Amount) {
                total += item.Amount;
            }
        });
        return total.toFixed(2); // Return total amount rounded to 2 decimal places
    }

    const handleSubmit = async () => {
        try {
            for (const item of dental) {
                if (!item.FirstName || !item.LastName || !item.PhoneNumber || !item.Address || !item.Diagnosis || !item.Treatment) {
                    toast.error("Enter required fields before saving!");
                    return;
                }

                if (!item.Amount && !item.MedicalScheme) {
                    toast.error("Either Amount or Medical Scheme must be entered.");
                    return;
                }

                if (item.Amount && item.MedicalScheme) {
                    toast.error("Amount and Medical Scheme cannot both be entered.");
                    return;
                }

                await postData(API_URL, item);
            }
            setUnsavedChanges(false); // Reset unsavedChanges after successful submission
            toast.success("Data saved successfully");
        } catch (error) {
            console.log("Error connecting to server:", error);
            toast.error("Failed to save data");
        }
    };

    const postData = async (url: string, data: DentalItem) => {
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

    return (
        <DentalSideBar>
            <div className="container mx-auto p-4 bg-opacity-75">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                        <div className="flex items-center">
                            <Image src={icon} alt="icon" width={100} height={100} />
                            <div className="ml-4 flex-1">
                                <h1 className="text-4xl font-bold">Dental</h1>
                            </div>
                            <div className="flex-none text-right">
                            <div className="Tsiku">{formattedDate}</div>
                        
                            </div>
                        </div>
                    </div>
                    <div className="px-4 py-2">
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto">
                                <thead className="bg-gray-200">
                                    <tr>
                                        <th className="px-4 py-2">ID</th>
                                        <th className="px-4 py-2">FirstName</th>
                                        <th className="px-4 py-2">LastName</th>
                                        <th className="px-4 py-2">PhoneNumber</th>
                                        <th className="px-4 py-2">Address</th>
                                        <th className="px-4 py-2">Diagnosis</th>
                                        <th className="px-4 py-2">Amount</th>
                                        <th className="px-4 py-2">MedicalScheme</th>
                                        <th className="px-4 py-2">Treatment</th>
                                        <th className="px-4 py-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dental.map((row, index) => (
                                        <tr key={index} className="border-b border-gray-300">
                                            <td className="px-4 py-2">{row.ID}</td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. John"
                                                    value={row.FirstName}
                                                    onChange={(event) => updateRow(index, { FirstName: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. Doe"
                                                    value={row.LastName}
                                                    onChange={(event) => updateRow(index, { LastName: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. 0888009005"
                                                    value={row.PhoneNumber}
                                                    onChange={(event) => updateRow(index, { PhoneNumber: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. P.O Box"
                                                    value={row.Address}
                                                    onChange={(event) => updateRow(index, { Address: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. Diagnosis"
                                                    value={row.Diagnosis}
                                                    onChange={(event) => updateRow(index, { Diagnosis: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <input
                                                    type="number"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. 1000"
                                                    value={row.Amount}
                                                    onChange={(event) => updateRow(index, { Amount: Number(event.target.value) })}
                                                />
                                            </td>
                                            <td className="px-4 py-2">
                                                <select
                                                    className="w-full bg-transparent focus:outline-none"
                                                    value={row.MedicalScheme}
                                                    onChange={(event) =>
                                                        updateRow(index, {
                                                            MedicalScheme: event.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Medical Scheme</option>
                                                    <option value="MASM">MASM</option>
                                                    <option value="MediHealth">MediHealth</option>
                                                    <option value="National Bank">National Bank</option>
                                                    <option value="Liberty Health">Liberty Health</option>
                                                    <option value="MRA">MRA</option>
                                                    <option value="ECM">ECM</option>
                                                </select>
                                            </td>


                                            <td className="px-4 py-2">
                                                <input
                                                    type="text"
                                                    className="w-full bg-transparent focus:outline-none"
                                                    placeholder="e.g. Treatment"
                                                    value={row.Treatment}
                                                    onChange={(event) => updateRow(index, { Treatment: event.target.value })}
                                                />
                                            </td>
                                            <td className="px-4 py-2 text-center">
                                                <button
                                                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
                        <div className="flex justify-center my-4 space-x-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                onClick={addRow}
                            >
                                Add Row
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <span className="text-lg font-bold">Total Amount: {calculateTotalAmount()}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </DentalSideBar>
    );
};

export default Dental;
