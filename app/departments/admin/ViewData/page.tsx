'use client'

import React, { useState, useEffect } from "react";
import SideBar from "../adminLayout";





interface ReceptionDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  PaymentMethod: string;
  Returned: string;
}




interface LabDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PaymentMethod: string;
  TestOrdered: string;
}





interface PharmacyDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  DrugName: string;
  DrugType: string;
  Amount: string;
  MedicalScheme: string;
}




interface DentalDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Address: string;
  Diagnosis: string;
  Amount: number;
  MedicalScheme: string;
  Treatment: string;
}




interface XrayDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: string;
  MedicalScheme: string;
}



interface OPDDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;
}




interface FinanceDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

const apiEndpoints = {
  reception: `${process.env.NEXT_PUBLIC_API_URL}/reception/day`,
  pharmacy: `${process.env.NEXT_PUBLIC_API_URL}/pharmacy-sales/day`,
  opd: `${process.env.NEXT_PUBLIC_API_URL}/opd/day`,
  finance: `${process.env.NEXT_PUBLIC_API_URL}/finance/day`,
  dental: `${process.env.NEXT_PUBLIC_API_URL}/dental/day`,
  xray: `${process.env.NEXT_PUBLIC_API_URL}/x-ray/day`,
  lab: `${process.env.NEXT_PUBLIC_API_URL}/laboratory/day`,
};





