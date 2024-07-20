'use client';
import React, { useEffect, useState } from "react";
import './style.css'; // Make sure this CSS file aligns with the Pharmacy component styles
import Image from "next/image";
import icon from '../../../images/icon.png';

interface OPDItem {
    ID: number;
    firstName: string;
    LastName: string;
    Treatment: string;
    Amount: string;
    MedicalScheme: string;
    Date: string;
}


const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const OPD = () => {
    const [opd, setOpd] = useState<OPDItem[]>([
        { ID: 1, firstName: '', LastName: '', Treatment: '', Amount: '', MedicalScheme: '', Date: '' }
    ]);

    const [dataModified, setDataModified] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [passwordPromptVisible, setPasswordPromptVisible] = useState<boolean>(false);
    const [adminPassword, setAdminPassword] = useState<string>("");
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

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
        calculateTotal(opd);
    }, [opd]);

    const addRow = () => {
        const newRow: OPDItem = {
            ID: opd.length + 1,
            firstName: '',
            LastName: '',
            Treatment: '',
            Amount: '',
            MedicalScheme: '',
            Date: ''
        };
        setOpd(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setDeleteIndex(index);
        setPasswordPromptVisible(true);
    }

    const updateRow = (index: number, newData: Partial<OPDItem>) => {
        const updatedData = [...opd];

        // Check if both Amount and Medical Scheme are entered
        const amount = newData.Amount || updatedData[index].Amount;
        const medicalScheme = newData.MedicalScheme || updatedData[index].MedicalScheme;
        
        if (amount && medicalScheme) {
            alert("Amount and Medical Scheme cannot be entered at once.");
            return; // Prevent the update if both are entered
        }

        updatedData[index] = { ...updatedData[index], ...newData };
        setOpd(updatedData);
        setDataModified(true);

        // Calculate total amount whenever amount is updated
        calculateTotal(updatedData);
    }

    const calculateTotal = (data: OPDItem[]) => {
        const total = data.reduce((acc, curr) => acc + parseFloat(curr.Amount || '0'), 0);
        setTotalAmount(total);
    }

    const API_URL = "http://lph-backend.onrender.com/opd/add"; // Assuming a similar API endpoint

    const postData = async (url: string, data: OPDItem) => {
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

    const handleSaveRow = async (index: number) => {
        try {
            const item = opd[index];
            if (!item.firstName || !item.LastName || !item.Treatment || (!item.Amount && !item.MedicalScheme)) {
                alert("Enter all required fields and either Amount or Medical Scheme!");
                return;
            }

            await postData(API_URL, item);
            setDataModified(false); // Reset dataModified after successful submission
        } catch (error) {
            console.log("Error connecting to server:", error);
            alert("Failed to save data");
        }
    };

    const handlePasswordSubmit = async () => {
        if (!adminPassword) {
            alert("Admin password is required.");
            return;
        }

        try {
            const isValidPassword = await verifyAdminPassword(adminPassword);

            if (!isValidPassword) {
                alert("Invalid admin password. Deletion cancelled.");
                return;
            }

            if (deleteIndex !== null) {
                setOpd(prevData => prevData.filter((_, i) => i !== deleteIndex));
                setDataModified(true);
            }
        } catch (error) {
            console.error("Error verifying admin password:", error);
            alert("An error occurred while verifying the admin password.");
        } finally {
            setPasswordPromptVisible(false);
            setAdminPassword("");
            setDeleteIndex(null);
        }
    };

    const verifyAdminPassword = async (password: string): Promise<boolean> => {
        try {
            const response = await fetch('/api/verifyAdminPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                throw new Error('Failed to verify admin password');
            }

            const result = await response.json();
            return result.isValid;
        } catch (error) {
            console.error('Error verifying admin password:', error);
            return false;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">Doctors Office</h1>
                        </div>
                        <h1 className="tsiku text-lg">{formattedDate}</h1>
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
                                    <th className="px-4 py-2">Treatment</th>
                                    <th className="px-4 py-2">Amount</th>
                                    <th className="px-4 py-2">Medical Scheme</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {opd.map((row, index) => (
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
                                                placeholder="Treatment"
                                                value={row.Treatment}
                                                onChange={(event) =>
                                                    updateRow(index, { Treatment: event.target.value })
                                                }
                                            />
                                        </td>
                                        <td className="px-4 py-2">
                                            <input
                                                type="number"
                                                className="w-full bg-transparent focus:outline-none"
                                                placeholder="1000"
                                                value={row.Amount}
                                                onChange={(event) =>
                                                    updateRow(index, { Amount: event.target.value })
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
                                                <option value="MRA">MRA</option>
                                                <option value="ECM">ECM</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                className="bg-green-500 text-white hover:bg-red-500 hover:text-white focus:outline-none px-4 py-2 rounded mr-2"
                                                onClick={() => deleteRow(index)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className="bg-green-500 text-white hover:bg-orange-700 focus:outline-none px-4 py-2 rounded"
                                                onClick={() => handleSaveRow(index)}
                                            >
                                                Save
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="px-4 py-2 font-bold">Day Total:</div>
                        <div className="px-4 py-2 font-bold">{totalAmount}</div>
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                            onClick={addRow}
                        >
                            Add Row
                        </button>
                    </div>
                </div>
            </div>

            {passwordPromptVisible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-lg font-bold mb-4">Enter Admin Password</h2>
                        <input
                            type="password"
                            className="w-full border border-gray-300 p-2 rounded mb-4"
                            placeholder="••••••••"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded"
                                onClick={handlePasswordSubmit}
                            >
                                DELETE
                            </button>
                            <button
                                className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded"
                                onClick={() => {
                                    setPasswordPromptVisible(false);
                                    setAdminPassword("");
                                    setDeleteIndex(null);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OPD;
