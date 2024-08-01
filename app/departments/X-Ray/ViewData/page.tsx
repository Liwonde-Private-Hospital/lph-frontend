"use client"
import React, { useState, useEffect } from "react";
import XRaySideBar from "../X-Ray";


interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

interface XrayDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
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




const api = `${process.env.NEXT_PUBLIC_API_URL}/finance/treatments/current-day?treatments=xray,scanning`
const opdapi = `${process.env.NEXT_PUBLIC_API_URL}/opd/treatments/current-day?treatments=xray,scanning`

const xrayapi = `${process.env.NEXT_PUBLIC_API_URL}/x-ray/day`;

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [XrayData, setXrayData] = useState<XrayDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchData();
    refreshXrayData();
    refreshOPDData();
  }, []);


  const mapToXrayDataItem = (item: any): XrayDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });



  const refreshXrayData = async () => {
    setLoading(true);
    try {
      const response = await fetch(xrayapi);
      if (!response.ok) {
        throw new Error('Failed to fetch Xray data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setXrayData(data.map(mapToXrayDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the Xray  server.");
      }
    } catch (error) {
      console.error("Error fetching Xray data:", error);
      setError("Oops! Xray data is not available.");
    } finally {
      setLoading(false);
    }
  };

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



  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
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
  ;

  const mapToDataItem = (item: any): DataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    PaymentMethod: item.PaymentMethod,
  });

  const mapToOPDDataItem = (item: any): OPDDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });


  const handleViewData = async () => {
    fetchData();

  };

  return (
    <XRaySideBar>
      <div className=" flex-col min-h-screen">


        {/* <Header /> */}
        <div className="flex-grow">
          <br />
          <h1 className="date text-2xl font-bold text-center">1.Finance Data {formattedDate}</h1>
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
                ) : (
                  data.length > 0 ? (
                    data.map((item) => (
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
                  )
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
              Refresh Finance Data
            </button>
            <br /><br /><br />
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

              {/* radiology  Data Section */}
              <h1 className="date text-2xl font-bold text-center">2.Radiology Data {formattedDate}</h1>
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
                    ) : XrayData.length > 0 ? (
                      XrayData.map((item) => (
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
                  onClick={refreshXrayData}
                  disabled={loading}
                >
                  Refresh Radiology Data
                </button>
                <hr />
                <br /><br /><br />


              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div></XRaySideBar>
  );
};

export default ViewData;
