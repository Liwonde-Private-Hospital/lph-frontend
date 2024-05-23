'use client'
import React, { useEffect, useState } from "react";
import './style.css';
import Image from "next/image";
import icon from '../../images/icon.png';

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

export default function OPD() {
    const [opd, setOpd] = useState<OPDItem[]>([
        { ID: 1, firstName: '', LastName: '', Treatment: '', Amount: '', MedicalScheme: '', Date: '' }
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
        setOpd(prevData => {
            const newData = prevData.filter((row, i) => i !== index);
            calculateTotal(newData); // Recalculate total after row deletion
            setDataModified(true);
            return newData;
        });
    }

    const updateRow = (index: number, newData: Partial<OPDItem>) => {
        const updatedData = [...opd];
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
    const API_URL=""

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
    
      const handleSubmit = async () => {
        try {
          for (const item of opd) {
            if (!item.firstName || !item.LastName || !item.Treatment || !item.Amount||!item.Amount||!item.MedicalScheme) {
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
                    <h1 className="Tsikuli">Doctors Office</h1>
                    <h1 className="Tsiku">{formattedDate}</h1>
                    <br></br>
                    <br></br>
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
                            <p>MedicalScheme</p>
                        </div>
                        <div className="table-cell">
                            <p>Action</p>
                        </div>
                    </div>
                </div>

                {opd.map((row, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell">
                            <input
                                type="number"
                                id="label"
                                placeholder="e.g 1"
                                value={row.ID}
                                // onChange={(event) => updateRow(index, { ID: parseInt(event.target.value) })}
                            />
                        </div>
                        <div className="table-cell">
                            <input
                                type="text"
                                id="label"
                                placeholder=" e.g damascus"
                                value={row.firstName}
                                onChange={(event) => updateRow(index, { firstName: event.target.value })}
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
                                placeholder="Amount"
                                value={row.Amount}
                                onChange={(event) => updateRow(index, { Amount: event.target.value })}
                            />
                        </div>
                        <div className="table-cell">
                        <select name="" id="type" required>
                                <option value=""></option>
                                <option value="">MASM</option>
                                <option value="">MediHealth</option>
                                <option value="">National Bank</option>
                                <option value="">Liberty Health</option>
                                <option value="">MRA</option>
                                <option value="">ECM</option>
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
                        Total:
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
