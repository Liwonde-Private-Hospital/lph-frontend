'use client'
// Finance.tsx

import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../images/icon.png";

const api = "http://localhost:3000/finance/add";

interface FinanceItem {
  id: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

const Finance: React.FC = () => {
  const [finance, setFinance] = useState<FinanceItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataModified, setDataModified] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [idCounter, setIdCounter] = useState<number>(1); // Counter for auto-incrementing ID

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

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
    calculateTotal(finance);
  }, [finance]);

  const addRow = () => {
    const newRow: FinanceItem = {
      id: idCounter, // Assign unique ID
      FirstName: "",
      LastName: "",
      Treatment: "",
      Amount: 0,
      PaymentMethod: "",
    };
    setFinance((prevData) => [...prevData, newRow]);
    setIdCounter(idCounter + 1); // Increment ID counter
    setDataModified(true);
  };

  const deleteRow = (index: number) => {
    setFinance((prevData) => {
      const newData = [...prevData.slice(0, index), ...prevData.slice(index + 1)];
      setDataModified(true);
      return newData;
    });
  };

  const updateRow = (index: number, newData: Partial<FinanceItem>) => {
    const updatedData = [...finance];
    updatedData[index] = { ...updatedData[index], ...newData };
    setFinance(updatedData);
    setDataModified(true);
  };

  const calculateTotal = (data: FinanceItem[]) => {
    const total = data.reduce((acc, curr) => acc + parseFloat(curr.Amount.toString()), 0);
    setTotalAmount(total);
  };

  const postData = async (url: string, data: FinanceItem[]): Promise<boolean> => {
    try {
      const formattedData = data.map((item) => ({
        ...item,
        Amount: item.Amount.toString(), // Convert Amount back to string for posting
      }));

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error("Failed to save data");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      throw new Error("Failed to save data");
    }
  };

  const handleSubmit = async () => {
    try {
      const allFieldsEntered = finance.every(
        (item) =>
          item.FirstName.trim() !== "" &&
          item.LastName.trim() !== "" &&
          item.PaymentMethod.trim() !== "" &&
          item.Treatment.trim() !== "" &&
          item.Amount.toString().trim() !== ""
      );

      if (!allFieldsEntered) {
        setError("Enter all fields!");
        return;
      }

      const success = await postData(api, finance);

      if (success) {
        setDataModified(false);
        alert("All data saved successfully");
      } else {
        setError("Failed to save data");
      }
    } catch (error) {
      console.error("Error handling submit:", error);
      setError("Failed to save data");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-opacity-75">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex items-center justify-between bg-gray-800 text-white p-4">
          <div className="flex items-center">
            <Image src={icon} alt="" width={100} height={100} />
            <div className="ml-4">
              <h1 className="text-4xl font-bold">Finance Records</h1>
            </div>
            <h1 className="tsiku">{formattedDate}</h1>
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
                  <th className="px-4 py-2">Payment Method</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {finance.map((row, index) => (
                  <tr key={index} className="border-b border-gray-300">
                    <td className="px-4 py-2">{row.id}</td>
                    <td className="px-4 py-2">
                      <input
                        type="text"
                        className="w-full bg-transparent focus:outline-none"
                        placeholder="e.g. John"
                        value={row.FirstName}
                        onChange={(event) =>
                          updateRow(index, {
                            ...row,
                            FirstName: event.target.value,
                          })
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
                          updateRow(index, {
                            ...row,
                            LastName: event.target.value,
                          })
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
                        value={row.Amount.toString()}
                        onChange={(event) =>
                          updateRow(index, { Amount: parseFloat(event.target.value) })
                        }
                      />
                    </td>
                    <td className="px-4 py-2">
                      <select
                        className="w-full bg-transparent focus:outline-none"
                        value={row.PaymentMethod}
                        onChange={(event) =>
                          updateRow(index, {
                            PaymentMethod: event.target.value,
                          })
                        }
                      >
                        <option value="">Select Payment Method</option>
                        <option value="Cash">Cash</option>
                        <option value="Airtel Money">Airtel Money</option>
                        <option value="Mpamba">Mpamba</option>
                        <option value="Bank">Bank</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        className="bg-green-500 text-white hover:bg-red-500 hover:text-white focus:outline-none px-4 py-2 rounded"
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

          {/* Total row */}
          <div className="flex justify-end mt-4">
            <div className="px-4 py-2 font-bold">Day Total:</div>
            <div className="px-4 py-2 font-bold">{totalAmount}</div>
          </div>

          {error && <div className="text-red-1000 px-4 py-2">{error}</div>}

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
  );
};

export default Finance;
