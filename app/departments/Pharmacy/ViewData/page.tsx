'use client'

import React, { useState, useEffect } from "react";
import PharmacySideBar from "../page";

interface PhamarcyDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  DrugName: string;
  DrugType: string;
  Amount: string;
  MedicalScheme: string
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
  Status: "paid🟢"
}

const apiEndpoints = {
  Phamarcy: `${process.env.NEXT_PUBLIC_API_URL}/pharmacy-sales/day`,
  opd: `${process.env.NEXT_PUBLIC_API_URL}opd/day`,
  finance: `${process.env.NEXT_PUBLIC_API_URL}/finance/day`,
};

const ViewData = () => {
  const [PhamarcyData, setPhamarcyData] = useState<PhamarcyDataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [financeData, setFinanceData] = useState<FinanceDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    RefreshPhamarcyData();
    refreshOPDData();
    refreshFinanceData();
  }, []);

  const RefreshPhamarcyData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.Phamarcy);
      if (!response.ok) {
        throw new Error('Failed to fetch Phamarcy data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setPhamarcyData(uniqueData.map(mapToPhamarcyDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the phamarcy server.");
      }
    } catch (error) {
      console.error("Error fetching phamarcy data:", error);
      setError("Oops! phamarcy data is not available.");
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

  const mapToPhamarcyDataItem = (item: any): PhamarcyDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    DrugName: item.DrugName,
    DrugType: item.DrugType,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
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
    Status: item.Status,
  });

  return (
    <PharmacySideBar>
      <div className="flex-col min-h-screen">
        <div className="flex-grow">
          <br />

        </div>
        {/* Finance Data Section */}
        <h1 className="date text-2xl font-bold text-center">Finance Data {formattedDate}</h1>
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
                    <td className="py-2 px-4">paid 🟢</td>
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
          <h1 className="date text-2xl font-bold text-center">2.OPD Data {formattedDate}</h1>
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


          <h1 className="date text-2xl font-bold text-center">3.Phamarcy Data {formattedDate}</h1>
          <br />
          {error && <div className="text-center text-red-500">{error}</div>}
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
                    <td colSpan={5} className="text-center py-4 text-gray-600">Loading...</td>
                  </tr>
                ) : PhamarcyData.length > 0 ? (
                  PhamarcyData.map((item) => (
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
                )}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button
              className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
              onClick={RefreshPhamarcyData}
              disabled={loading}
            >
              Refresh Phamarcy Data
            </button>
            <hr />
            <br /><br /><br />
          </div>
        </div>
      </div>
    </PharmacySideBar>
  );
};

export default ViewData;
