'use client'
import React, { useState, useEffect } from "react";
import Header from "@/componets/navbar";
import Footer from "@/componets/footer";

import { AiOutlineMessage } from "react-icons/ai";
import ChatDrawer from "../../ChatDrawer";

interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  DrugName: string;
  DrugType: string
  Amount: number;
  MedicalScheme: string;

}

const api = "http://localhost:3000/finance";
interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  paymentMethod: string;
  date: string;
  department?: string;
  notes?: string;
}

const apiPharmacyPatients = "http://localhost:3000/pharmacy/patients"; // Endpoint for Pharmacy department patients
const apiTransferPatient = "http://localhost:3000/transfer"; // Endpoint to transfer patient to another department or schedule appointment
const apiAddNotes = "http://localhost:3000/patients/add-notes"; // Endpoint to add notes for a patient

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [notesInput, setNotesInput] = useState<string>("");

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchPharmacyPatients();
  }, []);

  const fetchPharmacyPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiPharmacyPatients);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setPatients(responseData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching Pharmacy patients data:", error);
      setAlert({ type: "error", message: "Oops! Pharmacy patients data is not available." });
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (patientId: number, destination: string) => {
    try {
      // Simulate transferring patient to the destination
      const response = await fetch(apiTransferPatient, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId, destination }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Remove patient from the current list
      setPatients(patients.filter(patient => patient.id !== patientId));
      setAlert({ type: "success", message: `Patient transferred to ${destination}.` });
    } catch (error) {
      console.error("Error transferring patient:", error);
      setAlert({ type: "error", message: "Failed to transfer patient." });
    }
  };

  const openChatDrawer = (patient: Patient) => {
    setSelectedPatient(patient);
    setDrawerOpen(true);
  };

  const closeChatDrawer = () => {
    setSelectedPatient(null);
    setDrawerOpen(false);
  };

  const handleAddNotes = async () => {
    if (!selectedPatient || !notesInput.trim()) return;
    try {
      const response = await fetch(apiAddNotes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId: selectedPatient.id, notes: notesInput }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const updatedPatients = patients.map(patient =>
        patient.id === selectedPatient.id ? { ...patient, notes: notesInput } : patient
      );
      setPatients(updatedPatients);
      setAlert({ type: "success", message: "Notes added successfully." });
      setNotesInput("");
    } catch (error) {
      console.error("Error adding notes:", error);
      setAlert({ type: "error", message: "Failed to add notes." });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(api);
      const responseData = await response.json();

      // Check if response data is an array
      if (Array.isArray(responseData)) {
        const filteredData = responseData.filter((item: any) => item.test_ordered === 'use client');
        const mappedData = filteredData.map((item: any) => ({
          ID: item.iD,
          FirstName: item.FirstName,
          LastName: item.LastName,
          DrugName: item.DrugName,
          DrugType: item.DrugType,
          Amount: item.Amount,
          MedicalScheme: item.MedicalScheme,

        }));

        setData(mappedData);
        setAlert(null);
      } else {
        setAlert({ type: "error", message: "Invalid data received from the server." });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Oops! Today's data is not available." });
    } finally {
      setLoading(false);
    }
  };

  const handleViewData = async () => {
    fetchData();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Pharmacy</h1>
      </header>

      <main className="flex-grow mx-auto p-6">
        {alert && (
          <div className={`text-center text-white p-3 mb-4 ${alert.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {alert.message}
          </div>
        )}
 <div className="flex-grow">
        <br />
        <h1 className="date text-4xl font-bold text-center">{formattedDate}</h1>
        <br />
        {alert && (
          <div className="text-center text-red-500">{alert.message}</div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">FirstName</th>
                <th className="py-2 px-4">LastName</th>
                <th className="py-2 px-4">DrugName</th>
                <th className="py-2 px-4">DrugType</th>
                <th className="py-2 px-4">Amount</th>
                <th className="py-2 px-4">MedicalScheme</th>

              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={5} className="text-center py-4 text-gray-600">Data is Loading...</td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.DrugName}</td>
                      <td className="py-2 px-4">{item.DrugType}</td>
                      <td className="py-2 px-4">{item.Amount}</td>
                      <td className="py-2 px-4">{item.MedicalScheme}</td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-600">No data available</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleViewData}
          >
            View Data
          </button>
        </div>
      </div>
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Patients Ready for Pharmacy</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">Appointment Time</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading" className="text-center">
                    <td colSpan={7} className="py-4">Loading...</td>
                  </tr>
                ) : patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.id} className="text-gray-800">
                      <td className="py-2 px-4">{patient.id}</td>
                      <td className="py-2 px-4">{patient.firstName}</td>
                      <td className="py-2 px-4">{patient.lastName}</td>
                      <td className="py-2 px-4">{patient.phoneNumber}</td>
                      <td className="py-2 px-4">{patient.paymentMethod}</td>
                      <td className="py-2 px-4">{new Date(patient.date).toLocaleString()}</td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                            onClick={() => handleTransfer(patient.id, "X-ray")}
                          >
                            Send to X-ray
                          </button>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                            onClick={() => openChatDrawer(patient)}
                          >
                            Open Chat AI
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-4">No patients ready for Pharmacy</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Your Hospital Name. All Rights Reserved.</p>
      </footer>

      {/* Chat AI Drawer */}
      {drawerOpen && selectedPatient && (
        <ChatDrawer
          patient={selectedPatient}
          onClose={closeChatDrawer}
          onAddNotes={handleAddNotes}
          notesInput={notesInput}
          setNotesInput={setNotesInput}
        />
      )}

      {/* Floating Chat AI Button */}
      <div className="fixed bottom-6 right-6">
        <button
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
          onClick={() => setDrawerOpen(true)}
        >
          <AiOutlineMessage className="text-3xl" />
        </button>
      </div>
     
    </div>
  );
};

export default ViewData;
