'use client'
import Footer from "@/componets/footer";
import Header from "@/componets/navbar";
import React, { useState, useEffect, useCallback } from "react";

interface DataItem {
  id: number;
  firstName: string;
  lastName: string;
  paymentMethod: string;
  testOrdered: string;
}

const API_URL = "http://localhost:3000/laboratory/getallpatient";

const ViewData: React.FC = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setAlert(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      
      const responseData = await response.json();
      if (!Array.isArray(responseData)) {
        throw new Error("Invalid data format");
      }

      const filteredData = responseData.filter((item: any) => item.test_ordered === 'use client');
      const mappedData = filteredData.map((item: any) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        paymentMethod: item.payment_method,
        testOrdered: item.test_ordered,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ type: "error", message: "Oops! Today's data is not available." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
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
                <th className="py-2 px-4">First Name</th>
                <th className="py-2 px-4">Last Name</th>
                <th className="py-2 px-4">Payment Method</th>
                <th className="py-2 px-4">Test Ordered</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={5} className="text-center py-4 text-gray-600">Data is loading...</td>
                </tr>
              ) : data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="text-gray-800">
                    <td className="py-2 px-4">{item.id}</td>
                    <td className="py-2 px-4">{item.firstName}</td>
                    <td className="py-2 px-4">{item.lastName}</td>
                    <td className="py-2 px-4">{item.paymentMethod}</td>
                    <td className="py-2 px-4">{item.testOrdered}</td>
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
            onClick={fetchData}
          >
            Refresh Data
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ViewData;
