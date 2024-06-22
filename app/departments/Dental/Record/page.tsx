'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import './style.css'; // Make sure this CSS file aligns with the Dental component styles

interface DentalItem {
    ID: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Address: string;
    Diagnosis: string;
    Amount: string;
    MedicalScheme: string;
    Treatment: string;
}

const API_URL = ""; // Replace with your API URL

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Dental: React.FC = () => {
    const [dental, setDental] = useState<DentalItem[]>([
        { ID: 1, FirstName: '', LastName: '', PhoneNumber: '', Address: '', Diagnosis: '', Amount: '', MedicalScheme: '', Treatment: ''}
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
        const newRow = {
            ID: dental.length + 1,
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Address: '',
            Diagnosis: '',
            Amount: '',
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

        // Validate that either Amount or MedicalScheme is entered, not both
        const amount = newData.Amount || updatedData[index].Amount;
        const medicalScheme = newData.MedicalScheme || updatedData[index].MedicalScheme;
        
        if (amount && medicalScheme) {
            alert("Amount and Medical Scheme cannot be entered at once.");
            return; // Prevent the update if both are entered
        }

        updatedData[index] = { ...updatedData[index], ...newData };
        setDental(updatedData);
        setUnsavedChanges(true);
    }

    const calculateTotalAmount = () => {
        let total = 0;
        dental.forEach(item => {
            if (item.Amount) {
                total += parseFloat(item.Amount);
            }
        });
        return total.toFixed(2); // Return total amount rounded to 2 decimal places
    }

    const handleSubmit = async () => {
        try {
            for (const item of dental) {
                if (!item.FirstName || !item.LastName || !item.Treatment || !item.MedicalScheme || !item.Amount ) {
                    alert("Enter all fields before saving!");
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
                alert("Data saved successfully");
            } else {
                alert("Failed to save data");
            }
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
                            <h1 className="text-4xl font-bold">Dental</h1>
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
                                    <th className="px-4 py-2">Phone Number</th>
                                    <th className="px-4 py-2">Address</th>
                                    <th className="px-4 py-2">Diagnosis</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Medical Scheme</th>
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
                                                onChange={(event) => updateRow(index, { Amount: event.target.value })}
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={row.MedicalScheme}
                                                onChange={(event) => updateRow(index, { MedicalScheme: event.target.value })}
                                            >
                                                <option value=""></option>
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
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => deleteRow(index)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan={10} className="px-4 py-2 text-right font-bold">Total Amount:</td>
                                    <td className="px-4 py-2">{calculateTotalAmount()}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="mt-4 flex justify-center gap-4">
                        <button
                            onClick={addRow}
                            className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Add Row
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dental;
