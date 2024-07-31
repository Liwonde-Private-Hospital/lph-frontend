"use client";

import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import "./Style.css";
import FinanceSideBar from "../page";

interface DaySummaryItem {
  ID: number;
  DayTotal: number;
  Expenditure: number;
  Banking: number;
  CashInHand: number;
}

const DaySummary = () => {
  const [daySummary, setDaySummary] = useState<DaySummaryItem[]>([
    { ID: 1, DayTotal: 0, Expenditure: 0, Banking: 0, CashInHand: 0 },
  ]);

  const [, setFormData] = useState<Partial<DaySummaryItem>>({
    DayTotal: 0,
    Expenditure: 0,
    Banking: 0,
    CashInHand: 0,
  });

  const updateRow = (index: number, newData: Partial<DaySummaryItem>) => {
    const updatedData = [...daySummary];
    updatedData[index] = { ...updatedData[index], ...newData };
    const cashInHand =
      updatedData[index].DayTotal - updatedData[index].Expenditure;
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
    setDaySummary((prevData) => [...prevData, newRow]);
    displayAlert({ message: "Row added successfully", color: "green" });
  };

  const deleteRow = (index: number) => {
    setDaySummary((prevData) => prevData.filter((row, i) => i !== index));
  };

  const [alert, setAlert] = useState<{ message: string; color: string }>({
    message: "",
    color: "",
  });
  const formRef = useRef<HTMLFormElement>(null);

  const displayAlert = ({
    message,
    color,
  }: {
    message: string;
    color: string;
  }) => {
    setAlert({ message, color });
    setTimeout(() => {
      setAlert({ message: "", color: "" });
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      for (const item of daySummary) {
        if (
          !item.DayTotal ||
          !item.Expenditure ||
          !item.Banking ||
          !item.CashInHand
        ) {
          displayAlert({ message: "Please fill in all fields", color: "red" });
          return;
        }
      }

      // All fields are filled, proceed to send email
      await emailjs.sendForm(
        "service_g59xed5",
        "template_tc96qha",
        formRef.current!,
        "HlMFIQVluZ-Bfo1qv"
      );
      setFormData({
        DayTotal: 0,
        Expenditure: 0,
        Banking: 0,
        CashInHand: 0,
      });
      displayAlert({ message: "Message sent successfully", color: "green" });
    } catch (error) {
      displayAlert({
        message: "Message not sent check your internet connection",
        color: "red",
      });
    }
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

  const Daytotal = daySummary.reduce((acc, cur) => acc + cur.DayTotal, 0);
  const totalExpenditure = daySummary.reduce(
    (acc, cur) => acc + cur.Expenditure,
    0
  );
  const totalBanking = daySummary.reduce((acc, cur) => acc + cur.Banking, 0);
  const totalCashInHand = Daytotal - totalExpenditure;

  return (
    <FinanceSideBar>
      <div className="flex flex-col h-screen">
        <div className="flex-grow flex flex-col items-center justify-center p-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-4xl">
            <div className="bg-green-800 text-white p-4">
              <h1 className="text-2xl font-bold">Day Summary</h1>
              <p className="text-md">{formattedDate}</p>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 border border-gray-300">ID</th>
                        <th className="px-4 py-2 border border-gray-300">
                          Day Total
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Expenditure
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Banking
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Cash In Hand
                        </th>
                        <th className="px-4 py-2 border border-gray-300">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {daySummary.map((row, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 border border-gray-300 text-center">
                            {row.ID}
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="number"
                              className="w-full bg-transparent focus:outline-none p-2"
                              value={row.DayTotal}
                              onChange={(event) =>
                                updateRow(index, {
                                  DayTotal: parseInt(event.target.value) || 0,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="number"
                              className="w-full bg-transparent focus:outline-none p-2"
                              value={row.Expenditure}
                              onChange={(event) =>
                                updateRow(index, {
                                  Expenditure:
                                    parseInt(event.target.value) || 0,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300">
                            <input
                              type="number"
                              className="w-full bg-transparent focus:outline-none p-2"
                              value={row.Banking}
                              onChange={(event) =>
                                updateRow(index, {
                                  Banking: parseInt(event.target.value) || 0,
                                })
                              }
                            />
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-center">
                            {row.CashInHand}
                          </td>
                          <td className="px-4 py-2 border border-gray-300 text-center">
                            <button
                              onClick={() => deleteRow(index)}
                              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 focus:outline-none"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {alert.message && (
                <div
                  className={`text-white p-2 mb-4 rounded-md bg-${alert.color}-500`}
                >
                  {alert.message}
                </div>
              )}
              <div className="flex justify-between">
                <button
                  onClick={addRow}
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 focus:outline-none"
                >
                  Add Row
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-800 text-white px-4 py-2 rounded-md hover:bg-green-900 focus:outline-none"
                >
                  Send Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FinanceSideBar>
  );
};

export default DaySummary;
