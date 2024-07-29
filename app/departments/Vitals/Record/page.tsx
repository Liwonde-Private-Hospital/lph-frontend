'use client'
// Import necessary modules and styles
import './style.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import icon from '../../../images/icon.png';

// Define interface for VitalsItem
interface VitalsItem {
    ID: number;
    FirstName: string;
    LastName: string;
    Temperature: number;
    Height: number;
    Weight: number;
    BloodPressure: number;
    BMI: string; // Changed BMI type to string
}

// React functional component Vitals
const Vitals = () => {
    const [vitals, setVitals] = useState<VitalsItem[]>([
        { ID: 1, FirstName: '', LastName: '', Temperature: 0, Height: 0, Weight: 0, BloodPressure: 0, BMI: '0' }
    ]);

    const [dataModified, setDataModified] = useState<boolean>(false);

    // useEffect to handle window unload event
    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (dataModified) {
                event.preventDefault();
                event.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dataModified]);

    // Function to add a new row to vitals
    const addRow = () => {
        const newRow: VitalsItem = {
            ID: vitals.length + 1,
            FirstName: '',
            LastName: '',
            Temperature: 0,
            Height: 0,
            Weight: 0,
            BloodPressure: 0,
            BMI: '0' // Initialize BMI as string
        };
        setVitals(prevData => [...prevData, newRow]);
        setDataModified(true);
    };

    // Function to delete a row from vitals
    const deleteRow = (index: number) => {
        setVitals(prevData => prevData.filter((_, i) => i !== index));
        setDataModified(true);
    };

    // Function to update a row in vitals
    const updateRow = (index: number, newData: Partial<VitalsItem>) => {
        const updatedData = [...vitals];
        updatedData[index] = { ...updatedData[index], ...newData };

        // Recalculate BMI when height or weight changes
        if (newData.Height && newData.Weight) {
            const bmi = calculateBMI(newData.Height, newData.Weight);
            updatedData[index].BMI = bmi; // BMI is already a string
        }

        setVitals(updatedData);
        setDataModified(true);
    };

    // Function to calculate BMI
    const calculateBMI = (height: number, weight: number): string => {
        if (height > 0 && weight > 0) {
            const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2); // Calculate BMI and convert to string with two decimal places
            return bmi;
        }
        return '0';
    };

    const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/vitals`;

    // Function to handle form submission
    const handleSubmit = async () => {
        try {
            for (const item of vitals) {
                if (!item.FirstName || !item.LastName || item.Temperature === 0 || item.Weight === 0 || item.BloodPressure === 0) {
                    alert('Please fill in all fields!');
                    return;
                }

                // Convert BMI to string before sending to server
                item.BMI = item.BMI.toString();
                await postData(API_URL, item);
            }
            setDataModified(false); // Reset dataModified after successful submission
        } catch (error) {
            console.error('Error connecting to server:', error);
            alert('Failed to save data');
        }
    };

    // Function to post data to server
    const postData = async (url: string, data: VitalsItem) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Data saved successfully');
            } else {
                alert('Failed to save data');
            }
        } catch (error) {
            console.error('Error connecting to server:', error);
            alert('Failed to save data');
        }
    };

    // JSX structure for rendering the component
    return (
        <div className="container mx-auto p-4 bg-opacity-75">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-gray-800 text-white p-4">
                    <div className="flex items-center">
                        <Image src={icon} alt="" width={100} height={100} />
                        <div className="ml-4">
                            <h1 className="text-4xl font-bold">Body Tests</h1>
                        </div>
                    </div>
                </div>
                <div className="px-4 py-2">
                    <div className="overflow-x-auto">
                        <div className="w-full table-auto border-collapse border border-gray-300">
                            <div className="table-row bg-gray-200">
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">ID</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">FirstName</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">LastName</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Temperature</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Height (cm)</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Weight (kg)</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Blood Pressure</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">BMI</div>
                                <div className="table-cell border border-gray-300 p-2 text-center font-semibold">Action</div>
                            </div>

                            {vitals.map((row, index) => (
                                <div className="table-row" key={index}>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g 1"
                                            value={row.ID}
                                            onChange={(event) => updateRow(index, { ...row, ID: parseInt(event.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="text"
                                            className="w-full p-2"
                                            placeholder="e.g FirstName"
                                            value={row.FirstName}
                                            onChange={(event) => updateRow(index, { ...row, FirstName: event.target.value })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="text"
                                            className="w-full p-2"
                                            placeholder="e.g LastName"
                                            value={row.LastName}
                                            onChange={(event) => updateRow(index, { ...row, LastName: event.target.value })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g Temperature"
                                            value={row.Temperature}
                                            onChange={(event) => updateRow(index, { ...row, Temperature: parseFloat(event.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g Height in cm"
                                            value={row.Height}
                                            onChange={(event) => updateRow(index, { ...row, Height: parseFloat(event.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g Weight in kg"
                                            value={row.Weight}
                                            onChange={(event) => updateRow(index, { ...row, Weight: parseFloat(event.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <input
                                            type="number"
                                            className="w-full p-2"
                                            placeholder="e.g Blood Pressure"
                                            value={row.BloodPressure}
                                            onChange={(event) => updateRow(index, { ...row, BloodPressure: parseFloat(event.target.value) || 0 })}
                                        />
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        {row.BMI}
                                    </div>
                                    <div className="table-cell border border-gray-300 p-2 text-center">
                                        <button
                                            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-orange-500 focus:outline-none"
                                            onClick={() => deleteRow(index)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-orange-500 focus:outline-none mr-4"
                                onClick={addRow}
                            >
                                Add Row
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-orange-500 focus:outline-none"
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

export default Vitals;
