'use client'

import React, { useState, useEffect } from "react";
import LabSideBar from "../page";


interface LabDataItem{
    ID:number;
    FirstName:string;
    LastName:string;
    PaymentMethod:string;
    TestOrdered:string


}




interface OPDDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  Treatment: string;
  Amount: number;
  MedicalScheme: string;
}


const apiEndpoints = {

  opd: `${process.env.NEXT_PUBLIC_API_URL}/opd/treatments/current-day?treatments=lab,laborotory`,

  Lab:`${process.env.NEXT_PUBLIC_API_URL}/laboratory/day`,
};

const ViewData = () => {

  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);

  const [LabData, setLabData] = useState<LabDataItem[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {

    refreshOPDData();
  
    refreshLabData();
 
  }, []);

 


  const refreshLabData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.Lab);
      if (!response.ok) {
        throw new Error('Failed to fetch lab data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
        setLabData(uniqueData.map(mapToLabDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the Lab server.");
      }
    } catch (error) {
        console.error("Error fetching Lab data:", error);
        setError("Oops! Lab data is not available.");
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
  

  
  const removeDuplicates = (arr: any[], key: string) => {
    return arr.filter((obj, index, self) =>
      index === self.findIndex((o) => o[key] === obj[key])
    );
  };

  const mapToOPDDataItem = (item: any): OPDDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    Treatment: item.Treatment,
    Amount: item.Amount,
    MedicalScheme: item.MedicalScheme,
  });


  const mapToLabDataItem = (item: any): LabDataItem => ({
    ID:item.ID,
    FirstName:item.FirstName,
    LastName:item.LastName,
    PaymentMethod:item.PaymentMethod,
    TestOrdered:item.TestOrdered,

  });




  return (<LabSideBar>
    <div className=" flex-col min-h-screen">
      <div className="flex-grow">
        <br />
      

        {/* OPD Data Section */}
        <h1 className="date text-2xl font-bold text-center">1.OPD Data {formattedDate}</h1>
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

        

       
             {/* laborotory Data Section */}
        <h1 className="date text-2xl font-bold text-center">3.Laborotory Data {formattedDate}</h1>
        <br />
        {error && <div className="text-center text-red-500">{error}</div>}
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
                  <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
                </tr>
              ) : LabData.length > 0 ? (
                LabData.map((item) => (
                  <tr key={item.ID} className="text-gray-800">
                    <td className="py-2 px-4">{item.ID}</td>
                    <td className="py-2 px-4">{item.FirstName}</td>
                    <td className="py-2 px-4">{item.LastName}</td>
                    <td className="py-2 px-4">{item.PaymentMethod}</td>

                    <td className="py-2 px-4">{item.TestOrdered}</td>
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
            onClick={refreshLabData}
            disabled={loading}
          >
            Refresh Lab Data
          </button>
          <hr />
          <br /><br /><br />



          
          
          </div>
        </div>

        </div>
    
  
    </LabSideBar>
  );
};

export default ViewData;
