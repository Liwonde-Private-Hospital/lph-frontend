'use client';
import Footer from "@/componets/footer";
import Header from "@/componets/navbar";
import React, { useState, useEffect } from "react";
interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  PaymentMethod: string;
  Balance: number;
}

interface Doctor {
  id: number;
  name: string;
}

const financeApi = "http://lph-backend.onrender.com/finance";
const doctorsApi = "http://lph-backend.onrender.comdoctors";

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [selectedPatients, setSelectedPatients] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchData();
    fetchDoctors();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(financeApi);
      const responseData = await response.json();

      if (Array.isArray(responseData)) {
        const mappedData = responseData.map((item: any) => ({
          ID: item.id,
          FirstName: item.FirstName,
          LastName: item.LastName,
          Treatment: item.Treatment,
          PhoneNumber: item.PhoneNumber,
          PaymentMethod: item.PaymentMethod,
          Balance: item.balance,
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

  const fetchDoctors = async () => {
    try {
      const response = await fetch(doctorsApi);
      const doctorData = await response.json();

      if (Array.isArray(doctorData)) {
        setDoctors(doctorData);
        setAlert(null);
      } else {
        setAlert({ type: "error", message: "Invalid data received from the server." });
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      setAlert({ type: "error", message: "Failed to fetch doctors." });
    }
  };

  const handlePatientSelection = (patientId: number) => {
    setSelectedPatients(prevSelected =>
      prevSelected.includes(patientId)
        ? prevSelected.filter(id => id !== patientId)
        : [...prevSelected, patientId]
    );
  };

  const handleSendToDoctor = async () => {
    if (!selectedDoctor) {
      setAlert({ type: 'error', message: 'Please select a doctor.' });
      return;
    }

    try {
      const promises = selectedPatients.map(patientId =>
        fetch(`${financeApi}/${patientId}/send/${selectedDoctor}`, {
          method: 'PATCH',
        }).then(response => response.json())
      );

      const results = await Promise.all(promises);

      const successMessages = results.filter(result => result.message.includes('Patient sent')).map(result => result.message);
      const errorMessages = results.filter(result => result.message.includes('outstanding balance')).map(result => result.message);

      if (successMessages.length > 0) {
        setAlert({ type: 'success', message: successMessages.join(', ') });
      }

      if (errorMessages.length > 0) {
        setAlert({ type: 'error', message: errorMessages.join(', ') });
      }

      fetchData();
      setSelectedPatients([]);
    } catch (error) {
      console.error('Error sending patients to doctor:', error);
      setAlert({ type: 'error', message: 'Failed to send patients to doctor.' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <br />
        <h1 className="date text-4xl font-bold text-center">{formattedDate}</h1>
        <br />
        {alert && (
          <div className={`text-center text-${alert.type === 'error' ? 'red' : 'green'}-500`}>
            {alert.message}
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">Select</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">First Name</th>
                <th className="py-2 px-4">Last Name</th>
                <th className="py-2 px-4">Phone Number</th>
                <th className="py-2 px-4">Payment Method</th>
                <th className="py-2 px-4">Balance</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={8} className="text-center py-4 text-gray-600">Data is Loading...</td>
                </tr>
              ) : (
                data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPatients.includes(item.ID)}
                          onChange={() => handlePatientSelection(item.ID)}
                        />
                      </td>
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.PhoneNumber}</td>
                      <td className="py-2 px-4">{item.PaymentMethod}</td>
                      <td className="py-2 px-4">{item.Balance}</td>
                      <td className="py-2 px-4">
                        {item.Balance === 0 ? "Paid" : "Pending"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-600">No data available</td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center mt-4">
          <select
            className="bg-transparent focus:outline-none"
            onChange={(e) => setSelectedDoctor(parseInt(e.target.value))}
          >
            <option value="">Select Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
          <button
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSendToDoctor}
            disabled={selectedPatients.length === 0 || !selectedDoctor}
          >
            Send to Doctor
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Refresh Data
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewData;
