'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../images/icon.png";
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
    Date: string;
    // UseClient: string; // Added UseClient field
}

const API_URL = ""; // Replace with your API URL

const currentDate = new Date();
const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

const Dental: React.FC = () => {
    const [dental, setDental] = useState<DentalItem[]>([
        { ID: 1, FirstName: '', LastName: '', PhoneNumber: '', Address: '', Diagnosis: '', Amount: '', MedicalScheme: '', Treatment: '', Date: '' }
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
            Date: '',
          
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
                if (!item.FirstName || !item.LastName || !item.Treatment || !item.MedicalScheme || !item.Amount || !item.Date) {
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
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-3xl font-bold">Dental</h1>
                        </div>
                        <h1 className="tsiku text-lg">{formattedDate}</h1>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="overflow-x-auto">
                        <div className="flex justify-center">
                            <div className="grid grid-cols-11 gap-4 text-center"> {/* Increased to 11 columns for UseClient */}
                                <div>ID</div>
                                <div>First Name</div>
                                <div>Last Name</div>
                                <div>Phone Number</div>
                                <div>Address</div>
                                <div>Diagnosis</div>
                                <div>Amount</div>
                                <div>Medical Scheme</div>
                                <div>Treatment</div>
                
                                <div>Action</div>
                            </div>
                        </div>
                        {dental.map((row, index) => (
                            <div key={index} className="flex justify-center mt-4">
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="e.g. 1"
                                    value={row.ID}
                                    onChange={(event) => updateRow(index, { ID: parseInt(event.target.value) })}
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. John"
                                    value={row.FirstName}
                                    onChange={(event) => updateRow(index, { FirstName: event.target.value })}
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Doe"
                                    value={row.LastName}
                                    onChange={(event) => updateRow(index, { LastName: event.target.value })}
                                />
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="e.g. 0888009005"
                                    value={row.PhoneNumber}
                                    onChange={(event) => updateRow(index, { PhoneNumber: event.target.value })}
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. P.O Box"
                                    value={row.Address}
                                    onChange={(event) => updateRow(index, { Address: event.target.value })}
                                />
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Diagnosis"
                                    value={row.Diagnosis}
                                    onChange={(event) => updateRow(index, { Diagnosis: event.target.value })}
                                />
                                <input
                                    type="number"
                                    className="input-field"
                                    placeholder="e.g. 1000"
                                    value={row.Amount}
                                    onChange={(event) => updateRow(index, { Amount: event.target.value })}
                                />
                                <select
                                    className="input-field"
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
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder="e.g. Treatment"
                                    value={row.Treatment}
                                    onChange={(event) => updateRow(index, { Treatment: event.target.value })}
                                />
                                {/* <div>{row.UseClient}</div> Display "Use client" for each row */}
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                    onClick={() => deleteRow(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-4">
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded mr-4"
                            onClick={addRow}
                        >
                            Add Row
                        </button>
                        <button
                            className="bg-green-500 text-white px-4 py-2 rounded"
                            onClick={handleSubmit}
                        >
                            Save
                        </button>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="px-4 py-2 font-bold">Total Amount:</div>
                       
                        <div className="px-4 py-2 font-bold">{calculateTotalAmount()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dental;
