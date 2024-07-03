'use client'
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Style.css";
import ambulanceImage from "../images/ambulance.jpg";

interface DaySummaryItem {
    ID: number;
    DayTotal: number;
    Expenditure: number;
    Banking: number;
    CashInHand: number;
 
}

const DaySummary = () => {
    const [daySummary, setDaySummary] = useState<DaySummaryItem[]>([
        { ID: 1, DayTotal: 0, Expenditure: 0, Banking: 0, CashInHand: 0, }
    ]);

    const [, setFormData] = useState<Partial<DaySummaryItem>>({
        DayTotal: 0,
        Expenditure: 0,
        Banking: 0,
        CashInHand: 0
    });

    const updateRow = (index: number, newData: Partial<DaySummaryItem>) => {
        const updatedData = [...daySummary];
        updatedData[index] = { ...updatedData[index], ...newData };
        const cashInHand = updatedData[index].DayTotal - updatedData[index].Expenditure;
        updatedData[index].CashInHand = cashInHand;
        setDaySummary(updatedData);
    };

    const addRow = () => {
        if (daySummary.length === 1) {
            displayAlert({ message: "You can only add one row", color: "red" });
            return;
        }
        const newRow: DaySummaryItem = {
            ID: daySummary.length + 1,
            DayTotal: 0,
            Expenditure: 0,
            Banking: 0,
            CashInHand: 0,
          
        };
        setDaySummary(prevData => [...prevData, newRow]);
        displayAlert({ message: "Row added successfully", color: "green" });
    };

    const deleteRow = (index: number) => {
        setDaySummary(prevData => prevData.filter((row, i) => i !== index));
    };

    const [alert, setAlert] = useState<{ message: string; color: string }>({ message: "", color: "" });
    const formRef = useRef<HTMLFormElement>(null);

    const displayAlert = ({ message, color }: { message: string; color: string }) => {
        setAlert({ message, color });
        setTimeout(() => {
            setAlert({ message: "", color: "" });
        }, 5000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            for (const item of daySummary) {
                if (!item.DayTotal || !item.Expenditure || !item.Banking || !item.CashInHand) {
                    displayAlert({ message: "Please fill in all fields", color: "red" });
                    return;
                }
            }

            // All fields are filled, proceed to send email
            await emailjs.sendForm('service_g59xed5', 'template_tc96qha', formRef.current!, 'HlMFIQVluZ-Bfo1qv');
            setFormData({
                DayTotal: 0,
                Expenditure: 0,
                Banking: 0,
                CashInHand: 0
            });
            displayAlert({ message: "Message sent successfully", color: "green" });
        } catch (error) {
            displayAlert({ message: "Message not sent check your internet connection", color: "red" });
        }
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

    const Daytotal = daySummary.reduce((acc, cur) => acc + cur.DayTotal, 0);
    const totalExpenditure = daySummary.reduce((acc, cur) => acc + cur.Expenditure, 0);
    const totalBanking = daySummary.reduce((acc, cur) => acc + cur.Banking, 0);
    const totalCashInHand = Daytotal - totalExpenditure;

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-grow flex justify-center items-center">
                <div className="table-box">
                    <h1 className="tsiku">{formattedDate}</h1>
                    <br />
                    <div className="table-row">
                        <div className="table-cell">
                            <p>ID</p>
                        </div>
                        <div className="table-cell">
                            <p>DayTotal</p>
                        </div>
                        <div className="table-cell">
                            <p>Expenditure</p>
                        </div>
                        <div className="table-cell">
                            <p>Banking</p>
                        </div>
                        <div className="table-cell">
                            <p>CashInHand</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                    {daySummary.map((row, index) => (
                        <div className="table-row" key={index}>
                            <div className="table-cell">
                                <input
                                    type="number"
                                    id="label"
                                    value={row.ID}
                                    readOnly
                                />
                            </div>
                            <div className="table-cell">
                                <input
                                    type="number"
                                    id="label"
                                    value={row.DayTotal}
                                    onChange={(event) => updateRow(index, { DayTotal: parseInt(event.target.value) || 0 })}
                                />
                            </div>
                            <div className="table-cell">
                                <input
                                    type="number"
                                    id="label"
                                    value={row.Expenditure}
                                    onChange={(event) => updateRow(index, { Expenditure: parseInt(event.target.value) || 0 })}
                                />
                            </div>
                            <div className="table-cell">
                                <input
                                    type="number"
                                    id="label"
                                    value={row.Banking}
                                    onChange={(event) => updateRow(index, { Banking: parseInt(event.target.value) || 0 })}
                                />
                            </div>
                            <div className="table-cell">
                                <input
                                    type="number"
                                    id="label"
                                    value={row.CashInHand}
                                    readOnly
                                />
                            </div>
                            <div className="table-cell">
                                <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                            </div>
                        </div>
                    ))}
                    <div className="table-row">
                    <div className="table-cell">
                            <p>{"Total:"}</p>
                        </div>
                        <div className="table-cell">
                            <p>{Daytotal}</p>
                        </div>
                        <div className="table-cell">
                            <p>{totalExpenditure}</p>
                        </div>
                        <div className="table-cell">
                            <p>{totalBanking}</p>
                        </div>
                        <div className="table-cell">
                            <p>{totalCashInHand}</p>
                        </div>
                        <div className="table-cell"></div>
                      
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button onClick={addRow} className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                            Add Row
                        </button>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <form ref={formRef} onSubmit={handleSubmit}>
                            <button type="submit" className="bg-green-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
                                Save and Send
                            </button>
                        </form>
                    </div>
                    {alert.message && (
                        <div className="mt-2 flex justify-center">
                            <p style={{ color: alert.color }}>{alert.message}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DaySummary;
