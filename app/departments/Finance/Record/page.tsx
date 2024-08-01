"use client";
import "./style.css";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import icon from "../../../images/icon.png";
import FinanceSideBar from "../page";
import { Button } from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const api = `${process.env.NEXT_PUBLIC_API_URL}/finance`;

interface FinanceItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

const paymentMethods = ["Cash", "Medical Scheme", "Insurance"];

const Finance = () => {
  const [finance, setFinance] = useState<FinanceItem[]>([]);
  const [dataModified, setDataModified] = useState<boolean>(false);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [idCounter, setIdCounter] = useState<number>(1);
  const [passwordPromptVisible, setPasswordPromptVisible] =
    useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>("");
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Formatting date for display
  const formattedDate = new Date().toLocaleDateString();

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
      PaymentMethod: paymentMethods[0],
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
   console.log("Password submit triggered with username:", adminUsername);

   if (!adminUsername || !adminPassword) {
     toast.error("Admin username and password are required.");
     return;
   }

   try {
     setIsSubmitting(true);
     console.log("Verifying admin credentials...");
     const isValidCredentials = await verifyAdminCredentials(
       adminUsername,
       adminPassword
     );

     console.log("Admin credentials valid:", isValidCredentials);
     if (!isValidCredentials) {
       toast.error("Invalid admin username or password. Deletion cancelled.");
       return;
     }

     if (deleteIndex !== null) {
       console.log("Deleting row at index:", deleteIndex);
       const rowToDelete = finance[deleteIndex];
       console.log("Row to delete:", rowToDelete);

       if (rowToDelete && rowToDelete.ID) {
         const deleteUrl = `${api}/${rowToDelete.ID}`;
         console.log("Delete URL:", deleteUrl);
         const deleteSuccess = await deleteData(deleteUrl);
         console.log("Delete success:", deleteSuccess);

         if (deleteSuccess) {
           setFinance((prevData) => [
             ...prevData.slice(0, deleteIndex),
             ...prevData.slice(deleteIndex + 1),
           ]);
           toast.success("Data deleted successfully.");
         } else {
           toast.error("Failed to delete data.");
         }
       } else {
         console.error("Invalid row or row ID.");
         toast.error("Failed to delete data.");
       }
     }
   } catch (error) {
     console.error(
       "Error verifying admin credentials or deleting data:",
       error
     );
     toast.error("An error occurred. Please try again later.");
   } finally {
     console.log("Resetting submission state...");
     setIsSubmitting(false);
     setPasswordPromptVisible(false);
     setAdminUsername("");
     setAdminPassword("");
     setDeleteIndex(null);
   }
 };


  const verifyAdminCredentials = async (
    adminUsername: string,
    password: string
  ): Promise<boolean> => {
    const verifypassDTO = { username: adminUsername, password: password };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/staff/password/verify`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(verifypassDTO),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify admin credentials");
      }

      const result = await response.json();
      console.log("Verify API result:", result);
      return result.isValid;
    } catch (error) {
      console.error("Error verifying admin credentials:", error);
      return false;
    }
  };

const deleteData = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text(); // Fetch the error text
      console.error(
        `Failed to delete data. Status: ${response.status}, Error: ${errorText}`
      );
      return false;
    }

    const result = await response.json();
    console.log("Delete API result:", result);

    if (result && typeof result.isValid === "boolean") {
      return result.isValid;
    } else {
      console.error("Unexpected response structure:", result);
      return false;
    }
  } catch (error) {
    console.error("Error connecting to server:", error);
    return false;
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
    if (
      finance.some(
        (item) =>
          !item.FirstName.trim() ||
          !item.LastName.trim() ||
          !item.Treatment.trim() ||
          isNaN(item.Amount) ||
          item.Amount <= 0
      )
    ) {
      toast.error("Enter all fields with valid values!");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Submitting data...");
      const success = await postData(`${api}/add`, finance);

      if (success) {
        setDataModified(false);
        toast.success("All data saved successfully");
      } else {
        toast.error("Failed to save data");
      }
    } catch (error) {
      console.error("Error handling submit:", error);
      toast.error("Failed to save data");
    } finally {
      setIsSubmitting(false);
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

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      return true;
    } catch (error) {
      console.error("Error connecting to server:", error);
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number,
    field: keyof FinanceItem
  ) => {
    const value = e.target.value;
    updateRow(index, { [field]: value });
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const value = e.target.value;
    updateRow(index, { PaymentMethod: value });
  };

  return (
    <FinanceSideBar>
      <ToastContainer />
      <div className="finance-pagemin-h-screen p-6">
        <header className="finance-header bg-green-800 text-white p-4 mb-6 flex items-center">
          <Image src={icon} alt="Icon" width={50} height={50} />
          <h1 className="text-3xl font-semibold ml-4">Finance Management</h1>
          <span className="ml-auto text-sm">{formattedDate}</span>
        </header>
        <table className="finance-table w-full border-collapse bg-white shadow-md">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Last Name</th>
              <th className="border p-2">Treatment</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Payment Method</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {finance.map((item, index) => (
              <tr key={item.ID}>
                <td className="border p-2">{item.ID}</td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={item.FirstName}
                    placeholder="Enter First Name"
                    onChange={(e) => handleInputChange(e, index, "FirstName")}
                    disabled={isSubmitting}
                    className="w-full border p-2"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    placeholder="Enter Last Name"
                    value={item.LastName}
                    onChange={(e) => handleInputChange(e, index, "LastName")}
                    disabled={isSubmitting}
                    className="w-full border p-2"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    placeholder="Enter Treatment"
                    value={item.Treatment}
                    onChange={(e) => handleInputChange(e, index, "Treatment")}
                    disabled={isSubmitting}
                    className="w-full border p-2"
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    value={item.Amount}
                    onChange={(e) => handleInputChange(e, index, "Amount")}
                    disabled={isSubmitting}
                    className="w-full border p-2"
                  />
                </td>
                <td className="border p-2">
                  <select
                    value={item.PaymentMethod}
                    onChange={(e) => handleSelectChange(e, index)}
                    disabled={isSubmitting}
                    className="w-full border p-2"
                    aria-label="Payment Method"
                  >
                    {paymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border p-2">
                  <Button
                    className="px-6 py-3  bg-red-400 hover:bg-red-700 text-white font-bold rounded"
                    onClick={() => deleteRow(index)}
                    disabled={isSubmitting}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="finance-actions mt-4 flex justify-between">
          <Button
            className="px-6 py-3  bg-green-500 hover:bg-green-400 text-white font-bold rounded"
            onClick={addRow}
            disabled={isSubmitting}
          >
            Add Row
          </Button>
          <Button
            className="px-6 py-3  bg-green-500 hover:bg-green-400 text-white font-bold rounded"
            onClick={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
          <span>Total Amount: ${totalAmount.toFixed(2)}</span>
        </div>
        {passwordPromptVisible && (
          <div className="password-prompt fixed inset-0 bg-green-800 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md">
              <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
              <label className="block mb-2">
                Username:
                <input
                  type="text"
                  value={adminUsername}
                  onChange={(e) => setAdminUsername(e.target.value)}
                  className="block w-full border p-2 mt-1"
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="block w-full border p-2 mt-1"
                />
              </label>
              <div className="flex gap-4 mt-4">
                <Button
                  className="px-6 py-3  bg-green-500 hover:bg-green-400 text-white font-bold rounded"
                  onClick={handlePasswordSubmit}
                  isLoading={isSubmitting}
                >
                  Confirm
                </Button>
                <Button
                  className="px-6 py-3  bg-red-400 hover:bg-red-700 text-white font-bold rounded"
                  onClick={() => setPasswordPromptVisible(false)}
                  isDisabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </FinanceSideBar>
  );
};

export default Finance;
