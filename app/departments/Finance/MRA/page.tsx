"use client";

import "./style.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import { Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import FinanceSideBar from "../page";

// Extend jsPDF to include autoTable method
declare module "jspdf" {
  interface jsPDF {
    autoTable: (columns: string[], rows: string[][], options?: any) => void;
  }
}

const api = `${process.env.NEXT_PUBLIC_API_URL}/finance`;

interface MedHealthItem {
  ID: number;
  Date: string;
  FirstName: string;
  LastName: string;
  ClaimNo: number;
  Amount: number;
  InvoiceNo: number;
}

const MedHealth = () => {
  const [MedHealth, setMedHealth] = useState<MedHealthItem[]>([]);
  const [dataModified, setDataModified] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );

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
    calculateTotal(MedHealth);
  }, [MedHealth]);

  const addRow = () => {
    const newRow: MedHealthItem = {
      ID: idCounter,
      Date: "",
      FirstName: "",
      LastName: "",
      ClaimNo: 0,
      Amount: 0,
      InvoiceNo: 0,
    };
    setMedHealth((prevData) => [...prevData, newRow]);
    setIdCounter(idCounter + 1);
    setDataModified(true);
  };

  const deleteRow = (index: number) => {
    const updatedData = [...MedHealth];
    updatedData.splice(index, 1);
    setMedHealth(updatedData);
    setDataModified(true);
  };

  const updateRow = (index: number, newData: Partial<MedHealthItem>) => {
    const updatedData = [...MedHealth];
    updatedData[index] = { ...updatedData[index], ...newData };
    setMedHealth(updatedData);
    setDataModified(true);
  };

  const calculateTotal = (data: MedHealthItem[]) => {
    const total = data.reduce(
      (acc, curr) => acc + parseFloat(curr.Amount.toString()),
      0
    );
    setTotalAmount(total);
  };

  const handleSubmit = async () => {
    if (
      MedHealth.some(
        (item) =>
          !item.FirstName.trim() ||
          !item.LastName.trim() ||
          isNaN(item.ClaimNo) ||
          isNaN(item.Amount) ||
          isNaN(item.InvoiceNo) ||
          item.Amount <= 0
      )
    ) {
      toast.error("Enter all fields with valid values!");
      return;
    }

    try {
      setIsSubmitting(true);
      const success = true; // Mock successful submission

      if (success) {
        setDataModified(false);
        toast.success("All data saved successfully");
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      toast.error("Failed to save data");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof MedHealthItem
  ) => {
    const value = e.target.value;
    updateRow(index, { [field]: value });
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
    setDataModified(true);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
    setDataModified(true);
  };

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 11 }, (_, i) => currentYear + i);
  const monthOptions = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "MRA SUMMARY";
  
    // Header section
    doc.setFontSize(18);
    doc.text(title, 20, 20);
  
    // Hospital information
    doc.setFontSize(12);
    doc.text("LIWONDE PRIVATE HOSPITAL", 20, 35);
    doc.text("P.O.BOX 179, LIWONDE", 20, 45);
    doc.text("EMAIL: liwondeclinic@yahoo.com", 20, 55);
    doc.text("CELL: 0888597087", 20, 65);
  
    // MedHealth Summary section
    const selectedDate = new Date(selectedYear, selectedMonth - 1);
    doc.setFontSize(14);
    doc.text(
      `MRA SUMMARY AS AT ${selectedDate.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      })}`,
      20,
      80
    );
  
    // Table section
    const tableColumn = [
      "ID",
      "Date",
      "First Name",
      "Last Name",
      "Claim No",
      "Amount",
      "Invoice No",
    ];
    const tableRows = MedHealth.map((item) => [
      item.ID.toString(),
      item.Date,
      item.FirstName,
      item.LastName,
      item.ClaimNo.toString(),
      item.Amount.toString(),
      item.InvoiceNo.toString(),
    ]);
  
    doc.autoTable(tableColumn, tableRows, { startY: 100 });
  
    // Total Amount section
    doc.setFontSize(12);
    doc.text(
      `Total Amount: ${totalAmount}`,
      20,
      (doc as any).autoTable.previous.finalY + 10
    );
  
    // Format the selected date for the filename
    const formattedDate = selectedDate.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    }).replace(/\s+/g, '_'); // Replace spaces with underscores
  
    // Save the PDF with the formatted date as part of the file name
    const filename = `MRA_Summary_${formattedDate}.pdf`;
    doc.save(filename);
  };
  
  return (
    <FinanceSideBar>
    <>
      <ToastContainer />
      <div className="min-h-screen py-8">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 bg-gray-800 text-white flex items-center justify-between">
            <div className="flex items-center">
              <Image src={icon} alt="Hospital Icon" width={80} height={80} />
              <div className="ml-4">
                <h1 className="text-4xl font-bold">LIWONDE PRIVATE HOSPITAL</h1>
                <p>P.O.BOX 179, LIWONDE</p>
                <p>EMAIL: liwondeclinic@yahoo.com</p>
                <p>CELL: 0888597087</p>
                <div className="text-center mt-4">
                  <p className="font-bold text-xl">
                    MRA SUMMARY AS AT{" "}
                    {new Date(
                      selectedYear,
                      selectedMonth - 1
                    ).toLocaleString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <div className="mt-2">
                    <select
                      className="mr-2 border-black-300 rounded-md bg-green-500 text-white"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {monthOptions.map((month) => (
                        <option key={month.value} value={month.value}>
                          {month.label}
                        </option>
                      ))}
                    </select>
                    <select
                      className="border-black-300 rounded-md bg-green-500 text-white"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      {yearOptions.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-right">
              Date: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Claim No</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Invoice No</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MedHealth.map((row, index) => (
                  <tr key={row.ID}>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.Date}
                        onChange={(e) =>
                          handleInputChange(e, index, "Date")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.FirstName}
                        onChange={(e) =>
                          handleInputChange(e, index, "FirstName")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.LastName}
                        onChange={(e) =>
                          handleInputChange(e, index, "LastName")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.ClaimNo.toString()}
                        onChange={(e) =>
                          handleInputChange(e, index, "ClaimNo")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.Amount.toString()}
                        onChange={(e) =>
                          handleInputChange(e, index, "Amount")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        value={row.InvoiceNo.toString()}
                        onChange={(e) =>
                          handleInputChange(e, index, "InvoiceNo")
                        }
                        className="w-full border px-2 py-1 rounded-md"
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                    <button
                          className="bg-green-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
          <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={addRow}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
              >
                Add Row
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
              >
                Save
              </button>
              <button
                onClick={exportToPDF}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
              >
                Export to PDF
              </button>
            

            
          </div>
          
        </div>
      </div>
      
    </>
  </FinanceSideBar>

  );
};


export default MedHealth;
