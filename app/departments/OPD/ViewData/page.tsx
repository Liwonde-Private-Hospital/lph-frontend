'use client'
import React, { useState, useEffect } from "react";
import Header from "@/componets/navbar";
import Footer from "@/componets/footer";


interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;

}

interface VitalsDataItem {
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
  phoneNumber: string;
  paymentMethod: string;
  date: string;
  department?: string; // New field to track department assignment
}

const apiVitals = "http://lph-backend.onrender.com/vitals";
const apiPatients = "http://lph-backend.onrender.comr/reception/patients"; // Update with your actual API endpoints


const api = "http://lph-backend.onrender.com/finance";

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;
  const [Vitalsdata, setVitalsData] = useState<VitalsDataItem[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    fetchVitalData();
    fetchPatients();
  }, []);
  const fetchVitalData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiVitals);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json();
      setVitalsData(responseData);
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
      // Map the received data to match the Patient interface
      const formattedPatients = responseData.map((patient: any) => ({
        id: patient.ID,
        firstName: patient.FirstName,
        lastName: patient.LastName,
        phoneNumber: patient.PhoneNumber,
        paymentMethod: patient.PaymentMethod,
        date: patient.Date,
        department: patient.department // If department info is available
      }));
      setPatients(formattedPatients);
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
          Treatment: item.Treatment,
          Amount: item.Amount,
          MedicalScheme: item.medicalScheme,

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
      {/* Header component */}
      <header className="bg-green-500 text-white p-4">
        <h1 className="text-2xl font-bold text-center">Doctors Dashboard</h1>
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
                  <th className="py-2 px-4">Treatment</th>
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
                        <td className="py-2 px-4">{item.Treatment}</td>
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
                  <th className="py-2 px-4">Phone Number</th>
                  <th className="py-2 px-4">Payment Method</th>
                  <th className="py-2 px-4">Appointment Time</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading" className="text-center">
                    <td colSpan={8} className="py-4">Loading...</td>
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
                      <td className="py-2 px-4">{patient.department || "Not assigned"}</td>
                      <td className="py-2 px-4">
                        {!patient.department && (
                          <div className="flex space-x-2">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                              onClick={() => sendToDepartment(patient.id, "X-ray")}
                            >
                              Send to X-ray
                            </button>
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
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
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">No patients assigned</td>
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
                ) : Vitalsdata.length > 0 ? (
                  Vitalsdata.map((item) => (
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

        <Footer />
      </main>

      {/* Footer component */}
      <footer className="bg-gray-800 text-white p-4">
        <p className="text-center">&copy; {new Date().getFullYear()} Liwonde Private Hosipital. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default ViewData;
