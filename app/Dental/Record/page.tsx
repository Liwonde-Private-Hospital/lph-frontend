'use client'
import React, { useState, useEffect } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

interface DentalItem {
    ID: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Address: string;
    Diogonis: string;
    Amount: string;
    MedicalScheme: string;
    Treatment: string;
    Date: string;
}

export default function Dental() {
    const [dental, setDental] = useState<DentalItem[]>([
        { ID: '1', FirstName: '', LastName: '', PhoneNumber: '', Address: '', Diogonis: '', Amount: '', MedicalScheme: '', Treatment: '', Date: '' }
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
            ID: (dental.length + 1).toString(),
            FirstName: '',
            LastName: '',
            PhoneNumber: '',
            Address: '',
            Diogonis: '',
            Amount: '',
            MedicalScheme: '',
            Treatment: '',
            Date: ''
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
        updatedData[index] = { ...updatedData[index], ...newData };
        setDental(updatedData);
        setUnsavedChanges(true);
    }

    const API_URL = ""; // Add your API URL here

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

    const handleSubmit = async () => {
        try {
            for (const item of dental) {
                if (!item.FirstName || !item.LastName || !item.Treatment || !item.MedicalScheme || !item.Amount || !item.Date) {
                    alert("Enter All fields !");
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

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

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
                    <h1 className="Tsikuli">Dental</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
                    <br></br>
                </div>
                <div className="table-box">
                    <div className="table-row" id="tab">
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
                            <p>PhoneNumber</p>
                        </div>
                        <div className="table-cell">
                            <p>Address</p>
                        </div>
                        <div className="table-cell">
                            <p>Diagonisis</p>
                        </div>
                        <div className="table-cell">
                            <p>Amount</p>
                        </div>
                        <div className="table-cell">
                            <p>MedicalScheme</p>
                        </div>
                        <div className="table-cell">
                            <p>Treatment</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>
                {dental.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="e.g 1"
                                value={row.ID}
                                onChange={(event) => updateRow(index, { ID: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder=" e.g damascus"
                                value={row.FirstName}
                                onChange={(event) => updateRow(index, { FirstName: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="multiplug"
                                value={row.LastName}
                                onChange={(event) => updateRow(index, { LastName: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="0888009005"
                                value={row.PhoneNumber}
                                onChange={(event) => updateRow(index, { PhoneNumber: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="p.o box liwonde"
                                value={row.Address}
                                onChange={(event) => updateRow(index, { Address: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="bracelets"
                                value={row.Diogonis}
                                onChange={(event) => updateRow(index, { Diogonis: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="k 1000"
                                value={row.Amount}
                                onChange={(event) => updateRow(index, { Amount: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <select
                                name="medicalScheme"
                                id="label"
                            
                                value={row.MedicalScheme}
                                onChange={(event) => updateRow(index, { MedicalScheme: event.target.value })}
                                required
                            >
                                <option value=""></option>
                                <option value="MASM">MASM</option>
                                <option value="MediHealth">MediHealth</option>
                                <option value="National Bank">National Bank</option>
                                <option value="Liberty Health">Liberty Health</option>
                                <option value="MRA">MRA</option>
                                <option value="ECM">ECM</option>
                            </select>
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder="teeth removal"
                                value={row.Treatment}
                                onChange={(event) => updateRow(index, { Treatment: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                            <button className="delete" onClick={() => deleteRow(index)}>Delete</button>
                        </div>
                    </div>
                ))}
                <button onClick={addRow} className="button">Add Row</button>
                <button onClick={handleSubmit} className="button1">Save</button>
            </div>
        </div>
    );
}
