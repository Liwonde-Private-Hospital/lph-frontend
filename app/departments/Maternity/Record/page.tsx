'use client'
import React, { useEffect, useState } from "react";
import './style.css';  // Assuming you have a CSS file for styling
import Image from "next/image";
import icon from '../../../images/icon.png';
import MaternitySideBar from "../page";

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
            Date:'',
          
        };
        setMaternity(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setMaternity(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
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

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/maternity/add`; // Assuming a similar API endpoint

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
            for (const item of maternity) {
                if (!item.firstName || !item.LastName ||  !item.Amount || !item.MedicalScheme || !item.Date) {
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

    return (<MaternitySideBar>
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="icon" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Maternity</h1>
                            <p><h1 className="tsiku text-lg">{formattedDate}</h1></p>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="overflow-x-auto">
                        <div className="table-box">
                            <div className="table-row">
                                <div className="table-cell">
                                    <p>ID</p>
                                </div>
                                <div className="table-cell">
                                    <p>First Name</p>
                                </div>
                                <div className="table-cell">
                                    <p>Last Name</p>
                                </div>
                            
                                <div className="table-cell">
                                    <p>Amount</p>
                                </div>
                                <div className="table-cell">
                                    <p>Medical Scheme</p>
                                </div>
                              
                                <div className="table-cell">
                                    <p>Action</p>
                                </div>
                            </div>
                            {maternity.map((row, index) => (
                                <div className="table-row" key={index}>
                                    <div className="table-cell">
                                        <input
                                            type="number"
                                            placeholder="e.g 1"
                                            value={row.ID}
                                            onChange={(event) => updateRow(index, { ...row, ID: parseInt(event.target.value) })}
                                        />
                                    </div>
                                    <div className="table-cell">
                                        <input
                                            type="text"
                                            placeholder=" e.g John"
                                            value={row.firstName}
                                            onChange={(event) => updateRow(index, { ...row, firstName: event.target.value })}
                                        />
                                    </div>
                                    <div className="table-cell">
                                        <input
                                            type="text"
                                            placeholder=" e.g Doe"
                                            value={row.LastName}
                                            onChange={(event) => updateRow(index, { ...row, LastName: event.target.value })}
                                        />
                                    </div>
                                 
                                    <div className="table-cell">
                                        <input
                                            type="text"
                                            placeholder="Amount"
                                            value={row.Amount}
                                            onChange={(event) => updateRow(index, { ...row, Amount: event.target.value })}
                                        />
                                    </div>
                                    <div className="table-cell">
                                        <select
                                            value={row.MedicalScheme}
                                            onChange={(event) => updateRow(index, { ...row, MedicalScheme: event.target.value })}
                                        >
                                            <option value="">Select Medical Scheme</option>
                                            <option value="MASM">MASM</option>
                                            <option value="MediHealth">MediHealth</option>
                                            <option value="National Bank">National Bank</option>
                                            <option value="Liberty Health">Liberty Health</option>
                                            <option value="Escom">Escom</option>
                                        </select>
                                    </div>
                                  
                                    <div className="table-cell">
                                        <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end mt-4">
                            <div className="px-4 py-2 font-bold">Total Amount:</div>
                            <div className="px-4 py-2 font-bold">0</div>
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
        </div></MaternitySideBar>
    );
}

export default Maternity;
