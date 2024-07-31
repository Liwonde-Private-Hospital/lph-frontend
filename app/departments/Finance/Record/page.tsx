"use client";
import "./style.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import FinanceSideBar from "../page";

const api = `${process.env.NEXT_PUBLIC_API_URL}/finance`;

interface FinanceItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

const Finance = () => {
  const [finance, setFinance] = useState<FinanceItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [dataModified, setDataModified] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [passwordPromptVisible, setPasswordPromptVisible] =
    useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

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
      ID: idCounter,
      FirstName: "",
      LastName: "",
      Treatment: "",
      Amount: 0,
      PaymentMethod: "",
    };
    setFinance((prevData) => [...prevData, newRow]);
    setIdCounter(idCounter + 1);
    setDataModified(true);
  };

  const deleteRow = (index: number) => {
    setDeleteIndex(index);
    setPasswordPromptVisible(true);
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
        const rowToDelete = finance[deleteIndex];
        const deleteSuccess = await deleteData(`${api}/${rowToDelete.ID}`);

        if (deleteSuccess) {
          setFinance((prevData) => {
            const newData = [
              ...prevData.slice(0, deleteIndex),
              ...prevData.slice(deleteIndex + 1),
            ];
            setDataModified(true);
            return newData;
          });
        } else {
          alert("Failed to delete data");
        }
      }
    } catch (error) {
      console.error("Error verifying admin password or deleting data:", error);
      alert(
        "Invalid Admin password. Please ask for the password from Admin to delete data."
      );
    } finally {
      setPasswordPromptVisible(false);
      setAdminPassword("");
      setDeleteIndex(null);
    }
  };

  const verifyAdminPassword = async (password: string): Promise<boolean> => {
    const response = await fetch("/api/verifyAdminPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify admin password");
    }

    const result = await response.json();
    return result.isValid;
  };

  const deleteData = async (url: string): Promise<boolean> => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        return true;
      } else {
        throw new Error("Failed to delete data");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      throw new Error("Failed to delete data");
    }
  };

  const updateRow = (index: number, newData: Partial<FinanceItem>) => {
    const updatedData = [...finance];
    updatedData[index] = { ...updatedData[index], ...newData };
    setFinance(updatedData);
    setDataModified(true);
  };

  const calculateTotal = (data: FinanceItem[]) => {
    const total = data.reduce(
      (acc, curr) => acc + parseFloat(curr.Amount.toString()),
      0
    );
    setTotalAmount(total);
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
        alert("Enter all fields!");
        return;
      }

      const success = await postData(`${api}/add`, finance);

      if (success) {
        setDataModified(false);
        alert("All data saved successfully");
      } else {
        setError("Failed to save data");
      }
    } catch (error) {
      console.error("Error handling submit:", error);
      alert("Failed to save data");
    }
  };

  const postData = async (
    url: string,
    data: FinanceItem[]
  ): Promise<boolean> => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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

  return (
    <FinanceSideBar>
      <div className="container mx-auto bg-opacity-75">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="items-center justify-between bg-green-800 text-white p-4">
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
                <thead className="bg-green-200">
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
                    <tr key={index} className="border-b border-green-300">
                      <td className="px-4 py-2">{row.ID}</td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. John"
                          value={row.FirstName}
                          onChange={(event) =>
                            updateRow(index, { FirstName: event.target.value })
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
                          placeholder="Amount"
                          value={row.Amount}
                          onChange={(event) =>
                            updateRow(index, {
                              Amount: parseFloat(event.target.value),
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="text"
                          className="w-full bg-transparent focus:outline-none"
                          placeholder="e.g. Cash"
                          value={row.PaymentMethod}
                          onChange={(event) =>
                            updateRow(index, {
                              PaymentMethod: event.target.value,
                            })
                          }
                        />
                      </td>
                      <td className="px-4 py-2">
                        <button
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                          onClick={() => deleteRow(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="total-amount">
                <h3>Total Amount: {totalAmount}</h3>
              </div>
              <div className="flex justify-end">
                <button
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-800"
                  onClick={addRow}
                >
                  Add Row
                </button>
                <button
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-800 ml-2"
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {passwordPromptVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">
                Enter Admin Password
              </h2>
              <input
                type="password"
                className="w-full border border-green-300 p-2 mb-4 rounded focus:outline-none"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-800 mr-2"
                  onClick={handlePasswordSubmit}
                >
                  Submit
                </button>
                <button
                  className="bg-green-400 text-white py-1 px-3 rounded hover:bg-green-600"
                  onClick={() => setPasswordPromptVisible(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FinanceSideBar>
  );
};

export default Finance;
