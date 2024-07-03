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

const Pharmacy = () => {
    const [pharmacy, setPharmacy] = useState<PharmacyItem[]>([]);
    const [patients, setPatients] = useState<string[]>([]);
    const [drugNames, setDrugNames] = useState<string[]>([]);
    const [filteredPharmacy, setFilteredPharmacy] = useState<PharmacyItem[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dataModified, setDataModified] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        // Fetch pharmacy data from backend
        const fetchPharmacyData = async () => {
            try {
                const response = await fetch(
                  "http://lph-backend.onrender.com/pharmacy"
                ); // Adjust API endpoint as per your backend
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setPharmacy(data);
                setFilteredPharmacy(data); // Initialize filteredPharmacy with all data
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
                const response = await fetch(
                  "http://lph-backend.onrender.com/drugs"
                ); // Adjust API endpoint as per your backend
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

    useEffect(() => {
        // Filter pharmacy data based on search term
        const filteredData = pharmacy.filter(item =>
            item.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.LastName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPharmacy(filteredData);
    }, [searchTerm, pharmacy]);

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
            const response = await fetch(
              `http://lph-backend.onrender.com/pharmacy/${updatedData[index].ID}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData[index]),
              }
            );

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
                const response = await fetch(
                  `http://lph-backend.onrender.com/pharmacy/${item.ID}`,
                  {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(item),
                  }
                );

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

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-green-500 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Pharmacy</h1>
                        </div>
                        <h1 className="Tsiku">{formattedDate}</h1>
                    </div>
                    <div>
                        <input
                            type="text"
                            className="border border-gray-300 px-4 py-2 w-64 focus:outline-none"
                            placeholder="Search Patient..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
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
                                    <th className="px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPharmacy.map((item, index) => (
                                    <tr key={index} className="text-center">
                                        <td className="border px-4 py-2">{item.ID}</td>
                                        <td className="border px-4 py-2">{item.FirstName}</td>
                                        <td className="border px-4 py-2">{item.LastName}</td>
                                        <td className="border px-4 py-2">{item.DrugName}</td>
                                        <td className="border px-4 py-2">{item.DrugType}</td>
                                        <td className="border px-4 py-2">{item.Amount}</td>
                                        <td className="border px-4 py-2">{item.MedicalScheme}</td>
                                        <td className="border px-4 py-2">
                                            {!item.Sold ? (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                                                    onClick={() => markDrugAsSold(index)}
                                                >
                                                    Sell
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">Sold</span>
                                            )}
                                            <button
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
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
                </div>
                <div className="px-4 py-2 bg-gray-200">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={addRow}
                    >
                        Add Row
                    </button>
                    <button
                        className={`ml-2 ${dataModified ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-500 cursor-not-allowed'} text-white font-bold py-2 px-4 rounded`}
                        onClick={handleSubmit}
                        disabled={!dataModified}
                    >
                        Save Changes
                    </button>
                </div>
                <div className="px-4 py-2 bg-gray-200">
                    <h2 className="text-lg font-bold">Total Amount: ${totalAmount}</h2>
                </div>
            </div>
        </div>
    );
};

export default Pharmacy;
