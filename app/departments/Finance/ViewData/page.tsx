"use client"
import React, { useState, useEffect } from "react";
import FinanceSideBar from "../page";


interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

interface OPDDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;
}



const api = `${process.env.NEXT_PUBLIC_API_URL}/finance/day`;

const  opdapi=`${process.env.NEXT_PUBLIC_API_URL}/opd/day`;

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchData();
    refreshOPDData();
  }, []);


  const mapToOPDDataItem = (item: any): OPDDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });



  const refreshOPDData = async () => {
    setLoading(true);
    try {
      const response = await fetch(opdapi);
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
  


  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(api);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      if (Array.isArray(responseData)) {
        const uniqueData = removeDuplicates(responseData, 'ID');
        const mappedData = uniqueData.map(mapToDataItem);
        setData(mappedData);
        setError(null);
      } else {
        setError("Invalid data received from the server.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Oops! Today's data is not available.");
    } finally {
      setLoading(false);
    }
  };

  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
  };

  const mapToDataItem = (item: any): DataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    PaymentMethod: item.PaymentMethod,
  });

  const handleViewData = async () => {
    fetchData();
  };

  return (
    <FinanceSideBar>
      <div className="flex flex-col min-h-screen">
        {/* OPD Data Section */}
        <h1 className="date text-2xl font-bold text-center">
          1.OPD Data {formattedDate}
        </h1>
        <br />
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="overflow-x-auto">
          <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
            <thead className="bg-green-800 text-white">
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
                  <td colSpan={6} className="text-center py-4 text-green-600">
                    Loading...
                  </td>
                </tr>
              ) : opdData.length > 0 ? (
                opdData.map((item) => (
                  <tr key={item.ID} className="text-green-800">
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
                  <td colSpan={6} className="text-center py-4 text-green-600">
                    No data available
                  </td>
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
          <br />
          <br />
          <br />
          {/* <Header /> */}
          <div className="flex-grow">
            <br />
            <h1 className="date text-2xl font-bold text-center">
              2.Finance Data {formattedDate}
            </h1>
            <br />
            {error && <div className="text-center text-red-500">{error}</div>}
            <div className="overflow-x-auto">
              <table className="w-full md:w-3/4 lg:w-2/3 mx-auto bg-white rounded-md shadow-md overflow-hidden">
                <thead className="bg-green-800 text-white">
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
                      <td
                        colSpan={6}
                        className="text-center py-4 text-green-600"
                      >
                        Loading...
                      </td>
                    </tr>
                  ) : data.length > 0 ? (
                    data.map((item) => (
                      <tr key={item.ID} className="text-green-800">
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
                      <td
                        colSpan={6}
                        className="text-center py-4 text-green-600"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="text-center mt-4">
              <button
                className="button bg-green-500 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded"
                onClick={handleViewData}
                disabled={loading}
              >
                Refresh Data
              </button>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </FinanceSideBar>
  );
};

export default ViewData;
