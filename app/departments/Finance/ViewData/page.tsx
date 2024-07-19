"use client"
import React, { useState, useEffect } from "react";
import Footer from "@/componets/footer";
import Header from "@/componets/navbar";

interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}
//http://localhost:3000/finance/add

const api = "http://localhost:3000/finance/day";

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    fetchData();
  }, []);

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
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <br />
        <h1 className="date text-4xl font-bold text-center">{formattedDate}</h1>
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
            Refresh Data
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewData;
