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
interface LabDataItem{
    ID:number;
    FirstName:string;
    LastName:string;
    PaymentMethod:string;
    TestOrdered:string


}

interface PhamarcyDataItem {
  ID: number;
  FirstName: string;
  LastName: string;
  DrugName: string;
  DrugType: string;
  Amount: string;
  MedicalScheme:string
}


interface DentalDataItem{
    ID:number;
    FirstName:string;
    LastName:string;
    PhoneNumber:string;
    Address:string;
    Diagnosis:string;
    Amount:number;
    MedicalScheme:string;
    Treatment:string;

}
interface XrayDataItem{
    ID:number;
    FirstName:string;
    LastName:string;
    Treatment:string;
    Amount:String;
    MedicalScheme:string;


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
  reception: "http://localhost:3000/reception",
  Phamarcy: "http://localhost:3000/pharmacy-sales",
  opd: "http://localhost:3000/opd/day",
  finance: "http://localhost:3000/finance/day",
  dental:"http://localhost:3000/dental",
  Xray:"",

  Lab:"http://localhost:3000/laboratory/getallpatient2",
};

const ViewData = () => {
  const [receptionData, setReceptionData] = useState<ReceptionDataItem[]>([]);
  const [PhamarcyData, setPhamarcyData] = useState<PhamarcyDataItem[]>([]);
  const [opdData, setOPDData] = useState<OPDDataItem[]>([]);
  const [DentalData, setDentalData] = useState<DentalDataItem[]>([]);
  const [LabData, setLabData] = useState<LabDataItem[]>([]);
  const [financeData, setFinanceData] = useState<FinanceDataItem[]>([]);
  const [XrayData, setXrayData] = useState<XrayDataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`;

  useEffect(() => {
    refreshReceptionData();
    refreshOPDData();
    RefreshPhamarcyData();
    refreshFinanceData();
    refreshLabData();
    refreshDentalData();
    refreshXRayData();
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


  const refreshXRayData = async () => {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints.Xray);
      if (!response.ok) {
        throw new Error('Failed to fetch xray data');
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        const uniqueData = removeDuplicates(data, 'ID');
  const [XrayData, setXrayData] = useState<XrayDataItem[]>([]);
  setXrayData(uniqueData.map(mapToXraylDataItem));
        setError(null);
      } else {
        setError("Invalid data received from the xray server.");
      }
    } catch (error) {
        console.error("Error fetching xray data:", error);
        setError("Oops! xray data is not available.");
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
      setError("Oops! dental data is not available.");
    } finally {
      setLoading(false);
    }
  };


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
  const mapToPhamarcyDataItem = (item: any): PhamarcyDataItem => ({
    ID: item.ID,
    FirstName: item.FirstName,
    LastName: item.LastName,
    DrugName: item.DrugName,
    DrugType: item.DrugType,
    Amount:item.Amount,
    MedicalScheme:item.MedicalScheme,
  });

  const mapToLabDataItem = (item: any): LabDataItem => ({
    ID:item.ID,
    FirstName:item.FirstName,
    LastName:item.LastName,
    PaymentMethod:item.PaymentMethod,
    TestOrdered:item.TestOrdered,

  });

   const mapToXraylDataItem = (item: any): XrayDataItem => ({
    ID:item.ID,
    FirstName:item.FirstName,
    LastName:item.LastName,
    Treatment:item.Teatment,
    Amount:item.Amount,
    MedicalScheme:item.MedicalScheme,
   });


  const mapToDentalDataItem = (item: any): DentalDataItem => ({
    ID:item.ID,
    FirstName:item.FirstName,
    LastName:item.LastName,
    PhoneNumber:item.PhoneNumber,
    Address:item.Address,
    Diagnosis:item.Diagnosis,
    Amount:item.Amount,
    MedicalScheme:item.MedicalScheme,
    Treatment:item.Teatment,

  });

  return (
    <div className="flex flex-col min-h-screen">
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

        

        {/* Finance Data Section */}
        <h1 className="date text-2xl font-bold text-center">2.Finance Data {formattedDate}</h1>
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



           {/* Reception Data Section */}
         <h1 className="date text-2xl font-bold text-center">4. Reception Data {formattedDate}</h1>
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
                  <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
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
                  <td colSpan={6} className="text-center py-4 text-gray-600">No data available</td>
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


           {/* Xray Data Section */}
           <h1 className="date text-2xl font-bold text-center">5.Radiology Data {formattedDate}</h1>
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
            onClick={refreshXRayData}
            disabled={loading}
          >
            Refresh Radiology Data
          </button>
          <hr />
          <br /><br /><br />


             {/* dental Data Section */}
        <h1 className="date text-2xl font-bold text-center">6.Dental Data {formattedDate}</h1>
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
                  <td colSpan={6} className="text-center py-4 text-gray-600">Loading...</td>
                </tr>
              ) : DentalData.length > 0 ? (
                DentalData.map((item) => (
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
            
          <h1 className="date text-2xl font-bold text-center">7.Phamarcy Data {formattedDate}</h1>
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
        </div>
      
      </div>
      
    </div>
    </div>
    </div>

  );
};

export default ViewData;
