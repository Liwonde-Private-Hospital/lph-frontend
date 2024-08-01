'use client'
import React, { useState, useEffect } from "react";
import XRaySideBar from "./X-Ray";

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  paymentMethod: string;
  date: string;
  department?: string;
  notes?: string;
  xrayImage?: File;
}

const apiXrayPatients = `${process.env.NEXT_PUBLIC_API_URL}/xray/patients`;
const apiTransferPatient = `${process.env.NEXT_PUBLIC_API_URL}/transfer`;
const apiUploadXrayImage = `${process.env.NEXT_PUBLIC_API_URL}/xray/upload`;
const apiSaveNotes = `${process.env.NEXT_PUBLIC_API_URL}/xray/notes`;
const apiChat = `${process.env.NEXT_PUBLIC_API_URL}/chat`;

const XrayDepartment = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [notes, setNotes] = useState<string>("");
  const [chatDrawerOpen, setChatDrawerOpen] = useState<boolean>(false);
  const [chatInput, setChatInput] = useState<string>("");
  const [chatResponse, setChatResponse] = useState<string>("");

  useEffect(() => {
    fetchXrayPatients();
  }, []);

  const fetchXrayPatients = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiXrayPatients);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setPatients(responseData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching X-ray patients data:", error);
      setAlert({ type: "error", message: "Oops! X-ray patients data is not available." });
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (patientId: number, destination: string) => {
    try {
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
      setPatients(patients.filter((patient) => patient.id !== patientId));
      setAlert({ type: "success", message: `Patient transferred to ${destination}.` });
    } catch (error) {
      console.error("Error transferring patient:", error);
      setAlert({ type: "error", message: "Failed to transfer patient." });
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>, patient: Patient) => {
    setPatients(patients.map(p => p.id === patient.id ? { ...p, notes: event.target.value } : p));
  };

  const handleSaveNotes = async (patient: Patient) => {
    try {
      const response = await fetch(apiSaveNotes, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ patientId: patient.id, notes: patient.notes }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({ type: "success", message: "Notes saved successfully." });
    } catch (error) {
      console.error("Error saving notes:", error);
      setAlert({ type: "error", message: "Failed to save notes." });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, patientId: number) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("xrayImage", file);
      formData.append("patientId", patientId.toString());

      try {
        const response = await fetch(apiUploadXrayImage, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setAlert({ type: "success", message: "X-ray image uploaded successfully." });
      } catch (error) {
        console.error("Error uploading X-ray image:", error);
        setAlert({ type: "error", message: "Failed to upload X-ray image." });
      }
    }
  };

  const toggleChatDrawer = () => {
    setChatDrawerOpen(!chatDrawerOpen);
  };

  const handleChatInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChatInput(event.target.value);
  };

  const handleChatSubmit = async () => {
    try {
      const response = await fetch(apiChat, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: chatInput }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setChatResponse(responseData.answer);
    } catch (error) {
      console.error("Error with chat AI:", error);
      setAlert({ type: "error", message: "Chat AI request failed." });
    }
  };

  const handleVideoAnalysis = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("video", file);

      try {
        const response = await fetch(apiChat, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setChatResponse(responseData.answer);
      } catch (error) {
        console.error("Error with video analysis:", error);
        setAlert({ type: "error", message: "Video analysis request failed." });
      }
    }
  };

  const handleVoiceAnalysis = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("voice", file);

      try {
        const response = await fetch(apiChat, {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        setChatResponse(responseData.answer);
      } catch (error) {
        console.error("Error with voice analysis:", error);
        setAlert({ type: "error", message: "Voice analysis request failed." });
      }
    }
  };

  return (<XRaySideBar>
    <div className=" flex-col min-h-screen">
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">X-ray Department</h1>
      </header>

      <main className="flex-grow mx-auto p-6">
        {alert && (
          <div className={`text-center text-white p-3 mb-4 ${alert.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {alert.message}
          </div>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Patients Ready for X-ray</h2>
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
                  <th className="py-2 px-4">Notes</th>
                  <th className="py-2 px-4">X-ray Image</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading" className="text-center">
                    <td colSpan={9} className="py-4">Loading...</td>
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
                        <textarea
                          className="w-full p-2 border rounded"
                          value={patient.notes || ""}
                          onChange={(e) => handleNoteChange(e, patient)}
                        />
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mt-2"
                          onClick={() => handleSaveNotes(patient)}
                        >
                          Save Notes
                        </button>
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, patient.id)}
                        />
                      </td>
                      <td className="py-2 px-4">
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                            onClick={() => handleTransfer(patient.id, "Pharmacy")}
                          >
                            Send to Pharmacy
                          </button>
                          <button
                            className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded"
                            onClick={() => handleTransfer(patient.id, "Reception")}
                          >
                            Schedule New Appointment
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="text-center py-4">No patients ready for X-ray</td>
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

      <div
        className={`fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full cursor-pointer ${
          chatDrawerOpen ? "hidden" : ""
        }`}
        onClick={toggleChatDrawer}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 10h2m4 0h6m4 0h2m-2 4h2m-4 0h-2m-4 0H9m-6 0H3m0-4h2m4 0h6m4 0h2m-2 4h2m-4 0h-2m-4 0H9m-6 0H3"
          />
        </svg>
      </div>

      {chatDrawerOpen && (
        <div className="fixed bottom-0 right-0 bg-white p-4 border-l border-t border-gray-300 shadow-md w-full md:w-1/2 h-1/2 flex flex-col">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">Chat AI</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={toggleChatDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-grow">
            <input
              type="text"
              className="w-full p-2 border rounded mb-2"
              placeholder="Type your request..."
              value={chatInput}
              onChange={handleChatInput}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded mb-4"
              onClick={handleChatSubmit}
            >
              Submit
            </button>
            <div className="mb-4">{chatResponse}</div>
            <input
              type="file"
              accept="image/*"
              onChange={handleVideoAnalysis}
              className="mb-2"
            />
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoAnalysis}
              className="mb-2"
            />
            <input
              type="file"
              accept="audio/*"
              onChange={handleVoiceAnalysis}
              className="mb-2"
            />
          </div>
        </div>
      )}
    </div></XRaySideBar>
  );
};

export default XrayDepartment;
