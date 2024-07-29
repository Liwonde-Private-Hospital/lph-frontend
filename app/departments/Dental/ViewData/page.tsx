"use client"
import React, { useState, useEffect } from "react";




interface DentalDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Address: number;
  Diagnosis:string;
  Amount:number;
  MedicalScheme: string;
  Treatment:string;
}



const dentalapi = `${process.env.NEXT_PUBLIC_API_URL}/dental/day`;


const ViewData = () => {

  const [DentalData, setDentalData] = useState<DentalDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
   
    refreshDentalData();
  }, []);


  const mapToDentalDataItem = (item: any): DentalDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    PhoneNumber: item.PhoneNumber,
    Address:item.Address,
    Diagnosis:item.Diagnosis,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
    Treatment:item.Treatment,
  });



  const refreshDentalData = async () => {
    setLoading(true);
    try {
      const response = await fetch(dentalapi);
      if (!response.ok) {
        throw new Error('Failed to fetch OPD data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setDentalData(data.map(mapToDentalDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the Dental server.");
      }
    } catch (error) {
      console.error("Error fetching Dental data:", error);
      setError("Oops! Dental data is not available.");
    } finally {
      setLoading(false);
    }
  };
  


  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
  };



  const handleViewData = async () => {
    // fetchData();
  };

  return (
    <div className="flex flex-col min-h-screen">
         

        {/* OPD Data Section */}
        <h1 className="date text-2xl font-bold text-center">1.Dental Data {formattedDate}</h1>
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
              ) : DentalData.length > 0 ? (
                DentalData.map((item) => (
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
            onClick={refreshDentalData}
            disabled={loading}
          >
            Refresh Dental Data
          </button>
          <hr />
          <br /><br /><br />
      {/* <Header /> */}
      <div className="flex-grow">
        <br />
       
      </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ViewData;