const ViewData = () => {
  const [receptionData, setReceptionData] = useState<ReceptionDataItem[]>([]);
  const [pharmacyData, setPharmacyData] = useState<PharmacyDataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [dentalData, setDentalData] = useState<DentalDataItem[]>([]);
  const [labData, setLabData] = useState<LabDataItem[]>([]);
  const [financeData, setFinanceData] = useState<FinanceDataItem[]>([]);
  const [xrayData, setXrayData] = useState<XrayDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);




  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;





  useEffect(() => {
    refreshReceptionData();
    refreshOPDData();
    refreshPharmacyData();
    refreshFinanceData();
    refreshLabData();
    refreshDentalData();
    refreshXrayData();
  }, []);







  const refreshPharmacyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.pharmacy);
      if (!response.ok) {
        throw new Error('Failed to fetch pharmacy data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setPharmacyData(uniqueData.map(mapToPharmacyDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the pharmacy server.");
      }
    } catch (error) {
      console.error("Error fetching pharmacy data:", error);
      setError("Oops! Pharmacy data is not available.");
    } finally {
      setLoading(false);
    }
  };





  const refreshXrayData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.xray);
      if (!response.ok) {
        throw new Error('Failed to fetch xray data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setXrayData(uniqueData.map(mapToXrayDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the xray server.");
      }
    } catch (error) {
      console.error("Error fetching xray data:", error);
      setError("Oops! Xray data is not available.");
    } finally {
      setLoading(false);
    }
  };




  const refreshDentalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.dental);
      if (!response.ok) {
        throw new Error('Failed to fetch dental data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setDentalData(data.map(mapToDentalDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the dental server.");
      }
    } catch (error) {
      console.error("Error fetching dental data:", error);
      setError("Oops! Dental data is not available.");
    } finally {
      setLoading(false);
    }
  };





  const refreshLabData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.lab);
      if (!response.ok) {
        throw new Error('Failed to fetch lab data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setLabData(uniqueData.map(mapToLabDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the lab server.");
      }
    } catch (error) {
      console.error("Error fetching lab data:", error);
      setError("Oops! Lab data is not available.");
    } finally {
      setLoading(false);
    }
  };







  const refreshReceptionData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.reception);
      if (!response.ok) {
        throw new Error('Failed to fetch reception data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setReceptionData(uniqueData.map(mapToReceptionDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the reception server.");
      }
    } catch (error) {
      console.error("Error fetching reception data:", error);
      setError("Oops! Reception data is not available.");
    } finally {
      setLoading(false);
    }
  };







  const refreshOPDData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.opd);
      if (!response.ok) {
        throw new Error('Failed to fetch OPD data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setOPDData(data.map(mapToOPDDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the OPD server.");
      }
    } catch (error) {
      console.error("Error fetching OPD data:", error);
      setError("Oops! OPD data is not available.");
    } finally {
      setLoading(false);
    }
  };






  const refreshFinanceData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.finance);
      if (!response.ok) {
        throw new Error('Failed to fetch finance data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setFinanceData(data.map(mapToFinanceDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the finance server.");
      }
    } catch (error) {
      console.error("Error fetching finance data:", error);
      setError("Oops! Finance data is not available.");
    } finally {
      setLoading(false);
    }
  };






  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
  };






  const mapToReceptionDataItem = (item: any): ReceptionDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    PhoneNumber: item.PhoneNumber,
    PaymentMethod: item.PaymentMethod,
    Returned: item.Returned
  });






  const mapToOPDDataItem = (item: any): OPDDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });





  const mapToFinanceDataItem = (item: any): FinanceDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    PaymentMethod: item.PaymentMethod,
  });






  const mapToDentalDataItem = (item: any): DentalDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    PhoneNumber: item.PhoneNumber,
    Address: item.Address,
    Diagnosis: item.Diagnosis,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
    Treatment: item.Treatment,
  });





  const mapToLabDataItem = (item: any): LabDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    PaymentMethod: item.PaymentMethod,
    TestOrdered: item.TestOrdered
  });





  const mapToPharmacyDataItem = (item: any): PharmacyDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    DrugName: item.DrugName,
    DrugType: item.DrugType,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });





  const mapToXrayDataItem = (item: any): XrayDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });






  return (
    <SideBar>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          {/* Reception Data Section */}
          <h1 className="date text-2xl font-bold text-center">
            1. Reception Data {formattedDate}
          </h1>
          <br />
          {error && <div className="text-center text-red-500">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">FirstName</th>
                  <th className="py-2 px-4">LastName</th>
                  <th className="py-2 px-4">PhoneNumber</th>
                  <th className="py-2 px-4">PaymentMethod</th>
                  <th className="py-2 px-4">Returned</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : receptionData.length > 0 ? (
                  receptionData.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.PhoneNumber}</td>
                      <td className="py-2 px-4">{item.PaymentMethod}</td>
                      <td className="py-2 px-4">{item.Returned}</td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* OPD Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            2. OPD Data {formattedDate}
          </h1>
          <br />
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
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : opdData.length > 0 ? (
                  opdData.map((item) => (
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
                  <tr key="no-data">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pharmacy Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            3. Pharmacy Data {formattedDate}
          </h1>
          <br />
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
                    <td colSpan={7} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : pharmacyData.length > 0 ? (
                  pharmacyData.map((item) => (
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
                  <tr key="no-data">
                    <td colSpan={7} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Finance Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            4. Finance Data {formattedDate}
          </h1>
          <br />
          <div className="overflow-x-auto">
            <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">FirstName</th>
                  <th className="py-2 px-4">LastName</th>
                  <th className="py-2 px-4">Treatment</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">PaymentMethod</th>
                  <th className="py-2 px-4">Paid</th>

                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : financeData.length > 0 ? (
                  financeData.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.Treatment}</td>
                      <td className="py-2 px-4">{item.Amount}</td>
                      <td className="py-2 px-4">{item.PaymentMethod}</td>
                      <td className="py-2 px-4">paid🟢</td>

                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Dental Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            5. Dental Data {formattedDate}
          </h1>
          <br />
          <div className="overflow-x-auto">
            <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">FirstName</th>
                  <th className="py-2 px-4">LastName</th>
                  <th className="py-2 px-4">PhoneNumber</th>
                  <th className="py-2 px-4">Address</th>
                  <th className="py-2 px-4">Diagnosis</th>
                  <th className="py-2 px-4">Amount</th>
                  <th className="py-2 px-4">MedicalScheme</th>
                  <th className="py-2 px-4">Treatment</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading">
                    <td colSpan={9} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : dentalData.length > 0 ? (
                  dentalData.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.PhoneNumber}</td>
                      <td className="py-2 px-4">{item.Address}</td>
                      <td className="py-2 px-4">{item.Diagnosis}</td>
                      <td className="py-2 px-4">{item.Amount}</td>
                      <td className="py-2 px-4">{item.MedicalScheme}</td>
                      <td className="py-2 px-4">{item.Treatment}</td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan={9} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Lab Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            6. Lab Data {formattedDate}
          </h1>
          <br />
          <div className="overflow-x-auto">
            <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">ID</th>
                  <th className="py-2 px-4">FirstName</th>
                  <th className="py-2 px-4">LastName</th>
                  <th className="py-2 px-4">PaymentMethod</th>
                  <th className="py-2 px-4">TestOrdered</th>
                </tr>
              </thead>
              <tbody className="bg-gray-100">
                {loading ? (
                  <tr key="loading">
                    <td colSpan={5} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : labData.length > 0 ? (
                  labData.map((item) => (
                    <tr key={item.ID} className="text-gray-800">
                      <td className="py-2 px-4">{item.ID}</td>
                      <td className="py-2 px-4">{item.FirstName}</td>
                      <td className="py-2 px-4">{item.LastName}</td>
                      <td className="py-2 px-4">{item.PaymentMethod}</td>
                      <td className="py-2 px-4">{item.TestOrdered}</td>
                    </tr>
                  ))
                ) : (
                  <tr key="no-data">
                    <td colSpan={5} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* X-ray Data Section */}
          <h1 className="date text-2xl font-bold text-center mt-8">
            7. X-ray Data {formattedDate}
          </h1>
          <br />
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
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      Loading...
                    </td>
                  </tr>
                ) : xrayData.length > 0 ? (
                  xrayData.map((item) => (
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
                  <tr key="no-data">
                    <td colSpan={6} className="text-center py-4 text-gray-600">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default ViewData;
