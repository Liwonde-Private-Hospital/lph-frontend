'use client'
import React, { useState, useEffect } from "react";
import './style.css';
import Image from "next/image";
import Header from "@/componets/navbar";

import icon from '../../images/icon.png';

interface FinanceItem {
    ID: number;
    FirstName: string;
    LastName: string;
    Treatment: string;
    Amount: string;
    PaymentMethod: string;
    Date: string;
}

const api = "http://localhost:3000/finance"; // Your API endpoint here

const postData = async (url: string, data: FinanceItem[] | FinanceItem) => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return true; // Indicate success
        } else {
            return false; // Indicate failure
        }
    } catch (error) {
        console.log("Error connecting to server:", error);
        return false; // Indicate failure
    }
};

export default function Finance() {
    const [finance, setFinance] = useState<FinanceItem[]>([
        { ID: 1, FirstName: '', LastName: '', Treatment: '', Amount: '', PaymentMethod: '', Date: new Date().toDateString() }
    ]);

    const [dataModified, setDataModified] = useState(false);
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (dataModified) {
                event.preventDefault();
                event.returnValue = "";
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [dataModified]);

    useEffect(() => {
        // Calculate total amount whenever finance data changes
        calculateTotal(finance);
    }, [finance]);

    const addRow = () => {
        const newRow: FinanceItem = {
            ID: finance.length + 1,
            FirstName: '',
            LastName: '',
            Treatment: '',
            Amount: '',
            PaymentMethod: '',
            Date: new Date().toDateString()
        };
        setFinance(prevData => [...prevData, newRow]);
        setDataModified(true);
    }

    const deleteRow = (index: number) => {
        setFinance(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
            setDataModified(true);
            return newData;
        });
    }

    const updateRow = (index: number, newData: Partial<FinanceItem>) => {
        const updatedData = [...finance];
        updatedData[index] = { ...updatedData[index], ...newData };
        setFinance(updatedData);
        setDataModified(true);
    }

    const calculateTotal = (data: FinanceItem[]) => {
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toDateString();
        const total = data
            .filter((item) => item.Date === formattedCurrentDate)
            .reduce((acc, curr) => acc + parseFloat(curr.Amount || '0'), 0);
        setTotalAmount(total);
    }

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
    const handleSubmit = async () => {
        try {
            // Check if any required fields are empty
            for (const item of finance) {
                if (!item.FirstName || !item.LastName || !item.PaymentMethod || !item.Treatment) {
                    alert("Enter all fields!");
                    return;
                }
            }
    
            // Create an array to hold all the data to be saved
            const dataToSave: FinanceItem[] = [];
    
            // Add valid items to the dataToSave array
            for (const item of finance) {
                // Check if any required fields are empty again (as the user might have modified them)
                if (!item.FirstName || !item.LastName || !item.PaymentMethod || !item.Treatment) {
                    alert("Enter all fields!");
                    return;
                }
                // Add valid items to the dataToSave array
                dataToSave.push(item);
            }
    
            // Post all data to the server in a single request
            const success = await postData(api, dataToSave);
    
            if (success) {
                // Once all promises are resolved, reset dataModified
                setDataModified(false);
                // Show a single alert for all data saved
                alert("All data saved successfully");
            } else {
                alert("Failed to save data");
            }
        } catch (error) {
            console.log("Error connecting to server:", error);
            alert("Failed to save data");
        }
    };
    
    return (
        <div>
            <div id="table">
                <Image
                    src={icon}
                    alt=""
                    width={100}
                    height={100}
                />
                <div>
                    <h1 id="pharma-head">Finance Records</h1>
                    <h1 className="tsiku">{formattedDate}</h1>
                </div>
                <div className="table-box">
                    <div className="table-row">
                        <div className="table-cell">
                            <p>ID</p>
                        </div>
                        <div className="table-cell">
                            <p>FirstName</p>
                        </div>
                        <div className="table-cell">
                            <p>LastName</p>
                        </div>
                        <div className="table-cell">
                            <p>Treatment</p>
                        </div>
                        <div className="table-cell">
                            <p>Amount</p>
                        </div>
                        <div className="table-cell">
                            <p>Payment Method</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>

                {finance.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell">
                            <input
                                type="number"
                                placeholder="e.g 1"
                                id="label"
                                value={row.ID}
                                onChange={(event) =>
                                    updateRow(index, { ...row, ID: parseInt(event.target.value) })
                                }
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder=" e.g damascus"
                                value={row.FirstName}
                                onChange={(e) =>
                                    updateRow(index, { ...row, FirstName: e.target.value })
                                }
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="multiplug"
                                value={row.LastName}
                                onChange={(e) =>
                                    updateRow(index, { ...row, LastName: e.target.value })
                                }
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="treatment"
                                value={row.Treatment}
                                onChange={(event) => updateRow(index, { Treatment: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="1000"
                                value={row.Amount}
                                onChange={(event) => updateRow(index, { Amount: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <select
                                value={row.PaymentMethod}
                                id="label"
                                onChange={(event) => updateRow(index, { PaymentMethod: event.target.value })}
                            >
                                <option value="">Select Payment Method</option>
                                <option value="Cash">Cash</option>
                                <option value="Airtel Money">Airtel Money</option>
                                <option value="Mpamba">Mpamba</option>
                                <option value="Bank">Bank</option>
                            </select>
                        </div>
                        <div className="table-cell">
                            <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                        </div>
                    </div>
                ))}

                {/* Total row */}
                <div className="table-row total-row">
                    <div className="table-cell">
                        DayTotal:
                    </div>
                    <div className="table-cell">
                        {totalAmount}
                    </div>
                    <div className="table-cell"></div>
                </div>

                <button onClick={addRow} className="button">Add Row</button>
                <button onClick={handleSubmit} className="button1">Save</button>
            </div>
        </div>
    );
}
