"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/navbar";
import Footer from "@/components/footer";

interface DataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  PaymentMethod: string;
}

const api = `${process.env.NEXT_PUBLIC_API_URL}/finance`;

const ViewData = () => {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString(
    "default",
    { month: "long" }
  )} ${currentDate.getFullYear()}`;

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
        const filteredData = responseData.filter(
          (item: any) => item.test_ordered === "use client"
        );
        const mappedData = filteredData.map((item: any) => ({
          ID: item.iD,
          FirstName: item.FirstName,
          LastName: item.LastName,
          Treatment: item.Treatment,
          Amount: item.Amount,
          PaymentMethod: item.PaymentMethod,
        }));

        setData(mappedData);
        setAlert(null);
      } else {
        setAlert({
          type: "error",
          message: "Invalid data received from the server.",
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({
        type: "error",
        message: "Oops! Today's data is not available.",
      });
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
                <th className="py-2 px-4">PaymentMethod</th>
              </tr>
            </thead>
            <tbody className="bg-gray-100">
              {loading ? (
                <tr key="loading">
                  <td colSpan={5} className="text-center py-4 text-gray-600">
                    Data is Loading...
                  </td>
                </tr>
              ) : data.length > 0 ? (
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
                  <td colSpan={5} className="text-center py-4 text-gray-600">
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
          >
            View Data
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewData;
