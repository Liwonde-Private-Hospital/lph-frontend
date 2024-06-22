'use client'
import React, { useEffect, useState } from "react";
import './style.css'; // Make sure this CSS file aligns with the Pharmacy component styles
import Image from "next/image";
import icon from '../../../images/icon.png';

// DrugForm enum directly inside the component
enum DrugForm {
    Syrup = "Syrup",
    Tablet = "Tablet",
    Capsules = "Capsules",
    Suppositories = "Suppositories",
    Drops = "Drops",
    Inhalers = "Inhalers",
    Injections = "Injections",
    Other = "Other"
}

interface PharmacyItem {
    ID: number;
    firstName: string;
    LastName: string;
    DrugName: string;
    DrugType: DrugForm; // Using the DrugForm enum here
    Amount: number;
    MedicalScheme: string;
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Pharmacy: React.FC = () => {
    const [pharmacy, setPharmacy] = useState<PharmacyItem[]>([
        { ID: 1, firstName: '', LastName: '', DrugName: '', DrugType: DrugForm.Tablet, Amount: 0, MedicalScheme: '' }
    ]);

    const [dataModified, setDataModified] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);

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

    useEffect(() => {
        calculateTotal();
    }, [pharmacy]);

    const addRow = () => {
        const newRow: PharmacyItem = {
            ID: pharmacy.length + 1,
            firstName: '',
            LastName: '',
            DrugName: '',
            DrugType: DrugForm.Tablet,
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

    const updateRow = (index: number, newData: Partial<PharmacyItem>) => {
        const updatedData = [...pharmacy];

        // Validate that both Amount and MedicalScheme are not entered simultaneously
        const currentAmount = newData.Amount !== undefined ? newData.Amount : updatedData[index].Amount;
        const currentMedicalScheme = newData.MedicalScheme !== undefined ? newData.MedicalScheme : updatedData[index].MedicalScheme;

        if (currentAmount > 0 && currentMedicalScheme !== '') {
            alert("Amount and Medical Scheme cannot be entered at once. Please enter either the Amount or the Medical Scheme.");
            return; // Prevent the update if both are entered
        }

        updatedData[index] = { ...updatedData[index], ...newData };
        setPharmacy(updatedData);
        setDataModified(true);

        // Recalculate total amount whenever amount is updated
        calculateTotal();
    }

    const calculateTotal = () => {
        const total = pharmacy.reduce((acc, curr) => acc + curr.Amount, 0);
        setTotalAmount(total);
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
                if (!item.firstName || !item.LastName || !item.DrugName || (!item.Amount && !item.MedicalScheme)) {
                    alert("Enter all required fields and ensure either Amount or Medical Scheme is entered!");
                    return;
                }

                if (item.Amount > 0 && item.MedicalScheme !== '') {
                    alert("Amount and Medical Scheme cannot be entered at once. Please enter either the Amount or the Medical Scheme.");
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
                            <h1 className="text-4xl font-bold">Pharmacy</h1>
                        </div>
                        <h1 className="Tsiku">{formattedDate}</h1>
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
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={row.DrugType}
                                                onChange={(event) =>
                                                    updateRow(index, { DrugType: event.target.value as DrugForm })
                                                }
                                            >
                                                {Object.values(DrugForm).map((form, idx) => (
                                                    <option key={idx} value={form}>{form}</option>
                                                ))}
                                            </select>
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
                                                <option value="">None</option>
                                                <option value="MASM">MASM</option>
                                                <option value="LibertyHealth">LibertyHealth</option>
                                                <option value="MedHealth">MedHealth</option>
                                                <option value="NationalBank">NationalBank</option>
                                                <option value="MRA">MRA</option>
                                                <option value="ReserveBank">ReserveBank</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-green-500 text-white hover:bg-red-600 focus:outline-none px-2 py-1 rounded"
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
                    <div className="mt-4 flex justify-center">
                        <button
                            className="bg-green-500 text-white hover:bg-orange-600 focus:outline-none px-4 py-2 rounded mr-2"
                            onClick={addRow}
                        >
                            Add Row
                        </button>
                        <button
                            className="bg-green-500 text-white hover:bg-orange-600 focus:outline-none px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>
                </div>
                <div className="flex justify-end p-4 bg-gray-800 text-white">
                    <p className="font-bold text-lg">Total Amount: {totalAmount}</p>
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
