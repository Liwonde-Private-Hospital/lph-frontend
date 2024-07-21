'use client'

import React, { useState, useEffect } from "react";

interface ReceptionDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  PaymentMethod: string;
  Returned:string
}

interface OPDDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;
}
interface vitalsDataItem{
  ID:number;
  FirstName:string;
  LastName:string;
  Temperature:string;
  Height:number;
  Weight:number;
  BloodPressure:number;
  BMI:string;

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
  reception: "http://localhost:3000/reception/day",
  opd: "http://localhost:3000/opd/day",
  vitals:"http://localhost:3000/vitals/day",
  finance: "http://localhost:3000/finance/day",
};

const ViewData = () => {
  const [receptionData, setReceptionData] = useState<ReceptionDataItem[]>([]);
  const [VitalsData, setVitalsData] = useState<vitalsDataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [financeData, setFinanceData] = useState<FinanceDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    refreshReceptionData();
    refreshOPDData();
    refreshFinanceData();
    refreshVitalsData();
  }, []);

  const refreshVitalsData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.vitals);
      if (!response.ok) {
        throw new Error('Failed to fetch vitals data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setVitalsData(uniqueData.map(mapToVitalsDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the vitals server.");
      }
    } catch (error) {
      console.error("Error fetching vitals data:", error);
      setError("Oops! vitals data is not available.");
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
    Returned:item.Returned
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

  const mapToVitalsDataItem = (item: any): vitalsDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Temperature: item.Temperature,
    Height: item.Height,
    Weight: item.weight,
    BloodPressure:item.BloodPressure,
    BMI:item.BMI,
  });


  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <br />
        <h1 className="date text-2xl font-bold text-center">1.Reception Data {formattedDate}</h1>
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
                  <td colSpan={5} className="text-center py-4 text-gray-600">Loading...</td>
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
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-600">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={refreshReceptionData}
            disabled={loading}
          >
            Refresh Reception Data
          </button>
          <hr />
          <br /><br /><br />
        </div>
        <h1 className="date text-2xl font-bold text-center">2. Vitals Data {formattedDate}</h1>
        <br />
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">FirstName</th>
                <th className="py-2 px-4">LastName</th>
                <th className="py-2 px-4">Temperature</th>
                <th className="py-2 px-4">Height</th>
                <th className="py-2 px-4">Weight</th>
                <th className="py-2 px-4">BloodPressure</th>
                <th className="py-2 px-4">BMI</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={5} className="text-center py-4 text-gray-600">Loading...</td>
                </tr>
              ) : VitalsData.length > 0 ? (
                VitalsData.map((item) => (
                  <tr key={item.ID} className="text-gray-800">
                    <td className="py-2 px-4">{item.ID}</td>
                    <td className="py-2 px-4">{item.FirstName}</td>
                    <td className="py-2 px-4">{item.LastName}</td>
                    <td className="py-2 px-4">{item.Temperature}</td>
                    <td className="py-2 px-4">{item.Height}</td>
                    <td className="py-2 px-4">{item.Weight}</td>
                    <td className="py-2 px-4">{item.BloodPressure}</td>
                    <td className="py-2 px-4">{item.BMI}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-600">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={refreshVitalsData}
            disabled={loading}
          >
            Refresh Vitals Data
          </button>
          <hr />
          <br /><br /><br />
       
        {/* Finance Data Section */}
        <h1 className="date text-2xl font-bold text-center">3.Finance Data {formattedDate}</h1>
        <br />
        {error && <div className="text-center text-red-500">{error}</div>}
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
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
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
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={refreshFinanceData}
            disabled={loading}
          >
            Refresh Finance Data
          </button>
          <hr />
          <br /><br /><br />
           {/* OPD Data Section */}
        <h1 className="date text-2xl font-bold text-center">4. OPD Data {formattedDate}</h1>
        <br />
        {error && <div className="text-center text-red-500">{error}</div>}
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
                  <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
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
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-600">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-4">
          <button
            className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
            onClick={refreshOPDData}
            disabled={loading}
          >
            Refresh OPD Data
          </button>
          <hr />
          <br /><br /><br />
        </div>

        </div>
      </div>
      </div>
    </div>
  );
};

export default ViewData;
