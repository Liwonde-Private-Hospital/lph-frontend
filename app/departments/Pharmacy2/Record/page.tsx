'use client';
import React, { useEffect, useState } from "react";
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
    FirstName: string;
    LastName: string;
    DrugName: string;
    DrugType: DrugForm; // Using the DrugForm enum here
    Amount: number;
    SoldQuantity: number; // New field to track quantity sold
    MedicalScheme: string;
    Sold: boolean; // New field to track whether drug has been sold
}

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Pharmacy: React.FC = () => {
    const [pharmacy, setPharmacy] = useState<PharmacyItem[]>([]);
    const [patients, setPatients] = useState<string[]>([]);
    const [drugNames, setDrugNames] = useState<string[]>([]);
    const [dataModified, setDataModified] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        // Fetch pharmacy data from backend
        const fetchPharmacyData = async () => {
            try {
                const response = await fetch("http://localhost:3000/pharmacy"); // Adjust API endpoint as per your backend
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPharmacy(data);
            } catch (error) {
                console.error("Error fetching pharmacy data:", error);
            }
        };

        // Fetch patient names from backend
        const fetchPatients = async () => {
            try {
                const response = await fetch("http://localhost:3000/patients"); // Adjust API endpoint as per your backend
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const names = data.map((patient: any) => `${patient.FirstName} ${patient.LastName}`);
                setPatients(names);
            } catch (error) {
                console.error("Error fetching patient data:", error);
            }
        };

        // Fetch drug names from backend
        const fetchDrugNames = async () => {
            try {
                const response = await fetch("http://localhost:3000/drugs"); // Adjust API endpoint as per your backend
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const names = data.map((drug: any) => drug.DrugName);
                setDrugNames(names);
            } catch (error) {
                console.error("Error fetching drug data:", error);
            }
        };

        fetchPharmacyData();
        fetchPatients();
        fetchDrugNames();
    }, []);

    useEffect(() => {
        calculateTotal();
    }, [pharmacy]);

    const addRow = () => {
        const newRow: PharmacyItem = {
            ID: pharmacy.length + 1,
            FirstName: '',
            LastName: '',
            DrugName: '',
            DrugType: DrugForm.Tablet,
            Amount: 0,
            SoldQuantity: 0,
            MedicalScheme: '',
            Sold: false
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
        const total = pharmacy.reduce((acc, curr) => acc + (curr.Amount * curr.SoldQuantity), 0);
        setTotalAmount(total);
    }

    const markDrugAsSold = async (index: number) => {
        const updatedData = [...pharmacy];
        updatedData[index].Sold = true;
        updatedData[index].SoldQuantity = updatedData[index].Amount; // Assuming sold quantity equals amount sold

        // Update backend to mark drug as sold and remove from database
        try {
            const response = await fetch(`http://localhost:3000/pharmacy/${updatedData[index].ID}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData[index]),
            });

            if (!response.ok) {
                throw new Error(`Failed to mark drug as sold and remove from database: ${response.status}`);
            }

            setPharmacy(updatedData);
            setDataModified(true);
        } catch (error) {
            console.error("Error marking drug as sold and removing from database:", error);
            alert("Failed to mark drug as sold and remove from database");
        }
    };

    const handleSubmit = async () => {
        try {
            for (const item of pharmacy) {
                if (!item.FirstName || !item.LastName || !item.DrugName || (!item.Amount && !item.MedicalScheme)) {
                    alert("Enter all required fields and ensure either Amount or Medical Scheme is entered!");
                    return;
                }

                if (item.Amount > 0 && item.MedicalScheme !== '') {
                    alert("Amount and Medical Scheme cannot be entered at once. Please enter either the Amount or the Medical Scheme.");
                    return;
                }

                // Update backend with each pharmacy item
                const response = await fetch(`http://localhost:3000/pharmacy/${item.ID}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                });

                if (!response.ok) {
                    throw new Error(`Failed to save data for ID ${item.ID}: ${response.status}`);
                }
            }

            setDataModified(false); // Reset dataModified after successful submission
        } catch (error) {
            console.error("Error connecting to server:", error);
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
                                    <th className="px-4 py-2">Sold Quantity</th>
                                    <th className="px-4 py-2">Medical Scheme</th>
                                    <th className="px-4 py-2">Sold</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pharmacy.map((row, index) => (
                                    <tr key={index} className="border-b border-gray-300">
                                        <td className="px-4 py-2">{row.ID}</td>
                                        <td className="px-4 py-2">
                                            <select
                                                className="w-full bg-transparent focus:outline-none"
                                                value={`${row.FirstName} ${row.LastName}`}
                                                onChange={(event) => {
                                                    const [firstName, lastName] = event.target.value.split(" ");
                                                    updateRow(index, { FirstName: firstName, LastName: lastName });
                                                }}
                                            >
                                                {patients.map((name, idx) => (
                                                    <option key={idx} value={name}>{name}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">{row.DrugName}</td>
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
                                                    updateRow(index, { Amount: Number(event.target.value) })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">{row.SoldQuantity}</td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="text"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="e.g. PPO"
                                                value={row.MedicalScheme}
                                                onChange={(event) =>
                                                    updateRow(index, { MedicalScheme: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            {row.Sold ? (
                                                <span className="text-green-600 font-semibold">Yes</span>
                                            ) : (
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                                                    onClick={() => markDrugAsSold(index)}
                                                >
                                                    Mark as Sold
                                                </button>
                                            )}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
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
                    <div className="mt-4 flex justify-between">
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={addRow}
                        >
                            Add Drug
                        </button>
                        <div className="flex items-center">
                            <h2 className="text-lg font-semibold">Total Amount: {totalAmount}</h2>
                            <button
                                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={handleSubmit}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;

