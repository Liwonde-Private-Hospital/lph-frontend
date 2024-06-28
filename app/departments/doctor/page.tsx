'use client';
import Footer from "@/componets/footer";
import Header from "@/componets/navbar";
import React, { useState, useEffect } from "react";

interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Temperature: number;
  Weight: number;
  BloodPressure: number;
}

interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  appointmentTime: string;
  department?: string; // New field to track department assignment
}

const apiVitals = "http://localhost:3000/vitals/selected";
const apiPatients = "http://localhost:3000/patients/assigned"; // Update with your actual API endpoints

const DoctorView = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    fetchData();
    fetchPatients();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiVitals);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setData(responseData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching vitals data:", error);
      setAlert({ type: "error", message: "Oops! Vitals data is not available." });
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await fetch(apiPatients);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setPatients(responseData);
      setAlert(null);
    } catch (error) {
      console.error("Error fetching patients data:", error);
      setAlert({ type: "error", message: "Oops! Patients data is not available." });
    }
  };

  const sendToDepartment = async (patientId: number, department: string) => {
    try {
      // Simulate sending patient to department by updating the patient's department field
      const updatedPatients = patients.map((patient) => {
        if (patient.id === patientId) {
          return { ...patient, department };
        }
        return patient;
      });
      setPatients(updatedPatients);
      // Here you would typically send a request to update backend with patient's department assignment
    } catch (error) {
      console.error("Error sending patient to department:", error);
      // Handle error scenario
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow mx-auto p-6">
        <h1 className="text-4xl font-bold text-center my-8">Doctor's Dashboard</h1>
        {alert && (
          <div className={`text-center text-white p-3 mb-4 ${alert.type === "error" ? "bg-red-500" : "bg-green-500"}`}>
            {alert.message}
          </div>
        )}

        {/* Patients Assigned Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Patients Assigned</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Appointment Time</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading" className="text-center">
                    <td colSpan={6} className="py-4">Loading...</td>
                  </tr>
                ) : patients.length > 0 ? (
                  patients.map((patient) => (
                    <tr key={patient.id} className="text-gray-800">
                      <td className="py-2 px-4">{patient.id}</td>
                      <td className="py-2 px-4">{patient.firstName}</td>
                      <td className="py-2 px-4">{patient.lastName}</td>
                      <td className="py-2 px-4">{patient.appointmentTime}</td>
                      <td className="py-2 px-4">{patient.department || "Not assigned"}</td>
                      <td className="py-2 px-4">
                        {!patient.department && (
                          <>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                              onClick={() => sendToDepartment(patient.id, "X-ray")}
                            >
                              Send to X-ray
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded mr-2"
                              onClick={() => sendToDepartment(patient.id, "Pharmacy")}
                            >
                              Send to Pharmacy
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                              onClick={() => sendToDepartment(patient.id, "Dental")}
                            >
                              Send to Dental
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">No patients assigned</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Vitals Data Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Vitals Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-green-500 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">First Name</th>
                  <th className="py-2 px-4">Last Name</th>
                  <th className="py-2 px-4">Temperature</th>
                  <th className="py-2 px-4">Weight</th>
                  <th className="py-2 px-4">Blood Pressure</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading" className="text-center">
                    <td colSpan={6} className="py-4">Loading...</td>
                  </tr>
                ) : data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.Temperature}</td>
                      <td className="py-2 px-4">{item.Weight}</td>
                      <td className="py-2 px-4">{item.BloodPressure}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4">No vitals data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DoctorView;
